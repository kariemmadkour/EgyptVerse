import { getTranslations, setRequestLocale } from "next-intl/server";
import { HubTemplate } from "@/components/templates/hub-template";
import { ContentSection } from "@/components/templates/content-section";
import { Link } from "@/i18n/navigation";
import { container } from "@/infrastructure/di/container";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Modules" });
  return { title: t("research.title"), description: t("research.description") };
}

export default async function ResearchPortalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tResearch, records] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Research"),
    container.archives.listRecords({ pageSize: 1 }),
  ]);

  return (
    <HubTemplate
      eyebrow={t("research.subtitle")}
      title={t("research.title")}
      subtitle={t("research.subtitle")}
      description={t("research.description")}
      heroImageUrl={records.items[0]?.thumbnail.url ?? ""}
      heroImageAlt=""
      sectionTheme="greco-roman"
      ctaLabel={t("research.browseCta")}
      ctaHref="/engage/research/search"
    >
      <ContentSection title={tResearch("searchTitle")} columns={2}>
        <Link
          href="/engage/research/search"
          className="block rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <h3 className="font-heading text-xl font-semibold">{tResearch("searchTitle")}</h3>
        </Link>
        <Link
          href="/engage/research/requests"
          className="block rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <h3 className="font-heading text-xl font-semibold">{tResearch("requestsTitle")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{tResearch("requestsIntro")}</p>
        </Link>
      </ContentSection>
    </HubTemplate>
  );
}
