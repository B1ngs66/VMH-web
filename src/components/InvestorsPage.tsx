import type { Locale } from "@/content/site";
import { company, siteCopy } from "@/content/site";
import { getAnnouncements } from "@/content/announcements";
import { AnnouncementsExplorer } from "./AnnouncementsExplorer";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function InvestorsPage({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  return (
    <>
      <Header locale={locale} />
      <main id="main-content" lang={locale === "zh" ? "zh-Hant-HK" : "en"}>
        <header className="page-hero">
          <p className="page-kicker">HKEX {company.stockCode}</p>
          <h1>{copy.investorsTitle}</h1>
          <p>{copy.investorsLead}</p>
        </header>
        <AnnouncementsExplorer items={getAnnouncements(locale)} locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
