import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { HubTemplate } from "@/components/templates/hub-template";
import { HorizontalEraScroller } from "@/components/modules/timelines/horizontal-era-scroller";
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
  return { title: t("timelines.title"), description: t("timelines.description") };
}

export default async function TimelinesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, eras] = await Promise.all([
    getTranslations("Modules"),
    container.timelines.listEras(),
  ]);

  return (
    <HubTemplate
      eyebrow={t("timelines.subtitle")}
      title={t("timelines.title")}
      subtitle={t("timelines.subtitle")}
      description={t("timelines.description")}
      heroImageUrl={eras[0]?.cover.url ?? ""}
      heroImageAlt={localize(eras[0]?.cover.alt, currentLocale) ?? ""}
      ctaLabel={t("timelines.browseCta")}
      ctaHref={`/experience/timelines/${eras[0]?.slug ?? ""}`}
    >
      <div className="py-16 md:py-24">
        <h2 className="container-heritage font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          {t("timelines.title")}
        </h2>
        <p className="container-heritage mt-2 max-w-xl text-muted-foreground">
          {t("timelines.description")}
        </p>
        <div className="mt-10">
          <HorizontalEraScroller eras={eras} />
        </div>
      </div>
    </HubTemplate>
  );
}
