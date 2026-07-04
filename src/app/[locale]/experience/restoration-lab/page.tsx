import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { HubTemplate } from "@/components/templates/hub-template";
import { ContentSection } from "@/components/templates/content-section";
import { EntityCard } from "@/components/ui/entity-card";
import { container } from "@/infrastructure/di/container";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Modules" });
  return { title: t("restorationLab.title"), description: t("restorationLab.description") };
}

export default async function RestorationLabHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tCommon, caseStudies] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Common"),
    container.restoration.listCaseStudies(),
  ]);

  return (
    <HubTemplate
      eyebrow={t("restorationLab.subtitle")}
      title={t("restorationLab.title")}
      subtitle={t("restorationLab.subtitle")}
      description={t("restorationLab.description")}
      heroImageUrl={caseStudies[0]?.cover.url ?? ""}
      heroImageAlt={localize(caseStudies[0]?.cover.alt, currentLocale) ?? ""}
      sectionTheme="general"
      ctaLabel={t("restorationLab.browseCta")}
      ctaHref={`/experience/restoration-lab/${caseStudies[0]?.slug ?? ""}`}
    >
      <ContentSection title={tCommon("all")} columns={2}>
        {caseStudies.map((cs, i) => (
          <EntityCard
            key={cs.id}
            href={`/experience/restoration-lab/${cs.slug}`}
            title={cs.title}
            subtitle={cs.summary}
            image={cs.cover}
            aspect="landscape"
            index={i}
          />
        ))}
      </ContentSection>
    </HubTemplate>
  );
}
