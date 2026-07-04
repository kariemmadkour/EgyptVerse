import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { CollectionDetailTemplate } from "@/components/templates/collection-detail-template";
import { container } from "@/infrastructure/di/container";
import { localize, type HeritageEntityRef } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";

export default async function LibraryCollectionPage({
  params,
}: {
  params: Promise<{ locale: string; collectionSlug: string }>;
}) {
  const { locale, collectionSlug } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, collection] = await Promise.all([
    getTranslations("Modules"),
    container.library.getCollectionBySlug(collectionSlug),
  ]);

  if (!collection) notFound();

  const books = await container.library.getBooksByIds(collection.bookIds);
  const itemRefs: HeritageEntityRef[] = books.map((b) => ({
    kind: "book",
    id: b.id,
    slug: b.slug,
    title: b.title,
    thumbnail: b.cover,
  }));

  return (
    <CollectionDetailTemplate
      breadcrumbs={[
        { label: t("library.title"), href: "/explore/library" },
        { label: localize(collection.title, currentLocale) },
      ]}
      eyebrow={t("library.title")}
      title={localize(collection.title, currentLocale)}
      narrative={localize(collection.description, currentLocale)}
      coverUrl={collection.cover.url}
      coverAlt={localize(collection.cover.alt, currentLocale)}
      itemRefs={itemRefs}
    />
  );
}
