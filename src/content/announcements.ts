import zhData from "@/data/announcements.zh.json";
import enData from "@/data/announcements.en.json";
import type { Locale } from "./site";

export type Announcement = {
  date: string;
  title: string;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  stock_code: string;
  stock_name: string;
  type: string;
  companyInfo: string;
  category: string;
};

export function getAnnouncements(locale: Locale): Announcement[] {
  const items = (locale === "zh" ? zhData : enData) as Announcement[];
  if (locale === "en") return items;

  const categoryLabels: Record<string, string> = {
    "财务报表/环境、社会及管治资料": "財務報表／環境、社會及管治資料",
    "公告及通函": "公告及通函",
    "其他": "其他",
  };
  return items.map((item) => ({ ...item, category: categoryLabels[item.category] ?? item.category }));
}

export function publicFileUrl(item: Announcement): string {
  return `/${item.fileUrl.replace(/^\//, "")}`;
}
