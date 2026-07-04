import { notFound } from "next/navigation";
import Image from "next/image";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { MockForm } from "@/components/ui/mock-form";
import { container } from "@/infrastructure/di/container";
import { localize } from "@/domain/entities";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; eventSlug: string }>;
}): Promise<Metadata> {
  const { locale, eventSlug } = await params;
  const event = await container.events.getEventBySlug(eventSlug);
  if (!event) return {};
  return { title: localize(event.title, locale as Locale), description: localize(event.description, locale as Locale) };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; eventSlug: string }>;
}) {
  const { locale, eventSlug } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tCommon, tStatic, event] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Common"),
    getTranslations("Static"),
    container.events.getEventBySlug(eventSlug),
  ]);

  if (!event) notFound();

  const seatsLeft = event.capacity - event.registered;

  return (
    <div id="main-content">
      <Breadcrumbs
        items={[
          { label: t("events.title"), href: "/engage/events" },
          { label: localize(event.title, currentLocale) },
        ]}
      />
      <article className="container-heritage grid gap-10 py-10 md:grid-cols-2 md:py-16 lg:gap-16">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
          <Image
            src={event.cover.url}
            alt={localize(event.cover.alt, currentLocale)}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{localize(event.category, currentLocale)}</Badge>
            {event.isFree && <Badge className="bg-gold text-basalt">{tCommon("free")}</Badge>}
          </div>
          <h1 className="mt-4 text-balance font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {localize(event.title, currentLocale)}
          </h1>
          <p className="mt-4 leading-relaxed text-foreground/85">
            {localize(event.description, currentLocale)}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {formatDate(event.startsAt, currentLocale)}
              </dt>
              <dd className="mt-1 text-sm font-medium">{localize(event.venue, currentLocale)}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {tCommon("capacity")}
              </dt>
              <dd className="mt-1 text-sm font-medium">
                {seatsLeft} {tCommon("seatsLeft")}
              </dd>
            </div>
          </dl>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-heading text-lg font-semibold">{tCommon("register")}</h2>
            <div className="mt-4">
              <MockForm
                fields={[
                  { name: "name", label: tStatic("contact.formName"), required: true },
                  { name: "email", label: tStatic("contact.formEmail"), type: "email", required: true },
                ]}
                submitLabel={tCommon("register")}
                successMessage={tCommon("formSuccess")}
              />
            </div>
          </div>
        </Reveal>
      </article>
    </div>
  );
}
