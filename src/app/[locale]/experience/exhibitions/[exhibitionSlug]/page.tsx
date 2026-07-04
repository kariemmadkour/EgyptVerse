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
  params: Promise<{ locale: string; exhibitionSlug: string }>;
}): Promise<Metadata> {
  const { locale, exhibitionSlug } = await params;
  const exhibition = await container.exhibitions.getExhibitionBySlug(exhibitionSlug);
  if (!exhibition) return {};
  return {
    title: localize(exhibition.title, locale as Locale),
    description: localize(exhibition.subtitle, locale as Locale),
  };
}

export default async function ExhibitionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; exhibitionSlug: string }>;
}) {
  const { locale, exhibitionSlug } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, exhibition] = await Promise.all([
    getTranslations("Modules"),
    container.exhibitions.getExhibitionBySlug(exhibitionSlug),
  ]);

  if (!exhibition) notFound();

  return (
    <ImmersiveStoryTemplate
      breadcrumbs={[
        { label: t("exhibitions.title"), href: "/experience/exhibitions" },
        { label: localize(exhibition.title, currentLocale) },
      ]}
      title={localize(exhibition.title, currentLocale)}
      subtitle={localize(exhibition.subtitle, currentLocale)}
      heroImageUrl={exhibition.cover.url}
      heroImageAlt={localize(exhibition.cover.alt, currentLocale)}
      chapters={exhibition.chapters.map((chapter) => ({
        id: chapter.id,
        heading: localize(chapter.heading, currentLocale),
        body: localize(chapter.body, currentLocale),
        imageUrl: chapter.media.url,
        imageAlt: localize(chapter.media.alt, currentLocale),
      }))}
    />
  );
}
