import type { Metadata, Viewport } from "next";
import type { Locale } from "./site";
import { publicPath, siteUrl } from "@/lib/site-path";

const identity = {
  zh: {
    rootTitle: "天機控股有限公司 | HKEX 01520",
    shortName: "天機控股",
    siteName: "天機控股有限公司",
    description: "天機控股以 IP 為核心，連接人工智能、機器人與算力基礎設施，推動文化、旅遊、體育等產業的數字化與全球商業化。",
    locale: "zh_HK",
    alternateLocale: "en_HK",
  },
  en: {
    rootTitle: "VM Holding Company Limited | HKEX 01520",
    shortName: "VM Holding",
    siteName: "VM Holding Company Limited",
    description: "VMH connects IP with artificial intelligence, robotics and computing infrastructure to advance digital transformation and global commercialisation.",
    locale: "en_HK",
    alternateLocale: "zh_HK",
  },
} as const;

const socialImage = { url: publicPath("/picture/frameA_pic.jpg"), width: 1054, height: 730 };

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFCFE" },
    { media: "(prefers-color-scheme: dark)", color: "#101B2D" },
  ],
};

export function createRootMetadata(locale: Locale): Metadata {
  const copy = identity[locale];
  return {
    metadataBase: new URL(new URL(siteUrl).origin),
    title: {
      default: copy.rootTitle,
      template: locale === "zh" ? "%s | 天機控股" : "%s | VM Holding",
    },
    description: copy.description,
    openGraph: {
      type: "website",
      locale: copy.locale,
      alternateLocale: [copy.alternateLocale],
      siteName: copy.siteName,
      title: copy.rootTitle,
      description: copy.description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.rootTitle,
      description: copy.description,
      images: [socialImage.url],
    },
    icons: {
      icon: [{ url: publicPath("/picture/favicon.png"), type: "image/png", sizes: "128x128" }],
      apple: publicPath("/picture/favicon.png"),
    },
  };
}

type PageMetadataOptions = {
  locale: Locale;
  title?: string;
  description: string;
  canonical: string;
  zhPath: string;
  enPath: string;
  publishedTime?: string;
};

export function createPageMetadata(options: PageMetadataOptions): Metadata {
  const copy = identity[options.locale];
  const fullTitle = options.title ? `${options.title} | ${copy.shortName}` : copy.rootTitle;
  const canonical = publicPath(options.canonical);
  const commonOpenGraph = {
    locale: copy.locale,
    alternateLocale: [copy.alternateLocale],
    siteName: copy.siteName,
    title: fullTitle,
    description: options.description,
    url: canonical,
    images: [socialImage],
  };

  return {
    title: { absolute: fullTitle },
    description: options.description,
    alternates: {
      canonical,
      languages: { "zh-Hant-HK": publicPath(options.zhPath), en: publicPath(options.enPath) },
    },
    openGraph: options.publishedTime
      ? { type: "article", publishedTime: options.publishedTime, ...commonOpenGraph }
      : { type: "website", ...commonOpenGraph },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: options.description,
      images: [socialImage.url],
    },
  };
}
