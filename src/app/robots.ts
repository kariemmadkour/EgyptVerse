import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/access/membership/account", "/access/reading-room/session"],
    },
    sitemap: "https://egypt-digital-heritage.vercel.app/sitemap.xml",
  };
}
