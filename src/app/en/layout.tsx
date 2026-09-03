import type { Metadata, Viewport } from "next";
import { createRootMetadata, siteViewport } from "@/content/metadata";
import { NavigationScrollManager } from "@/components/NavigationScrollManager";
import { siteFontClassName } from "../site-fonts";
import "../globals.css";

export const metadata: Metadata = createRootMetadata("en");
export const viewport: Viewport = siteViewport;

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={siteFontClassName}>
      <body>
        <NavigationScrollManager />
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
