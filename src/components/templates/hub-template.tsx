import Image from "next/image";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

interface HubTemplateProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  heroImageUrl: string;
  heroImageAlt: string;
  ctaLabel: string;
  ctaHref: string;
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
  children,
}: HubTemplateProps) {
  return (
    <div id="main-content">
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
