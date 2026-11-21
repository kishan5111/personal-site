// Build-time entry used by scripts/prerender.mjs to render every public route
// to static HTML, so crawlers and AI agents that don't run JavaScript can read the site.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppRoutes } from "./App";
import { blogPosts } from "@/lib/blog-posts";
import { competitions } from "@/lib/portfolio-data";

const SITE_DESCRIPTION =
  "Kishan Vavdara is an ML/LLM engineer working on fine-tuning, evaluation, and inference optimization for large language models. Kaggle Competition Master and Notebook Master.";

export interface PrerenderRoute {
  path: string;
  title: string;
  description: string;
  markdown?: string;
}

const postMarkdown = (post: (typeof blogPosts)[number]) => {
  const body =
    post.content ??
    (post.sections ?? [])
      .map((section) => `## ${section.title}\n\n${section.content}`)
      .join("\n\n");

  return `# ${post.title}\n\n${post.date} · ${post.readingTime} · Kishan Vavdara\n\n${post.description}\n\n${body}\n`;
};

export const routes: PrerenderRoute[] = [
  { path: "/", title: "Kishan Vavdara", description: SITE_DESCRIPTION },
  {
    path: "/portfolio",
    title: "Portfolio | Kishan Vavdara",
    description:
      "Kaggle competition results, public notebooks, open-source contributions, and active projects by Kishan Vavdara.",
  },
  {
    path: "/blog",
    title: "Blog | Kishan Vavdara",
    description: "Writing on LLM fine-tuning, evaluation, inference, and systems.",
  },
  {
    path: "/contact",
    title: "Contact | Kishan Vavdara",
    description: "How to get in touch with Kishan Vavdara.",
  },
  ...blogPosts.map((post) => ({
    path: `/blog/${post.id}`,
    title: `${post.title} | Kishan Vavdara`,
    description: post.description,
    markdown: postMarkdown(post),
  })),
  ...Object.values(competitions).map((competition) => ({
    path: `/competition/${competition.id}`,
    title: `${competition.title} | Kishan Vavdara`,
    description: `${competition.medal} medal, ${competition.rank}. ${competition.summary}`,
  })),
];

export const render = (url: string) =>
  renderToString(
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </TooltipProvider>
    </ThemeProvider>,
  );
