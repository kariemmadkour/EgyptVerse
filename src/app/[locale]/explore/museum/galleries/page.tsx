import { getTranslations, setRequestLocale } from "next-intl/server";
import { ListingTemplate } from "@/components/templates/listing-template";
import { EntityCard } from "@/components/ui/entity-card";
import { container } from "@/infrastructure/di/container";

export default async function MuseumGalleriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, galleries] = await Promise.all([
    getTranslations("Modules"),
    container.museum.listGalleries(),
  ]);

  return (
    <ListingTemplate
      breadcrumbs={[
        { label: t("museum.title"), href: "/explore/museum" },
        { label: t("museum.browseCta") },
      ]}
      title={t("museum.title")}
      description={t("museum.description")}
      items={galleries.map((gallery, i) => (
        <EntityCard
          key={gallery.id}
          href={`/explore/museum/galleries/${gallery.slug}`}
          title={gallery.title}
          subtitle={gallery.description}
          image={gallery.cover}
          aspect="landscape"
          index={i}
        />
      ))}
      total={galleries.length}
      page={1}
      pageSize={galleries.length || 1}
      baseHref="/explore/museum/galleries"
    />
  );
}
