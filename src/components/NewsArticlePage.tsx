import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/content/site";
import type { NewsItem } from "@/content/news";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function NewsArticlePage({ locale, item }: { locale: Locale; item: NewsItem }) {
  const base = locale === "zh" ? "/news" : "/en/news";
  return (
    <>
      <Header locale={locale} />
      <main id="main-content" lang={locale === "zh" ? "zh-Hant-HK" : "en"}>
        <header className="page-hero page-hero-narrow">
          <p className="page-kicker">{item.category}</p>
          <h1>{item.title}</h1>
        </header>
        <article className="article-shell">
          <div className="article-meta"><time dateTime={item.date}>{item.date}</time><span>HK.{"01520"}</span></div>
          {item.imageUrl && item.imageAlt && item.imageWidth && item.imageHeight && (
            <figure className="article-media">
              <Image src={item.imageUrl} alt={item.imageAlt} width={item.imageWidth} height={item.imageHeight} sizes="(max-width: 860px) calc(100vw - 40px), 820px" />
            </figure>
          )}
          <p className="article-lead">{item.summary}</p>
          {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {item.bodyImageUrl && item.bodyImageAlt && item.bodyImageWidth && item.bodyImageHeight && (
            <figure className="article-media article-media-body">
              <Image src={item.bodyImageUrl} alt={item.bodyImageAlt} width={item.bodyImageWidth} height={item.bodyImageHeight} sizes="(max-width: 860px) calc(100vw - 40px), 820px" />
            </figure>
          )}
          <div className="article-actions">
            <Link className="secondary-action" href={base}><ArrowLeft size={18} aria-hidden="true" />{locale === "zh" ? "返回企業新聞" : "Back to corporate news"}</Link>
            {item.link && <a className="secondary-action" href={item.link} target="_blank" rel="noreferrer">{locale === "zh" ? "相關網站" : "Related website"}<ArrowUpRight size={18} aria-hidden="true" /></a>}
          </div>
        </article>
      </main>
      <Footer locale={locale} />
    </>
  );
}
