import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const outputPath = resolve("src/content/market-data.json");
const symbols = [
  { id: "HKEX:1520", query: "hk01520", priceHint: 3 },
  { id: "TVC:HSI", query: "hkHSI", priceHint: 2 },
  { id: "NASDAQ:IXIC", query: "usIXIC", priceHint: 2 },
  { id: "SSE:000300", query: "sh000300", priceHint: 2 },
  { id: "SSE:000001", query: "sh000001", priceHint: 2 },
];

async function readExistingData() {
  try {
    return JSON.parse(await readFile(outputPath, "utf8"));
  } catch {
    return { generatedAt: null, markets: {} };
  }
}

async function fetchMarket({ id, query, priceHint }) {
  const url = new URL("https://web.ifzq.gtimg.cn/appstock/app/kline/kline");
  url.searchParams.set("param", `${query},day,,,320`);

  const response = await fetch(url, {
    headers: { "User-Agent": "VMH-Market-Data/1.0" },
  });

  if (!response.ok) {
    throw new Error(`${id}: Tencent Securities returned ${response.status}`);
  }

  const payload = await response.json();
  const result = Object.values(payload.data ?? {})[0];
  const sessions = result?.day;

  if (!Array.isArray(sessions)) {
    throw new Error(`${id}: no K-line data returned`);
  }

  const points = sessions.flatMap((session) => {
    const [time, open, close, high, low] = session;
    const values = [open, high, low, close].map(Number);

    if (!time || !values.every(Number.isFinite)) return [];

    return [{
      time,
      open: values[0],
      high: values[1],
      low: values[2],
      close: values[3],
    }];
  });

  if (points.length < 2) {
    throw new Error(`${id}: insufficient K-line data returned`);
  }

  return { currency: id === "HKEX:1520" || id === "TVC:HSI" ? "HKD" : "", priceHint, points };
}

const existing = await readExistingData();
const markets = { ...existing.markets };
const results = await Promise.allSettled(symbols.map(fetchMarket));

results.forEach((result, index) => {
  const symbol = symbols[index];

  if (result.status === "fulfilled") {
    markets[symbol.id] = result.value;
    console.log(`Updated ${symbol.id}: ${result.value.points.length} sessions`);
    return;
  }

  if (!markets[symbol.id]) throw result.reason;
  console.warn(`Keeping cached ${symbol.id}: ${result.reason.message}`);
});

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), markets }, null, 2)}\n`);
console.log(`Market data written to ${outputPath}`);
