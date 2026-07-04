import { getTranslations, setRequestLocale } from "next-intl/server";
import { ListingTemplate } from "@/components/templates/listing-template";
import { EntityCard } from "@/components/ui/entity-card";
import { container } from "@/infrastructure/di/container";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Modules" });
  return { title: t("events.title"), description: t("events.description") };
}

export default async function EventsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { q, page } = await searchParams;

  const [t, result] = await Promise.all([
    getTranslations("Modules"),
    container.events.listEvents({ query: q, page: page ? Number(page) : 1, pageSize: 12 }),
  ]);

  return (
    <ListingTemplate
      breadcrumbs={[{ label: t("events.title") }]}
      title={t("events.title")}
      description={t("events.description")}
      items={result.items.map((event, i) => (
        <EntityCard
          key={event.id}
          href={`/engage/events/${event.slug}`}
          title={event.title}
          subtitle={event.venue}
          image={event.cover}
          aspect="landscape"
          index={i}
        />
      ))}
      total={result.total}
      page={result.page}
      pageSize={result.pageSize}
      baseHref="/engage/events"
      query={q}
    />
  );
}
