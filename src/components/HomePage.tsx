import {
  ArrowRight,
  DownloadSimple,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { getAnnouncements, publicFileUrl } from "@/content/announcements";
import { getNews } from "@/content/news";
import type { Locale } from "@/content/site";
import { company, siteCopy } from "@/content/site";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MarketTracker } from "./MarketTracker";
import { NewsList } from "./NewsList";
import { OfficeMediaCarousel } from "./OfficeMediaCarousel";
import { OpeningIntro } from "./OpeningIntro";
import { SectionHeading } from "./SectionHeading";
import { ServiceStories } from "./ServiceStories";

export function HomePage({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const announcements = getAnnouncements(locale);
  const latestFiling = announcements[0];
  const allNews = getNews(locale);
  const homepageNews = [
    "mokenlogic-macos-preview-launch",
    "gauss-tech-ai-joint-venture",
    "investment-potential-award-2025",
  ].map((slug) => allNews.find((item) => item.slug === slug)).filter((item) => item !== undefined);
  const prefix = locale === "zh" ? "" : "/en";

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" lang={locale === "zh" ? "zh-Hant-HK" : "en"}>
        <OpeningIntro locale={locale} />
        <section className="home-hero" id="home">
          <div className="hero-copy">
            <p className="hero-kicker">{locale === "zh" ? "香港聯合交易所主板上市公司" : "Listed on the Main Board of The Stock Exchange of Hong Kong"}</p>
            <h1>
              <span className="hero-title-primary">{copy.tagline}</span>
              {copy.taglineSecondary ? <span className="hero-title-secondary">{copy.taglineSecondary}</span> : null}
            </h1>
            <p className="hero-description">{copy.description}</p>
            <Link className="primary-action" href={copy.investorHref}>
              {copy.investorAction}
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
          <figure className="hero-media">
            <Image src="/picture/vmh-headquarters.jpg" width={1800} height={2700} alt={locale === "zh" ? "香港環球大廈外牆的天機控股品牌標誌" : "VM Holding signage on the exterior of World-Wide House in Hong Kong"} priority sizes="(max-width: 980px) 100vw, 48vw" />
            <figcaption>
              <span>{copy.name}</span>
              <span>HK.{company.stockCode}</span>
            </figcaption>
          </figure>
        </section>

        <section className="latest-filing" aria-label={copy.latestFiling}>
          <div className="latest-filing-label">{copy.latestFiling}</div>
          <time dateTime={latestFiling.date}>{latestFiling.date}</time>
          <p>{latestFiling.title}</p>
          <a href={publicFileUrl(latestFiling)} target="_blank" rel="noreferrer">
            {copy.download}<DownloadSimple size={18} aria-hidden="true" />
          </a>
        </section>

        <section className="content-section about-section" id="about">
          <div className="about-layout">
            <div>
              <SectionHeading title={copy.aboutTitle} lead={copy.aboutLead} />
              <div className="prose-columns">
                {copy.aboutParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
            <OfficeMediaCarousel locale={locale} />
          </div>
        </section>

        <section className="content-section services-section" id="services">
          <SectionHeading title={copy.servicesTitle} lead={copy.servicesLead} />
          <ServiceStories services={copy.services} locale={locale} prefix={prefix} viewCase={copy.viewCase} />
        </section>

        <section className="content-section news-section" id="news">
          <SectionHeading title={copy.newsTitle} lead={copy.newsLead} />
          <NewsList items={homepageNews} locale={locale} compact />
          <Link className="news-all-link" href={`${prefix}/news`}>{copy.allNews}<ArrowRight size={18} aria-hidden="true" /></Link>
        </section>

        <section className="content-section investor-section" id="investor">
          <div className="investor-intro">
            <SectionHeading title={copy.investorsTitle} lead={copy.investorsLead} />
            <p className="stock-code-large">01520</p>
            <Link className="primary-action" href={`${prefix}/investors`}>
              {copy.allFilings}<ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
          <div className="filing-preview">
            {announcements.slice(0, 5).map((item) => (
              <a key={item.fileName} href={publicFileUrl(item)} target="_blank" rel="noreferrer">
                <time dateTime={item.date}>{item.date}</time>
                <span>{item.title}</span>
                <DownloadSimple size={19} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <section className="content-section market-section" aria-label={locale === "zh" ? "市場行情" : "Market quotes"}>
          <MarketTracker locale={locale} />
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
