import { getTranslations, setRequestLocale } from "next-intl/server";
import { StaticTemplate } from "@/components/templates/static-template";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Static.privacy" });
  return { title: t("title"), description: t("intro") };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Static.privacy");

  return <StaticTemplate breadcrumbs={[{ label: t("title") }]} title={t("title")} intro={t("intro")} />;
}
