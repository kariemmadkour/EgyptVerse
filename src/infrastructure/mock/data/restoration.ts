import type { RestorationCaseStudy } from "@/domain/entities";
import { mockImage } from "./media";

export const mockRestorationCaseStudies: RestorationCaseStudy[] = [
  {
    id: "res-01",
    slug: "papyrus-consolidation-project",
    title: { ar: "مشروع تثبيت البردي", en: "Papyrus Consolidation Project", fr: "Projet de consolidation des papyrus" },
    summary: {
      ar: "معالجة شذرات بردية هشة باستخدام تقنيات ترميم غير تدخلية للحفاظ على النص الأصلي.",
      en: "Treating fragile papyrus fragments with non-invasive conservation techniques to preserve the original text.",
      fr: "Traitement de fragments de papyrus fragiles à l'aide de techniques de conservation non invasives pour préserver le texte original.",
    },
    cover: mockImage("papyrus-restoration-cover", 1400, 900),
    beforeImage: mockImage("papyrus-before", 1000, 800),
    afterImage: mockImage("papyrus-after", 1000, 800),
    technique: { ar: "تثبيت بالمواد السليولوزية", en: "Cellulose-based consolidation", fr: "Consolidation à base de cellulose" },
    durationWeeks: 14,
    conservator: { ar: "قسم ترميم المخطوطات", en: "Manuscript Conservation Department", fr: "Département de conservation des manuscrits" },
  },
  {
    id: "res-02",
    slug: "gilded-mask-cleaning",
    title: { ar: "تنظيف القناع المذهّب", en: "Gilded Mask Cleaning", fr: "Nettoyage du masque doré" },
    summary: {
      ar: "إزالة طبقات الأكسدة عن القناع الجنائزي واستعادة بريقه الأصلي دون المساس بالطلاء الأثري.",
      en: "Removing oxidation layers from the funerary mask and restoring its original luster without disturbing the ancient gilding.",
      fr: "Élimination des couches d'oxydation du masque funéraire et restauration de son éclat d'origine sans altérer la dorure ancienne.",
    },
    cover: mockImage("mask-restoration-cover", 1400, 900),
    beforeImage: mockImage("mask-before", 1000, 800),
    afterImage: mockImage("mask-after", 1000, 800),
    technique: { ar: "تنظيف ميكانيكي دقيق", en: "Micro-mechanical cleaning", fr: "Nettoyage micro-mécanique" },
    durationWeeks: 22,
    conservator: { ar: "قسم ترميم الآثار المعدنية", en: "Metal Artifacts Conservation Department", fr: "Département de conservation des objets métalliques" },
  },
  {
    id: "res-03",
    slug: "textile-fragment-stabilization",
    title: { ar: "تثبيت شذرات نسيجية", en: "Textile Fragment Stabilization", fr: "Stabilisation de fragments textiles" },
    summary: {
      ar: "تثبيت نسيج قبطي هش عبر شبكة حريرية شفافة تحمي الألياف الأصلية.",
      en: "Stabilizing a fragile Coptic textile using a sheer silk overlay that protects the original fibers.",
      fr: "Stabilisation d'un textile copte fragile à l'aide d'une superposition de soie transparente protégeant les fibres d'origine.",
    },
    cover: mockImage("textile-restoration-cover", 1400, 900),
    beforeImage: mockImage("textile-before", 1000, 800),
    afterImage: mockImage("textile-after", 1000, 800),
    technique: { ar: "تقوية بالحرير الشفاف", en: "Sheer silk reinforcement", fr: "Renforcement par voile de soie" },
    durationWeeks: 9,
    conservator: { ar: "قسم ترميم المنسوجات", en: "Textile Conservation Department", fr: "Département de conservation des textiles" },
  },
  {
    id: "res-04",
    slug: "bookbinding-restoration",
    title: { ar: "ترميم تجليد كتاب مملوكي", en: "Mamluk-Era Bookbinding Restoration", fr: "Restauration d'une reliure mamelouke" },
    summary: {
      ar: "إعادة تجليد مخطوطة مملوكية بأسلوب تقليدي يحاكي الجلد والخيوط الأصلية.",
      en: "Re-binding a Mamluk-era manuscript using traditional methods that replicate the original leather and stitching.",
      fr: "Reliure d'un manuscrit mamelouk selon des méthodes traditionnelles reproduisant le cuir et les coutures d'origine.",
    },
    cover: mockImage("binding-restoration-cover", 1400, 900),
    beforeImage: mockImage("binding-before", 1000, 800),
    afterImage: mockImage("binding-after", 1000, 800),
    technique: { ar: "تجليد يدوي تقليدي", en: "Traditional hand bookbinding", fr: "Reliure manuelle traditionnelle" },
    durationWeeks: 11,
    conservator: { ar: "قسم ترميم المخطوطات", en: "Manuscript Conservation Department", fr: "Département de conservation des manuscrits" },
  },
];
