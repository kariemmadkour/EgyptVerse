import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { CollectionDetailTemplate } from "@/components/templates/collection-detail-template";
import { container } from "@/infrastructure/di/container";
import { localize, type HeritageEntityRef } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";

export default async function JournalDetailPage({
  params,
}: {
  params: Promise<{ locale: string; journalSlug: string }>;
}) {
  const { locale, journalSlug } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, journal] = await Promise.all([
    getTranslations("Modules"),
    container.publications.getJournalBySlug(journalSlug),
  ]);

  if (!journal) notFound();

  const { items: allPublications } = await container.publications.listPublications({ pageSize: 100 });
  const issues = allPublications.filter((p) => journal.publicationIds.includes(p.id));
  const itemRefs: HeritageEntityRef[] = issues.map((p) => ({
    kind: "publication",
    id: p.id,
    slug: p.slug,
    title: p.title,
    thumbnail: p.cover,
  }));

  return (
    <CollectionDetailTemplate
      breadcrumbs={[
        { label: t("publications.title"), href: "/access/publications" },
        { label: localize(journal.title, currentLocale) },
      ]}
      eyebrow={t("publications.title")}
      title={localize(journal.title, currentLocale)}
      narrative={localize(journal.description, currentLocale)}
      coverUrl={journal.cover.url}
      coverAlt={localize(journal.cover.alt, currentLocale)}
      itemRefs={itemRefs}
    />
  );
}
