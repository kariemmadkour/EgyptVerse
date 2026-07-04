import { getTranslations, setRequestLocale } from "next-intl/server";
import { DashboardShell } from "@/components/templates/dashboard-shell";
import { MockForm } from "@/components/ui/mock-form";

export default async function ResearchRequestsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tResearch, tStatic, tCommon] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Research"),
    getTranslations("Static"),
    getTranslations("Common"),
  ]);

  return (
    <DashboardShell
      breadcrumbs={[
        { label: t("research.title"), href: "/engage/research" },
        { label: tResearch("requestsTitle") },
      ]}
      title={tResearch("requestsTitle")}
      description={tResearch("requestsIntro")}
    >
      <MockForm
        fields={[
          { name: "name", label: tStatic("contact.formName"), required: true },
          { name: "email", label: tStatic("contact.formEmail"), type: "email", required: true },
          { name: "subject", label: tStatic("contact.formSubject"), required: true },
          { name: "message", label: tStatic("contact.formMessage"), type: "textarea", required: true },
        ]}
        submitLabel={tStatic("contact.formSubmit")}
        successMessage={tCommon("formSuccess")}
      />
    </DashboardShell>
  );
}
