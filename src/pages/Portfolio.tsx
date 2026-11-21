import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  additionalCompetitionIds,
  competitions,
  featuredCompetitionIds,
  projects,
  selectedCodeContributions,
} from "@/lib/portfolio-data";

const medalStyles: Record<string, string> = {
  Gold: "border-amber-300/70 bg-amber-100/70 text-amber-950 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100",
  Silver: "border-slate-300/70 bg-slate-100/80 text-slate-900 dark:border-slate-400/40 dark:bg-slate-400/10 dark:text-slate-100",
  Bronze: "border-orange-300/70 bg-orange-100/80 text-orange-950 dark:border-orange-500/40 dark:bg-orange-500/10 dark:text-orange-100",
};

const medalIcons: Record<string, string> = {
  Gold: "🥇",
  Silver: "🥈",
  Bronze: "🥉",
};

const tagClass =
  "rounded-md bg-muted/70 px-2 py-0.5 text-xs text-muted-foreground dark:bg-white/[0.06]";

const actionClass =
  "inline-flex items-center gap-1 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground";

const rowClass =
  "rounded-xl border border-border/60 px-5 py-4 transition-colors hover:border-border hover:bg-muted/30 dark:border-white/10 dark:hover:border-white/20 dark:hover:bg-white/[0.03]";

// Internal paths go through the router; everything else opens in a new tab.
const SmartLink = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) =>
  href.startsWith("/") ? (
    <Link to={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );

const Section = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <section className="border-t border-border/60 pt-8 dark:border-white/10">
    <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
      {label}
    </h2>
    <ul className="space-y-3">{children}</ul>
  </section>
);

const Portfolio = () => {
  const competitionList = [...featuredCompetitionIds, ...additionalCompetitionIds].map(
    (id) => competitions[id],
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            Portfolio
          </h1>
          <p className="text-base leading-8 text-muted-foreground">
            Kaggle competitions I've medaled in, the public notebooks behind them, and
            tools I've built around LLM inference and GPUs.
          </p>
          <div className="flex flex-wrap gap-4 pt-1">
            <a
              href="https://github.com/kishan5111"
              target="_blank"
              rel="noreferrer"
              className={actionClass}
            >
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.kaggle.com/kishanvavdara"
              target="_blank"
              rel="noreferrer"
              className={actionClass}
            >
              Kaggle
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/kishan-vavdara-55680b190/"
              target="_blank"
              rel="noreferrer"
              className={actionClass}
            >
              LinkedIn
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </header>

        <Section label="Kaggle competitions">
          {competitionList.map((competition) => (
            <li key={competition.id} className={rowClass}>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium ${medalStyles[competition.medal]}`}
                  >
                    {medalIcons[competition.medal]} {competition.medal}
                  </span>
                  <span className="text-sm font-medium tabular-nums text-foreground">
                    {competition.rank}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    · {competition.dateRange}
                  </span>
                </div>
                <div className="flex gap-4">
                  <Link to={`/competition/${competition.id}`} className={actionClass}>
                    Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  {competition.writeupLink && (
                    <a
                      href={competition.writeupLink}
                      target="_blank"
                      rel="noreferrer"
                      className={actionClass}
                    >
                      Writeup
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
              <Link
                to={`/competition/${competition.id}`}
                className="mt-2 block text-lg font-semibold text-foreground hover:underline hover:underline-offset-4"
              >
                {competition.title}
              </Link>
              <p className="mt-1 text-[15px] leading-7 text-muted-foreground">
                {competition.summary}
              </p>
            </li>
          ))}
        </Section>

        <Section label="Public notebooks">
          {selectedCodeContributions.map((item) => (
            <li key={item.link} className={rowClass}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-foreground hover:underline hover:underline-offset-4"
                >
                  {item.title}
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
                <span className={tagClass}>{item.label}</span>
              </div>
              <p className="mt-1 text-[15px] leading-7 text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </Section>
        <Section label="Projects">
          {projects.map((project) => (
            <li key={project.title} className={rowClass}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <SmartLink
                  href={project.links[0].href}
                  className="text-lg font-semibold text-foreground hover:underline hover:underline-offset-4"
                >
                  {project.title}
                </SmartLink>
                <span className="text-sm text-muted-foreground">{project.date}</span>
              </div>
              <p className="mt-1 text-[15px] leading-7 text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className={tagClass}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.links.map((link) => (
                    <SmartLink key={link.href} href={link.href} className={actionClass}>
                      {link.label}
                      {link.href.startsWith("/") ? (
                        <ArrowRight className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      )}
                    </SmartLink>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </Section>

      </div>
    </div>
  );
};

export default Portfolio;
