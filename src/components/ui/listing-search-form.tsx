import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ListingSearchForm({ baseHref, query }: { baseHref: string; query?: string }) {
  const t = useTranslations("Common");

  return (
    <form action={baseHref} method="GET" className="flex max-w-xl gap-2" role="search">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input
          type="search"
          name="q"
          defaultValue={query}
          placeholder={t("searchPlaceholder")}
          className="ps-9"
          aria-label={t("search")}
        />
      </div>
      <Button type="submit">{t("search")}</Button>
    </form>
  );
}
