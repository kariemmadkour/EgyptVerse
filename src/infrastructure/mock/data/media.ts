import type { LocalizedText, MediaAsset } from "@/domain/entities";

let counter = 0;

/**
 * Curated, real, freely-licensed photography (credits in public/images/CREDITS.json)
 * replacing the placeholder picsum feed. One folder per design language so imagery
 * matches the era/section it illustrates — see docs/04-design-system.md.
 */
type ImageCategory = "pharaonic" | "islamic" | "greco-roman" | "modern" | "general";

const CATEGORY_IMAGES: Record<ImageCategory, string[]> = {
  pharaonic: [
    "/images/pharaonic/abu-simbel.jpg",
    "/images/pharaonic/giza-pyramids.jpg",
    "/images/pharaonic/gold-funerary-jewelry.jpg",
    "/images/pharaonic/great-sphinx.jpg",
    "/images/pharaonic/hieroglyph-relief.jpg",
    "/images/pharaonic/karnak-columns.jpg",
    "/images/pharaonic/nefertiti-bust.jpg",
    "/images/pharaonic/papyrus-scroll.jpg",
    "/images/pharaonic/scarab-amulet.jpg",
    "/images/pharaonic/valley-of-the-kings.jpg",
  ],
  islamic: [
    "/images/islamic/al-azhar-mosque.jpg",
    "/images/islamic/astrolabe.jpg",
    "/images/islamic/cairo-citadel.jpg",
    "/images/islamic/cairo-minarets-skyline.jpg",
    "/images/islamic/ibn-tulun-mosque.jpg",
    "/images/islamic/islamic-geometric-pattern.jpg",
    "/images/islamic/khan-el-khalili.jpg",
    "/images/islamic/mashrabiya-window.jpg",
    "/images/islamic/quran-illumination.jpg",
    "/images/islamic/sultan-hassan-mosque.jpg",
  ],
  "greco-roman": [
    "/images/greco-roman/bibliotheca-alexandrina.jpg",
    "/images/greco-roman/coptic-manuscript.jpg",
    "/images/greco-roman/kom-el-shoqafa-catacombs.jpg",
    "/images/greco-roman/pompeys-pillar.jpg",
    "/images/greco-roman/qaitbay-citadel.jpg",
    "/images/greco-roman/roman-amphitheatre-alexandria.jpg",
  ],
  modern: [
    "/images/modern/egyptian-national-library.jpg",
    "/images/modern/historic-cairo-street.jpg",
    "/images/modern/khedivial-cairo.jpg",
    "/images/modern/suez-canal.jpg",
  ],
  general: [
    "/images/general/nile-river.jpg",
    "/images/general/egyptian-desert.jpg",
    "/images/general/library-reading-room.jpg",
    "/images/general/conservation-lab.jpg",
  ],
};

