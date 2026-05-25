import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
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
          className="grid gap-3"
        >
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-lg border border-border/40 bg-background/30 px-4 py-3 shadow-none md:px-5 md:py-3.5"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11px] text-muted-foreground md:text-xs">
                  <span>{post.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-muted-foreground md:text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link to={`/blog/${post.id}`} className="group block">
                  <h2 className="font-article text-[1.22rem] font-semibold leading-snug tracking-normal text-foreground md:text-[1.45rem]">
                    {post.title}
                  </h2>
                  <p className="mt-1 max-w-4xl text-[13px] leading-5 text-muted-foreground md:text-sm md:leading-6">
                    {post.description}
                  </p>
                  <span className="mt-1.5 inline-block text-xs font-medium text-foreground underline underline-offset-4 opacity-80 transition-opacity group-hover:opacity-100 md:text-[13px]">
                    Read post
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
