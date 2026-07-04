import { getTranslations, setRequestLocale } from "next-intl/server";
import { ListingTemplate } from "@/components/templates/listing-template";
import { EntityCard } from "@/components/ui/entity-card";
import { container } from "@/infrastructure/di/container";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Static.news" });
  return { title: t("title"), description: t("intro") };
}

export default async function NewsPage({
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
    getTranslations("Static.news"),
    container.news.listArticles({ query: q, page: page ? Number(page) : 1, pageSize: 12 }),
  ]);

  return (
    <ListingTemplate
      breadcrumbs={[{ label: t("title") }]}
      title={t("title")}
      description={t("intro")}
      items={result.items.map((article, i) => (
        <EntityCard
          key={article.id}
          href={`/news/${article.slug}`}
          title={article.title}
          subtitle={article.category}
          image={article.cover}
          aspect="landscape"
          index={i}
        />
      ))}
      total={result.total}
      page={result.page}
      pageSize={result.pageSize}
      baseHref="/news"
      query={q}
    />
  );
}
