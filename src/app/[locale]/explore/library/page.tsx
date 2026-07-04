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
  return { title: t("library.title"), description: t("library.description") };
}

export default async function LibraryHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tCommon, featuredBooks, collections] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Common"),
    container.library.getFeaturedBooks(8),
    container.library.listCollections(),
  ]);

  return (
    <HubTemplate
      eyebrow={t("library.subtitle")}
      title={t("library.title")}
      subtitle={t("library.subtitle")}
      description={t("library.description")}
      heroImageUrl={featuredBooks[0]?.cover.url ?? ""}
      heroImageAlt={localize(featuredBooks[0]?.cover.alt, currentLocale) ?? ""}
      ctaLabel={t("library.browseCta")}
      ctaHref="/explore/library/browse"
    >
      <ContentSection
        title={tCommon("featured")}
        viewAllLabel={tCommon("viewAll")}
        viewAllHref="/explore/library/browse"
      >
        {featuredBooks.map((book, i) => (
          <EntityCard
            key={book.id}
            href={`/explore/library/${book.slug}`}
            title={book.title}
            subtitle={book.author}
            image={book.cover}
            aspect="portrait"
            index={i}
          />
        ))}
      </ContentSection>

      <ContentSection title={tCommon("browse")} className="bg-secondary/30" columns={2}>
        {collections.map((collection, i) => (
          <EntityCard
            key={collection.id}
            href={`/explore/library/collections/${collection.slug}`}
            title={collection.title}
            subtitle={collection.description}
            image={collection.cover}
            aspect="landscape"
            index={i}
          />
        ))}
      </ContentSection>
    </HubTemplate>
  );
}
