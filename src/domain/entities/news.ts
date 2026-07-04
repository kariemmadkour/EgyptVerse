import type { LocalizedText, MediaAsset } from "./common";

export interface NewsArticle {
  id: string;
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: LocalizedText;
  publishedAt: string;
  cover: MediaAsset;
  category: LocalizedText;
}
