import type { Metadata } from "next";
import { InvestorsPage } from "@/components/InvestorsPage";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  title: "Investor relations",
  description: "Announcements, circulars, financial reports and governance information from VM Holding Company Limited.",
  canonical: "/en/investors/",
  zhPath: "/investors/",
  enPath: "/en/investors/",
});

export default function Page() {
  return <InvestorsPage locale="en" />;
}
