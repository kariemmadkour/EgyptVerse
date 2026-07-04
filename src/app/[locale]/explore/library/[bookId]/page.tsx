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
  params: Promise<{ locale: string; bookId: string }>;
}): Promise<Metadata> {
  const { locale, bookId } = await params;
  const book = await container.library.getBookBySlug(bookId);
  if (!book) return {};
  return { title: localize(book.title, locale as Locale), description: localize(book.description, locale as Locale) };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ locale: string; bookId: string }>;
}) {
  const { locale, bookId } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tCommon, book] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Common"),
    container.library.getBookBySlug(bookId),
  ]);

  if (!book) notFound();

  const featured = await container.library.getFeaturedBooks(5);
  const related = featured.filter((b) => b.id !== book.id).slice(0, 4);

  return (
    <ItemDetailTemplate
      breadcrumbs={[
        { label: t("library.title"), href: "/explore/library" },
        { label: localize(book.title, currentLocale) },
      ]}
      title={localize(book.title, currentLocale)}
      subtitle={localize(book.author, currentLocale)}
      description={localize(book.description, currentLocale)}
      imageUrl={book.cover.url}
      imageAlt={localize(book.cover.alt, currentLocale)}
      badges={[localize(book.subject, currentLocale), book.digitized ? tCommon("digitized") : book.format]}
      showDownload={book.digitized}
      metadata={[
        { label: tCommon("author"), value: localize(book.author, currentLocale) },
        { label: tCommon("year"), value: String(book.year) },
        { label: tCommon("pages"), value: `${book.pages} ${tCommon("pages")}` },
        { label: tCommon("callNumber"), value: book.callNumber },
      ]}
      relatedTitle={tCommon("relatedItems")}
      related={related.map((b, i) => (
        <EntityCard
          key={b.id}
          href={`/explore/library/${b.slug}`}
          title={b.title}
          subtitle={b.author}
          image={b.cover}
          aspect="portrait"
          index={i}
        />
      ))}
    />
  );
}
