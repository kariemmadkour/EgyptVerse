import { useTranslations } from "next-intl";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { EntityCard } from "@/components/ui/entity-card";
import { ListingSearchForm } from "@/components/ui/listing-search-form";
import type { EntityKind, HeritageEntityRef } from "@/domain/entities";
import { entityRefHref } from "@/lib/entity-links";

const kindGroupKey: Record<EntityKind, string> = {
  book: "groupBook",
  archivalRecord: "groupArchivalRecord",
  museumObject: "groupMuseumObject",
  publication: "groupPublication",
  event: "groupEvent",
  lesson: "groupLesson",
  exhibition: "groupBook",
  timelineEvent: "groupBook",
};

interface SearchResultsTemplateProps {
  breadcrumbs: BreadcrumbItem[];
  query?: string;
  results: HeritageEntityRef[];
  baseHref: string;
}

export function SearchResultsTemplate({
  breadcrumbs,
  query,
  results,
  baseHref,
}: SearchResultsTemplateProps) {
  const t = useTranslations("Search");
  const grouped = results.reduce<Record<string, HeritageEntityRef[]>>((acc, ref) => {
    const key = kindGroupKey[ref.kind];
    acc[key] = acc[key] ?? [];
    acc[key].push(ref);
    return acc;
  }, {});

  return (
    <div id="main-content">
      <Breadcrumbs items={breadcrumbs} />
      <section className="container-heritage py-10 md:py-16">
        <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          {t("title")}
        </h1>
        <div className="mt-6">
          <ListingSearchForm baseHref={baseHref} query={query} />
        </div>

        {!query ? (
          <div className="mt-16 rounded-xl border border-dashed border-border py-20 text-center">
            <p className="font-heading text-lg font-medium">{t("emptyStateTitle")}</p>
            <p className="mt-2 text-muted-foreground">{t("emptyStateText")}</p>
          </div>
        ) : (
          <>
            <p className="mt-6 text-muted-foreground">
              {t("resultsFor", { query })} · {t("resultsCount", { count: results.length })}
            </p>

            {Object.entries(grouped).map(([groupKey, items]) => (
              <div key={groupKey} className="mt-12">
                <h2 className="font-heading text-xl font-semibold">{t(groupKey as never)}</h2>
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((ref, i) => (
                    <EntityCard
                      key={ref.id}
                      href={entityRefHref(ref.kind, ref.slug)}
                      title={ref.title}
                      image={ref.thumbnail}
                      aspect="portrait"
                      index={i}
                    />
                  ))}
                </div>
              </div>
            ))}

            {results.length === 0 && (
              <div className="mt-16 rounded-xl border border-dashed border-border py-20 text-center text-muted-foreground">
                {t("emptyStateTitle")}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
