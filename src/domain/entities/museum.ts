import type { LocalizedText, MediaAsset } from "./common";

export interface MuseumObject {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  period: LocalizedText;
  material: LocalizedText;
  dimensions: string;
  gallerySlug: string;
  images: MediaAsset[];
  has3dModel: boolean;
  featured: boolean;
}

export interface MuseumGallery {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  cover: MediaAsset;
  objectIds: string[];
}
