import type { LocalizedText, MediaAsset } from "./common";

export interface HeritageEvent {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  startsAt: string;
  endsAt: string;
  venue: LocalizedText;
  cover: MediaAsset;
  capacity: number;
  registered: number;
  isFree: boolean;
}
