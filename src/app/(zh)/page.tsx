import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "zh",
  description: "天機控股以 IP 為核心，連接人工智能、機器人與算力基礎設施，推動文化、旅遊、體育等產業的數字化與全球商業化。",
  canonical: "/",
  zhPath: "/",
  enPath: "/en/",
});

export default function Page() {
  return <HomePage locale="zh" />;
}
