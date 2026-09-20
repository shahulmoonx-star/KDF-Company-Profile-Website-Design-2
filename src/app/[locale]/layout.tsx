import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import { getSiteSettings } from "@/lib/content/site";
import { directionFor, isLocale, locales, type Locale } from "@/lib/i18n/config";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Geist carries no Arabic glyphs, so Arabic pages would fall back to whatever
// the operating system happens to supply. globals.css applies this on
// html[lang="ar"]; both fonts load on both locales, which keeps the shared
// Latin fragments (KDF, ISO 9001, Treat/Protect/Assure) consistent.
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

/**
 * One statically generated page per locale — see src/app/(root)/page.tsx
 * for how a visitor lands on one of these in the first place.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Metadata is derived from the same CMS-managed, locale-aware site settings
 * the rest of the app reads, so the title, description and favicon all
 * change with the API (and the locale) rather than being hardcoded here.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const site = await getSiteSettings(locale);

  return {
    title: {
      default: site.companyName,
      template: `%s | ${site.shortName}`,
    },
    description: site.description,
    applicationName: site.companyName,
    icons: { icon: site.favicon },
    authors: [{ name: site.developer.name, url: site.developer.url }],
    creator: site.developer.name,
    publisher: site.companyName,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <HtmlShell locale={locale}>
      <FirebaseAnalytics />
      <LoadingScreen />
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} />
    </HtmlShell>
  );
}

/**
 * Separated so `lang`/`dir` are set from the validated, narrowed `Locale`
 * type rather than the raw route param.
 */
function HtmlShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html
      lang={locale}
      dir={directionFor(locale)}
      className={`${geistSans.variable} ${geistMono.variable} ${plexArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
