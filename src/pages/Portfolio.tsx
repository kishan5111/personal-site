import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  additionalCompetitionIds,
  competitions,
  featuredCompetitionIds,
  projects,
  selectedCodeContributions,
} from "@/lib/portfolio-data";

const medalIcons: Record<string, string> = {
  Gold: "🥇",
  Silver: "🥈",
  Bronze: "🥉",
};

const linkClass =
  "underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground";

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

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="space-y-4">
    <h2 className="text-lg font-semibold text-foreground">{title}</h2>
    <ul className="space-y-5">{children}</ul>
  </section>
);

const Portfolio = () => {
  const competitionList = [...featuredCompetitionIds, ...additionalCompetitionIds].map(
    (id) => competitions[id],
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-12">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Portfolio
          </h1>
          <p className="text-[15px] leading-7 text-muted-foreground">
            Things I've built, competitions I've placed in, and public notebooks. More
            on{" "}
            <a
              href="https://github.com/kishan5111"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              GitHub
            </a>{" "}
            and{" "}
            <a
              href="https://www.kaggle.com/kishanvavdara"
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              Kaggle
            </a>
            .
          </p>
        </header>

        <Section title="Projects">
          {projects.map((project) => (
            <li key={project.title} className="space-y-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <SmartLink
                  href={project.links[0].href}
                  className={`font-medium text-foreground ${linkClass}`}
                >
                  {project.title}
                </SmartLink>
                <span className="flex gap-2 text-sm text-muted-foreground">
                  {project.links.map((link) => (
                    <SmartLink key={link.href} href={link.href} className={linkClass}>
                      {link.label}
                    </SmartLink>
                  ))}
                </span>
              </div>
              <p className="text-[15px] leading-7 text-muted-foreground">
                {project.description}
              </p>
            </li>
          ))}
        </Section>

        <Section title="Kaggle competitions">
          {competitionList.map((competition) => (
            <li key={competition.id} className="space-y-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <Link
                  to={`/competition/${competition.id}`}
                  className={`font-medium text-foreground ${linkClass}`}
                >
                  <span aria-label={`${competition.medal} medal`} className="mr-2 no-underline">
                    {medalIcons[competition.medal]}
                  </span>
                  {competition.title}
                </Link>
                <span className="text-sm tabular-nums text-muted-foreground">
                  {competition.rank}
                </span>
              </div>
              <p className="text-[15px] leading-7 text-muted-foreground">
                {competition.summary}
                {competition.writeupLink && (
                  <>
                    {" "}
                    <a
                      href={competition.writeupLink}
                      target="_blank"
                      rel="noreferrer"
                      className={`text-foreground ${linkClass}`}
                    >
                      Writeup
                    </a>
                  </>
                )}
              </p>
            </li>
          ))}
        </Section>

        <Section title="Public notebooks">
          {selectedCodeContributions.map((item) => (
            <li key={item.link} className="space-y-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`font-medium text-foreground ${linkClass}`}
                >
                  {item.title}
                </a>
                <span className="text-sm text-muted-foreground">{item.label}</span>
              </div>
              <p className="text-[15px] leading-7 text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </Section>
      </div>
    </div>
  );
};

export default Portfolio;
