import { getTranslations, setRequestLocale } from "next-intl/server";
import { ListingTemplate } from "@/components/templates/listing-template";
import { EntityCard } from "@/components/ui/entity-card";
import { container } from "@/infrastructure/di/container";

export default async function LibraryBrowsePage({
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
    container.library.listBooks({ query: q, page: page ? Number(page) : 1, pageSize: 12 }),
  ]);

  return (
    <ListingTemplate
      breadcrumbs={[
        { label: t("library.title"), href: "/explore/library" },
        { label: t("library.browseCta") },
      ]}
      title={t("library.title")}
      description={t("library.description")}
      items={result.items.map((book, i) => (
        <EntityCard
          key={book.id}
          href={`/explore/library/${book.slug}`}
          title={book.title}
          subtitle={book.author}
          image={book.cover}
          aspect="portrait"
          index={i}
        />
      ))}
      total={result.total}
      page={result.page}
      pageSize={result.pageSize}
      baseHref="/explore/library/browse"
      query={q}
    />
  );
}
