import { getTranslations, setRequestLocale } from "next-intl/server";
import { SearchResultsTemplate } from "@/components/templates/search-results-template";
import { container } from "@/infrastructure/di/container";

export default async function ResearchSearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { q } = await searchParams;

  const [t, tResearch, results] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Research"),
    container.search.searchAll(q ?? ""),
  ]);

  return (
    <SearchResultsTemplate
      breadcrumbs={[
        { label: t("research.title"), href: "/engage/research" },
        { label: tResearch("searchTitle") },
      ]}
      query={q}
      results={results}
      baseHref="/engage/research/search"
    />
  );
}
