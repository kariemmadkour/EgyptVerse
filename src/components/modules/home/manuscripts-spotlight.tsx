import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { SectionPattern } from "@/components/decorative/heritage-patterns";
import { manuscriptTraditions } from "@/constants/manuscripts";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * The homepage's highest-priority section (after the hero) — spotlighting
 * Manuscripts as the platform's flagship new initiative, distinct from the
 * routine ContentSection listings below it.
 */
export async function ManuscriptsSpotlight({ locale }: { locale: Locale }) {
  const t = await getTranslations("Manuscripts");

  return (
    <section
      data-section-theme="manuscripts"
      className="relative overflow-hidden bg-section-surface py-16 md:py-24"
    >
      <SectionPattern
        theme="manuscripts"
        className="pointer-events-none absolute inset-x-0 top-0 h-12 w-full text-section-accent opacity-30"
      />
      <div className="container-heritage">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wide text-basalt">
            {t("eyebrow")}
          </span>
          <h2 className="mt-4 text-balance font-heading text-3xl font-semibold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-2 text-lg font-medium text-terracotta">{t("subtitle")}</p>
          <p className="mt-4 text-balance leading-relaxed text-foreground/80">{t("description")}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-5">
          {manuscriptTraditions.map((tradition, i) => (
            <Link
              key={tradition.slug}
              href="/manuscripts"
              className={cn(
                "group relative block aspect-[3/4] overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-lg",
                i === 4 && "col-span-2 md:col-span-1",
              )}
            >
              <Image
                src={tradition.image}
                alt={localize(tradition.imageAlt, locale)}
                fill
                sizes="(min-width: 768px) 20vw, 50vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-basalt/85 via-basalt/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-3 text-center text-xs font-medium text-white md:text-sm">
                {localize(tradition.title, locale)}
              </span>
            </Link>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="mt-10 text-center">
          <Button render={<Link href="/manuscripts" />} size="lg" className="bg-gold text-basalt hover:bg-gold-soft">
            {t("spotlightCta")}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
