import type { Metadata, Viewport } from "next";
import { createRootMetadata, siteViewport } from "@/content/metadata";
import { NavigationScrollManager } from "@/components/NavigationScrollManager";
import { siteFontClassName } from "../site-fonts";
import "../globals.css";

export const metadata: Metadata = createRootMetadata("zh");
export const viewport: Viewport = siteViewport;

export default function ChineseRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant-HK" className={siteFontClassName}>
      <body>
        <NavigationScrollManager />
        <a className="skip-link" href="#main-content">跳至主要內容</a>
        {children}
      </body>
    </html>
  );
}
