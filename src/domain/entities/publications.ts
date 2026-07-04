import type { LocalizedText, MediaAsset } from "./common";

export interface Publication {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  authors: LocalizedText;
  journalSlug?: string;
  issueNumber?: number;
  year: number;
  cover: MediaAsset;
  pageCount: number;
  category: LocalizedText;
}

export interface Journal {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  cover: MediaAsset;
  publicationIds: string[];
  frequency: LocalizedText;
}
