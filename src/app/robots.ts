import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Served at /robots.txt — allows full indexing and points crawlers to the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
