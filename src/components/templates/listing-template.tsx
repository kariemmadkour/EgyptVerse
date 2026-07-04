import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { SectionHeading } from "@/components/ui/section-heading";
import { ListingSearchForm } from "@/components/ui/listing-search-form";
import { ListingPagination } from "@/components/ui/listing-pagination";

interface ListingTemplateProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description: string;
  items: ReactNode;
  total: number;
  page: number;
  pageSize: number;
  baseHref: string;
  query?: string;
  emptyState?: ReactNode;
}

export function ListingTemplate({
  breadcrumbs,
  title,
  description,
  items,
  total,
  page,
  pageSize,
  baseHref,
  query,
  emptyState,
}: ListingTemplateProps) {
  const t = useTranslations("Common");
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const isEmpty = total === 0;

  return (
    <div id="main-content">
      <Breadcrumbs items={breadcrumbs} />
      <section className="container-heritage py-10 md:py-16">
        <SectionHeading title={title} description={description} />

        <div className="mt-8">
          <ListingSearchForm baseHref={baseHref} query={query} />
        </div>

        {isEmpty ? (
          <div className="mt-16 rounded-xl border border-dashed border-border py-20 text-center text-muted-foreground">
            {emptyState ?? t("noResults")}
          </div>
        ) : (
          <>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items}
            </div>
            <div className="mt-14">
              <ListingPagination
                baseHref={baseHref}
                page={page}
                totalPages={totalPages}
                query={query}
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
