import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ItemDetailTemplate } from "@/components/templates/item-detail-template";
import { container } from "@/infrastructure/di/container";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; publicationId: string }>;
}): Promise<Metadata> {
  const { locale, publicationId } = await params;
  const pub = await container.publications.getPublicationBySlug(publicationId);
  if (!pub) return {};
  return { title: localize(pub.title, locale as Locale), description: localize(pub.description, locale as Locale) };
}

export default async function PublicationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; publicationId: string }>;
}) {
  const { locale, publicationId } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tCommon, pub] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Common"),
    container.publications.getPublicationBySlug(publicationId),
  ]);

  if (!pub) notFound();

  return (
    <ItemDetailTemplate
      breadcrumbs={[
        { label: t("publications.title"), href: "/access/publications" },
        { label: localize(pub.title, currentLocale) },
      ]}
      title={localize(pub.title, currentLocale)}
      subtitle={localize(pub.authors, currentLocale)}
      description={localize(pub.description, currentLocale)}
      imageUrl={pub.cover.url}
      imageAlt={localize(pub.cover.alt, currentLocale)}
      badges={[localize(pub.category, currentLocale), String(pub.year)]}
      showDownload
      metadata={[
        { label: tCommon("author"), value: localize(pub.authors, currentLocale) },
        { label: tCommon("year"), value: String(pub.year) },
        { label: tCommon("pages"), value: `${pub.pageCount} ${tCommon("pages")}` },
      ]}
    />
  );
}
