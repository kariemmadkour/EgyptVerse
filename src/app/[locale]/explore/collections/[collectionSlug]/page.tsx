import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { CollectionDetailTemplate } from "@/components/templates/collection-detail-template";
import { container } from "@/infrastructure/di/container";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";

export default async function DigitalCollectionPage({
  params,
}: {
  params: Promise<{ locale: string; collectionSlug: string }>;
}) {
  const { locale, collectionSlug } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, collection] = await Promise.all([
    getTranslations("Modules"),
    container.collections.getCollectionBySlug(collectionSlug),
  ]);

  if (!collection) notFound();

  return (
    <CollectionDetailTemplate
      breadcrumbs={[
        { label: t("collections.title"), href: "/explore/collections" },
        { label: localize(collection.title, currentLocale) },
      ]}
      eyebrow={localize(collection.theme, currentLocale)}
      title={localize(collection.title, currentLocale)}
      narrative={localize(collection.narrative, currentLocale)}
      coverUrl={collection.cover.url}
      coverAlt={localize(collection.cover.alt, currentLocale)}
      itemRefs={collection.itemRefs}
    />
  );
}
