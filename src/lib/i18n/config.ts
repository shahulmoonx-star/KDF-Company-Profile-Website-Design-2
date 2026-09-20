/**
 * The site's supported locales. Two today (English, Arabic); adding a third
 * later is a one-line change here — everything else (the proxy, content
 * accessors, the layout's dir/lang attributes) derives from this list.
 */
export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Reading direction per locale. Arabic is the only RTL locale today. */
const rtlLocales: ReadonlySet<Locale> = new Set(["ar"]);

export function isRtlLocale(locale: Locale): boolean {
  return rtlLocales.has(locale);
}

export function directionFor(locale: Locale): "ltr" | "rtl" {
  return isRtlLocale(locale) ? "rtl" : "ltr";
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Swaps the locale segment of a pathname, keeping the rest of the path
 * intact — what the language switcher uses so switching language never
 * drops the visitor back to the homepage.
 *
 * buildLocalePath("/ar/about", "en") -> "/en/about"
 */
export function buildLocalePath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/");
  // segments[0] is "" (leading slash); segments[1] is the locale.
  if (segments.length > 1 && isLocale(segments[1])) {
    segments[1] = nextLocale;
    return segments.join("/") || "/";
  }
  return `/${nextLocale}${pathname}`;
}
