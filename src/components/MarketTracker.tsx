"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import marketData from "@/content/market-data.json";
import type { Locale } from "@/content/site";
import { publicPath } from "@/lib/site-path";

type BundledMarkets = typeof marketData.markets;
type MarketSymbol = keyof BundledMarkets;
type HistoricalMarket = BundledMarkets[MarketSymbol];

type Market = {
  symbol: MarketSymbol;
  code: string;
  exchange: string;
  timezone: string;
  name: Record<Locale, string>;
};

type LiveQuote = {
  price: number;
  previousClose: number;
  percentage: number;
  open: number;
  high: number;
  low: number;
  time: string;
  updatedAt: string;
};

type LiveQuotes = Partial<Record<MarketSymbol, LiveQuote>>;

const LIVE_QUOTES_URL =
  "https://qt.gtimg.cn/q=r_hk01520,r_hkHSI,usIXIC,sh000300,sh000001";

const symbolsByQuoteCode: Record<string, MarketSymbol> = {
  "01520": "HKEX:1520",
  HSI: "TVC:HSI",
  ".IXIC": "NASDAQ:IXIC",
  "000300": "SSE:000300",
  "000001": "SSE:000001",
};

const markets: Market[] = [
  { symbol: "HKEX:1520", code: "01520", exchange: "HK", timezone: "HKT", name: { zh: "天機控股", en: "Tianji Holdings" } },
  { symbol: "TVC:HSI", code: "HSI", exchange: "HK", timezone: "HKT", name: { zh: "恒生指數", en: "Hang Seng Index" } },
  { symbol: "NASDAQ:IXIC", code: "IXIC", exchange: "NASDAQ", timezone: "ET", name: { zh: "納斯達克綜合指數", en: "Nasdaq Composite" } },
  { symbol: "SSE:000300", code: "000300", exchange: "SH", timezone: "CST", name: { zh: "滬深300", en: "CSI 300" } },
  { symbol: "SSE:000001", code: "000001", exchange: "SH", timezone: "CST", name: { zh: "上證指數", en: "SSE Composite" } },
];

function parseLiveQuotes(payload: string): LiveQuotes {
  const quotes: LiveQuotes = {};

  for (const match of payload.matchAll(/v_[^=]+="([^"]*)"/g)) {
    const fields = match[1].split("~");
    const symbol = symbolsByQuoteCode[fields[2]];
    const price = Number(fields[3]);
    const previousClose = Number(fields[4]);
    const open = Number(fields[5]);
    const percentage = Number(fields[32]);
    const high = Number(fields[33]);
    const low = Number(fields[34]);

    if (!symbol || ![price, previousClose, open, percentage, high, low].every(Number.isFinite)) continue;

    quotes[symbol] = {
      price,
      previousClose,
      percentage,
      open,
      high,
      low,
      time: fields[30]?.slice(0, 8) ?? "",
      updatedAt: fields[30] ?? "",
    };
  }

  return quotes;
}

