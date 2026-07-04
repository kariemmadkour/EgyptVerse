import { getTranslations, setRequestLocale } from "next-intl/server";
import { DashboardShell } from "@/components/templates/dashboard-shell";
import { MockForm } from "@/components/ui/mock-form";

export default async function MembershipJoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, tMembership, tStatic, tCommon] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Membership"),
    getTranslations("Static"),
    getTranslations("Common"),
  ]);

  return (
    <DashboardShell
      breadcrumbs={[
        { label: t("membership.title"), href: "/access/membership" },
        { label: tMembership("join") },
      ]}
      title={tMembership("join")}
      description={tMembership("subtitle")}
    >
      <MockForm
        fields={[
          { name: "name", label: tStatic("contact.formName"), required: true },
          { name: "email", label: tStatic("contact.formEmail"), type: "email", required: true },
        ]}
        submitLabel={tMembership("join")}
        successMessage={tCommon("formSuccess")}
      />
    </DashboardShell>
  );
}
