import type { MembershipTier } from "@/domain/entities";

export const mockMembershipTiers: MembershipTier[] = [
  {
    id: "tier-01",
    slug: "explorer",
    name: { ar: "المستكشف", en: "Explorer", fr: "Explorateur" },
    description: {
      ar: "بداية مثالية لعشاق التراث الراغبين في استكشاف مقتنياتنا الرقمية.",
      en: "An ideal start for heritage enthusiasts wanting to explore our digital holdings.",
      fr: "Un début idéal pour les passionnés de patrimoine souhaitant explorer nos collections numériques.",
    },
    priceEGP: 0,
    billingPeriod: "annual",
    benefits: [
      { ar: "وصول كامل للمعارض الافتراضية", en: "Full access to virtual exhibitions", fr: "Accès complet aux expositions virtuelles" },
      { ar: "نشرة إخبارية شهرية", en: "Monthly newsletter", fr: "Newsletter mensuelle" },
    ],
    featured: false,
  },
  {
    id: "tier-02",
    slug: "researcher",
    name: { ar: "الباحث", en: "Researcher", fr: "Chercheur" },
    description: {
      ar: "مصممة للباحثين والأكاديميين الراغبين في وصول متقدم لقاعة القراءة الرقمية.",
      en: "Designed for researchers and academics seeking advanced access to the Digital Reading Room.",
      fr: "Conçue pour les chercheurs et universitaires souhaitant un accès avancé à la salle de lecture numérique.",
    },
    priceEGP: 600,
    billingPeriod: "annual",
    benefits: [
      { ar: "وصول إلى قاعة القراءة الرقمية", en: "Access to the Digital Reading Room", fr: "Accès à la salle de lecture numérique" },
      { ar: "أولوية في طلبات البحث", en: "Priority on research requests", fr: "Priorité sur les demandes de recherche" },
      { ar: "خصم على المطبوعات", en: "Discount on publications", fr: "Remise sur les publications" },
    ],
    featured: true,
  },
  {
    id: "tier-03",
    slug: "patron",
    name: { ar: "الراعي", en: "Patron", fr: "Mécène" },
    description: {
      ar: "لمن يرغب في دعم الهيئة والاستفادة من مزايا حصرية وفعاليات خاصة.",
      en: "For those wishing to support the Authority while enjoying exclusive benefits and private events.",
      fr: "Pour ceux qui souhaitent soutenir l'Autorité tout en profitant d'avantages exclusifs et d'événements privés.",
    },
    priceEGP: 2400,
    billingPeriod: "annual",
    benefits: [
      { ar: "جميع مزايا فئة الباحث", en: "All Researcher-tier benefits", fr: "Tous les avantages du niveau Chercheur" },
      { ar: "دعوات لفعاليات حصرية", en: "Invitations to exclusive events", fr: "Invitations à des événements exclusifs" },
      { ar: "اسم الراعي على لوحة الشرف الرقمية", en: "Name featured on the digital patrons wall", fr: "Nom affiché sur le mur numérique des mécènes" },
    ],
    featured: false,
  },
];
