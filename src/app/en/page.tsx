import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  description: "VMH connects IP with artificial intelligence, robotics and computing infrastructure to advance digital transformation and global commercialisation.",
  canonical: "/en/",
  zhPath: "/",
  enPath: "/en/",
});

export default function Page() {
  return <HomePage locale="en" />;
}
