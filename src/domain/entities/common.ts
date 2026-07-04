import type { Locale } from "@/i18n/routing";

/** Every user-facing string in the domain model is localized per-entity rather than
 * hardcoded, mirroring the UI's translation-file discipline for dynamic content. */
export type LocalizedText = Record<Locale, string>;

export interface MediaAsset {
  id: string;
  url: string;
  alt: LocalizedText;
  width: number;
  height: number;
  blurDataUrl?: string;
  credit?: LocalizedText;
}

export type EntityKind =
  | "book"
  | "archivalRecord"
  | "museumObject"
  | "exhibition"
  | "timelineEvent"
  | "publication"
  | "event"
  | "lesson";

export interface HeritageEntityRef {
  kind: EntityKind;
  id: string;
  slug: string;
  title: LocalizedText;
  thumbnail: MediaAsset;
}

export interface Era {
  id: string;
  slug: string;
  name: LocalizedText;
  startYear: number;
  endYear: number;
}

export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.en;
}
