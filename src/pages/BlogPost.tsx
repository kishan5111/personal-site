import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBlogPostById } from "@/lib/blog-posts";
import { cn } from "@/lib/utils";

const articleClassName =
  "mx-auto w-full max-w-[1240px] min-w-0 font-article text-[1rem] leading-[1.86] tracking-[0.002em] text-foreground md:text-[1.06rem] [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary/25 [&_blockquote]:pl-5 [&_blockquote]:italic [&_code]:rounded-sm [&_code]:bg-stone-200/55 [&_code]:px-1 [&_code]:py-0.5 dark:[&_code]:bg-white/8 [&_em]:italic [&_h3]:mb-2 [&_h3]:mt-9 [&_h3]:font-sans [&_h3]:text-[1.26rem] [&_h3]:font-semibold [&_h3]:leading-[1.18] [&_img]:my-10 [&_img]:w-full [&_img]:rounded-none [&_img]:border-0 [&_img]:bg-transparent [&_img]:p-0 [&_li]:mt-1.5 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-4 [&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-stone-300/70 [&_pre]:bg-stone-100/80 [&_pre]:p-4 [&_pre]:text-[0.92rem] [&_pre]:leading-7 [&_pre]:text-stone-900 dark:[&_pre]:border-white/10 dark:[&_pre]:bg-white/5 dark:[&_pre]:text-white [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-medium [&_table]:my-10 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[0.95rem] [&_tbody_tr]:border-b [&_tbody_tr]:border-border/40 [&_td]:align-top [&_td]:border-b [&_td]:border-border/40 [&_td]:px-4 [&_td]:py-3 [&_th]:border-b [&_th]:border-border/55 [&_th]:bg-stone-100/50 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-sans [&_th]:text-[0.83rem] [&_th]:font-semibold [&_th]:tracking-[0.04em] dark:[&_th]:bg-white/5 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = id ? getBlogPostById(id) : undefined;
  const hasTableOfContents = Boolean(post?.sections?.length);
  const [activeSectionId, setActiveSectionId] = useState(
    post?.sections?.[0]?.id ?? "",
  );

  useEffect(() => {
    if (!post) {
      return;
    }

    const previousTitle = document.title;
    const descriptionMeta = document.querySelector(
      'meta[name="description"]',
    ) as HTMLMetaElement | null;
    const previousDescription = descriptionMeta?.getAttribute("content") ?? null;
    let createdMeta = false;
    let metaElement = descriptionMeta;

    if (!metaElement) {
      metaElement = document.createElement("meta");
      metaElement.name = "description";
      document.head.appendChild(metaElement);
      createdMeta = true;
    }

    document.title = `${post.title} | Kishan Vavdara`;
    metaElement.setAttribute("content", post.description);

    return () => {
      document.title = previousTitle;

      if (createdMeta && metaElement?.parentNode) {
        metaElement.parentNode.removeChild(metaElement);
      } else if (metaElement) {
        if (previousDescription === null) {
          metaElement.removeAttribute("content");
        } else {
          metaElement.setAttribute("content", previousDescription);
        }
      }
    };
  }, [post]);

  useEffect(() => {
    if (!post?.sections?.length) {
      return;
    }

    setActiveSectionId(post.sections[0].id);

    const elements = post.sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) {
      return;
    }

    const offset = 180;
    let frameId = 0;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + offset;
      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 24;

      let nextActiveId = elements[0].id;

      for (const element of elements) {
        if (element.offsetTop <= scrollPosition) {
          nextActiveId = element.id;
        } else {
          break;
        }
      }

      if (reachedBottom) {
        nextActiveId = elements[elements.length - 1].id;
      }

      setActiveSectionId((current) =>
        current === nextActiveId ? current : nextActiveId,
      );
      frameId = 0;
    };

    const requestUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [post]);

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
    <div className="min-h-screen container mx-auto px-4 py-8 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-[1380px] space-y-6"
      >
        <div className="lg:grid lg:grid-cols-[200px_minmax(0,1240px)] lg:gap-20 xl:gap-24">
          <div className="hidden lg:block" />
          <div className="space-y-5">
            <Button
              variant="ghost"
              className="-ml-2 flex items-center gap-2"
              onClick={() => navigate("/blog")}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>

            <header className="space-y-5 border-b border-border/45 pb-6 dark:border-transparent">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>{post.date}</span>
                <span>{post.readingTime}</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/50 px-3 py-1 text-xs font-medium text-foreground/85"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1
                className="max-w-none font-article text-4xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-5xl"
                style={{ textWrap: "balance" }}
              >
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="max-w-4xl text-lg leading-8 text-muted-foreground">
                  {post.excerpt}
                </p>
              )}
            </header>
          </div>
        </div>

        <div
          className={cn(
            hasTableOfContents
              ? "lg:grid lg:grid-cols-[200px_minmax(0,1240px)] lg:gap-20 xl:gap-24"
              : "mx-auto max-w-[1240px]",
          )}
        >
          {hasTableOfContents && (
            <aside className="hidden lg:block lg:-ml-12 xl:-ml-16">
              <div className="sticky top-24 -ml-2 pt-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  On this page
                </p>
                <nav className="mt-4 space-y-1">
                  {post.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={cn(
                        "block border-l border-border/40 pl-4 pr-2 py-2 text-sm leading-6 text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground",
                        activeSectionId === section.id &&
                          "border-foreground/60 font-medium text-foreground",
                      )}
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          <div className="min-w-0">
            <article className={articleClassName}>
              {post.intro?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {post.sections?.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 border-t border-border/40 pt-10 first:border-t-0 first:pt-4"
                >
                  <h2 className="mb-4 font-sans text-2xl font-semibold tracking-tight text-foreground md:text-[2rem]">
                    {section.title}
                  </h2>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {section.content}
                  </ReactMarkdown>

                  {section.id === "how-to-choose" && post.comparisonRows && (
                    <>
                      <div className="mt-6 rounded-2xl border border-border/55 bg-background/45 px-4 py-3 text-sm leading-7 text-muted-foreground">
                        Jump to the deep dives below if you want the reasoning
                        behind each choice.
                      </div>

                      <div className="mt-8 rounded-3xl border border-border/60 bg-background/50 p-5 shadow-sm">
                        <p className="text-sm leading-7 text-muted-foreground">
                          Numbers will vary by model, task, and dataset size -
                          treat these as directional, not absolute.
                        </p>

                        <div className="mt-5 overflow-x-auto">
                          <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left text-sm">
                            <thead>
                              <tr className="text-foreground">
                                <th className="border-b border-border/60 px-4 py-3 font-semibold">
                                  Method
                                </th>
                                <th className="border-b border-border/60 px-4 py-3 font-semibold">
                                  Trainable %
                                </th>
                                <th className="border-b border-border/60 px-4 py-3 font-semibold">
                                  Convergence Speed
                                </th>
                                <th className="border-b border-border/60 px-4 py-3 font-semibold">
                                  Memory Overhead
                                </th>
                                <th className="border-b border-border/60 px-4 py-3 font-semibold">
                                  Best For
                                </th>
                                <th className="border-b border-border/60 px-4 py-3 font-semibold">
                                  Failure Risk
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {post.comparisonRows.map((row) => (
                                <tr
                                  key={row.method}
                                  className="align-top text-muted-foreground"
                                >
                                  <td className="border-b border-border/40 px-4 py-4 font-semibold text-foreground">
                                    {row.method}
                                  </td>
                                  <td className="border-b border-border/40 px-4 py-4">
                                    {row.trainablePct}
                                  </td>
                                  <td className="border-b border-border/40 px-4 py-4">
                                    {row.convergenceSpeed}
                                  </td>
                                  <td className="border-b border-border/40 px-4 py-4">
                                    {row.memoryOverhead}
                                  </td>
                                  <td className="border-b border-border/40 px-4 py-4">
                                    {row.bestFor}
                                  </td>
                                  <td className="border-b border-border/40 px-4 py-4">
                                    {row.failureRisk}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}

                  {section.id === "what-each-method-changes" && (
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                      <div className="rounded-2xl border border-border/55 bg-background/55 p-5 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          LoRA
                        </p>
                        <div className="mt-4 rounded-xl border border-border/50 bg-background/70 p-4 font-mono text-sm text-foreground">
                          y = (W + BA)x
                        </div>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          Additive patch over the frozen weight matrix.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-border/55 bg-background/55 p-5 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          IA3
                        </p>
                        <div className="mt-4 rounded-xl border border-border/50 bg-background/70 p-4 font-mono text-sm text-foreground">
                          y = W(l ⊙ x)
                        </div>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          Rescales internal activations instead of patching
                          weights.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-border/55 bg-background/55 p-5 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          BOFT
                        </p>
                        <div className="mt-4 rounded-xl border border-border/50 bg-background/70 p-4 font-mono text-sm text-foreground">
                          y = RWx
                        </div>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">
                          Applies a structured multiplicative transform to the
                          frozen weights.
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              ))}

              {post.content && !post.sections && (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              )}
            </article>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPost;
