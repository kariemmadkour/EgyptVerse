import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ListingTemplate } from "@/components/templates/listing-template";
import { EntityCard } from "@/components/ui/entity-card";
import { container } from "@/infrastructure/di/container";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";

export default async function LearningPathPage({
  params,
}: {
  params: Promise<{ locale: string; pathSlug: string }>;
}) {
  const { locale, pathSlug } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, path] = await Promise.all([
    getTranslations("Modules"),
    container.learning.getPathBySlug(pathSlug),
  ]);

  if (!path) notFound();

  const lessons = await container.learning.getLessonsByPath(pathSlug);

  return (
    <ListingTemplate
      breadcrumbs={[
        { label: t("learn.title"), href: "/engage/learn" },
        { label: localize(path.title, currentLocale) },
      ]}
      title={localize(path.title, currentLocale)}
      description={localize(path.description, currentLocale)}
      items={lessons.map((lesson, i) => (
        <EntityCard
          key={lesson.id}
          href={`/engage/learn/${pathSlug}/${lesson.slug}`}
          title={lesson.title}
          subtitle={lesson.summary}
          image={lesson.cover}
          aspect="landscape"
          index={i}
        />
      ))}
      total={lessons.length}
      page={1}
      pageSize={lessons.length || 1}
      baseHref={`/engage/learn/${pathSlug}`}
    />
  );
}
