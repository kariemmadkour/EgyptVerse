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
  return { title: t("archives.title"), description: t("archives.description") };
}

export default async function ArchivesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tCommon, records, fonds] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Common"),
    container.archives.listRecords({ pageSize: 8 }),
    container.archives.listFonds(),
  ]);

  return (
    <HubTemplate
      eyebrow={t("archives.subtitle")}
      title={t("archives.title")}
      subtitle={t("archives.subtitle")}
      description={t("archives.description")}
      heroImageUrl={records.items[0]?.thumbnail.url ?? ""}
      heroImageAlt={localize(records.items[0]?.thumbnail.alt, currentLocale) ?? ""}
      sectionTheme="modern"
      ctaLabel={t("archives.browseCta")}
      ctaHref="/explore/archives/browse"
    >
      <ContentSection
        title={tCommon("featured")}
        viewAllLabel={tCommon("viewAll")}
        viewAllHref="/explore/archives/browse"
      >
        {records.items.map((record, i) => (
          <EntityCard
            key={record.id}
            href={`/explore/archives/${record.slug}`}
            title={record.title}
            subtitle={record.recordType}
            image={record.thumbnail}
            aspect="portrait"
            index={i}
          />
        ))}
      </ContentSection>

      <ContentSection title={tCommon("browse")} className="bg-secondary/30" columns={2}>
        {fonds.map((f, i) => (
          <EntityCard
            key={f.id}
            href={`/explore/archives/fonds/${f.slug}`}
            title={f.title}
            subtitle={f.description}
            image={f.cover}
            aspect="landscape"
            index={i}
          />
        ))}
      </ContentSection>
    </HubTemplate>
  );
}