/** Explicit seed → design-language mapping, covering every mockImage() call site. */
const SEED_CATEGORY: Record<string, ImageCategory> = {
  // Pharaonic
  "cartouche-relief-1": "pharaonic",
  "decipherment-collection": "pharaonic",
  "egyptology-collection": "pharaonic",
  "egyptology-path": "pharaonic",
  "funerary-mask-1": "pharaonic",
  "funerary-mask-2": "pharaonic",
  "gold-afterlife": "pharaonic",
  "gold-craft": "pharaonic",
  "gold-eras-collection": "pharaonic",
  "gold-origins": "pharaonic",
  "gold-pharaohs-cover": "pharaonic",
  "great-pyramid": "pharaonic",
  "lecture-decipherment": "pharaonic",
  "lesson-daily-life": "pharaonic",
  "lesson-hieroglyphs": "pharaonic",
  "lesson-mythology": "pharaonic",
  "lesson-pyramids": "pharaonic",
  "mask-after": "pharaonic",
  "mask-before": "pharaonic",
  "mask-restoration-cover": "pharaonic",
  "nile-civilization-cover": "pharaonic",
  "papyrus-1": "pharaonic",
  "papyrus-after": "pharaonic",
  "papyrus-before": "pharaonic",
  "papyrus-restoration-cover": "pharaonic",
  "pharaonic-era": "pharaonic",
  "pharaonic-gallery": "pharaonic",
  "ref-funerary-mask": "pharaonic",
  "rosetta-decree": "pharaonic",
  "rosetta-journal": "pharaonic",
  "ref-rosetta-journal": "pharaonic",
  "scarab-1": "pharaonic",
  unification: "pharaonic",
  "annals-egyptology": "pharaonic",
  "curators-tour": "pharaonic",
  "family-day": "pharaonic",
  "kids-workshop": "pharaonic",
  "news-gold-exhibition": "pharaonic",
  "tutankhamun": "pharaonic",

  // Islamic
  "al-jabr": "islamic",
  "alf-layla": "islamic",
  "astrolabe-1": "islamic",
  "binding-after": "islamic",
  "binding-before": "islamic",
  "binding-restoration-cover": "islamic",
  "classical-arabic-collection": "islamic",
  "fatimid-cairo": "islamic",
  "islamic-catalog": "islamic",
  "islamic-conquest": "islamic",
  "islamic-era": "islamic",
  "islamic-gallery": "islamic",
  "ink-gold": "islamic",
  "kalila-wa-dimna": "islamic",
  "mamluk-era": "islamic",
  "manuscripts-cover": "islamic",
  "mosque-lamp-1": "islamic",
  muqaddimah: "islamic",
  mutanabbi: "islamic",
  "ottoman-firman": "islamic",
  "ottoman-tile-1": "islamic",
  "quran-illumination-1": "islamic",
  "ref-quran-illum": "islamic",
  "textile-after": "islamic",
  "textile-before": "islamic",
  "textile-restoration-cover": "islamic",

  // Greco-Roman / Coptic
  "alexandria-port": "greco-roman",
  "coptic-psalter": "greco-roman",
  "coptic-studies": "greco-roman",
  "nile-symposium": "greco-roman",

  // Modern / colonial
  "1919-correspondence": "modern",
  "al-ahram": "modern",
  "annals-vol-12": "modern",
  "annals-vol-13": "modern",
  "aswan-plans": "modern",
  "ref-aswan-plans": "modern",
  "cairo-early-photo": "modern",
  "cairo-lenses-cover": "modern",
  "cairo-modern-photo": "modern",
  "description-egypte": "modern",
  "description-publication": "modern",
  "ref-description-egypte": "modern",
  "education-decree": "modern",
  "egyptian-cinema": "modern",
  "khedivial-fonds": "modern",
  "modern-era": "modern",
  "national-movement-fonds": "modern",
  "national-movement-photos": "modern",
  "public-works-fonds": "modern",
  "republic-1953": "modern",
  "revolution-1919": "modern",
  "royal-cairo-map": "modern",
  "suez-deed": "modern",
  "suez-opening": "modern",
  "tramway-charter": "modern",

  // General / neutral
  "archive-guide": "general",
  "conservation-issue-4": "general",
  "conservation-path": "general",
  "conservation-review": "general",
  "lesson-climate": "general",
  "lesson-digital": "general",
  "lesson-handling": "general",
  "lesson-materials": "general",
  "news-annals-13": "general",
  "news-membership": "general",
  "news-reading-room": "general",
  "news-restoration-day": "general",
  "news-schools": "general",
  "nile-atlas": "general",
  "nile-collection": "general",
  "nile-flood": "general",
  "ref-nile-atlas": "general",
  "restoration-open-day": "general",
};

function categoryFor(seed: string): ImageCategory {
  return SEED_CATEGORY[seed] ?? "general";
}

/** Deterministic pseudo-hash so a given seed always resolves to the same image. */
function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function mockImage(
  seed: string,
  width = 1200,
  height = 800,
  alt: LocalizedText = { ar: "صورة توضيحية", en: "Representative image", fr: "Image représentative" },
): MediaAsset {
  counter += 1;
  const images = CATEGORY_IMAGES[categoryFor(seed)];
  const url = images[hashSeed(seed) % images.length];
  return {
    id: `media-${seed}-${counter}`,
    url,
    alt,
    width,
    height,
  };
}
