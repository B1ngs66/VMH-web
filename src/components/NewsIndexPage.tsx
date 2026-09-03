import type { Locale } from "@/content/site";
import { siteCopy } from "@/content/site";
import { getNews } from "@/content/news";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { NewsList } from "./NewsList";

export function NewsIndexPage({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  return (
    <>
      <Header locale={locale} />
      <main id="main-content" lang={locale === "zh" ? "zh-Hant-HK" : "en"}>
        <header className="page-hero">
          <p className="page-kicker">{locale === "zh" ? "公司資訊" : "Company information"}</p>
          <h1>{copy.newsTitle}</h1>
          <p>{copy.newsLead}</p>
        </header>
        <div className="page-content">
          <NewsList items={getNews(locale)} locale={locale} />
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
