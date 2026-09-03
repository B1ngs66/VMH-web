import type { Metadata } from "next";
import { NewsIndexPage } from "@/components/NewsIndexPage";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  title: "Corporate news",
  description: "Corporate news and updates from VM Holding Company Limited.",
  canonical: "/en/news/",
  zhPath: "/news/",
  enPath: "/en/news/",
});

export default function Page() {
  return <NewsIndexPage locale="en" />;
}
