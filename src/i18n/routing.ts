import { defineRouting } from "next-intl/routing";

export const locales = ["ar", "en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const localeDirections: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
  fr: "ltr",
};

export const localeLabels: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
  fr: "Français",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});
