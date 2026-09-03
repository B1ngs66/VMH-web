"use client";

import { List, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/site";
import { company, siteCopy } from "@/content/site";

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const copy = siteCopy[locale];
  const pathname = usePathname();
  const languageHref = locale === "zh"
    ? pathname === "/" ? "/en" : `/en${pathname}`
    : pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const normalizedPath = pathname.replace(/\/$/, "") || "/";
  const homePath = locale === "zh" ? "/" : "/en";

  useEffect(() => {
    const normalizedHomePath = homePath.replace(/\/$/, "") || "/";
    if (normalizedPath !== normalizedHomePath) return;

    const updateFromHash = () => setActiveSection(window.location.hash.slice(1));
    const initialFrame = window.requestAnimationFrame(updateFromHash);
    window.addEventListener("hashchange", updateFromHash);
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, [homePath, normalizedPath]);

  const isCurrentPage = (href: string) => {
    const [hrefPath, hash = ""] = href.split("#");
    const normalizedHref = hrefPath.replace(/\/$/, "") || "/";
    if (hash) return normalizedPath === normalizedHref && activeSection === hash;
    if (normalizedHref === homePath) return normalizedPath === normalizedHref && activeSection === "";
    if (normalizedHref === "/" || normalizedHref === "/en") return normalizedPath === normalizedHref;
    return normalizedPath === normalizedHref || normalizedPath.startsWith(`${normalizedHref}/`);
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    const [hrefPath, hash] = href.split("#");
    const normalizedHref = hrefPath.replace(/\/$/, "") || "/";
    if (normalizedHref !== normalizedPath) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hash) {
      event.preventDefault();
      window.history.pushState(null, "", hrefPath || homePath);
      setActiveSection("");
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      return;
    }

    const target = document.getElementById(hash);
    if (!target) return;

    event.preventDefault();
    window.history.pushState(null, "", `${hrefPath || homePath}#${hash}`);
    setActiveSection(hash);
    target.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !open) return;
        setOpen(false);
        menuButtonRef.current?.focus();
      }}
    >
      <div className="header-shell">
        <Link className="brand-link" href={locale === "zh" ? "/" : "/en"} aria-label={copy.name}>
          <Image className="brand-logo" src="/picture/logo.webp" width={510} height={139} alt={copy.name} priority />
        </Link>

        <div className="stock-mark" aria-label={`${locale === "zh" ? "港股編號" : "Hong Kong stock code"} ${company.stockCode}`}>
          <span>HKEX</span>
          <strong>{company.stockCode}</strong>
        </div>

        <nav className="desktop-nav" aria-label={locale === "zh" ? "主要導覽" : "Primary navigation"}>
          {copy.nav.map(([label, href]) => (
            <Link key={href} href={href} aria-current={isCurrentPage(href) ? "page" : undefined} onClick={(event) => handleNavClick(event, href)}>{label}</Link>
          ))}
        </nav>

        <a className="language-link" href={languageHref} hrefLang={locale === "zh" ? "en" : "zh-Hant-HK"}>
          {copy.language}
        </a>

        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? (locale === "zh" ? "關閉選單" : "Close menu") : (locale === "zh" ? "開啟選單" : "Open menu")}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={24} weight="regular" aria-hidden="true" /> : <List size={24} weight="regular" aria-hidden="true" />}
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className="mobile-nav"
        data-open={open}
        hidden={!open}
        aria-label={locale === "zh" ? "流動版導覽" : "Mobile navigation"}
      >
        {copy.nav.map(([label, href]) => (
          <Link key={href} href={href} aria-current={isCurrentPage(href) ? "page" : undefined} onClick={(event) => handleNavClick(event, href)}>{label}</Link>
        ))}
        <a href={languageHref} hrefLang={locale === "zh" ? "en" : "zh-Hant-HK"}>{copy.language}</a>
      </nav>
    </header>
  );
}
