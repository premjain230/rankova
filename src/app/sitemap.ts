import { MetadataRoute } from "next";
import { rankings } from "@/data/rankings";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rankova.com";
  const staticPages = [
    "",
    "/rankings",
    "/categories",
    "/compare",
    "/methodology",
    "/about",
    "/editorial",
    "/contact",
    "/submit",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const rankingPages = rankings.map((r) => ({
    url: `${base}/rankings/${r.slug}`,
    lastModified: new Date(r.lastUpdated),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const productPages = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(p.lastUpdated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...rankingPages, ...productPages, ...categoryPages];
}
