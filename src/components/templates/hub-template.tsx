import Image from "next/image";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { SectionPattern, type SectionTheme } from "@/components/decorative/heritage-patterns";

interface HubTemplateProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  heroImageUrl: string;
  heroImageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  /** Design-language accent for this pillar/module — see docs/04-design-system.md. */
  sectionTheme?: SectionTheme;
  children?: ReactNode;
}

export function HubTemplate({
  eyebrow,
  title,
  subtitle,
  description,
  heroImageUrl,
  heroImageAlt,
  ctaLabel,
  ctaHref,
  sectionTheme = "modern",
  children,
}: HubTemplateProps) {
  return (
    <div id="main-content" data-section-theme={sectionTheme} className="bg-section-surface">
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-lapis-deep">
        <Image
          src={heroImageUrl}
          alt={heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-basalt via-basalt/40 to-transparent" />
        <SectionPattern
          theme={sectionTheme}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full text-section-accent opacity-25"
        />
        <div className="container-heritage relative z-10 pb-16 pt-32 text-white">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">{eyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-balance font-heading text-4xl font-semibold tracking-tight md:text-6xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-white/80 md:text-xl">{subtitle}</p>
            <p className="mt-4 max-w-2xl text-balance leading-relaxed text-white/70">
              {description}
            </p>
            <Button
              render={<Link href={ctaHref} />}
              size="lg"
              className="mt-8 bg-gold text-basalt hover:bg-gold-soft"
            >
              {ctaLabel}
            </Button>
          </Reveal>
        </div>
      </section>

      {children}
    </div>
  );
}
