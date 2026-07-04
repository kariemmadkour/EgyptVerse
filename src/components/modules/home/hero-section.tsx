"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { TutankhamunModelViewer } from "@/components/modules/home/tutankhamun-model-viewer";
import type { Locale } from "@/i18n/routing";

interface HeroStat {
  value: number;
  suffix: string;
  labelKey: "statsVisitors" | "statsItems" | "statsManuscripts" | "statsLanguages";
}

const stats: HeroStat[] = [
  { value: 480000, suffix: "+", labelKey: "statsVisitors" },
  { value: 92000, suffix: "+", labelKey: "statsItems" },
  { value: 1200, suffix: "+", labelKey: "statsManuscripts" },
  { value: 3, suffix: "", labelKey: "statsLanguages" },
];

export function HeroSection() {
  const t = useTranslations("Home");
  const locale = useLocale() as Locale;

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-lapis-deep text-white">
      <Image
        src="/images/hero/tutankhamun-golden-mask.jpg"
        alt={t("heroImageAlt")}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[78%_25%] opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-lapis-deep via-lapis-deep/85 to-lapis-deep/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-basalt/50 via-transparent to-basalt" />

      <div className="container-heritage relative z-10 grid gap-16 py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              {t("heroEyebrow")}
            </p>
            <h1 className="mt-4 max-w-4xl text-balance font-heading text-5xl font-semibold tracking-tight md:text-7xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-5 max-w-2xl text-balance text-lg text-white/80 md:text-xl">
              {t("heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                render={<Link href="/explore/library" />}
                size="lg"
                className="bg-gold text-basalt hover:bg-gold-soft"
              >
                {t("heroCta")}
              </Button>
              <Button
                render={<Link href="/experience/exhibitions" />}
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/5 text-white hover:bg-white/10"
              >
                {t("heroSecondaryCta")}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.labelKey}>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  locale={locale}
                  className="font-heading text-3xl font-semibold text-gold md:text-4xl"
                />
                <p className="mt-1 text-sm text-white/70">{t(stat.labelKey)}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="flex justify-center lg:justify-end">
          <TutankhamunModelViewer />
        </Reveal>
      </div>
    </section>
  );
}
