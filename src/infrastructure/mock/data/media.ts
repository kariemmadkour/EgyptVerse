import type { LocalizedText, MediaAsset } from "@/domain/entities";

let counter = 0;

export function mockImage(
  seed: string,
  width = 1200,
  height = 800,
  alt: LocalizedText = { ar: "صورة توضيحية", en: "Representative image", fr: "Image représentative" },
): MediaAsset {
  counter += 1;
  return {
    id: `media-${seed}-${counter}`,
    url: `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`,
    alt,
    width,
    height,
  };
}
