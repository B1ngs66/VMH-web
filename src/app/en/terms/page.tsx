import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  title: "Terms of use",
  description: "Terms of use for the VM Holding Company Limited website.",
  canonical: "/en/terms/",
  zhPath: "/terms/",
  enPath: "/en/terms/",
});

export default function Page() {
  return <LegalPage locale="en" kind="terms" />;
}
