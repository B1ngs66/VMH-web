import type { Metadata } from "next";
import { InvestorsPage } from "@/components/InvestorsPage";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "zh",
  title: "投資者關係",
  description: "天機控股有限公司公告、通函、財務報告及企業管治資料。",
  canonical: "/investors/",
  zhPath: "/investors/",
  enPath: "/en/investors/",
});

export default function Page() {
  return <InvestorsPage locale="zh" />;
}
