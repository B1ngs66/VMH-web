import type { MetadataRoute } from "next";
import { newsSlugs } from "@/content/news";
import { projectSlugs } from "@/content/projects";
import { siteUrl } from "@/lib/site-path";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;
  const staticPaths = ["", "/en", "/news", "/en/news", "/investors", "/en/investors", "/privacy", "/en/privacy", "/terms", "/en/terms"];
  const newsPaths = newsSlugs.flatMap((slug) => [`/news/${slug}`, `/en/news/${slug}`]);
  const projectPaths = projectSlugs.flatMap((slug) => [`/projects/${slug}`, `/en/projects/${slug}`]);
  return [...staticPaths, ...newsPaths, ...projectPaths].map((path) => ({
    url: `${base}${path}/`.replace(/(?<!:)\/\//g, "/"),
    lastModified: new Date("2026-09-02"),
    changeFrequency: path.includes("news") || path.includes("investors") ? "monthly" : "yearly",
    priority: path === "" ? 1 : path.includes("investors") ? 0.9 : 0.7,
  }));
}
