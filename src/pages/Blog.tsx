
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
}

// Temporary mock data - replace this with your backend API call
const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Machine Learning",
    content: `# Getting Started with Machine Learning
    
Here's a simple Python example:
    
\`\`\`python
import numpy as np
import pandas as pd

def train_model(X, y):
    return np.dot(X.T, y)
\`\`\`

This is just a basic example of how to write code blocks in your blog posts.
    `,
    date: "2024-02-20",
  },
];

const Blog = () => {
  const [posts] = useState<BlogPost[]>(mockPosts);

  const CustomCodeBlock = ({ children, className, ...props }: any) => {
    const language = /language-(\w+)/.exec(className || "");
    return language ? (
      <SyntaxHighlighter language={language[1].toLowerCase()}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="grid gap-8">
          {posts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <time className="text-sm text-muted-foreground mb-4 block">
                {post.date}
              </time>
              <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown components={{ code: CustomCodeBlock }}>
                  {post.content}
                </ReactMarkdown>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Blog;
