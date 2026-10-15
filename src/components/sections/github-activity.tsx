import { ArrowUpRight, FolderGit2, GitCommitHorizontal, Star } from "lucide-react";
import { formatDate } from "@/data/posts";
import { getGithubActivity, GITHUB_USER } from "@/lib/github";
import { ContributionGraph } from "../effects/contribution-graph";
import { CountUp } from "../effects/count-up";
import { SpotlightCard } from "../effects/spotlight-card";
import { GithubIcon } from "../icons";
import { Reveal } from "../reveal";
import { Section } from "../section";

const profileUrl = `https://github.com/${GITHUB_USER}`;
const card = "rounded-3xl border border-border bg-surface/80 backdrop-blur";

export async function GithubActivity() {
  const data = await getGithubActivity();

  return (
    <Section
      id="github"
      index="05"
      eyebrow="GitHub"
      title={
        <>
          Always <span className="gradient-text">building something.</span>
        </>
      }
      description="Live from my GitHub — refreshed automatically every hour."
    >
      {data ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <SpotlightCard className={`${card} h-full p-6 sm:p-7`}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 font-mono text-sm text-accent">
                    <GitCommitHorizontal className="size-4" aria-hidden="true" />
                    Contributions · last 12 months
                  </p>
                  {data.contributionsLastYear !== null ? (
                    <p className="gradient-text mt-2 font-display text-5xl font-bold">
                      <CountUp value={String(data.contributionsLastYear)} />
                    </p>
                  ) : null}
                </div>
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                >
                  <GithubIcon className="size-4" />@{GITHUB_USER}
                </a>
              </div>
              {data.weeks.length > 0 ? (
                <div className="mt-7">
                  <ContributionGraph weeks={data.weeks} />
                </div>
              ) : null}
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.08}>
            <SpotlightCard className={`${card} flex h-full flex-col p-6 sm:p-7`}>
              <p className="flex items-center gap-2 font-mono text-sm text-accent">
                <FolderGit2 className="size-4" aria-hidden="true" />
                Public repositories
              </p>
              <p className="gradient-text mt-2 font-display text-5xl font-bold">
                <CountUp value={String(data.publicRepos)} />
              </p>
              <p className="mt-6 text-sm text-muted">Most used languages</p>
              <ul className="mt-3 space-y-2.5">
                {data.languages.map((language) => {
                  const max = data.languages[0]?.count ?? 1;
                  return (
                    <li key={language.name}>
                      <div className="flex justify-between text-sm">
                        <span>{language.name}</span>
                        <span className="font-mono text-muted">{language.count}</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-2">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                          style={{ width: `${Math.max(8, (language.count / max) * 100)}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </SpotlightCard>
          </Reveal>

          {data.repos.length > 0 ? (
            <div className="lg:col-span-3">
              <Reveal>
                <p className="mb-4 mt-4 font-mono text-sm text-muted">Recently active repositories</p>
              </Reveal>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.repos.map((repo, index) => (
                  <li key={repo.name}>
                    <Reveal delay={(index % 3) * 0.07}>
                      <SpotlightCard tilt className={`${card} group h-full`}>
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-full flex-col p-5"
                        >
                          <span className="flex items-start justify-between gap-3">
                            <span className="truncate font-display font-semibold">{repo.name}</span>
                            <ArrowUpRight
                              className="size-4 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                              aria-hidden="true"
                            />
                          </span>
                          {repo.description ? (
                            <span className="mt-2 line-clamp-2 text-sm text-muted">{repo.description}</span>
                          ) : null}
                          <span className="mt-auto flex items-center gap-4 pt-4 text-xs text-muted">
                            <span className="flex items-center gap-1.5">
                              <span className="size-2 rounded-full bg-gradient-to-r from-accent to-accent-2" aria-hidden="true" />
                              {repo.language}
                            </span>
                            {repo.stars > 0 ? (
                              <span className="flex items-center gap-1">
                                <Star className="size-3.5" aria-hidden="true" />
                                {repo.stars}
                              </span>
                            ) : null}
                            <span className="ml-auto font-mono">
                              Updated <time dateTime={repo.pushedAt}>{formatDate(repo.pushedAt)}</time>
                            </span>
                          </span>
                        </a>
                      </SpotlightCard>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : (
        <Reveal>
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${card} flex items-center gap-4 p-6 transition-colors hover:border-accent`}
          >
            <GithubIcon className="size-8" />
            <span>
              <span className="block font-display font-semibold">See my work on GitHub</span>
              <span className="text-sm text-muted">github.com/{GITHUB_USER}</span>
            </span>
          </a>
        </Reveal>
      )}
    </Section>
  );
}
