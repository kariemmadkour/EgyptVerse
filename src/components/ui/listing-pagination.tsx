import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function buildHref(baseHref: string, page: number, query?: string) {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `${baseHref}?${qs}` : baseHref;
}

export function ListingPagination({
  baseHref,
  page,
  totalPages,
  query,
}: {
  baseHref: string;
  page: number;
  totalPages: number;
  query?: string;
}) {
  const t = useTranslations("Common");
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2"
    >
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        render={
          <Link
            href={buildHref(baseHref, Math.max(1, page - 1), query)}
            aria-disabled={page <= 1}
            className={cn(page <= 1 && "pointer-events-none opacity-50")}
          />
        }
      >
        {t("previous")}
      </Button>
      <span className="px-3 text-sm text-muted-foreground">
        {page} / {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        render={
          <Link
            href={buildHref(baseHref, Math.min(totalPages, page + 1), query)}
            aria-disabled={page >= totalPages}
            className={cn(page >= totalPages && "pointer-events-none opacity-50")}
          />
        }
      >
        {t("next")}
      </Button>
    </nav>
  );
}
