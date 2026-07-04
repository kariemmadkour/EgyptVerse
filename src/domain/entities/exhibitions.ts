import type { LocalizedText, MediaAsset } from "./common";

export interface ExhibitionChapter {
  id: string;
  heading: LocalizedText;
  body: LocalizedText;
  media: MediaAsset;
}

export interface Exhibition {
  id: string;
  slug: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  cover: MediaAsset;
  heroVideo?: string;
  status: "current" | "upcoming" | "past";
  startDate: string;
  endDate: string;
  chapters: ExhibitionChapter[];
}
