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
  return { title: t("museum.title"), description: t("museum.description") };
}

export default async function MuseumHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tCommon, featured, galleries] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Common"),
    container.museum.getFeaturedObjects(8),
    container.museum.listGalleries(),
  ]);

  return (
    <HubTemplate
      eyebrow={t("museum.subtitle")}
      title={t("museum.title")}
      subtitle={t("museum.subtitle")}
      description={t("museum.description")}
      heroImageUrl={featured[0]?.images[0]?.url ?? ""}
      heroImageAlt={localize(featured[0]?.images[0]?.alt, currentLocale) ?? ""}
      ctaLabel={t("museum.browseCta")}
      ctaHref="/explore/museum/galleries"
    >
      <ContentSection
        title={tCommon("featured")}
        viewAllLabel={tCommon("viewAll")}
        viewAllHref="/explore/museum/galleries"
      >
        {featured.map((obj, i) => (
          <EntityCard
            key={obj.id}
            href={`/explore/museum/objects/${obj.slug}`}
            title={obj.title}
            subtitle={obj.period}
            image={obj.images[0]}
            aspect="square"
            index={i}
          />
        ))}
      </ContentSection>

      <ContentSection title={tCommon("browse")} className="bg-secondary/30" columns={2}>
        {galleries.map((gallery, i) => (
          <EntityCard
            key={gallery.id}
            href={`/explore/museum/galleries/${gallery.slug}`}
            title={gallery.title}
            subtitle={gallery.description}
            image={gallery.cover}
            aspect="landscape"
            index={i}
          />
        ))}
      </ContentSection>
    </HubTemplate>
  );
}
