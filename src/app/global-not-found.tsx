import type { Metadata } from "next";
import Link from "next/link";
import { siteFontClassName } from "./site-fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "找不到頁面 | Page not found",
  description: "找不到所要求的頁面。The requested page could not be found.",
};

export default function GlobalNotFound() {
  return (
    <html lang="zh-Hant-HK" className={siteFontClassName}>
      <body>
        <main id="main-content" className="legal-page">
          <header className="page-hero page-hero-narrow">
            <p className="page-kicker">404</p>
            <h1>找不到此頁面</h1>
            <p>您要求的頁面不存在，或已移至其他位置。</p>
            <p lang="en">The requested page does not exist or has moved.</p>
            <div className="article-actions">
              <Link className="primary-action" href="/">返回中文主頁</Link>
              <Link className="secondary-action" href="/en/" lang="en">English home</Link>
            </div>
          </header>
        </main>
      </body>
    </html>
  );
}
