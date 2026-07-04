import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const staticPaths = [
  "",
  "/explore/library",
  "/explore/archives",
  "/explore/museum",
  "/explore/collections",
  "/experience/exhibitions",
  "/experience/timelines",
  "/experience/restoration-lab",
  "/engage/research",
  "/engage/learn",
  "/engage/events",
  "/engage/assistant",
  "/access/membership",
  "/access/reading-room",
  "/access/publications",
  "/search",
  "/about",
  "/visit",
  "/news",
  "/contact",
  "/accessibility",
  "/legal/privacy",
  "/legal/terms",
  "/sitemap",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://egypt-digital-heritage.vercel.app";

  return routing.locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
