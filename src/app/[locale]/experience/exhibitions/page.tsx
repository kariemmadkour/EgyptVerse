import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { HubTemplate } from "@/components/templates/hub-template";
import { ContentSection } from "@/components/templates/content-section";
import { EntityCard } from "@/components/ui/entity-card";
import { container } from "@/infrastructure/di/container";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Modules" });
  return { title: t("exhibitions.title"), description: t("exhibitions.description") };
}

export default async function ExhibitionsHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tCommon, exhibitions] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Common"),
    container.exhibitions.listExhibitions(),
  ]);

  const current = exhibitions.filter((e) => e.status === "current");
  const upcoming = exhibitions.filter((e) => e.status === "upcoming");
  const past = exhibitions.filter((e) => e.status === "past");

  return (
    <HubTemplate
      eyebrow={t("exhibitions.subtitle")}
      title={t("exhibitions.title")}
      subtitle={t("exhibitions.subtitle")}
      description={t("exhibitions.description")}
      heroImageUrl={current[0]?.cover.url ?? exhibitions[0]?.cover.url ?? ""}
      heroImageAlt={localize(current[0]?.cover.alt ?? exhibitions[0]?.cover.alt, currentLocale) ?? ""}
      ctaLabel={t("exhibitions.browseCta")}
      ctaHref={`/experience/exhibitions/${(current[0] ?? exhibitions[0])?.slug ?? ""}`}
    >
      {current.length > 0 && (
        <ContentSection title={tCommon("featured")} columns={3}>
          {current.map((e, i) => (
            <EntityCard
              key={e.id}
              href={`/experience/exhibitions/${e.slug}`}
              title={e.title}
              subtitle={e.subtitle}
              image={e.cover}
              aspect="landscape"
              index={i}
            />
          ))}
        </ContentSection>
      )}
      {upcoming.length > 0 && (
        <ContentSection title={tCommon("next")} columns={3} className="bg-secondary/30">
          {upcoming.map((e, i) => (
            <EntityCard
              key={e.id}
              href={`/experience/exhibitions/${e.slug}`}
              title={e.title}
              subtitle={e.subtitle}
              image={e.cover}
              aspect="landscape"
              index={i}
            />
          ))}
        </ContentSection>
      )}
      {past.length > 0 && (
        <ContentSection title={tCommon("previous")} columns={3}>
          {past.map((e, i) => (
            <EntityCard
              key={e.id}
              href={`/experience/exhibitions/${e.slug}`}
              title={e.title}
              subtitle={e.subtitle}
              image={e.cover}
              aspect="landscape"
              index={i}
            />
          ))}
        </ContentSection>
      )}
    </HubTemplate>
  );
}
