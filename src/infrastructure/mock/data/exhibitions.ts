import type { Exhibition } from "@/domain/entities";
import { mockImage } from "./media";

export const mockExhibitions: Exhibition[] = [
  {
    id: "exh-01",
    slug: "gold-of-the-pharaohs",
    title: { ar: "ذهب الفراعنة", en: "Gold of the Pharaohs", fr: "L'or des pharaons" },
    subtitle: {
      ar: "رحلة عبر أروع القطع الذهبية في تاريخ مصر القديمة",
      en: "A journey through Ancient Egypt's most exquisite golden treasures",
      fr: "Un voyage à travers les plus beaux trésors dorés de l'Égypte antique",
    },
    cover: mockImage("gold-pharaohs-cover", 1800, 1000),
    status: "current",
    startDate: "2026-03-01",
    endDate: "2026-09-30",
    chapters: [
      {
        id: "ch-1",
        heading: { ar: "أصول الذهب المقدس", en: "Origins of Sacred Gold", fr: "Origines de l'or sacré" },
        body: {
          ar: "اعتبر المصريون القدماء الذهب لحم الآلهة، فاستخرجوه من مناجم الصحراء الشرقية وحوّلوه إلى رموز خلود.",
          en: "Ancient Egyptians regarded gold as the flesh of the gods, mining it from the Eastern Desert and transforming it into symbols of eternity.",
          fr: "Les Égyptiens antiques considéraient l'or comme la chair des dieux, l'extrayant du désert oriental pour en faire des symboles d'éternité.",
        },
        media: mockImage("gold-origins", 1600, 900),
      },
      {
        id: "ch-2",
        heading: { ar: "حرفية لا تضاهى", en: "Unrivaled Craftsmanship", fr: "Un savoir-faire inégalé" },
        body: {
          ar: "استخدم الصاغة المصريون تقنيات الطرق والتلبيس والترصيع لصياغة قطع لا تزال تبهر العالم.",
          en: "Egyptian goldsmiths used hammering, gilding, and inlay techniques to craft pieces that still astonish the world.",
          fr: "Les orfèvres égyptiens utilisaient le martelage, la dorure et l'incrustation pour créer des pièces qui émerveillent encore le monde.",
        },
        media: mockImage("gold-craft", 1600, 900),
      },
      {
        id: "ch-3",
        heading: { ar: "الذهب في الحياة الآخرة", en: "Gold in the Afterlife", fr: "L'or dans l'au-delà" },
        body: {
          ar: "رافق الذهب الملوك والكهنة إلى مقابرهم بوصفه ضمانًا لرحلة أبدية آمنة.",
          en: "Gold accompanied kings and priests into their tombs as a guarantee of a safe eternal journey.",
          fr: "L'or accompagnait rois et prêtres dans leurs tombes comme garantie d'un voyage éternel en sécurité.",
        },
        media: mockImage("gold-afterlife", 1600, 900),
      },
    ],
  },
  {
    id: "exh-02",
    slug: "cairo-through-lenses",
    title: { ar: "القاهرة عبر العدسات", en: "Cairo Through Lenses", fr: "Le Caire à travers les objectifs" },
    subtitle: {
      ar: "قرن ونصف من التصوير الفوتوغرافي لمدينة لا تشيخ",
      en: "A century and a half of photography of a city that never ages",
      fr: "Un siècle et demi de photographie d'une ville qui ne vieillit jamais",
    },
    cover: mockImage("cairo-lenses-cover", 1800, 1000),
    status: "current",
    startDate: "2026-01-15",
    endDate: "2026-06-15",
    chapters: [
      {
        id: "ch-1",
        heading: { ar: "أوائل المصورين", en: "The Early Photographers", fr: "Les premiers photographes" },
        body: {
          ar: "وثّق مصورون رواد شوارع القاهرة وأسواقها منذ منتصف القرن التاسع عشر.",
          en: "Pioneering photographers documented Cairo's streets and markets from the mid-19th century onward.",
          fr: "Des photographes pionniers ont documenté les rues et marchés du Caire dès le milieu du XIXe siècle.",
        },
        media: mockImage("cairo-early-photo", 1600, 900),
      },
      {
        id: "ch-2",
        heading: { ar: "قاهرة الحداثة", en: "Modern Cairo", fr: "Le Caire moderne" },
        body: {
          ar: "شهدت عدسات القرن العشرين تحول القاهرة إلى عاصمة حديثة صاخبة.",
          en: "20th-century lenses captured Cairo's transformation into a bustling modern capital.",
          fr: "Les objectifs du XXe siècle ont saisi la transformation du Caire en une capitale moderne animée.",
        },
        media: mockImage("cairo-modern-photo", 1600, 900),
      },
    ],
  },
  {
    id: "exh-03",
    slug: "manuscripts-illuminated",
    title: { ar: "مخطوطات مذهّبة", en: "Illuminated Manuscripts", fr: "Manuscrits enluminés" },
    subtitle: {
      ar: "فن الزخرفة والخط في التراث المخطوط",
      en: "The art of illumination and calligraphy in manuscript heritage",
      fr: "L'art de l'enluminure et de la calligraphie dans le patrimoine manuscrit",
    },
    cover: mockImage("manuscripts-cover", 1800, 1000),
    status: "upcoming",
    startDate: "2026-10-01",
    endDate: "2027-02-28",
    chapters: [
      {
        id: "ch-1",
        heading: { ar: "مداد وذهب", en: "Ink and Gold", fr: "Encre et or" },
        body: {
          ar: "اجتمع الخط العربي مع أوراق الذهب لصياغة صفحات لا تُنسى.",
          en: "Arabic calligraphy met gold leaf to craft unforgettable pages.",
          fr: "La calligraphie arabe a rencontré la feuille d'or pour créer des pages inoubliables.",
        },
        media: mockImage("ink-gold", 1600, 900),
      },
    ],
  },
  {
    id: "exh-04",
    slug: "nile-and-civilization",
    title: { ar: "النيل والحضارة", en: "The Nile and Civilization", fr: "Le Nil et la civilisation" },
    subtitle: {
      ar: "كيف صنع النهر أعظم حضارة في التاريخ",
      en: "How the river shaped one of history's greatest civilizations",
      fr: "Comment le fleuve a façonné l'une des plus grandes civilisations de l'histoire",
    },
    cover: mockImage("nile-civilization-cover", 1800, 1000),
    status: "past",
    startDate: "2025-05-01",
    endDate: "2025-11-01",
    chapters: [
      {
        id: "ch-1",
        heading: { ar: "الفيضان السنوي", en: "The Annual Flood", fr: "La crue annuelle" },
        body: {
          ar: "نظّم فيضان النيل السنوي إيقاع الحياة الزراعية والدينية في مصر القديمة.",
          en: "The Nile's annual flood organized the rhythm of agricultural and religious life in ancient Egypt.",
          fr: "La crue annuelle du Nil rythmait la vie agricole et religieuse de l'Égypte antique.",
        },
        media: mockImage("nile-flood", 1600, 900),
      },
    ],
  },
];
