import { cacheLife } from "next/cache";

// Live GitHub data for the "GitHub activity" section.
// Cached for an hour (`cacheLife("hours")`): it is prerendered into the page and refreshed in the
// background, so visitors never wait on GitHub and the unauthenticated rate limit is never an issue.
// Optional env var GITHUB_TOKEN raises the rate limit if ever needed.

export const GITHUB_USER = "guru-1212";

// Repos to leave out of the "recently active" list (exact repo names).
const HIDDEN_REPOS = new Set<string>(["Portfolio-Guru"]);

export type ContributionDay = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export type GithubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  url: string;
  pushedAt: string;
  stars: number;
};

export type GithubActivity = {
  publicRepos: number;
  contributionsLastYear: number | null;
  weeks: ContributionDay[][];
  languages: { name: string; count: number }[];
  repos: GithubRepo[];
};

type ApiRepo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  pushed_at: string;
  stargazers_count: number;
  fork: boolean;
};

async function getContributions(): Promise<{ total: number; days: ContributionDay[] } | null> {
  try {
    // Public, token-free mirror of the GitHub contribution calendar.
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`);
    if (!res.ok) return null;
    const data = (await res.json()) as { total: { lastYear: number }; contributions: ContributionDay[] };
    return { total: data.total.lastYear, days: data.contributions };
  } catch {
    return null;
  }
}

export async function getGithubActivity(): Promise<GithubActivity | null> {
  "use cache";
  cacheLife("hours");

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-guru",
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
  };

  try {
    const [userRes, reposRes, contributions] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`, { headers }),
      getContributions(),
    ]);
    if (!userRes.ok || !reposRes.ok) return null;

    const user = (await userRes.json()) as { public_repos: number };
    const own = ((await reposRes.json()) as ApiRepo[]).filter((repo) => !repo.fork);

    const languageCounts = new Map<string, number>();
    for (const repo of own) {
      if (repo.language) languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
    }

    // Calendar starts on a Sunday, so chunks of 7 are calendar weeks (columns of the heatmap).
    const weeks: ContributionDay[][] = [];
    for (let i = 0; i < (contributions?.days.length ?? 0); i += 7) {
      weeks.push(contributions!.days.slice(i, i + 7));
    }

    return {
      publicRepos: user.public_repos,
      contributionsLastYear: contributions?.total ?? null,
      weeks,
      languages: [...languageCounts.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6),
      repos: own
        .filter((repo) => repo.language && !HIDDEN_REPOS.has(repo.name))
        .slice(0, 6)
        .map((repo) => ({
          name: repo.name,
          description: repo.description,
          language: repo.language,
          url: repo.html_url,
          pushedAt: repo.pushed_at.slice(0, 10),
          stars: repo.stargazers_count,
        })),
    };
  } catch {
    return null;
  }
}
