import { AppleLogo, ArrowLeft, ArrowUpRight, GooglePlayLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import type { Locale } from "@/content/site";
import { publicPath } from "@/lib/site-path";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { DouyinVideo } from "./DouyinVideo";

const dolphinodeApps = [
  {
    name: "Dolphinet",
    logo: "/picture/dolphinode/dolphinet.png",
    description: { zh: "L1 公有鏈與鏈上結算", en: "L1 public chain and on-chain settlement" },
    url: "https://chain.dolphinode.world/",
    featured: true,
  },
  {
    name: "NodeVault",
    logo: "/picture/dolphinode/nodevault.jpg",
    description: { zh: "錢包與資產入口", en: "Wallet and asset access" },
  },
  {
    name: "WhimLand",
    logo: "/picture/dolphinode/whimland.jpg",
    description: { zh: "用戶體驗與數字服務", en: "User experience and digital services" },
    url: "https://www.whim.land/",
  },
  {
    name: "WhimPartner",
    logo: "/picture/dolphinode/whimpartner.jpg",
    description: { zh: "商戶運營與權益核銷", en: "Merchant operations and benefit redemption" },
  },
] as const;

const dolphinodeVideos = [
  {
    src: "/video/dolphinode/dolphinode-update-01.mp4",
    type: "video/mp4",
    orientation: "portrait",
  },
  {
    src: "/video/dolphinode/dolphinode-whimland-festival.mp4",
    type: "video/mp4",
    orientation: "landscape",
  },
] as const;

const dolphinodeDownloads = [
  {
    name: "NodeVault",
    logo: "/picture/dolphinode/nodevault.jpg",
    stores: [
      { platform: "apple", label: "App Store", url: "https://apps.apple.com/us/app/nodevault/id6756870326" },
    ],
  },
  {
    name: "WhimLand",
    logo: "/picture/dolphinode/whimland.jpg",
    stores: [
      { platform: "apple", label: "App Store", url: "https://apps.apple.com/us/app/whimland/id6759475000" },
      { platform: "google", label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.whimland.app&pcampaignid=web_share" },
    ],
  },
  {
    name: "WhimPartner",
    logo: "/picture/dolphinode/whimpartner.jpg",
    stores: [
      { platform: "apple", label: "App Store", url: "https://apps.apple.com/us/app/whim-partner/id6759444532" },
      { platform: "google", label: "Google Play", url: "https://play.google.com/store/apps/details?id=land.whim.partner&pcampaignid=web_share" },
    ],
  },
] as const;

function DolphinodeEcosystem({ locale }: { locale: Locale }) {
  return (
    <aside className="dolphinode-ecosystem" aria-labelledby="dolphinode-ecosystem-title">
      <p id="dolphinode-ecosystem-title">
        {locale === "zh" ? "Dolphinode 生態應用" : "Dolphinode ecosystem applications"}
      </p>
      <div className="dolphinode-app-grid">
        {dolphinodeApps.map((app) => {
          const cardContent = (
            <>
            <div className="dolphinode-app-heading">
              <Image src={publicPath(app.logo)} width={56} height={56} alt="" aria-hidden="true" />
              <h2>{app.name}</h2>
              {"url" in app ? <ArrowUpRight size={17} aria-hidden="true" /> : null}
            </div>
            <p>{app.description[locale]}</p>
            </>
          );

          const cardClassName = `dolphinode-app-card${"featured" in app ? " dolphinode-app-card--featured" : ""}`;

          return "url" in app ? (
            <a
              className={cardClassName}
              href={app.url}
              key={app.name}
              target="_blank"
              rel="noreferrer"
              aria-label={`${app.name} — ${app.description[locale]}`}
            >
              {cardContent}
            </a>
          ) : (
            <article className={cardClassName} key={app.name}>
              {cardContent}
            </article>
          );
        })}
      </div>
    </aside>
  );
}

export function ProjectPage({ locale, project }: { locale: Locale; project: Project }) {
  const homeHref = locale === "zh" ? "/#services" : "/en#services";
  const isMokenlogicProject = project.slug === "mokenlogic-harness";
  const isFootballProject = project.slug === "greater-bay-area-hunan-football-team";
  const isDolphinodeProject = project.slug === "dolphinode";

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" lang={locale === "zh" ? "zh-Hant-HK" : "en"}>
        <header className={`project-hero${isFootballProject ? " project-hero--media" : ""}${isDolphinodeProject ? " project-hero--dolphinode" : ""}`}>
          <div className="project-hero-copy">
            <p className="page-kicker">{project.category}</p>
            <h1 className={isDolphinodeProject ? "dolphinode-title" : undefined}>
              {isDolphinodeProject ? (
                <Image
                  className="dolphinode-title-logo"
                  src={publicPath("/picture/dolphinode/dolphinode.png")}
                  width={96}
                  height={79}
                  alt=""
                  aria-hidden="true"
                  preload
                />
              ) : null}
              <span>{project.title}</span>
            </h1>
            <p>{project.summary}</p>
            {isFootballProject ? <p className="project-hero-lead">{project.lead}</p> : null}
            {isFootballProject ? (
              <Image
                className="football-team-logo"
                src={publicPath("/picture/greater-bay-area-hunan-football-team-logo.jpg")}
                width={448}
                height={232}
                alt={locale === "zh" ? "大灣區湖南人足球隊隊徽" : "Greater Bay Area Hunanese Football Team logo"}
              />
            ) : null}
          </div>
          {isFootballProject ? (
            <div className="project-social-media">
              <DouyinVideo locale={locale} />
              <div className="project-social-links">
                <a href="https://v.douyin.com/AekM-ncfkuw/" target="_blank" rel="noreferrer">
                  <span className="project-social-logo project-social-logo--douyin" style={{ backgroundImage: `url(${publicPath("/brands/douyin.svg")})` }} aria-hidden="true" />
                  <span>{locale === "zh" ? "大灣區湖南人隊抖音官號" : "Official Douyin account"}</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <a href="https://xhslink.cn/o/6ODdZP8LL1J" target="_blank" rel="noreferrer">
                  <span className="project-social-logo project-social-logo--xiaohongshu" style={{ backgroundImage: `url(${publicPath("/brands/xiaohongshu.svg")})` }} aria-hidden="true" />
                  <span>{locale === "zh" ? "大灣區湖南人足球隊小紅書" : "Xiaohongshu account"}</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
              <a className="project-video-fallback" href="https://v.douyin.com/B64ADI1mGpA/" target="_blank" rel="noreferrer">
                {locale === "zh" ? "無法播放？前往抖音觀看" : "Unable to play? Watch on Douyin"}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          ) : isDolphinodeProject ? (
            <DolphinodeEcosystem locale={locale} />
          ) : isMokenlogicProject ? (
            <div className="project-mark project-mark--mokenlogic">
              <Image
                src={publicPath("/picture/mokenlogic-harness-interface.png")}
                alt={locale === "zh" ? "MokenLogic Harness 產品介面" : "MokenLogic Harness product interface"}
                fill
                sizes="(max-width: 980px) 100vw, 36vw"
                preload
              />
            </div>
          ) : (
            <div className="project-mark" aria-hidden="true">
              <span>{project.mark}</span>
              <small>VMH / {project.slug.replaceAll("-", " ")}</small>
            </div>
          )}
        </header>

        <article className="project-content">
          {!isFootballProject ? <p className="project-lead">{project.lead}</p> : null}
          <div className="project-sections">
            {project.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <div>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>

          {isDolphinodeProject ? (
            <section className="project-related-media" aria-labelledby="project-related-media-title">
              <div className="project-related-media-heading">
                <p>{locale === "zh" ? "Dolphinode 動態" : "Dolphinode updates"}</p>
                <h2 id="project-related-media-title">{locale === "zh" ? "相關資訊" : "Related updates"}</h2>
              </div>
              <div className="project-related-video-grid">
                {dolphinodeVideos.map((video, index) => (
                  <article className={`project-related-video project-related-video--${video.orientation}`} key={video.src}>
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      aria-label={locale === "zh" ? `Dolphinode 相關影片 ${index + 1}` : `Dolphinode related video ${index + 1}`}
                    >
                      <source src={publicPath(video.src)} type={video.type} />
                      {locale === "zh" ? "您的瀏覽器不支援影片播放。" : "Your browser does not support video playback."}
                    </video>
                    <p>{locale === "zh" ? `相關影片 ${String(index + 1).padStart(2, "0")}` : `Related video ${String(index + 1).padStart(2, "0")}`}</p>
                  </article>
                ))}
              </div>
              <div className="project-app-downloads">
                <div className="project-app-downloads-heading">
                  <p>{locale === "zh" ? "生態應用" : "Ecosystem applications"}</p>
                  <h3>{locale === "zh" ? "App 下載" : "Download the apps"}</h3>
                </div>
                <div className="project-app-download-grid">
                  {dolphinodeDownloads.map((app) => (
                    <article className="project-app-download-card" key={app.name}>
                      <Image src={publicPath(app.logo)} width={104} height={104} alt={`${app.name} logo`} />
                      <h4>{app.name}</h4>
                      <div className="project-app-store-links">
                        {app.stores.map((store) => (
                          <a
                            className={`project-app-store-link project-app-store-link--${store.platform}`}
                            href={store.url}
                            key={store.platform}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${app.name} — ${store.label}`}
                          >
                            {store.platform === "apple"
                              ? <AppleLogo size={20} weight="fill" aria-hidden="true" />
                              : <GooglePlayLogo size={20} weight="fill" aria-hidden="true" />}
                            <span>{store.label}</span>
                            <ArrowUpRight size={15} aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <aside className="project-sources" aria-labelledby="project-sources-title">
            <h2 id="project-sources-title">{locale === "zh" ? "公開資料來源" : "Public sources"}</h2>
            <div>
              {project.sources.map((source) => (
                <a key={source.url} href={publicPath(source.url)} target="_blank" rel="noreferrer">
                  <span>{source.label}</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </aside>

          <Link className="secondary-action project-back" href={homeHref}>
            <ArrowLeft size={18} aria-hidden="true" />
            {locale === "zh" ? "返回業務範疇" : "Back to business scope"}
          </Link>
        </article>
      </main>
      <Footer locale={locale} />
    </>
  );
}
