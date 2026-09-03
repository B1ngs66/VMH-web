import type { Metadata } from "next";
import { NewsIndexPage } from "@/components/NewsIndexPage";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "zh",
  title: "企業新聞",
  description: "天機控股有限公司企業新聞與最新發展。",
  canonical: "/news/",
  zhPath: "/news/",
  enPath: "/en/news/",
});

export default function Page() {
  return <NewsIndexPage locale="zh" />;
}
