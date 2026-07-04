import { getTranslations, setRequestLocale } from "next-intl/server";
import { StaticTemplate } from "@/components/templates/static-template";
import { MockForm } from "@/components/ui/mock-form";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Static.contact" });
  return { title: t("title"), description: t("intro") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tCommon] = await Promise.all([
    getTranslations("Static.contact"),
    getTranslations("Common"),
  ]);

  return (
    <StaticTemplate breadcrumbs={[{ label: t("title") }]} title={t("title")} intro={t("intro")}>
      <MockForm
        fields={[
          { name: "name", label: t("formName"), required: true },
          { name: "email", label: t("formEmail"), type: "email", required: true },
          { name: "subject", label: t("formSubject"), required: true },
          { name: "message", label: t("formMessage"), type: "textarea", required: true },
        ]}
        submitLabel={t("formSubmit")}
        successMessage={tCommon("formSuccess")}
      />
    </StaticTemplate>
  );
}
