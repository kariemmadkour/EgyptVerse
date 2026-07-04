import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ItemDetailTemplate } from "@/components/templates/item-detail-template";
import { EntityCard } from "@/components/ui/entity-card";
import { container } from "@/infrastructure/di/container";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; recordId: string }>;
}): Promise<Metadata> {
  const { locale, recordId } = await params;
  const record = await container.archives.getRecordBySlug(recordId);
  if (!record) return {};
  return { title: localize(record.title, locale as Locale), description: localize(record.description, locale as Locale) };
}

export default async function ArchivalRecordPage({
  params,
}: {
  params: Promise<{ locale: string; recordId: string }>;
}) {
  const { locale, recordId } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tCommon, record] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Common"),
    container.archives.getRecordBySlug(recordId),
  ]);

  if (!record) notFound();

  const fonds = await container.archives.getFondsBySlug(record.fondsSlug);
  const relatedIds = fonds?.recordIds.filter((id) => id !== record.id) ?? [];
  const related = await container.archives.getRecordsByIds(relatedIds);

  return (
    <ItemDetailTemplate
      breadcrumbs={[
        { label: t("archives.title"), href: "/explore/archives" },
        { label: localize(record.title, currentLocale) },
      ]}
      title={localize(record.title, currentLocale)}
      subtitle={localize(record.recordType, currentLocale)}
      description={localize(record.description, currentLocale)}
      imageUrl={record.thumbnail.url}
      imageAlt={localize(record.thumbnail.alt, currentLocale)}
      badges={[record.dateRange, record.accessLevel]}
      metadata={[
        { label: tCommon("provenance"), value: localize(record.provenance, currentLocale) },
        { label: tCommon("reference"), value: record.referenceCode },
        { label: tCommon("dateRange"), value: record.dateRange },
      ]}
      relatedTitle={tCommon("relatedItems")}
      related={related.slice(0, 4).map((r, i) => (
        <EntityCard
          key={r.id}
          href={`/explore/archives/${r.slug}`}
          title={r.title}
          subtitle={r.recordType}
          image={r.thumbnail}
          aspect="portrait"
          index={i}
        />
      ))}
    />
  );
}
