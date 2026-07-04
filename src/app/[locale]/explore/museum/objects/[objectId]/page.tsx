import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ItemDetailTemplate } from "@/components/templates/item-detail-template";
import { EntityCard } from "@/components/ui/entity-card";
import { Object3DViewer } from "@/components/modules/museum/object-3d-viewer";
import { container } from "@/infrastructure/di/container";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; objectId: string }>;
}): Promise<Metadata> {
  const { locale, objectId } = await params;
  const obj = await container.museum.getObjectBySlug(objectId);
  if (!obj) return {};
  return { title: localize(obj.title, locale as Locale), description: localize(obj.description, locale as Locale) };
}

export default async function MuseumObjectPage({
  params,
}: {
  params: Promise<{ locale: string; objectId: string }>;
}) {
  const { locale, objectId } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tCommon, obj] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Common"),
    container.museum.getObjectBySlug(objectId),
  ]);

  if (!obj) notFound();

  const gallery = await container.museum.getGalleryBySlug(obj.gallerySlug);
  const relatedIds = gallery?.objectIds.filter((id) => id !== obj.id) ?? [];
  const related = await container.museum.getObjectsByIds(relatedIds);

  return (
    <ItemDetailTemplate
      breadcrumbs={[
        { label: t("museum.title"), href: "/explore/museum" },
        {
          label: gallery ? localize(gallery.title, currentLocale) : t("museum.title"),
          href: gallery ? `/explore/museum/galleries/${gallery.slug}` : undefined,
        },
        { label: localize(obj.title, currentLocale) },
      ]}
      title={localize(obj.title, currentLocale)}
      subtitle={localize(obj.period, currentLocale)}
      description={localize(obj.description, currentLocale)}
      imageUrl={obj.images[0].url}
      imageAlt={localize(obj.images[0].alt, currentLocale)}
      mediaViewer={obj.has3dModel ? <Object3DViewer /> : undefined}
      badges={[localize(obj.category, currentLocale), obj.has3dModel ? "3D" : localize(obj.material, currentLocale)]}
      metadata={[
        { label: tCommon("year"), value: localize(obj.period, currentLocale) },
        { label: tCommon("material"), value: localize(obj.material, currentLocale) },
        { label: tCommon("dimensions"), value: obj.dimensions },
      ]}
      relatedTitle={tCommon("relatedItems")}
      related={related.slice(0, 4).map((o, i) => (
        <EntityCard
          key={o.id}
          href={`/explore/museum/objects/${o.slug}`}
          title={o.title}
          subtitle={o.period}
          image={o.images[0]}
          aspect="square"
          index={i}
        />
      ))}
    />
  );
}
