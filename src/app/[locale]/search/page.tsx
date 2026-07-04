import { getTranslations, setRequestLocale } from "next-intl/server";
import { SearchResultsTemplate } from "@/components/templates/search-results-template";
import { container } from "@/infrastructure/di/container";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Search" });
  return { title: t("title") };
}

export default async function GlobalSearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { q } = await searchParams;

  const [t, results] = await Promise.all([
    getTranslations("Common"),
    container.search.searchAll(q ?? ""),
  ]);

  return (
    <SearchResultsTemplate
      breadcrumbs={[{ label: t("search") }]}
      query={q}
      results={results}
      baseHref="/search"
    />
  );
}
