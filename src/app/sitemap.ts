import type { MetadataRoute } from "next";
import { profile } from "@/data/portfolio";
import { posts } from "@/data/posts";

// /sitemap.xml — every public page, so search engines can find them all.
export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = posts.map((post) => post.date).sort().at(-1);

  return [
    {
      url: profile.siteUrl,
      lastModified: latestPost,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${profile.siteUrl}/blog`,
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts.map((post) => ({
      url: `${profile.siteUrl}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
