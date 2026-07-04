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
  return { title: t("collections.title"), description: t("collections.description") };
}

export default async function CollectionsHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tCommon, collections] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Common"),
    container.collections.listCollections(),
  ]);

  return (
    <HubTemplate
      eyebrow={t("collections.subtitle")}
      title={t("collections.title")}
      subtitle={t("collections.subtitle")}
      description={t("collections.description")}
      heroImageUrl={collections[0]?.cover.url ?? ""}
      heroImageAlt={localize(collections[0]?.cover.alt, currentLocale) ?? ""}
      sectionTheme="greco-roman"
      ctaLabel={t("collections.browseCta")}
      ctaHref="#all-collections"
    >
      <ContentSection title={tCommon("browse")} columns={3}>
        {collections.map((collection, i) => (
          <EntityCard
            key={collection.id}
            href={`/explore/collections/${collection.slug}`}
            title={collection.title}
            subtitle={collection.theme}
            image={collection.cover}
            aspect="landscape"
            index={i}
          />
        ))}
      </ContentSection>
    </HubTemplate>
  );
}
