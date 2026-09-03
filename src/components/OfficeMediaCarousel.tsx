"use client";

import { CaretLeft, CaretRight, Pause, Play } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/site";

const slides = [
  {
    src: "/picture/laliga-club-willian-mei-speech.jpg",
    alt: {
      zh: "梅惟一於西甲俱樂部活動上發表演講",
      en: "Willian Mei speaking at a LaLiga Club event",
    },
  },
  {
    src: "/picture/frameA_pic_inside.jpg",
    alt: {
      zh: "天機控股辦公空間品牌展示",
      en: "VM Holding branding displayed in its office",
    },
  },
  {
    src: "/picture/laliga-digital-alliance-signing.jpg",
    alt: {
      zh: "西甲俱樂部以球迷為中心的數字聯盟簽約儀式",
      en: "Signing ceremony for a fan-centred digital alliance with a LaLiga club",
    },
  },
  {
    src: "/picture/news/investment-potential-award-event.jpg",
    alt: {
      zh: "第十屆智通財經資本市場年會活動現場",
      en: "The 10th Zhitong Finance Capital Market Annual Conference event venue",
    },
  },
  {
    src: "/picture/cultural-tourism-digital-alliance-conference.jpg",
    alt: {
      zh: "亞洲及中國文化旅遊產業數字聯盟會議現場",
      en: "Digital alliance conference for the cultural and tourism industry in Asia and China",
    },
    fit: "contain",
  },
  {
    src: "/picture/cultural-tourism-exhibition-tour.jpg",
    alt: {
      zh: "嘉賓參觀文化旅遊主題展示",
      en: "Guests viewing a cultural and tourism exhibition",
    },
  },
] as const;

export function OfficeMediaCarousel({ locale }: { locale: Locale }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || isHovered || isFocusWithin || prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [isFocusWithin, isHovered, isPaused, prefersReducedMotion]);

  const showPrevious = () => setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  const showNext = () => setActiveSlide((current) => (current + 1) % slides.length);

  return (
    <figure
      className="office-media office-carousel"
      aria-label={locale === "zh" ? "天機控股活動圖片輪播" : "VM Holding activity image carousel"}
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsFocusWithin(false);
      }}
    >
      <div className="office-carousel-stage">
        {slides.map((slide, index) => (
          <div
            className={`office-carousel-slide${index === activeSlide ? " is-active" : ""}`}
            aria-hidden={index !== activeSlide}
            key={slide.src}
          >
            {"fit" in slide && slide.fit === "contain" ? (
              <Image
                className="office-carousel-backdrop"
                src={slide.src}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 980px) 100vw, 50vw"
              />
            ) : null}
            <Image
              className={`office-carousel-image${"fit" in slide && slide.fit === "contain" ? " office-carousel-image--contain" : ""}`}
              src={slide.src}
              alt={index === activeSlide ? slide.alt[locale] : ""}
              fill
              sizes="(max-width: 980px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      <div className="office-carousel-controls">
        <button type="button" onClick={showPrevious} aria-label={locale === "zh" ? "上一張圖片" : "Previous image"}>
          <CaretLeft size={19} aria-hidden="true" />
        </button>
        <span aria-live="polite">{activeSlide + 1} / {slides.length}</span>
        <button type="button" onClick={showNext} aria-label={locale === "zh" ? "下一張圖片" : "Next image"}>
          <CaretRight size={19} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setIsPaused((current) => !current)}
          aria-label={isPaused
            ? (locale === "zh" ? "播放圖片輪播" : "Play image carousel")
            : (locale === "zh" ? "暫停圖片輪播" : "Pause image carousel")}
          aria-pressed={isPaused}
        >
          {isPaused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
        </button>
      </div>
    </figure>
  );
}
