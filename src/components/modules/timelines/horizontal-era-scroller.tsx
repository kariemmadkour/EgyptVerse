"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useGsapScope } from "@/hooks/use-gsap";
import { localize, type TimelineEra } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";

export function HorizontalEraScroller({ eras }: { eras: TimelineEra[] }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Common");

  const scope = useGsapScope<HTMLDivElement>(({ scope, gsap }) => {
    const track = scope.current?.querySelector<HTMLElement>("[data-track]");
    if (!track) return;

    const distance = track.scrollWidth - (scope.current?.clientWidth ?? 0);
    if (distance <= 0) return;

    gsap.to(track, {
      x: () => -distance,
      ease: "none",
      scrollTrigger: {
        trigger: scope.current,
        start: "top top",
        end: () => `+=${distance}`,
        scrub: 1,
        pin: true,
        // Ancestors (e.g. the Framer Motion page-transition wrapper) apply a
        // CSS transform, which makes them a containing block for
        // `position: fixed`. Pinning via transform instead avoids GSAP
        // computing offsets against the wrong containing block.
        pinType: "transform",
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }, [eras]);

  return (
    <div ref={scope} className="relative overflow-hidden">
      <div data-track className="flex w-max gap-6 px-6 md:px-10 lg:px-16">
        {eras.map((era) => (
          <Link
            key={era.id}
            href={`/experience/timelines/${era.slug}`}
            className="group relative block h-[70vh] w-[80vw] shrink-0 overflow-hidden rounded-3xl sm:w-[60vw] lg:w-[45vw]"
          >
            <Image
              src={era.cover.url}
              alt={localize(era.cover.alt, locale)}
              fill
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 60vw, 80vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-basalt via-basalt/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                {Math.abs(era.startYear)} {era.startYear < 0 ? "BCE" : "CE"} —{" "}
                {Math.abs(era.endYear)} {era.endYear < 0 ? "BCE" : "CE"}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-semibold md:text-3xl">
                {localize(era.name, locale)}
              </h3>
              <p className="mt-2 max-w-md text-sm text-white/75">
                {localize(era.description, locale)}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-gold">
                {t("viewDetails")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
