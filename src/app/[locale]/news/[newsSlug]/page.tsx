import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ItemDetailTemplate } from "@/components/templates/item-detail-template";
import { EntityCard } from "@/components/ui/entity-card";
import { container } from "@/infrastructure/di/container";
import { localize } from "@/domain/entities";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; newsSlug: string }>;
}): Promise<Metadata> {
  const { locale, newsSlug } = await params;
  const article = await container.news.getArticleBySlug(newsSlug);
  if (!article) return {};
  return { title: localize(article.title, locale as Locale), description: localize(article.excerpt, locale as Locale) };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; newsSlug: string }>;
}) {
  const { locale, newsSlug } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tCommon, article] = await Promise.all([
    getTranslations("Static.news"),
    getTranslations("Common"),
    container.news.getArticleBySlug(newsSlug),
  ]);

  if (!article) notFound();

  const latest = await container.news.getLatestArticles(4);
  const related = latest.filter((a) => a.id !== article.id);

  return (
    <ItemDetailTemplate
      breadcrumbs={[
        { label: t("title"), href: "/news" },
        { label: localize(article.title, currentLocale) },
      ]}
      title={localize(article.title, currentLocale)}
      subtitle={formatDate(article.publishedAt, currentLocale)}
      description={localize(article.body, currentLocale)}
      imageUrl={article.cover.url}
      imageAlt={localize(article.cover.alt, currentLocale)}
      badges={[localize(article.category, currentLocale)]}
      metadata={[{ label: tCommon("year"), value: formatDate(article.publishedAt, currentLocale) }]}
      relatedTitle={tCommon("relatedItems")}
      related={related.slice(0, 3).map((a, i) => (
        <EntityCard
          key={a.id}
          href={`/news/${a.slug}`}
          title={a.title}
          subtitle={a.category}
          image={a.cover}
          aspect="landscape"
          index={i}
        />
      ))}
    />
  );
}
