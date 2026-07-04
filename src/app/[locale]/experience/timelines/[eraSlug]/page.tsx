import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ImmersiveStoryTemplate } from "@/components/templates/immersive-story-template";
import { container } from "@/infrastructure/di/container";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; eraSlug: string }>;
}): Promise<Metadata> {
  const { locale, eraSlug } = await params;
  const era = await container.timelines.getEraBySlug(eraSlug);
  if (!era) return {};
  return { title: localize(era.name, locale as Locale), description: localize(era.description, locale as Locale) };
}

export default async function TimelineEraPage({
  params,
}: {
  params: Promise<{ locale: string; eraSlug: string }>;
}) {
  const { locale, eraSlug } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, era] = await Promise.all([
    getTranslations("Modules"),
    container.timelines.getEraBySlug(eraSlug),
  ]);

  if (!era) notFound();

  return (
    <ImmersiveStoryTemplate
      breadcrumbs={[
        { label: t("timelines.title"), href: "/experience/timelines" },
        { label: localize(era.name, currentLocale) },
      ]}
      title={localize(era.name, currentLocale)}
      subtitle={localize(era.description, currentLocale)}
      heroImageUrl={era.cover.url}
      heroImageAlt={localize(era.cover.alt, currentLocale)}
      chapters={era.events.map((event) => ({
        id: event.id,
        eyebrow: localize(event.yearLabel, currentLocale),
        heading: localize(event.title, currentLocale),
        body: localize(event.description, currentLocale),
        imageUrl: event.media.url,
        imageAlt: localize(event.media.alt, currentLocale),
      }))}
    />
  );
}
