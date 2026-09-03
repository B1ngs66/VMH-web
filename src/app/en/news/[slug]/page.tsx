import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticlePage } from "@/components/NewsArticlePage";
import { createPageMetadata } from "@/content/metadata";
import { getNewsItem, newsSlugs } from "@/content/news";

export const dynamicParams = false;

export function generateStaticParams() {
  return newsSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsItem("en", slug);
  return item ? createPageMetadata({
    locale: "en",
    title: item.title,
    description: item.summary,
    canonical: `/en/news/${slug}/`,
    zhPath: `/news/${slug}/`,
    enPath: `/en/news/${slug}/`,
    publishedTime: item.date,
  }) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getNewsItem("en", slug);
  if (!item) notFound();
  return <NewsArticlePage locale="en" item={item} />;
}
