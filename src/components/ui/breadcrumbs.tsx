import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { localeDirections, type Locale } from "@/i18n/routing";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const t = useTranslations("Common");
  const locale = useLocale() as Locale;
  const Chevron = localeDirections[locale] === "rtl" ? ChevronLeft : ChevronRight;

  const allItems: BreadcrumbItem[] = [{ label: t("breadcrumbHome"), href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="container-heritage pt-6 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {allItems.map((item, i) => {
          const isLast = i === allItems.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-foreground">
                  {item.label}
                </span>
              )}
              {!isLast && <Chevron className="size-3.5" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
