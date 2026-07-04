import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { container } from "@/infrastructure/di/container";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Modules" });
  return { title: t("membership.title"), description: t("membership.description") };
}

export default async function MembershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tMembership, tCommon, tiers] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("Membership"),
    getTranslations("Common"),
    container.membership.listTiers(),
  ]);

  return (
    <div id="main-content">
      <Breadcrumbs items={[{ label: t("membership.title") }]} />
      <section className="container-heritage py-10 md:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {tMembership("title")}
          </h1>
          <p className="mt-3 text-balance text-muted-foreground">{tMembership("subtitle")}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 0.1}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-2xl border p-8",
                  tier.featured ? "border-gold bg-gold-soft/30 shadow-lg" : "border-border bg-card",
                )}
              >
                {tier.featured && (
                  <Badge className="mb-3 w-fit bg-gold text-basalt">{tMembership("mostPopular")}</Badge>
                )}
                <h2 className="font-heading text-xl font-semibold">
                  {localize(tier.name, currentLocale)}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {localize(tier.description, currentLocale)}
                </p>
                <p className="mt-6 font-heading text-3xl font-semibold">
                  {tier.priceEGP === 0 ? tMembership("freeLabel") : `${tier.priceEGP} EGP`}
                  {tier.priceEGP > 0 && (
                    <span className="text-sm font-normal text-muted-foreground"> / {tMembership("perYear")}</span>
                  )}
                </p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {tMembership("benefitsTitle")}
                </p>
                <ul className="mt-3 flex flex-1 flex-col gap-2">
                  {tier.benefits.map((benefit, bi) => (
                    <li key={bi} className="text-sm text-foreground/85">
                      · {localize(benefit, currentLocale)}
                    </li>
                  ))}
                </ul>
                <Button
                  render={<Link href="/access/membership/join" />}
                  className="mt-8"
                  variant={tier.featured ? "default" : "outline"}
                >
                  {tMembership("join")}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/access/membership/account" className="text-sm text-primary hover:underline">
            {tCommon("viewDetails")}
          </Link>
        </div>
      </section>
    </div>
  );
}
