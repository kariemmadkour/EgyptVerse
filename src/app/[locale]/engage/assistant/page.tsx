import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { ChatShell } from "@/components/modules/assistant/chat-shell";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Modules" });
  return { title: t("assistant.title"), description: t("assistant.description") };
}

export default async function AssistantPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Modules");

  return (
    <div id="main-content">
      <Breadcrumbs items={[{ label: t("assistant.title") }]} />
      <section className="container-heritage py-10 md:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {t("assistant.title")}
          </h1>
          <p className="mt-3 text-balance text-muted-foreground">{t("assistant.description")}</p>
        </Reveal>
        <div className="mt-10">
          <ChatShell />
        </div>
      </section>
    </div>
  );
}