function quoteTime(value: string | undefined, fallback: string, timezone: string) {
  if (value && /^\d{12,14}$/.test(value)) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)} ${value.slice(8, 10)}:${value.slice(10, 12)} (${timezone})`;
  }

  const date = new Date(fallback);
  const formatted = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Hong_Kong",
  }).format(date).replace(",", "");

  return `${formatted} (HKT)`;
}

function marketSnapshot(data: HistoricalMarket, locale: Locale, market: Market, liveQuote?: LiveQuote) {
  const latest = data.points.at(-1)!;
  const previous = data.points.at(-2)!;
  const price = liveQuote?.price ?? latest.close;
  const previousClose = liveQuote?.previousClose ?? previous.close;
  const change = price - previousClose;
  const direction = change > 0 ? "up" : change < 0 ? "down" : "flat";
  const formatter = new Intl.NumberFormat(locale === "zh" ? "zh-HK" : "en-HK", {
    minimumFractionDigits: data.priceHint,
    maximumFractionDigits: data.priceHint,
  });

  return {
    price: formatter.format(price),
    change: `${change > 0 ? "+" : ""}${formatter.format(change)}`,
    direction,
    arrow: direction === "up" ? "▲" : direction === "down" ? "▼" : "",
    unit: market.symbol === "HKEX:1520" ? data.currency : locale === "zh" ? "點" : "PTS",
    time: quoteTime(liveQuote?.updatedAt, marketData.generatedAt, market.timezone),
  };
}

export function MarketTracker({ locale }: { locale: Locale }) {
  const [liveQuotes, setLiveQuotes] = useState<LiveQuotes>({});
  const [liveStatus, setLiveStatus] = useState<"loading" | "live" | "fallback">("loading");

  useEffect(() => {
    let controller = new AbortController();

    const updateQuotes = async () => {
      controller.abort();
      controller = new AbortController();

      try {
        const response = await fetch(LIVE_QUOTES_URL, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Quote request failed: ${response.status}`);

        const buffer = await response.arrayBuffer();
        const quotes = parseLiveQuotes(new TextDecoder("gbk").decode(buffer));
        if (Object.keys(quotes).length !== markets.length) throw new Error("Incomplete quote response");

        setLiveQuotes(quotes);
        setLiveStatus("live");
      } catch (error) {
        if ((error as Error).name !== "AbortError") setLiveStatus("fallback");
      }
    };

    void updateQuotes();
    const refreshTimer = window.setInterval(updateQuotes, 60_000);

    return () => {
      controller.abort();
      window.clearInterval(refreshTimer);
    };
  }, []);

  const copy = locale === "zh"
    ? {
        title: "市場行情",
        subtitle: "即時掌握主要市場脈動",
        live: "頁面開啟時更新，每 60 秒刷新",
        connecting: "正在連接最新行情",
        fallback: "暫時顯示最近快照",
        delay: "數據延遲至少 15 分鐘",
        source: "來源 © 騰訊證券",
      }
    : {
        title: "Market watch",
        subtitle: "Stay connected to major global markets",
        live: "Updates on entry and refreshes every 60 seconds",
        connecting: "Connecting to the latest quotes",
        fallback: "Showing the latest saved snapshot",
        delay: "Data delayed by at least 15 minutes",
        source: "Source © Tencent Securities",
      };

  return (
    <section
      className="market-tracker"
      aria-labelledby="market-tracker-title"
      style={{ "--market-background": `url(${publicPath("/picture/frameA_pic.jpg")})` } as React.CSSProperties}
    >
      <div className="market-tracker-topbar">
        <Image className="market-tracker-logo" src={publicPath("/picture/logo.svg")} width={1050} height={287} alt={locale === "zh" ? "天機控股" : "VM Holding"} />
        <p data-status={liveStatus} aria-live="polite">
          {liveStatus === "live" ? copy.live : liveStatus === "loading" ? copy.connecting : copy.fallback}
        </p>
      </div>
      <div className="market-tracker-title-row">
        <h3 id="market-tracker-title">{copy.title}</h3>
        <p>{copy.subtitle}</p>
      </div>

      <div className="market-quote-layout">
        {markets.map((market, index) => {
          const snapshot = marketSnapshot(marketData.markets[market.symbol], locale, market, liveQuotes[market.symbol]);

          return (
            <article className={index === 0 ? "market-quote-card market-quote-card--primary" : "market-quote-card"} key={market.symbol}>
              <div className="market-quote-heading">
                <h4>{market.name[locale]}</h4>
                <p>({market.exchange}: {market.code})</p>
              </div>
              <time>{snapshot.time}</time>
              <p className="market-quote-price">
                <strong>{snapshot.price}</strong>
                <span>{snapshot.unit}</span>
              </p>
              <p className="market-quote-change" data-direction={snapshot.direction}>
                {snapshot.change} <span aria-hidden="true">{snapshot.arrow}</span>
              </p>
              <footer>
                <p>{copy.delay}</p>
                <p>{copy.source}</p>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
}
