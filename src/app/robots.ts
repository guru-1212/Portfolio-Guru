import type { MetadataRoute } from "next";
import { profile } from "@/data/portfolio";

// /robots.txt — crawl everything except the API, and point to the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${profile.siteUrl}/sitemap.xml`,
    host: profile.siteUrl,
  };
}
