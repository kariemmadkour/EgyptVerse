import type { LocalizedText, MediaAsset } from "./common";

export interface LibraryBook {
  id: string;
  slug: string;
  title: LocalizedText;
  author: LocalizedText;
  description: LocalizedText;
  subject: LocalizedText;
  language: "ar" | "en" | "fr" | "ota" | "cop";
  format: "manuscript" | "printed" | "periodical" | "map";
  era: string;
  year: number;
  pages: number;
  cover: MediaAsset;
  collectionSlugs: string[];
  callNumber: string;
  digitized: boolean;
}

export interface LibraryCollection {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  cover: MediaAsset;
  bookIds: string[];
}
