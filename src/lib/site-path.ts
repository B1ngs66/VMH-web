export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function publicPath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${basePath}${path}`;
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vmh.com.hk";
