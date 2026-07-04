import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Geist_Mono } from "next/font/google";
import { hasLocale } from "next-intl";
import "../globals.css";
import { routing, localeDirections, type Locale } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QueryProvider } from "@/components/providers/query-provider";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { PageTransition } from "@/components/motion/page-transition";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: {
      default: t("heroTitle"),
      template: "%s — EgyptVerse",
    },
    description: t("heroSubtitle"),
    metadataBase: new URL("https://egypt-digital-heritage.vercel.app"),
    alternates: {
      languages: {
        ar: "/ar",
        en: "/en",
        fr: "/fr",
      },
    },
    openGraph: {
      title: t("heroTitle"),
      description: t("heroSubtitle"),
      type: "website",
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: t("heroTitle"),
      description: t("heroSubtitle"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = localeDirections[locale as Locale];

  return (
    <html lang={locale} dir={dir} className={`${fontVariables} ${geistMono.variable} h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col antialiased">
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <TooltipProvider>
              <SmoothScrollProvider>
                <Header />
                <main className="flex-1">
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
              </SmoothScrollProvider>
            </TooltipProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
