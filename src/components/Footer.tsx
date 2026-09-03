import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { Locale } from "@/content/site";
import { company, siteCopy } from "@/content/site";

export function Footer({ locale }: { locale: Locale }) {
  const copy = siteCopy[locale];
  const prefix = locale === "zh" ? "" : "/en";
  const labels = locale === "zh"
    ? { contact: "聯繫信息", legal: "法律信息", ecosystem: "生態夥伴" }
    : { contact: "Contact", legal: "Legal", ecosystem: "Ecosystem" };

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-shell">
        <section className="footer-group footer-identity" aria-labelledby={`footer-company-${locale}`}>
          <h2 className="footer-heading" id={`footer-company-${locale}`}>{copy.name}</h2>
          <p className="footer-stock">HK.{company.stockCode}</p>
          <p>{locale === "zh" ? copy.taglineSecondary : copy.tagline}</p>
          <p>{copy.footerIncorporation}</p>
        </section>

        <section className="footer-group footer-contact" aria-labelledby={`footer-contact-${locale}`}>
          <h2 className="footer-heading" id={`footer-contact-${locale}`}>{labels.contact}</h2>
          <address className="footer-contact-list">
            <p>
              <MapPin size={20} weight="fill" aria-hidden="true" />
              <span>{locale === "zh" ? company.addressZh : company.addressEn}</span>
            </p>
            <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>
              <Phone size={20} weight="fill" aria-hidden="true" />
              <span>{company.phone}</span>
            </a>
            <a href={`mailto:${company.email}`}>
              <EnvelopeSimple size={20} weight="fill" aria-hidden="true" />
              <span>{company.email}</span>
            </a>
          </address>
        </section>

        <nav className="footer-group footer-links" aria-labelledby={`footer-legal-${locale}`}>
          <h2 className="footer-heading" id={`footer-legal-${locale}`}>{labels.legal}</h2>
          <Link href={`${prefix}/terms`}>{copy.terms}</Link>
          <Link href={`${prefix}/privacy`}>{copy.privacy}</Link>
        </nav>

        <nav className="footer-group footer-links" aria-labelledby={`footer-ecosystem-${locale}`}>
          <h2 className="footer-heading" id={`footer-ecosystem-${locale}`}>{labels.ecosystem}</h2>
          {copy.services.map((service) => (
            <Link href={`${prefix}/projects/${service.slug}`} key={service.slug}>{service.title}</Link>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {copy.legalName}. {copy.rights}.</span>
        <a href={`https://${company.website}`}>{company.website}</a>
      </div>
    </footer>
  );
}
