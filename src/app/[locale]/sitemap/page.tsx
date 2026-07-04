import { getTranslations, setRequestLocale } from "next-intl/server";
import { StaticTemplate } from "@/components/templates/static-template";
import { Link } from "@/i18n/navigation";
import { navPillars, utilityLinks } from "@/constants/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Static.sitemap" });
  return { title: t("title"), description: t("intro") };
}

export default async function SitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tNav] = await Promise.all([
    getTranslations("Static.sitemap"),
    getTranslations("Nav"),
  ]);

  return (
    <StaticTemplate breadcrumbs={[{ label: t("title") }]} title={t("title")} intro={t("intro")}>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        {navPillars.map((pillar) => (
          <div key={pillar.key}>
            <h2 className="font-heading text-lg font-semibold">{tNav(`pillars.${pillar.key}`)}</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {pillar.modules.map((mod) => (
                <li key={mod.key}>
                  <Link href={mod.href} className="text-primary hover:underline">
                    {tNav(`modules.${mod.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="font-heading text-lg font-semibold">{tNav("utility.about")}</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {utilityLinks.map((link) => (
              <li key={link.key}>
                <Link href={link.href} className="text-primary hover:underline">
                  {tNav(`utility.${link.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StaticTemplate>
  );
}
