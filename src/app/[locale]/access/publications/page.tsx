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
  return { title: t("publications.title"), description: t("publications.description") };
}

export default async function PublicationsHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tCommon, publications, journals] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Common"),
    container.publications.listPublications({ pageSize: 8 }),
    container.publications.listJournals(),
  ]);

  return (
    <HubTemplate
      eyebrow={t("publications.subtitle")}
      title={t("publications.title")}
      subtitle={t("publications.subtitle")}
      description={t("publications.description")}
      heroImageUrl={publications.items[0]?.cover.url ?? ""}
      heroImageAlt={localize(publications.items[0]?.cover.alt, currentLocale) ?? ""}
      ctaLabel={t("publications.browseCta")}
      ctaHref="#all-publications"
    >
      <ContentSection title={t("publications.title")} viewAllLabel={tCommon("viewAll")} viewAllHref="/access/publications">
        {publications.items.map((pub, i) => (
          <EntityCard
            key={pub.id}
            href={`/access/publications/${pub.slug}`}
            title={pub.title}
            subtitle={pub.authors}
            image={pub.cover}
            aspect="portrait"
            index={i}
          />
        ))}
      </ContentSection>

      <ContentSection title={tCommon("journals")} className="bg-secondary/30" columns={2}>
        {journals.map((journal, i) => (
          <EntityCard
            key={journal.id}
            href={`/access/publications/journals/${journal.slug}`}
            title={journal.title}
            subtitle={journal.description}
            image={journal.cover}
            aspect="landscape"
            index={i}
          />
        ))}
      </ContentSection>
    </HubTemplate>
  );
}
