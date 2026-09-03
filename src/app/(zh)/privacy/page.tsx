import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "zh",
  title: "私隱政策",
  description: "天機控股有限公司網站私隱政策。",
  canonical: "/privacy/",
  zhPath: "/privacy/",
  enPath: "/en/privacy/",
});

export default function Page() {
  return <LegalPage locale="zh" kind="privacy" />;
}
