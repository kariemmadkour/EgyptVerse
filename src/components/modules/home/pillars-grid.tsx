import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { navPillars } from "@/constants/navigation";

export function PillarsGrid() {
  const t = useTranslations("Home");
  const tNav = useTranslations("Nav");

  return (
    <section className="container-heritage py-16 md:py-24">
      <SectionHeading title={t("pillarsTitle")} />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {navPillars.map((pillar, i) => (
          <Reveal key={pillar.key} delay={i * 0.08}>
            <Link
              href={pillar.modules[0].href}
              className="group block h-full rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <h3 className="font-heading text-xl font-semibold text-foreground group-hover:text-primary">
                {tNav(`pillars.${pillar.key}`)}
              </h3>
              <ul className="mt-4 flex flex-col gap-1.5">
                {pillar.modules.map((mod) => (
                  <li key={mod.key} className="text-sm text-muted-foreground">
                    {tNav(`modules.${mod.key}`)}
                  </li>
                ))}
              </ul>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
