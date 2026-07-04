import type { HeritageEntityRef, LocalizedText, MediaAsset } from "./common";

export interface DigitalCollection {
  id: string;
  slug: string;
  title: LocalizedText;
  narrative: LocalizedText;
  cover: MediaAsset;
  itemRefs: HeritageEntityRef[];
  theme: LocalizedText;
}
