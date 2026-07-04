"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("Nav");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function handleSelect(nextLocale: Locale) {
    router.replace(
      // @ts-expect-error -- dynamic params are widened at this call site
      { pathname, params },
      { locale: nextLocale },
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            aria-label={t("languageSwitcher")}
            className="gap-1.5 text-sm font-medium"
          />
        }
      >
        <Globe className="size-4" aria-hidden />
        {localeLabels[locale as Locale]}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((l) => (
          <DropdownMenuItem key={l} onClick={() => handleSelect(l)} disabled={l === locale}>
            {localeLabels[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
