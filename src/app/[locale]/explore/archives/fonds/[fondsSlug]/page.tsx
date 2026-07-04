import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { CollectionDetailTemplate } from "@/components/templates/collection-detail-template";
import { container } from "@/infrastructure/di/container";
import { localize, type HeritageEntityRef } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";

export default async function ArchivalFondsPage({
  params,
}: {
  params: Promise<{ locale: string; fondsSlug: string }>;
}) {
  const { locale, fondsSlug } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, fonds] = await Promise.all([
    getTranslations("Modules"),
    container.archives.getFondsBySlug(fondsSlug),
  ]);

  if (!fonds) notFound();

  const records = await container.archives.getRecordsByIds(fonds.recordIds);
  const itemRefs: HeritageEntityRef[] = records.map((r) => ({
    kind: "archivalRecord",
    id: r.id,
    slug: r.slug,
    title: r.title,
    thumbnail: r.thumbnail,
  }));

  return (
    <CollectionDetailTemplate
      breadcrumbs={[
        { label: t("archives.title"), href: "/explore/archives" },
        { label: localize(fonds.title, currentLocale) },
      ]}
      eyebrow={t("archives.title")}
      title={localize(fonds.title, currentLocale)}
      narrative={localize(fonds.description, currentLocale)}
      coverUrl={fonds.cover.url}
      coverAlt={localize(fonds.cover.alt, currentLocale)}
      itemRefs={itemRefs}
    />
  );
}
