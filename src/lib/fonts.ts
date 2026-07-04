import {
  Fraunces,
  Inter,
  Noto_Kufi_Arabic,
  Noto_Sans_Arabic,
} from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading-latin",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-latin",
  display: "swap",
});

export const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-heading-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-body-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const fontVariables = [
  fraunces.variable,
  inter.variable,
  notoKufiArabic.variable,
  notoSansArabic.variable,
].join(" ");
