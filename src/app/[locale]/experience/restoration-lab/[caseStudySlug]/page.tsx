import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { RestorationCaseTemplate } from "@/components/templates/restoration-case-template";
import { container } from "@/infrastructure/di/container";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; caseStudySlug: string }>;
}): Promise<Metadata> {
  const { locale, caseStudySlug } = await params;
  const cs = await container.restoration.getCaseStudyBySlug(caseStudySlug);
  if (!cs) return {};
  return { title: localize(cs.title, locale as Locale), description: localize(cs.summary, locale as Locale) };
}

export default async function RestorationCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; caseStudySlug: string }>;
}) {
  const { locale, caseStudySlug } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tCommon, cs] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Common"),
    container.restoration.getCaseStudyBySlug(caseStudySlug),
  ]);

  if (!cs) notFound();

  return (
    <RestorationCaseTemplate
      breadcrumbs={[
        { label: t("restorationLab.title"), href: "/experience/restoration-lab" },
        { label: localize(cs.title, currentLocale) },
      ]}
      title={localize(cs.title, currentLocale)}
      summary={localize(cs.summary, currentLocale)}
      beforeUrl={cs.beforeImage.url}
      beforeAlt={localize(cs.beforeImage.alt, currentLocale)}
      afterUrl={cs.afterImage.url}
      afterAlt={localize(cs.afterImage.alt, currentLocale)}
      beforeLabel={tCommon("before")}
      afterLabel={tCommon("after")}
      metadata={[
        { label: tCommon("technique"), value: localize(cs.technique, currentLocale) },
        { label: tCommon("conservator"), value: localize(cs.conservator, currentLocale) },
        { label: tCommon("duration"), value: `${cs.durationWeeks} ${tCommon("weeks")}` },
      ]}
    />
  );
}
