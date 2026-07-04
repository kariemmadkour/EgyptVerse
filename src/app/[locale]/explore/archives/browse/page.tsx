import { getTranslations, setRequestLocale } from "next-intl/server";
import { ListingTemplate } from "@/components/templates/listing-template";
import { EntityCard } from "@/components/ui/entity-card";
import { container } from "@/infrastructure/di/container";

export default async function ArchivesBrowsePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { q, page } = await searchParams;

  const [t, result] = await Promise.all([
    getTranslations("Modules"),
    container.archives.listRecords({ query: q, page: page ? Number(page) : 1, pageSize: 12 }),
  ]);

  return (
    <ListingTemplate
      breadcrumbs={[
        { label: t("archives.title"), href: "/explore/archives" },
        { label: t("archives.browseCta") },
      ]}
      title={t("archives.title")}
      description={t("archives.description")}
      items={result.items.map((record, i) => (
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
      total={result.total}
      page={result.page}
      pageSize={result.pageSize}
      baseHref="/explore/archives/browse"
      query={q}
    />
  );
}
