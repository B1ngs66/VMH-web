import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/content/site";
import type { NewsItem } from "@/content/news";
import { publicPath } from "@/lib/site-path";

export function NewsList({ items, locale, compact = false }: { items: NewsItem[]; locale: Locale; compact?: boolean }) {
  const base = locale === "zh" ? "/news" : "/en/news";

  if (compact) {
    return (
      <div
        className="news-card-grid"
        role="region"
        aria-label={locale === "zh" ? "首頁精選企業新聞" : "Featured corporate news"}
      >
        {items.map((item, index) => (
          <article className={`news-card${index === 0 ? " news-card--featured" : ""}`} key={item.slug}>
            <Link className="news-card-link" href={`${base}/${item.slug}`} aria-label={`${locale === "zh" ? "閱讀" : "Read"}: ${item.title}`}>
              <div className="news-card-media">
                {item.imageUrl ? (
                  <Image
                    src={publicPath(item.imageUrl)}
                    alt={item.imageAlt ?? ""}
                    fill
                    sizes="(max-width: 680px) calc(100vw - 32px), (max-width: 980px) calc(100vw - 40px), 50vw"
                  />
                ) : (
                  <span role="img" aria-label={locale === "zh" ? `${item.title} 圖片佔位` : `Image placeholder for ${item.title}`} />
                )}
              </div>
              <div className="news-card-body">
                <h3>{item.title}</h3>
                <div className="news-card-meta">
                  <time dateTime={item.date}>{item.date}</time>
                  <span>{item.category}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="news-list">
      {items.map((item) => (
        <article className="news-row" key={item.slug}>
          <Link className="news-row-link" href={`${base}/${item.slug}`} aria-label={`${locale === "zh" ? "閱讀" : "Read"}: ${item.title}`}>
            <div className="news-meta">
              <time dateTime={item.date}>{item.date}</time>
              <span>{item.category}</span>
            </div>
            <div className="news-copy">
              <h2>{item.title}</h2>
              <p>{item.summary}</p>
            </div>
            <span className="row-action" aria-hidden="true">
              <ArrowRight size={21} />
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}
