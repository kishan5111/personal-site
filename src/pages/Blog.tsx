
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Eye } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost>({
    id: "",
    title: "",
    content: "",
    date: "",
  });
  const [preview, setPreview] = useState(false);

  const handleNewPost = () => {
    setIsEditing(true);
    setPreview(false);
    setCurrentPost({
      id: Date.now().toString(),
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleSave = () => {
    if (currentPost.title && currentPost.content) {
      setPosts((prev) => [currentPost, ...prev]);
      setIsEditing(false);
      setCurrentPost({ id: "", title: "", content: "", date: "" });
    }
  };

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Blog</h1>
          <Button onClick={handleNewPost} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Post</span>
          </Button>
        </div>

        {isEditing ? (
          <div className="glass rounded-lg p-6">
            <input
              type="text"
              value={currentPost.title}
              onChange={(e) =>
                setCurrentPost({ ...currentPost, title: e.target.value })
              }
              placeholder="Post Title"
              className="w-full text-2xl font-bold mb-4 bg-transparent border-none outline-none"
            />
            <div className="flex space-x-4 mb-4">
              <Button
                variant={preview ? "outline" : "default"}
                onClick={() => setPreview(false)}
              >
                Edit
              </Button>
              <Button
                variant={preview ? "default" : "outline"}
                onClick={() => setPreview(true)}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
            {preview ? (
              <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown components={{ code: CustomCodeBlock }}>
                  {currentPost.content}
                </ReactMarkdown>
              </div>
            ) : (
              <Textarea
                value={currentPost.content}
                onChange={(e) =>
                  setCurrentPost({ ...currentPost, content: e.target.value })
                }
                placeholder="Write your post in Markdown..."
                className="min-h-[400px] font-mono"
              />
            )}
          </div>
        ) : (
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
        )}
      </motion.div>
    </div>
  );
};

export default Blog;
