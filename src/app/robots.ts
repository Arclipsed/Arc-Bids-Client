import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://arcbids.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/how-it-works",
          "/pricing",
          "/imprint",
          "/terms",
          "/privacy",
          "/solutions/",
        ],
        disallow: ["/dashboard", "/api/", "/auth/", "/auction"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
