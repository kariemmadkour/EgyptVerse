import Image from "next/image";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { getHomeShowcaseData } from "@/application/services/home.service";
import { HeroSection } from "@/components/modules/home/hero-section";
import { PillarsGrid } from "@/components/modules/home/pillars-grid";
import { ManuscriptsSpotlight } from "@/components/modules/home/manuscripts-spotlight";
import { ContentSection } from "@/components/templates/content-section";
import { EntityCard } from "@/components/ui/entity-card";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tCommon, data] = await Promise.all([
    getTranslations("Home"),
    getTranslations("Common"),
    getHomeShowcaseData(),
  ]);
  const currentLocale = (await getLocale()) as Locale;

  const { currentExhibition, featuredBooks, featuredObjects, eras, upcomingEvents, latestNews } =
    data;

  return (
    <>
      <HeroSection />
      <ManuscriptsSpotlight locale={currentLocale} />
      <PillarsGrid />

      {currentExhibition && (
        <section className="relative overflow-hidden">
          <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
            <Image
              src={currentExhibition.cover.url}
              alt={localize(currentExhibition.cover.alt, currentLocale)}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-basalt via-basalt/30 to-transparent" />
          </div>
          <div className="container-heritage absolute inset-0 flex items-end pb-12 text-white md:pb-20">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                {t("currentExhibitionLabel")}
              </p>
              <h2 className="mt-2 max-w-2xl text-balance font-heading text-3xl font-semibold md:text-5xl">
                {localize(currentExhibition.title, currentLocale)}
              </h2>
              <p className="mt-2 max-w-xl text-white/80">
                {localize(currentExhibition.subtitle, currentLocale)}
              </p>
              <Button
                render={<Link href={`/experience/exhibitions/${currentExhibition.slug}`} />}
                className="mt-6 bg-gold text-basalt hover:bg-gold-soft"
              >
                {tCommon("learnMore")}
              </Button>
            </Reveal>
          </div>
        </section>
      )}

      <ContentSection
        eyebrow={t("featuredBooksTitle")}
        title={t("featuredBooksTitle")}
        viewAllLabel={tCommon("viewAll")}
        viewAllHref="/explore/library/browse"
      >
        {featuredBooks.map((book, i) => (
          <EntityCard
            key={book.id}
            href={`/explore/library/${book.slug}`}
            title={book.title}
            subtitle={book.author}
            image={book.cover}
            aspect="portrait"
            index={i}
          />
        ))}
      </ContentSection>

      <ContentSection
        eyebrow={t("featuredObjectsTitle")}
        title={t("featuredObjectsTitle")}
        viewAllLabel={tCommon("viewAll")}
        viewAllHref="/explore/museum"
        className="bg-secondary/30"
      >
        {featuredObjects.map((obj, i) => (
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
      </ContentSection>

      <section className="container-heritage py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {t("timelineTeaserTitle")}
          </h2>
          <Link href="/experience/timelines" className="text-sm font-medium text-primary hover:underline">
            {t("timelineTeaserCta")}
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {eras.map((era, i) => (
            <Reveal key={era.id} delay={i * 0.1}>
              <Link
                href={`/experience/timelines/${era.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={era.cover.url}
                  alt={localize(era.cover.alt, currentLocale)}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-basalt/90 via-basalt/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs uppercase tracking-wide text-gold">
                    {Math.abs(era.startYear)} {era.startYear < 0 ? "BCE" : "CE"} — {Math.abs(era.endYear)}{" "}
                    {era.endYear < 0 ? "BCE" : "CE"}
                  </p>
                  <h3 className="mt-1 font-heading text-lg font-semibold">
                    {localize(era.name, currentLocale)}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <ContentSection eyebrow={t("newsTitle")} title={t("newsTitle")} columns={2}>
          {latestNews.map((article, i) => (
            <EntityCard
              key={article.id}
              href={`/news/${article.slug}`}
              title={article.title}
              subtitle={article.category}
              image={article.cover}
              aspect="landscape"
              index={i}
            />
          ))}
        </ContentSection>
        <ContentSection eyebrow={t("eventsTitle")} title={t("eventsTitle")} columns={2} className="bg-secondary/30">
          {upcomingEvents.map((event, i) => (
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
        </ContentSection>
      </div>

      <section className="container-heritage py-16 md:py-24">
        <div className="rounded-3xl bg-lapis-deep px-8 py-16 text-center text-white md:px-16">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-balance font-heading text-3xl font-semibold md:text-4xl">
              {t("ctaBandTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-balance text-white/75">{t("ctaBandText")}</p>
            <Button
              render={<Link href="/access/membership" />}
              size="lg"
              className="mt-8 bg-gold text-basalt hover:bg-gold-soft"
            >
              {t("ctaBandCta")}
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
