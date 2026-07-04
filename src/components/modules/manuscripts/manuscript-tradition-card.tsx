import Image from "next/image";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";
import { SectionPattern } from "@/components/decorative/heritage-patterns";
import { Reveal } from "@/components/motion/reveal";
import type { ManuscriptTradition } from "@/constants/manuscripts";

export function ManuscriptTraditionCard({
  tradition,
  locale,
  index = 0,
}: {
  tradition: ManuscriptTradition;
  locale: Locale;
  index?: number;
}) {
  return (
    <Reveal delay={Math.min(index * 0.08, 0.4)}>
      <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={tradition.image}
            alt={localize(tradition.imageAlt, locale)}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <SectionPattern
            theme={tradition.accent}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 w-full text-white/70 opacity-70"
          />
          <span className="absolute end-3 top-3 rounded-full bg-basalt/70 px-3 py-1 text-xs font-medium text-gold backdrop-blur-sm">
            {localize(tradition.era, locale)}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground">
            {localize(tradition.title, locale)}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {localize(tradition.description, locale)}
          </p>
        </div>
      </article>
    </Reveal>
  );
}
