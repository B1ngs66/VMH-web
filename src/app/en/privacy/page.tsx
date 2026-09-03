import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { createPageMetadata } from "@/content/metadata";

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  title: "Privacy policy",
  description: "Privacy policy for the VM Holding Company Limited website.",
  canonical: "/en/privacy/",
  zhPath: "/privacy/",
  enPath: "/en/privacy/",
});

export default function Page() {
  return <LegalPage locale="en" kind="privacy" />;
}
