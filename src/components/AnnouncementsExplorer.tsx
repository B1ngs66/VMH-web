"use client";

import { ArrowSquareOut, DownloadSimple, MagnifyingGlass } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import type { Announcement } from "@/content/announcements";
import { publicFileUrl } from "@/content/announcements";
import type { Locale } from "@/content/site";

export function AnnouncementsExplorer({ items, locale }: { items: Announcement[]; locale: Locale }) {
  const allLabel = locale === "zh" ? "全部" : "All";
  const [category, setCategory] = useState(allLabel);
  const [query, setQuery] = useState("");
  const categories = useMemo(() => [allLabel, ...Array.from(new Set(items.map((item) => item.category)))], [allLabel, items]);
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return items.filter((item) => {
      const categoryMatch = category === allLabel || item.category === category;
      const queryMatch = !term || `${item.title} ${item.date} ${item.type}`.toLocaleLowerCase().includes(term);
      return categoryMatch && queryMatch;
    });
  }, [allLabel, category, items, query]);

  return (
    <div className="filing-explorer">
      <div className="filing-controls">
        <div className="category-tabs" role="group" aria-label={locale === "zh" ? "公告類別" : "Filing categories"}>
          {categories.map((label) => (
            <button
              key={label}
              type="button"
              data-active={category === label}
              aria-pressed={category === label}
              onClick={() => setCategory(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="search-field">
          <span className="sr-only">{locale === "zh" ? "搜尋公告" : "Search filings"}</span>
          <MagnifyingGlass size={19} aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={locale === "zh" ? "搜尋標題或日期" : "Search title or date"} />
        </label>
      </div>

      <p className="result-count" aria-live="polite">
        {locale === "zh"
          ? `共 ${filtered.length} 份文件`
          : `${filtered.length} ${filtered.length === 1 ? "document" : "documents"}`}
      </p>

      <div className="filing-list">
        {filtered.map((item) => {
          const isPdf = item.fileUrl.toLowerCase().endsWith(".pdf");
          const action = isPdf
            ? (locale === "zh" ? "下載" : "Download")
            : (locale === "zh" ? "開啟" : "Open");
          return (
            <article className="filing-row" key={`${item.fileName}-${item.date}`}>
              <time dateTime={item.date}>{item.date}</time>
              <div>
                <p className="filing-category">{item.category}</p>
                <h2>{item.title}</h2>
                <p className="filing-size">{isPdf ? `PDF / ${item.fileSize}` : "HTML"}</p>
              </div>
              <a href={publicFileUrl(item)} target="_blank" rel="noreferrer" aria-label={`${action}: ${item.title}`}>
                {isPdf ? <DownloadSimple size={20} aria-hidden="true" /> : <ArrowSquareOut size={20} aria-hidden="true" />}
                <span>{action}</span>
              </a>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <h2>{locale === "zh" ? "沒有符合條件的公告" : "No matching filings"}</h2>
          <p>{locale === "zh" ? "請嘗試其他關鍵字或切換公告類別。" : "Try another keyword or select a different category."}</p>
        </div>
      )}
    </div>
  );
}
