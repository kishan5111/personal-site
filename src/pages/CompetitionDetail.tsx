import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { competitions } from "@/lib/portfolio-data";

const medalStyles: Record<string, string> = {
  Gold: "border-amber-300/70 bg-amber-100/70 text-amber-950 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100",
  Silver: "border-slate-300/70 bg-slate-100/80 text-slate-900 dark:border-slate-400/40 dark:bg-slate-400/10 dark:text-slate-100",
  Bronze: "border-orange-300/70 bg-orange-100/80 text-orange-950 dark:border-orange-500/40 dark:bg-orange-500/10 dark:text-orange-100",
};

const CompetitionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const competition = id ? competitions[id] : undefined;

  if (!competition) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border/60 bg-background/55 p-8 text-center shadow-sm">
          <h1 className="text-3xl font-semibold text-foreground">
            Competition not found
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            The portfolio entry you tried to open does not exist.
          </p>
          <Button asChild className="mt-6">
            <Link to="/portfolio">
              Back to portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-10">
        <Button variant="ghost" className="px-0" onClick={() => navigate("/portfolio")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to portfolio
        </Button>

        <section className="rounded-3xl border border-border/60 bg-background/55 p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className={medalStyles[competition.medal]}>
              {competition.medal}
            </Badge>
            <Badge variant="outline" className="border-border/60 bg-background/70">
              {competition.rank}
            </Badge>
            <Badge variant="outline" className="border-border/60 bg-background/70">
              {competition.dateRange}
            </Badge>
          </div>

          <div className="mt-6 space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground">
              {competition.title}
            </h1>
            <p className="text-lg leading-8 text-foreground/90">
              {competition.summary}
            </p>
            <p className="max-w-4xl text-sm leading-7 text-muted-foreground md:text-base">
              {competition.challenge}
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Result
              </p>
              <p className="mt-2 text-xl font-semibold text-foreground">
                {competition.rank}
              </p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Teams
              </p>
              <p className="mt-2 text-xl font-semibold text-foreground">
                {competition.teamCount}
              </p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Public artifacts
              </p>
              <p className="mt-2 text-xl font-semibold text-foreground">
                {competition.notebooks.length > 0
                  ? `${competition.notebooks.length} notebooks`
                  : "Writeup only"}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-border/60 bg-background/45 p-8 shadow-sm">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              What mattered here
            </p>
            <h2 className="text-2xl font-semibold text-foreground">
              Technical highlights
            </h2>
          </div>

          <ul className="mt-6 space-y-3 text-sm leading-7 text-muted-foreground md:text-base">
            {competition.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Public notebooks
              </p>
              <h2 className="text-2xl font-semibold text-foreground">
                Code contributions and writeups
              </h2>
            </div>

            {competition.writeupLink && (
              <Button asChild variant="outline">
                <a
                  href={competition.writeupLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Read writeup
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>

          {competition.notebooks.length > 0 ? (
            <div className="grid gap-4">
              {competition.notebooks.map((notebook) => (
                <article
                  key={notebook.title}
                  className="rounded-2xl border border-border/55 bg-background/55 p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    {notebook.label && (
                      <Badge
                        variant="outline"
                        className="border-border/60 bg-background/70"
                      >
                        {notebook.label}
                      </Badge>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {competition.title}
                    </p>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-foreground">
                    {notebook.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                    {notebook.description}
                  </p>

                  <div className="mt-5">
                    <a
                      href={notebook.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      Open notebook
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border/55 bg-background/55 p-6 text-sm leading-7 text-muted-foreground shadow-sm">
              No notebook links are listed for this competition yet. The writeup
              link above is the main public artifact currently surfaced here.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CompetitionDetail;
