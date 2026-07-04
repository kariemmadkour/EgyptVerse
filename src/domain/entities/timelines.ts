import type { LocalizedText, MediaAsset } from "./common";

export interface TimelineEvent {
  id: string;
  year: number;
  yearLabel: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  media: MediaAsset;
  relatedEntityIds: string[];
}

export interface TimelineEra {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  startYear: number;
  endYear: number;
  cover: MediaAsset;
  events: TimelineEvent[];
}
