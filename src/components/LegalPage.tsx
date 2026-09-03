import type { Locale } from "@/content/site";
import { getLegalDocument } from "@/content/legal";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function LegalPage({ locale, kind }: { locale: Locale; kind: "privacy" | "terms" }) {
  const document = getLegalDocument(locale, kind);

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="legal-page" lang={locale === "zh" ? "zh-Hant-HK" : "en"}>
        <header className="page-hero page-hero-narrow">
          <p className="page-kicker">{locale === "zh" ? "法律資料" : "Legal information"}</p>
          <h1>{document.title}</h1>
          <p>{document.notice}</p>
        </header>
        <div className="legal-document">
          {document.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
            </section>
          ))}
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
