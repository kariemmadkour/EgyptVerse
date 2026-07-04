import type { DigitalCollection } from "@/domain/entities";
import { mockImage } from "./media";

export const mockDigitalCollections: DigitalCollection[] = [
  {
    id: "dcol-01",
    slug: "the-nile-across-time",
    title: { ar: "النيل عبر الزمن", en: "The Nile Across Time", fr: "Le Nil à travers le temps" },
    theme: { ar: "الجغرافيا والحضارة", en: "Geography & Civilization", fr: "Géographie et civilisation" },
    narrative: {
      ar: "مجموعة تتتبع علاقة المصريين بنهر النيل عبر الخرائط والوثائق والقطع الأثرية.",
      en: "A collection tracing Egyptians' relationship with the Nile through maps, documents, and artifacts.",
      fr: "Une collection retraçant la relation des Égyptiens avec le Nil à travers cartes, documents et artefacts.",
    },
    cover: mockImage("nile-collection", 1400, 900),
    itemRefs: [
      { kind: "book", id: "book-08", slug: "nile-cartography-atlas", title: { ar: "أطلس رسم النيل", en: "Atlas of Nile Cartography", fr: "Atlas de la cartographie du Nil" }, thumbnail: mockImage("ref-nile-atlas", 600, 800) },
      { kind: "archivalRecord", id: "arc-02", slug: "aswan-dam-engineering-plans", title: { ar: "مخططات هندسية لخزان أسوان", en: "Aswan Dam Engineering Plans", fr: "Plans d'ingénierie du barrage d'Assouan" }, thumbnail: mockImage("ref-aswan-plans", 600, 800) },
    ],
  },
  {
    id: "dcol-02",
    slug: "sacred-gold-across-eras",
    title: { ar: "الذهب المقدس عبر العصور", en: "Sacred Gold Across the Eras", fr: "L'or sacré à travers les époques" },
    theme: { ar: "فنون وحرف", en: "Arts & Crafts", fr: "Arts et artisanat" },
    narrative: {
      ar: "استكشاف لرمزية الذهب من العصر الفرعوني إلى الفن الإسلامي.",
      en: "Exploring the symbolism of gold from the Pharaonic era to Islamic art.",
      fr: "Explorer le symbolisme de l'or de l'époque pharaonique à l'art islamique.",
    },
    cover: mockImage("gold-eras-collection", 1400, 900),
    itemRefs: [
      { kind: "museumObject", id: "obj-01", slug: "funerary-mask-priestess", title: { ar: "قناع جنائزي لكاهنة", en: "Funerary Mask of a Priestess", fr: "Masque funéraire d'une prêtresse" }, thumbnail: mockImage("ref-funerary-mask", 600, 800) },
      { kind: "museumObject", id: "obj-08", slug: "quranic-manuscript-illumination", title: { ar: "زخرفة مصحف مذهّب", en: "Illuminated Quranic Manuscript", fr: "Manuscrit coranique enluminé" }, thumbnail: mockImage("ref-quran-illum", 600, 800) },
    ],
  },
  {
    id: "dcol-03",
    slug: "scholars-and-decipherment",
    title: { ar: "العلماء وفك الرموز", en: "Scholars and Decipherment", fr: "Savants et déchiffrement" },
    theme: { ar: "تاريخ العلوم", en: "History of Science", fr: "Histoire des sciences" },
    narrative: {
      ar: "قصة الرحلة الفكرية التي قادت إلى فهم الحضارة المصرية القديمة.",
      en: "The story of the intellectual journey that led to understanding Ancient Egyptian civilization.",
      fr: "L'histoire du voyage intellectuel qui a mené à la compréhension de la civilisation égyptienne antique.",
    },
    cover: mockImage("decipherment-collection", 1400, 900),
    itemRefs: [
      { kind: "book", id: "book-04", slug: "rosetta-decipherment-journal", title: { ar: "يوميات فك رموز حجر رشيد", en: "Journal of the Rosetta Decipherment", fr: "Journal du déchiffrement de la pierre de Rosette" }, thumbnail: mockImage("ref-rosetta-journal", 600, 800) },
      { kind: "book", id: "book-02", slug: "description-de-egypte", title: { ar: "وصف مصر", en: "Description de l'Égypte", fr: "Description de l'Égypte" }, thumbnail: mockImage("ref-description-egypte", 600, 800) },
    ],
  },
];
