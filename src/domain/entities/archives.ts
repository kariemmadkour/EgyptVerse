import type { LocalizedText, MediaAsset } from "./common";

export interface ArchivalRecord {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  recordType: LocalizedText;
  dateRange: string;
  provenance: LocalizedText;
  accessLevel: "public" | "reading-room" | "restricted";
  fondsSlug: string;
  thumbnail: MediaAsset;
  referenceCode: string;
}

export interface ArchivalFonds {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  custodialHistory: LocalizedText;
  cover: MediaAsset;
  recordIds: string[];
}
