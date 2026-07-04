import { useTranslations } from "next-intl";
import { Rss, Mail, Send } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { navPillars, utilityLinks } from "@/constants/navigation";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="container-heritage grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-heading text-lg font-semibold text-primary">{t("aboutTitle")}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t("aboutText")}
          </p>
          <div className="mt-6">
            <p className="text-sm font-semibold">{t("newsletterTitle")}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t("newsletterText")}</p>
            <form className="mt-3 flex max-w-sm gap-2">
              <Input type="email" placeholder={t("newsletterPlaceholder")} aria-label={t("newsletterPlaceholder")} />
              <Button type="submit">{t("newsletterCta")}</Button>
            </form>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm font-semibold">{t("socialTitle")}</span>
            <div className="flex gap-2">
              <a href="#" aria-label="RSS" className="rounded-full border border-border p-2 hover:bg-accent/60">
                <Rss className="size-4" aria-hidden />
              </a>
              <a href="#" aria-label="Email" className="rounded-full border border-border p-2 hover:bg-accent/60">
                <Mail className="size-4" aria-hidden />
              </a>
              <a href="#" aria-label="Newsletter" className="rounded-full border border-border p-2 hover:bg-accent/60">
                <Send className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        {navPillars.map((pillar) => (
          <div key={pillar.key}>
            <p className="font-heading text-sm font-semibold text-foreground">
              {tNav(`pillars.${pillar.key}`)}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {pillar.modules.map((mod) => (
                <li key={mod.key}>
                  <Link
                    href={mod.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tNav(`modules.${mod.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-heritage flex flex-col gap-4 border-t border-border/60 py-6 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-muted-foreground">{t("copyright", { year })}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {utilityLinks.map((link) => (
            <li key={link.key}>
              <Link href={link.href} className="hover:text-foreground">
                {tNav(`utility.${link.key}`)}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/legal/privacy" className="hover:text-foreground">
              {t("privacy")}
            </Link>
          </li>
          <li>
            <Link href="/legal/terms" className="hover:text-foreground">
              {t("terms")}
            </Link>
          </li>
          <li>
            <Link href="/accessibility" className="hover:text-foreground">
              {t("accessibility")}
            </Link>
          </li>
          <li>
            <Link href="/sitemap" className="hover:text-foreground">
              {t("sitemap")}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
