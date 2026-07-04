import type { LocalizedText } from "@/domain/entities";

export interface ManuscriptTradition {
  slug: string;
  title: LocalizedText;
  era: LocalizedText;
  description: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  /** Which design language this tradition's card borrows its accent from. */
  accent: "pharaonic" | "islamic" | "greco-roman";
}

/**
 * The Manuscripts spotlight — Egypt's five great written traditions, layered
 * across three thousand years. This is the platform's flagship section (see
 * the homepage spotlight banner and the primary nav entry), so unlike the
 * mock-data-driven modules, its content is hand-curated rather than
 * generated through mockImage().
 */
export const manuscriptTraditions: ManuscriptTradition[] = [
  {
    slug: "arabic",
    title: { ar: "المخطوطات العربية", en: "Arabic Manuscripts", fr: "Manuscrits arabes" },
    era: { ar: "من القرن الثامن إلى التاسع عشر", en: "8th–19th century", fr: "VIIIe–XIXe siècle" },
    description: {
      ar: "قرون من العلم العربي — شعرًا وفلسفة وطبًا ورياضيات — محفوظة على الورق والرق من دور الكتابة الكبرى بالقاهرة والمكتبات الخاصة.",
      en: "Centuries of Arabic scholarship — poetry, philosophy, medicine, and mathematics — preserved on paper and parchment from Cairo's great scriptoria and private libraries.",
      fr: "Des siècles de savoir arabe — poésie, philosophie, médecine et mathématiques — conservés sur papier et parchemin dans les grands scriptoria et bibliothèques privées du Caire.",
    },
    image: "/images/manuscripts/arabic-manuscript.jpg",
    imageAlt: {
      ar: "صفحة من مخطوطة عربية كلاسيكية بخط اليد",
      en: "A page from a classical Arabic manuscript",
      fr: "Une page d'un manuscrit arabe classique",
    },
    accent: "islamic",
  },
  {
    slug: "islamic",
    title: { ar: "المخطوطات الإسلامية", en: "Islamic Manuscripts", fr: "Manuscrits islamiques" },
    era: { ar: "من القرن السابع إلى التاسع عشر", en: "7th–19th century", fr: "VIIe–XIXe siècle" },
    description: {
      ar: "خط قرآني وصفحات افتتاحية مذهبة وحواشٍ بماء الذهب — القلب الروحي والفكري لمكتبات مصر في العصر الإسلامي.",
      en: "Qur'anic calligraphy, illuminated frontispieces, and gold-leaf marginalia — the spiritual and intellectual heart of Egypt's Islamic-era libraries.",
      fr: "Calligraphie coranique, frontispices enluminés et annotations à la feuille d'or — le cœur spirituel et intellectuel des bibliothèques de l'Égypte islamique.",
    },
    image: "/images/islamic/quran-illumination.jpg",
    imageAlt: {
      ar: "زخرفة مذهبة من مخطوطة قرآنية",
      en: "Gold illumination from a Qur'anic manuscript",
      fr: "Enluminure dorée d'un manuscrit coranique",
    },
    accent: "islamic",
  },
  {
    slug: "coptic",
    title: { ar: "المخطوطات القبطية", en: "Coptic Manuscripts", fr: "Manuscrits coptes" },
    era: { ar: "من القرن الثالث إلى العاشر", en: "3rd–10th century", fr: "IIIe–Xe siècle" },
    description: {
      ar: "آخر صورة مكتوبة للغة المصرية القديمة، حملتها الجماعات المسيحية المصرية في المزامير والأناجيل والنصوص الرهبانية.",
      en: "The last written form of the ancient Egyptian language, carried by Egypt's Christian communities in psalters, gospels, and monastic texts.",
      fr: "La dernière forme écrite de la langue égyptienne ancienne, portée par les communautés chrétiennes d'Égypte dans les psautiers, évangiles et textes monastiques.",
    },
    image: "/images/greco-roman/coptic-manuscript.jpg",
    imageAlt: {
      ar: "مخطوطة قبطية قديمة",
      en: "An ancient Coptic manuscript",
      fr: "Un ancien manuscrit copte",
    },
    accent: "greco-roman",
  },
  {
    slug: "greek",
    title: { ar: "المخطوطات اليونانية", en: "Greek Manuscripts", fr: "Manuscrits grecs" },
    era: {
      ar: "من القرن الثالث ق.م. إلى الرابع الميلادي",
      en: "3rd century BCE – 4th century CE",
      fr: "IIIe siècle av. J.-C. – IVe siècle apr. J.-C.",
    },
    description: {
      ar: "برديات من أوكسيرينخوس والإسكندرية — سجلات إدارية وفلسفة وشذرات من آداب كلاسيكية مفقودة، كُتبت في مصر الهلينستية.",
      en: "Papyri from Oxyrhynchus and Alexandria — administrative records, philosophy, and fragments of lost classical literature written in Hellenistic Egypt.",
      fr: "Papyrus d'Oxyrhynchos et d'Alexandrie — registres administratifs, philosophie et fragments de littérature classique perdue, écrits dans l'Égypte hellénistique.",
    },
    image: "/images/manuscripts/greek-papyrus.jpg",
    imageAlt: {
      ar: "بردية يونانية قديمة",
      en: "An ancient Greek papyrus",
      fr: "Un ancien papyrus grec",
    },
    accent: "greco-roman",
  },
  {
    slug: "ptolemaic",
    title: {
      ar: "النقوش والوثائق البطلمية",
      en: "Ptolemaic Inscriptions",
      fr: "Inscriptions ptolémaïques",
    },
    era: { ar: "305–30 ق.م.", en: "305–30 BCE", fr: "305–30 av. J.-C." },
    description: {
      ar: "مراسيم ثلاثية اللغة ونصوص معبدية — كحجر رشيد — تصل بين الهيروغليفية والديموطيقية واليونانية، من عصر مصر اليوناني الفرعوني.",
      en: "Trilingual decrees and temple texts — like the Rosetta Stone — bridging hieroglyphic, Demotic, and Greek, from Egypt's Greek-Pharaonic dynasty.",
      fr: "Décrets trilingues et textes de temples — comme la pierre de Rosette — reliant hiéroglyphes, démotique et grec, de la dynastie gréco-pharaonique d'Égypte.",
    },
    image: "/images/manuscripts/ptolemaic-artifact.jpg",
    imageAlt: {
      ar: "نقش بطلمي ثلاثي اللغة",
      en: "A trilingual Ptolemaic inscription",
      fr: "Une inscription ptolémaïque trilingue",
    },
    accent: "pharaonic",
  },
];
