import { existsSync, readFileSync } from "node:fs";
import { resolve, sep } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const publicRoot = resolve(projectRoot, "public");
const sources = [
  ["Chinese", "src/data/announcements.zh.json"],
  ["English", "src/data/announcements.en.json"],
];
const managedHtmlPages = new Map([
  ["form/2025121900810_c.htm.html", "原展示文件索引"],
  ["form-en/2025121900811.htm.html", "Original documents-on-display index"],
  ["form/tc.html", "文件已被移除"],
  ["form-en/en.html", "Document removed"],
]);

const errors = [];
let documentCount = 0;

for (const [label, relativePath] of sources) {
  const dataPath = resolve(projectRoot, relativePath);
  const items = JSON.parse(readFileSync(dataPath, "utf8"));
  const seen = new Set();

  for (const [index, item] of items.entries()) {
    documentCount += 1;
    const key = `${item.date}|${item.fileUrl}`;
    if (seen.has(key)) errors.push(`${label} entry ${index + 1}: duplicate ${key}`);
    seen.add(key);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date ?? "")) {
      errors.push(`${label} entry ${index + 1}: invalid date ${item.date ?? "<missing>"}`);
    }
    if (!item.title?.trim()) errors.push(`${label} entry ${index + 1}: missing title`);
    const lowerFileUrl = item.fileUrl?.toLowerCase() ?? "";
    const isPdf = lowerFileUrl.endsWith(".pdf");
    const isManagedHtml = lowerFileUrl.endsWith(".html") && managedHtmlPages.has(item.fileUrl);
    if (!isPdf && !isManagedHtml) {
      errors.push(`${label} entry ${index + 1}: unsupported filing asset ${item.fileUrl ?? "<missing>"}`);
      continue;
    }

    const filePath = resolve(publicRoot, item.fileUrl.replaceAll("/", sep));
    if (!filePath.startsWith(`${publicRoot}${sep}`)) {
      errors.push(`${label} entry ${index + 1}: fileUrl escapes public directory`);
    } else if (!existsSync(filePath)) {
      errors.push(`${label} entry ${index + 1}: missing ${item.fileUrl}`);
    } else {
      const bytes = readFileSync(filePath);
      if (isPdf && bytes.subarray(0, 5).toString("ascii") !== "%PDF-") {
        errors.push(`${label} entry ${index + 1}: ${item.fileUrl} is not a valid PDF`);
      }
      if (isManagedHtml) {
        const html = bytes.toString("utf8");
        const expectedText = managedHtmlPages.get(item.fileUrl);
        if (!/^<!doctype html>/i.test(html.trimStart()) || !html.includes(expectedText)) {
          errors.push(`${label} entry ${index + 1}: invalid managed HTML page ${item.fileUrl}`);
        }
      }
    }
  }
}

const newsSources = [
  ["Chinese news", "src/data/news.zh.json"],
  ["English news", "src/data/news.en.json"],
];
const newsByLanguage = [];

for (const [label, relativePath] of newsSources) {
  const items = JSON.parse(readFileSync(resolve(projectRoot, relativePath), "utf8"));
  const slugs = new Set();
  const legacyIds = new Set();
  newsByLanguage.push(items);

  for (const [index, item] of items.entries()) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug ?? "")) {
      errors.push(`${label} entry ${index + 1}: invalid slug ${item.slug ?? "<missing>"}`);
    } else if (slugs.has(item.slug)) {
      errors.push(`${label} entry ${index + 1}: duplicate slug ${item.slug}`);
    }
    slugs.add(item.slug);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date ?? "")) {
      errors.push(`${label} entry ${index + 1}: invalid date ${item.date ?? "<missing>"}`);
    }
    if (!item.title?.trim() || !item.summary?.trim() || !item.category?.trim()) {
      errors.push(`${label} entry ${index + 1}: incomplete news metadata`);
    }
    if (!Array.isArray(item.paragraphs) || item.paragraphs.length === 0 || item.paragraphs.some((paragraph) => !paragraph.trim())) {
      errors.push(`${label} entry ${index + 1}: paragraphs must contain text`);
    }

    if (item.legacyId !== undefined) {
      if (!Number.isInteger(item.legacyId) || legacyIds.has(item.legacyId)) {
        errors.push(`${label} entry ${index + 1}: invalid or duplicate legacyId ${item.legacyId}`);
      }
      legacyIds.add(item.legacyId);
    }

    for (const assetKey of ["imageUrl", "bodyImageUrl"]) {
      if (!item[assetKey]) continue;
      const assetPath = resolve(publicRoot, item[assetKey].replace(/^\//, "").replaceAll("/", sep));
      if (!assetPath.startsWith(`${publicRoot}${sep}`) || !existsSync(assetPath)) {
        errors.push(`${label} entry ${index + 1}: missing ${item[assetKey]}`);
      }
    }
  }
}

const [zhNews, enNews] = newsByLanguage;
if (zhNews.map((item) => item.slug).join("|") !== enNews.map((item) => item.slug).join("|")) {
  errors.push("Chinese and English news slugs are not aligned");
}

const legacyRedirect = readFileSync(resolve(publicRoot, "news-detail.html"), "utf8");
for (const item of zhNews.filter((entry) => entry.legacyId !== undefined)) {
  if (!legacyRedirect.includes(`"${item.legacyId}": "/news/${item.slug}/"`)) {
    errors.push(`Missing legacy redirect for news id ${item.legacyId}`);
  }
}

if (errors.length) {
  console.error(`Content validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Content validation passed: ${documentCount} filing records, managed filing pages and bilingual news assets are present.`);
}
