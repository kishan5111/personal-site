import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { blogPosts } from "@/lib/blog-posts";

const Blog = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm font-medium text-primary">
              <BookOpen className="h-4 w-4" />
              Writing on LLM fine-tuning, inference, and systems
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Blog
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
              Notes from experiments, model adaptation work, and the engineering tradeoffs that
              show up once ideas meet real constraints.
            </p>
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="grid gap-6"
        >
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="border-border/40 bg-background/35 shadow-none backdrop-blur-[2px]"
            >
              <CardHeader className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span>{post.date}</span>
                  <span>{post.readingTime}</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/70 px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="space-y-3">
                  <CardTitle className="text-3xl leading-tight">{post.title}</CardTitle>
                  <CardDescription className="max-w-3xl text-base leading-7">
                    {post.description}
                  </CardDescription>
                </div>
                <div className="pt-2">
                  <Button asChild className="group">
                    <Link to={`/blog/${post.id}`}>
                      Read article
                      <ArrowRight className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
