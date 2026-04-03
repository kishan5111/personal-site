import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const articleClassName =
  "mx-auto w-full max-w-[1240px] min-w-0 font-article text-[1rem] leading-[1.86] tracking-[0.002em] text-foreground md:text-[1.06rem] [&_.sources-list]:mt-8 [&_.sources-list]:text-[0.88rem] [&_.sources-list]:leading-7 md:[&_.sources-list]:text-[0.93rem] [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/25 [&_blockquote]:pl-5 [&_blockquote]:italic [&_code]:rounded-sm [&_code]:bg-stone-200/55 [&_code]:px-1 [&_code]:py-0.5 dark:[&_code]:bg-white/8 [&_em]:italic [&_h1]:mb-6 [&_h1]:mt-10 [&_h1]:font-sans [&_h1]:text-[2.65rem] [&_h1]:font-semibold [&_h1]:leading-[1.04] md:[&_h1]:text-[3.1rem] [&_h2]:mb-4 [&_h2]:mt-14 [&_h2]:font-sans [&_h2]:text-[1.9rem] [&_h2]:font-semibold [&_h2]:leading-[1.08] md:[&_h2]:text-[2.05rem] [&_h3]:mb-2 [&_h3]:mt-9 [&_h3]:font-sans [&_h3]:text-[1.26rem] [&_h3]:font-semibold [&_h3]:leading-[1.18] [&_img]:my-10 [&_img]:w-full [&_img]:rounded-none [&_img]:border-0 [&_img]:bg-transparent [&_img]:p-0 [&_li]:mt-1.5 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-stone-300/70 [&_pre]:bg-stone-100/80 [&_pre]:p-4 [&_pre]:text-[0.92rem] [&_pre]:leading-7 [&_pre]:text-stone-900 dark:[&_pre]:border-white/10 dark:[&_pre]:bg-white/5 dark:[&_pre]:text-white [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-medium [&_table]:my-10 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[0.95rem] [&_tbody_tr]:border-b [&_tbody_tr]:border-border/40 [&_td]:align-top [&_td]:border-b [&_td]:border-border/40 [&_td]:px-4 [&_td]:py-3 [&_th]:border-b [&_th]:border-border/55 [&_th]:bg-stone-100/50 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-sans [&_th]:text-[0.83rem] [&_th]:font-semibold [&_th]:tracking-[0.04em] dark:[&_th]:bg-white/5 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6";

const markdownComponents: Components = {
  img: ({ src, alt }) => {
    const isWantingLikingImage = src?.includes("wanting-vs-liking.");

    return (
      <img
        src={src ?? ""}
        alt={alt ?? ""}
        className={isWantingLikingImage ? "mx-auto my-10 w-full max-w-[760px]" : undefined}
      />
    );
  },
};

const BlogDraftPreview = () => {
  const [searchParams] = useSearchParams();
  const [markdown, setMarkdown] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const articleRef = useRef<HTMLElement | null>(null);

  const file = searchParams.get("file") ?? "draft.md";
  const filePath = `/blog_drafts/${file}`;

  useEffect(() => {
    let isMounted = true;

    setStatus("loading");

    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Draft not found");
        }

        return response.text();
      })
      .then((text) => {
        if (!isMounted) {
          return;
        }

        setMarkdown(text);
        setStatus("ready");
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, [filePath]);

  useEffect(() => {
    if (status !== "ready" || !articleRef.current) {
      return;
    }

    articleRef.current.querySelectorAll(".sources-list").forEach((node) => {
      node.classList.remove("sources-list");
    });

    const paragraphs = Array.from(articleRef.current.querySelectorAll("p"));
    for (const paragraph of paragraphs) {
      const text = paragraph.textContent?.trim().replace(/\s+/g, " ");
      if (text === "Sources:" || text === "Sources") {
        const next = paragraph.nextElementSibling;
        if (next instanceof HTMLUListElement) {
          next.classList.add("sources-list");
        }
      }
    }
  }, [markdown, status]);

  return (
    <div className="min-h-screen container mx-auto px-4 py-10">
      <div className="mx-auto max-w-[1360px] space-y-8">
        <Button asChild variant="ghost" className="-ml-2 flex items-center gap-2">
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <header className="space-y-4">
          <div className="flex items-center gap-3 text-sm font-medium text-primary">
            <FileText className="h-4 w-4" />
            Local draft preview
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Draft Preview
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
            This page reads a local markdown file from
            <code className="mx-1 rounded-md bg-amber-100/70 px-1.5 py-0.5 dark:bg-white/10">
              public/blog_drafts/
            </code>
            so you can draft before publishing.
          </p>
          <p className="text-sm text-muted-foreground">
            Current file:
            <code className="ml-2 rounded-md bg-amber-100/70 px-1.5 py-0.5 dark:bg-white/10">
              {file}
            </code>
          </p>
        </header>

        {status === "loading" && (
          <div className="rounded-2xl border border-border/60 bg-background/50 p-6 text-sm text-muted-foreground">
            Loading draft...
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl border border-border/60 bg-background/50 p-6 text-sm leading-7 text-muted-foreground">
            Draft file not found.
            <br />
            Create
            <code className="mx-1 rounded-md bg-amber-100/70 px-1.5 py-0.5 dark:bg-white/10">
              public/blog_drafts/draft.md
            </code>
            or open
            <code className="mx-1 rounded-md bg-amber-100/70 px-1.5 py-0.5 dark:bg-white/10">
              /blog/draft?file=your-file.md
            </code>
            after adding a different markdown file.
          </div>
        )}

        {status === "ready" && (
          <article ref={articleRef} className={articleClassName}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {markdown}
            </ReactMarkdown>
          </article>
        )}
      </div>
    </div>
  );
};

export default BlogDraftPreview;
