import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { DashboardShell } from "@/components/templates/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { container } from "@/infrastructure/di/container";
import { localize } from "@/domain/entities";
import { formatDate } from "@/lib/format";
import type { Locale } from "@/i18n/routing";

export default async function MembershipAccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tMembership, tCommon, tier] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Membership"),
    getTranslations("Common"),
    container.membership.getTierBySlug("researcher"),
  ]);

  return (
    <DashboardShell
      breadcrumbs={[
        { label: t("membership.title"), href: "/access/membership" },
        { label: tCommon("viewDetails") },
      ]}
      title={tMembership("mockMemberName")}
      description={tMembership("mockMemberEmail")}
      notice={tMembership("accountNotice")}
    >
      {tier && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge className="bg-gold text-basalt">{localize(tier.name, currentLocale)}</Badge>
            <p className="mt-2 text-sm text-muted-foreground">
              {tMembership("memberSince")}: {formatDate(new Date(), currentLocale)}
            </p>
          </div>
        </div>
      )}
      <ul className="mt-6 flex flex-col gap-2 border-t border-border pt-6">
        {tier?.benefits.map((benefit, i) => (
          <li key={i} className="text-sm text-foreground/85">
            · {localize(benefit, currentLocale)}
          </li>
        ))}
      </ul>
    </DashboardShell>
  );
}
