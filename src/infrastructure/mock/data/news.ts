import type { NewsArticle } from "@/domain/entities";
import { mockImage } from "./media";

export const mockNewsArticles: NewsArticle[] = [
  {
    id: "news-01",
    slug: "gold-of-the-pharaohs-opens",
    title: { ar: "افتتاح معرض ذهب الفراعنة", en: "Gold of the Pharaohs Exhibition Opens", fr: "Ouverture de l'exposition L'or des pharaons" },
    excerpt: {
      ar: "افتتحت الهيئة معرضها الجديد الذي يضم أروع القطع الذهبية من تاريخ مصر القديمة.",
      en: "The Authority has opened its newest exhibition featuring the most exquisite golden artifacts from Ancient Egypt.",
      fr: "L'Autorité a inauguré sa nouvelle exposition présentant les plus beaux artefacts dorés de l'Égypte antique.",
    },
    body: {
      ar: "شهد الافتتاح حضورًا واسعًا من الباحثين والمهتمين بالتراث المصري.",
      en: "The opening drew wide attendance from researchers and heritage enthusiasts.",
      fr: "L'ouverture a attiré un large public de chercheurs et de passionnés de patrimoine.",
    },
    publishedAt: "2026-03-01",
    cover: mockImage("news-gold-exhibition", 1400, 900),
    category: { ar: "معارض", en: "Exhibitions", fr: "Expositions" },
  },
  {
    id: "news-02",
    slug: "new-digital-reading-room-launch",
    title: { ar: "إطلاق قاعة القراءة الرقمية الجديدة", en: "New Digital Reading Room Launched", fr: "Lancement de la nouvelle salle de lecture numérique" },
    excerpt: {
      ar: "أطلقت الهيئة قاعة قراءة رقمية جديدة تتيح للباحثين الوصول الآمن للمواد النادرة.",
      en: "The Authority has launched a new Digital Reading Room offering researchers secure access to rare materials.",
      fr: "L'Autorité a lancé une nouvelle salle de lecture numérique offrant aux chercheurs un accès sécurisé aux documents rares.",
    },
    body: {
      ar: "تتيح المنصة الجديدة تصفح آلاف الوثائق النادرة تحت ضوابط وصول دقيقة.",
      en: "The new platform allows browsing thousands of rare documents under strict access controls.",
      fr: "La nouvelle plateforme permet de consulter des milliers de documents rares sous des contrôles d'accès stricts.",
    },
    publishedAt: "2026-02-14",
    cover: mockImage("news-reading-room", 1400, 900),
    category: { ar: "إعلانات", en: "Announcements", fr: "Annonces" },
  },
  {
    id: "news-03",
    slug: "restoration-lab-open-day-recap",
    title: { ar: "ملخص اليوم المفتوح لمعمل الترميم", en: "Restoration Lab Open Day Recap", fr: "Récapitulatif de la journée portes ouvertes du laboratoire" },
    excerpt: {
      ar: "استقطب اليوم المفتوح لمعمل الترميم زوارًا من مختلف الأعمار لمشاهدة عمليات الحفظ الحية.",
      en: "The Restoration Lab's open day drew visitors of all ages to witness live conservation work.",
      fr: "La journée portes ouvertes du laboratoire de restauration a attiré des visiteurs de tous âges venus assister aux travaux de conservation en direct.",
    },
    body: {
      ar: "تفاعل الزوار مع فريق الترميم وطرحوا أسئلة حول تقنيات الحفظ الحديثة.",
      en: "Visitors engaged with the conservation team and asked questions about modern preservation techniques.",
      fr: "Les visiteurs ont échangé avec l'équipe de conservation et posé des questions sur les techniques modernes de préservation.",
    },
    publishedAt: "2025-10-12",
    cover: mockImage("news-restoration-day", 1400, 900),
    category: { ar: "فعاليات", en: "Events", fr: "Événements" },
  },
  {
    id: "news-04",
    slug: "annals-volume-13-released",
    title: { ar: "صدور المجلد 13 من حوليات علم المصريات", en: "Annals of Egyptology Volume 13 Released", fr: "Parution du volume 13 des Annales d'égyptologie" },
    excerpt: {
      ar: "صدر العدد الجديد من الدورية العلمية بمقالات عن اكتشافات الصحراء الغربية.",
      en: "The journal's newest issue is out, featuring articles on Western Desert discoveries.",
      fr: "Le nouveau numéro de la revue est paru, avec des articles sur les découvertes du désert occidental.",
    },
    body: {
      ar: "يضم العدد أبحاثًا محكّمة من باحثين مصريين ودوليين.",
      en: "The issue includes peer-reviewed research from Egyptian and international scholars.",
      fr: "Ce numéro comprend des recherches évaluées par des pairs de chercheurs égyptiens et internationaux.",
    },
    publishedAt: "2026-01-20",
    cover: mockImage("news-annals-13", 1400, 900),
    category: { ar: "مطبوعات", en: "Publications", fr: "Publications" },
  },
  {
    id: "news-05",
    slug: "membership-program-expansion",
    title: { ar: "توسيع برنامج العضويات", en: "Membership Program Expansion", fr: "Extension du programme d'adhésion" },
    excerpt: {
      ar: "أضافت الهيئة فئة عضوية جديدة \"الراعي\" بمزايا حصرية للداعمين.",
      en: "The Authority has introduced a new \"Patron\" membership tier with exclusive benefits for supporters.",
      fr: "L'Autorité a introduit un nouveau niveau d'adhésion « Mécène » offrant des avantages exclusifs aux donateurs.",
    },
    body: {
      ar: "يهدف البرنامج الجديد إلى تعزيز الدعم المجتمعي لجهود الحفظ الرقمي.",
      en: "The new program aims to strengthen community support for digital preservation efforts.",
      fr: "Ce nouveau programme vise à renforcer le soutien communautaire aux efforts de préservation numérique.",
    },
    publishedAt: "2025-12-05",
    cover: mockImage("news-membership", 1400, 900),
    category: { ar: "إعلانات", en: "Announcements", fr: "Annonces" },
  },
  {
    id: "news-06",
    slug: "school-partnership-program",
    title: { ar: "شراكة تعليمية مع المدارس", en: "Educational Partnership with Schools", fr: "Partenariat éducatif avec les écoles" },
    excerpt: {
      ar: "أطلقت الهيئة برنامج شراكة مع المدارس لإدماج التراث الرقمي في المناهج الدراسية.",
      en: "The Authority launched a school partnership program to integrate digital heritage into curricula.",
      fr: "L'Autorité a lancé un programme de partenariat scolaire pour intégrer le patrimoine numérique aux programmes éducatifs.",
    },
    body: {
      ar: "سيستفيد آلاف الطلاب من دروس تفاعلية مرتبطة بمقتنيات المتحف والمكتبة.",
      en: "Thousands of students will benefit from interactive lessons linked to museum and library holdings.",
      fr: "Des milliers d'élèves bénéficieront de leçons interactives liées aux collections du musée et de la bibliothèque.",
    },
    publishedAt: "2025-09-18",
    cover: mockImage("news-schools", 1400, 900),
    category: { ar: "تعليم", en: "Education", fr: "Éducation" },
  },
];
