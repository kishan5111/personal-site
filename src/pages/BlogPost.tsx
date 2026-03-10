import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPostById } from "@/lib/blog-posts";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = id ? getBlogPostById(id) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          className="mb-8 flex items-center gap-2"
          onClick={() => navigate("/blog")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Button>

        <div className="flex flex-col items-center justify-center py-12 text-center">
          <BookOpen className="mb-6 h-24 w-24 text-primary" />
          <h1 className="mb-4 text-4xl font-bold">Blog post not found</h1>
          <p className="max-w-2xl text-xl text-muted-foreground">
            The article you are looking for does not exist or has been moved.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl space-y-8"
      >
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => navigate("/blog")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Button>

        <header className="space-y-4">
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
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {post.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
        </header>

        <article className="w-full max-w-[74ch] font-article text-[1.02rem] leading-[1.95] tracking-normal text-foreground md:text-[1.08rem] [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-5 [&_blockquote]:italic [&_code]:rounded-md [&_code]:bg-amber-100/70 [&_code]:px-1.5 [&_code]:py-0.5 dark:[&_code]:bg-white/10 [&_em]:italic [&_h1]:mb-6 [&_h1]:mt-10 [&_h1]:font-sans [&_h1]:text-4xl [&_h1]:font-semibold [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:font-sans [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:font-sans [&_h3]:text-xl [&_h3]:font-semibold [&_li]:mt-2 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-5 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-border/60 [&_pre]:bg-stone-100 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-7 [&_pre]:text-stone-900 dark:[&_pre]:bg-white/5 dark:[&_pre]:text-white [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-semibold [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </motion.div>
    </div>
  );
};

export default BlogPost;
