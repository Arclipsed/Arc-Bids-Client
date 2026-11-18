import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://arcbids.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/how-it-works`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/pricing`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/solutions`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/solutions/itad-hardware-auctions`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/solutions/liquidation-pallet-auctions`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/solutions/b2b-smartphone-stock-auctions`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/solutions/industrial-surplus-machinery-auctions`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/solutions/fashion-overstock-lot-auctions`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/solutions/whatsapp-b2b-auction-alternative`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...BLOG_POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/imprint`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
