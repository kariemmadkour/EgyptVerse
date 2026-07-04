import { notFound } from "next/navigation";
import Image from "next/image";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Lock } from "lucide-react";
import { DashboardShell } from "@/components/templates/dashboard-shell";
import { container } from "@/infrastructure/di/container";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";

export default async function ReadingRoomSessionPage({
  params,
}: {
  params: Promise<{ locale: string; itemId: string }>;
}) {
  const { locale, itemId } = await params;
  setRequestLocale(locale);
  const currentLocale = (await getLocale()) as Locale;

  const [t, tReadingRoom, record] = await Promise.all([
    getTranslations("Modules"),
    getTranslations("ReadingRoom"),
    container.archives.getRecordBySlug(itemId),
  ]);

  if (!record) notFound();

  return (
    <DashboardShell
      breadcrumbs={[
        { label: t("readingRoom.title"), href: "/access/reading-room" },
        { label: localize(record.title, currentLocale) },
      ]}
      title={localize(record.title, currentLocale)}
      description={tReadingRoom("sessionTitle")}
      notice={tReadingRoom("sessionNotice")}
    >
      <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-xl bg-muted">
        <Image
          src={record.thumbnail.url}
          alt={localize(record.thumbnail.alt, currentLocale)}
          fill
          sizes="400px"
          className="object-cover blur-sm"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-basalt/40">
          <Lock className="size-10 text-white" aria-hidden />
        </div>
      </div>
    </DashboardShell>
  );
}
