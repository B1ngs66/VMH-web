import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://vmh.com.hk/sitemap.xml",
    host: "https://vmh.com.hk",
  };
}
