import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { HubTemplate } from "@/components/templates/hub-template";
import { ManuscriptTraditionCard } from "@/components/modules/manuscripts/manuscript-tradition-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { manuscriptTraditions } from "@/constants/manuscripts";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Manuscripts" });
  return { title: t("title"), description: t("description") };
}

export default async function ManuscriptsHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;
  const t = await getTranslations("Manuscripts");

  const hero = manuscriptTraditions[1];

  return (
    <HubTemplate
      eyebrow={t("eyebrow")}
      title={t("title")}
      subtitle={t("subtitle")}
      description={t("description")}
      heroImageUrl={hero.image}
      heroImageAlt={localize(hero.imageAlt, currentLocale)}
      sectionTheme="manuscripts"
      ctaLabel={t("browseCta")}
      ctaHref="/explore/library"
    >
      <section className="container-heritage py-16 md:py-24">
        <SectionHeading eyebrow={t("gridEyebrow")} title={t("gridTitle")} description={t("gridDescription")} />
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {manuscriptTraditions.map((tradition, i) => (
            <ManuscriptTraditionCard
              key={tradition.slug}
              tradition={tradition}
              locale={currentLocale}
              index={i}
            />
          ))}
        </div>
      </section>
    </HubTemplate>
  );
}
