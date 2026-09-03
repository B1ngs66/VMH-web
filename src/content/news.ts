import rawEnNews from "@/data/news.en.json";
import rawZhNews from "@/data/news.zh.json";
import type { Locale } from "./site";

export type NewsItem = {
  slug: string;
  legacyId?: number;
  date: string;
  title: string;
  summary: string;
  paragraphs: string[];
  category: string;
  link?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  bodyImageUrl?: string;
  bodyImageAlt?: string;
  bodyImageWidth?: number;
  bodyImageHeight?: number;
};

const newsByLocale = {
  zh: rawZhNews,
  en: rawEnNews,
} as unknown as Record<Locale, NewsItem[]>;

export function getNews(locale: Locale): NewsItem[] {
  return newsByLocale[locale];
}

export function getNewsItem(locale: Locale, slug: string): NewsItem | undefined {
  return getNews(locale).find((item) => item.slug === slug);
}

export const newsSlugs = rawZhNews.map((item) => item.slug);
