"use client";

import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Locale } from "@/content/site";
import { publicPath } from "@/lib/site-path";

type ServiceStory = {
  slug: string;
  title: string;
  text: string;
};

type StoryMedia = {
  src: string;
  variant: "artwork" | "logo";
  theme: "mokenlogic" | "football" | "dolphinode";
  alt: Record<Locale, string>;
};

const storyMedia: Record<string, StoryMedia> = {
  "mokenlogic-harness": {
    src: "/picture/mokenlogic-harness.png",
    variant: "artwork",
    theme: "mokenlogic",
    alt: {
      zh: "MokenLogic 讓智慧持續學習品牌視覺",
      en: "MokenLogic continual-learning brand artwork",
    },
  },
  "greater-bay-area-hunan-football-team": {
    src: "/picture/greater-bay-area-hunan-football-team-logo.jpg",
    variant: "logo",
    theme: "football",
    alt: {
      zh: "大灣區湖南人足球隊中英文隊徽",
      en: "The Great Bay Hunanese Football Team bilingual crests",
    },
  },
  dolphinode: {
    src: "/picture/dolphinode-logo.png",
    variant: "logo",
    theme: "dolphinode",
    alt: {
      zh: "Dolphinode 海豚品牌標誌",
      en: "Dolphinode dolphin brand logo",
    },
  },
};

const dolphinodeProductLogos = [
  { src: "/picture/dolphinode/nodevault.jpg", name: "NodeVault" },
  { src: "/picture/dolphinode/whimland.jpg", name: "WhimLand" },
  { src: "/picture/dolphinode/whimpartner.jpg", name: "WhimPartner" },
] as const;

export function ServiceStories({
  services,
  locale,
  prefix,
  viewCase,
}: {
  services: readonly ServiceStory[];
  locale: Locale;
  prefix: string;
  viewCase: string;
}) {
  const storyRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const mobile = window.innerWidth <= 680;
      const headerHeight = mobile ? 68 : 76;
      const startScale = mobile ? 0.86 : 0.58;

      storyRefs.current.forEach((story) => {
        if (!story) return;

        const rect = story.getBoundingClientRect();
        const stageHeight = viewportHeight - headerHeight;
        const travel = Math.max(story.offsetHeight - stageHeight, 1);
        const progress = Math.min(Math.max((headerHeight - rect.top) / travel, 0), 1);
        const scale = startScale + ((1 - startScale) * progress);
        const nextOpacity = Math.min(Math.max((1 - progress) * 6, 0), 1);

        story.style.setProperty("--service-story-scale", scale.toFixed(4));
        story.style.setProperty("--service-story-radius", `${(6 * (1 - progress)).toFixed(2)}px`);
        story.style.setProperty("--service-story-next-opacity", nextOpacity.toFixed(3));
      });
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="service-story-list">
      {services.map((service, index) => {
        const media = storyMedia[service.slug];

        return (
          <article
          className={`service-story${media ? ` service-story--${media.variant} service-story--${media.theme}` : ""}`}
          key={service.title}
          ref={(node) => {
            storyRefs.current[index] = node;
          }}
        >
          <Link
            className="service-story-link"
            href={`${prefix}/projects/${service.slug}`}
            aria-label={`${viewCase}: ${service.title}`}
          >
            <div
              className="service-story-visual"
              role={media ? undefined : "img"}
              aria-label={media ? undefined : locale === "zh" ? `${service.title} 圖片佔位` : `Image placeholder for ${service.title}`}
            >
              {media?.variant === "artwork" ? (
                <>
                  <Image
                    className="service-story-image"
                    src={publicPath(media.src)}
                    alt={media.alt[locale]}
                    fill
                    sizes="100vw"
                  />
                  <span className="service-story-artwork-action">
                    {viewCase}<ArrowRight size={20} aria-hidden="true" />
                  </span>
                </>
              ) : media?.variant === "logo" ? (
                <>
                  <div className="service-story-logo-frame">
                    <Image
                      className="service-story-logo-image"
                      src={publicPath(media.src)}
                      alt={media.alt[locale]}
                      fill
                      sizes="(max-width: 680px) 82vw, 560px"
                    />
                  </div>
                  {media.theme === "dolphinode" ? (
                    <div className="service-story-product-logos" aria-label={locale === "zh" ? "Dolphinode 產品品牌" : "Dolphinode product brands"}>
                      {dolphinodeProductLogos.map((logo) => (
                        <span className="service-story-product-logo" key={logo.name}>
                          <Image src={publicPath(logo.src)} alt={logo.name} width={512} height={512} sizes="(max-width: 680px) 64px, 96px" />
                        </span>
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              )}
            </div>
            {media?.variant === "artwork" ? null : (
              <div className="service-story-copy">
                <span className="service-story-kicker">
                  {locale === "zh" ? `重點項目 ${String(index + 1).padStart(2, "0")}` : `Featured project ${String(index + 1).padStart(2, "0")}`}
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="service-story-action">{viewCase}<ArrowRight size={20} aria-hidden="true" /></span>
              </div>
            )}
            {index < services.length - 1 ? (
              <span className="service-story-next" aria-hidden="true"><ArrowDown size={20} /></span>
            ) : null}
          </Link>
          </article>
        );
      })}
    </div>
  );
}
