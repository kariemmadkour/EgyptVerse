import type { LocalizedText, MediaAsset } from "./common";

export interface RestorationCaseStudy {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  cover: MediaAsset;
  beforeImage: MediaAsset;
  afterImage: MediaAsset;
  technique: LocalizedText;
  durationWeeks: number;
  conservator: LocalizedText;
}
