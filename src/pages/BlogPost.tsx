
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Using the same mock data temporarily - in real app, this would come from your backend
const mockPosts = [
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
  {
    id: "2",
    title: "Deep Learning with PyTorch",
    content: `# Deep Learning with PyTorch

Learn how to build neural networks using PyTorch:

\`\`\`python
import torch
import torch.nn as nn

class NeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(784, 128),
            nn.ReLU(),
            nn.Linear(128, 10)
        )
    
    def forward(self, x):
        return self.layers(x)
\`\`\`

This model can be used for MNIST classification.
`,
    date: "2024-02-21",
  },
  {
    id: "3",
    title: "Natural Language Processing Basics",
    content: `# Introduction to NLP

Here's how to get started with basic NLP tasks:

\`\`\`python
from transformers import pipeline

# Create a sentiment analysis pipeline
classifier = pipeline("sentiment-analysis")

# Analyze some text
result = classifier("I love working with transformers!")
print(result)  # [{'label': 'POSITIVE', 'score': 0.9998}]
\`\`\`

This example shows how to use Hugging Face transformers for sentiment analysis.
`,
    date: "2024-02-22",
  },
];

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = mockPosts.find(p => p.id === id);

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

  if (!post) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-12">
        <h1>Blog post not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="ghost"
          className="mb-8 flex items-center gap-2"
          onClick={() => navigate("/blog")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Button>
        
        <article className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
          <h1>{post.title}</h1>
          <time className="text-sm text-muted-foreground block mb-8">
            {post.date}
          </time>
          <ReactMarkdown components={{ code: CustomCodeBlock }}>
            {post.content}
          </ReactMarkdown>
        </article>
      </motion.div>
    </div>
  );
};

export default BlogPost;
