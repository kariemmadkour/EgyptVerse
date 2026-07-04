import type { Locale } from "@/i18n/routing";

/** Egyptian Arabic content uses Eastern Arabic-Indic numerals; EN/FR use Western digits. */
const numberLocaleTags: Record<Locale, string> = {
  ar: "ar-EG-u-nu-arab",
  en: "en-US",
  fr: "fr-FR",
};

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(numberLocaleTags[locale]).format(value);
}

export function formatDate(
  date: string | Date,
  locale: Locale,
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" },
): string {
  return new Intl.DateTimeFormat(numberLocaleTags[locale], options).format(new Date(date));
}

export function formatDateRange(start: string | Date, end: string | Date, locale: Locale): string {
  return new Intl.DateTimeFormat(numberLocaleTags[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).formatRange(new Date(start), new Date(end));
}
