import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  activeProjects,
  competitions,
  featuredCompetitionIds,
  selectedCodeContributions,
} from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";

const medalStyles: Record<string, string> = {
  Gold: "border-amber-300/70 bg-amber-100/70 text-amber-950 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100",
  Silver: "border-slate-300/70 bg-slate-100/80 text-slate-900 dark:border-slate-400/40 dark:bg-slate-400/10 dark:text-slate-100",
  Bronze: "border-orange-300/70 bg-orange-100/80 text-orange-950 dark:border-orange-500/40 dark:bg-orange-500/10 dark:text-orange-100",
};

const surfaceClass =
  "rounded-3xl border border-border/60 bg-background/55 p-6 shadow-sm dark:border-white/12 dark:bg-white/[0.04] dark:shadow-none";

const compactSurfaceClass =
  "rounded-2xl border border-border/55 bg-background/45 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none";

const quietBadgeClass =
  "border-border/60 bg-background/70 dark:border-white/12 dark:bg-white/[0.05]";

const outlineButtonClass =
  "dark:border-white/15 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]";

const Portfolio = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-16">
        <section className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Portfolio
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Selected competition results, public code, and active projects.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              Work across evaluation, inference, deployment, and practical ML
              systems.
            </p>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
              Kaggle Competition Master and Notebook Master with public
              notebooks, writeups, and active product work around serving and
              hardware-fit decisions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild>
              <Link to="/contact">
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className={outlineButtonClass}>
              <a
                href="https://www.kaggle.com/kishanvavdara"
                target="_blank"
                rel="noreferrer"
              >
                Kaggle
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className={outlineButtonClass}>
              <a
                href="https://github.com/kishan5111"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
                <Github className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Featured Results
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Strongest competition work
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {featuredCompetitionIds.map((id) => {
              const competition = competitions[id];

              return (
                <article
                  key={competition.id}
                  className={`${surfaceClass} backdrop-blur-sm`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Badge
                      variant="outline"
                      className={medalStyles[competition.medal]}
                    >
                      {competition.medal}
                    </Badge>
                    <p className="text-sm font-medium text-muted-foreground">
                      {competition.rank}
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground">
                        {competition.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {competition.dateRange}
                      </p>
                    </div>

                    <p className="text-base leading-7 text-foreground/90">
                      {competition.summary}
                    </p>

                    <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                      {competition.bullets.slice(0, 2).map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild size="sm">
                      <Link to={`/competition/${competition.id}`}>
                        View details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    {competition.writeupLink && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className={outlineButtonClass}
                      >
                        <a
                          href={competition.writeupLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Writeup
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Selected Code and Writeups
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Selected public notebooks and writeups
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {selectedCodeContributions.map((item) => (
              <article
                key={item.title}
                className={compactSurfaceClass}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className={quietBadgeClass}>
                    {item.label}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {item.competitionTitle}
                  </p>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    Open link
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <Link
                    to={`/competition/${item.competitionId}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
                  >
                    See competition context
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Active Projects
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Active projects
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {activeProjects.map((project) => (
              <article
                key={project.title}
                className={surfaceClass}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-2xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <Badge variant="outline" className={quietBadgeClass}>
                    {project.status}
                  </Badge>
                </div>

                <p className="mt-4 text-base leading-7 text-foreground/90">
                  {project.description}
                </p>

                <div className="mt-5">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    Visit {project.title}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={surfaceClass}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Open to ML and LLM engineering work.
              </h2>
              <p className="text-sm leading-7 text-muted-foreground md:text-base">
                Especially interested in roles involving evaluation, inference,
                model iteration, and deployment.
              </p>
            </div>

            <Button asChild size="lg">
              <Link to="/contact">
                Start a conversation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
