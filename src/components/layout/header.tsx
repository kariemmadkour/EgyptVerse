"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LocaleSwitcher } from "./locale-switcher";
import { navPillars, utilityLinks } from "@/constants/navigation";
import { localeDirections, type Locale } from "@/i18n/routing";

export function Header() {
  const t = useTranslations("Nav");
  const locale = useLocale() as Locale;
  const sheetSide = localeDirections[locale] === "rtl" ? "left" : "right";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {t("skipToContent")}
      </a>
      <div className="container-heritage flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          className="font-heading text-lg font-semibold tracking-tight text-primary md:text-xl"
        >
          Egypt Digital Heritage
        </Link>

        <nav className="hidden lg:block" aria-label="Primary">
          <NavigationMenu>
            <NavigationMenuList>
              {navPillars.map((pillar) => (
                <NavigationMenuItem key={pillar.key}>
                  <NavigationMenuTrigger className="bg-transparent">
                    {t(`pillars.${pillar.key}`)}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[420px] gap-1 p-4 md:w-[520px] md:grid-cols-2">
                      {pillar.modules.map((mod) => (
                        <li key={mod.key}>
                          <NavigationMenuLink
                            render={<Link href={mod.href} />}
                            className="block rounded-md p-3 leading-tight no-underline transition-colors hover:bg-accent/60"
                          >
                            <div className="font-heading text-sm font-medium text-foreground">
                              {t(`modules.${mod.key}`)}
                            </div>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-1.5 md:gap-2">
          <Button variant="ghost" size="icon" render={<Link href="/search" />} aria-label={t("search")}>
            <Search className="size-4.5" aria-hidden />
          </Button>
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="lg:hidden" aria-label={t("menuOpen")} />}
            >
              <Menu className="size-5" aria-hidden />
            </SheetTrigger>
            <SheetContent side={sheetSide} className="w-[85vw] max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="font-heading">Egypt Digital Heritage</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 px-4 pb-8">
                {navPillars.map((pillar) => (
                  <div key={pillar.key}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {t(`pillars.${pillar.key}`)}
                    </p>
                    <ul className="flex flex-col gap-1">
                      {pillar.modules.map((mod) => (
                        <li key={mod.key}>
                          <Link
                            href={mod.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-md px-2 py-2 font-heading text-sm hover:bg-accent/60"
                          >
                            {t(`modules.${mod.key}`)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {t("utility.about")}
                  </p>
                  <ul className="flex flex-col gap-1">
                    {utilityLinks.map((link) => (
                      <li key={link.key}>
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-md px-2 py-2 text-sm hover:bg-accent/60"
                        >
                          {t(`utility.${link.key}`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <LocaleSwitcher />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
