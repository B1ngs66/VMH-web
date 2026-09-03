import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "zh",
  title: "使用條款",
  description: "天機控股有限公司網站使用條款。",
  canonical: "/terms/",
  zhPath: "/terms/",
  enPath: "/en/terms/",
});

export default function Page() {
  return <LegalPage locale="zh" kind="terms" />;
}
