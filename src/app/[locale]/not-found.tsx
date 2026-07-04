import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("Common");

  return (
    <div className="container-heritage flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-heading text-6xl font-semibold text-gold">404</p>
      <h1 className="mt-4 font-heading text-2xl font-semibold tracking-tight">{t("noResults")}</h1>
      <Button render={<Link href="/" />} className="mt-8">
        {t("breadcrumbHome")}
      </Button>
    </div>
  );
}
