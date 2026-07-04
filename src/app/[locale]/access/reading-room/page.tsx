import { getTranslations, setRequestLocale } from "next-intl/server";
import { DashboardShell } from "@/components/templates/dashboard-shell";
import { MockForm } from "@/components/ui/mock-form";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Modules" });
  return { title: t("readingRoom.title"), description: t("readingRoom.description") };
}

export default async function ReadingRoomGatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tReadingRoom, tStatic, tCommon] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("ReadingRoom"),
    getTranslations("Static"),
    getTranslations("Common"),
  ]);

  return (
    <DashboardShell
      breadcrumbs={[{ label: t("readingRoom.title") }]}
      title={tReadingRoom("gateTitle")}
      description={tReadingRoom("gateDescription")}
    >
      <MockForm
        fields={[
          { name: "name", label: tStatic("contact.formName"), required: true },
          { name: "email", label: tStatic("contact.formEmail"), type: "email", required: true },
          { name: "reason", label: tStatic("contact.formMessage"), type: "textarea", required: true },
        ]}
        submitLabel={tReadingRoom("requestAccessCta")}
        successMessage={tCommon("formSuccess")}
      />
    </DashboardShell>
  );
}
