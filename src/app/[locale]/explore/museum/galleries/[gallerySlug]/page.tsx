import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ListingTemplate } from "@/components/templates/listing-template";
import { EntityCard } from "@/components/ui/entity-card";
import { container } from "@/infrastructure/di/container";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";

export default async function MuseumGalleryPage({
  params,
}: {
  params: Promise<{ locale: string; gallerySlug: string }>;
}) {
  const { locale, gallerySlug } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, gallery] = await Promise.all([
    getTranslations("Modules"),
    container.museum.getGalleryBySlug(gallerySlug),
  ]);

  if (!gallery) notFound();

  const objects = await container.museum.getObjectsByIds(gallery.objectIds);

  return (
    <ListingTemplate
      breadcrumbs={[
        { label: t("museum.title"), href: "/explore/museum" },
        { label: localize(gallery.title, currentLocale) },
      ]}
      title={localize(gallery.title, currentLocale)}
      description={localize(gallery.description, currentLocale)}
      items={objects.map((obj, i) => (
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
      total={objects.length}
      page={1}
      pageSize={objects.length || 1}
      baseHref={`/explore/museum/galleries/${gallerySlug}`}
    />
  );
}
