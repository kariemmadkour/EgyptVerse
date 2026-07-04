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
  return { title: t("learn.title"), description: t("learn.description") };
}

export default async function LearnHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, paths] = await Promise.all([
    getTranslations("Modules"),
    container.learning.listPaths(),
  ]);

  return (
    <HubTemplate
      eyebrow={t("learn.subtitle")}
      title={t("learn.title")}
      subtitle={t("learn.subtitle")}
      description={t("learn.description")}
      heroImageUrl={paths[0]?.cover.url ?? ""}
      heroImageAlt={localize(paths[0]?.cover.alt, currentLocale) ?? ""}
      ctaLabel={t("learn.browseCta")}
      ctaHref={`/engage/learn/${paths[0]?.slug ?? ""}`}
    >
      <ContentSection title={t("learn.title")} columns={2}>
        {paths.map((path, i) => (
          <EntityCard
            key={path.id}
            href={`/engage/learn/${path.slug}`}
            title={path.title}
            subtitle={path.description}
            image={path.cover}
            aspect="landscape"
            index={i}
          />
        ))}
      </ContentSection>
    </HubTemplate>
  );
}
