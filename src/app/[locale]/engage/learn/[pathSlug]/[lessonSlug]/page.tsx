import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ItemDetailTemplate } from "@/components/templates/item-detail-template";
import { EntityCard } from "@/components/ui/entity-card";
import { container } from "@/infrastructure/di/container";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; pathSlug: string; lessonSlug: string }>;
}): Promise<Metadata> {
  const { locale, pathSlug, lessonSlug } = await params;
  const lesson = await container.learning.getLesson(pathSlug, lessonSlug);
  if (!lesson) return {};
  return { title: localize(lesson.title, locale as Locale), description: localize(lesson.summary, locale as Locale) };
}

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ locale: string; pathSlug: string; lessonSlug: string }>;
}) {
  const { locale, pathSlug, lessonSlug } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tCommon, path, lesson] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Common"),
    container.learning.getPathBySlug(pathSlug),
    container.learning.getLesson(pathSlug, lessonSlug),
  ]);

  if (!path || !lesson) notFound();

  const allLessons = await container.learning.getLessonsByPath(pathSlug);
  const related = allLessons.filter((l) => l.id !== lesson.id);

  return (
    <ItemDetailTemplate
      breadcrumbs={[
        { label: t("learn.title"), href: "/engage/learn" },
        { label: localize(path.title, currentLocale), href: `/engage/learn/${pathSlug}` },
        { label: localize(lesson.title, currentLocale) },
      ]}
      title={localize(lesson.title, currentLocale)}
      subtitle={localize(lesson.summary, currentLocale)}
      description={localize(lesson.body, currentLocale)}
      imageUrl={lesson.cover.url}
      imageAlt={localize(lesson.cover.alt, currentLocale)}
      badges={[`${lesson.durationMinutes} ${tCommon("minutes")}`]}
      metadata={[{ label: tCommon("duration"), value: `${lesson.durationMinutes} ${tCommon("minutes")}` }]}
      relatedTitle={tCommon("relatedItems")}
      related={related.map((l, i) => (
        <EntityCard
          key={l.id}
          href={`/engage/learn/${pathSlug}/${l.slug}`}
          title={l.title}
          subtitle={l.summary}
          image={l.cover}
          aspect="landscape"
          index={i}
        />
      ))}
    />
  );
}
