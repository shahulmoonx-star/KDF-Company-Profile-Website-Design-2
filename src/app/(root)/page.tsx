"use client";

import { useEffect } from "react";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";

const LOCALE_COOKIE = "kdf_locale";

/**
 * Static export has no middleware, so unlike the old src/proxy.ts (which
 * inspected the Accept-Language header on the server) this picks a locale
 * client-side: the visitor's remembered cookie first, then the browser's
 * language list, falling back to the default. Firebase Hosting serves this
 * page's prerendered HTML directly at "/", so the <noscript> refresh below
 * still lands JS-disabled visitors on the default locale.
 */
function pickLocale(): string {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]+)`));
    if (match && isLocale(match[1])) return match[1];
  }
  if (typeof navigator !== "undefined") {
    for (const tag of navigator.languages ?? [navigator.language]) {
      const base = tag.split("-")[0]?.toLowerCase();
      if (base && isLocale(base)) return base;
    }
  }
  return defaultLocale;
}

export default function RootRedirect() {
  useEffect(() => {
    window.location.replace(`/${pickLocale()}/`);
  }, []);

  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}/`} />
      </noscript>
      <main
        style={{
          display: "grid",
          placeItems: "center",
          minHeight: "100dvh",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p>
          {locales.map((locale, i) => (
            <span key={locale}>
              {i > 0 && " · "}
              <a href={`/${locale}/`}>{locale === "ar" ? "المتابعة بالعربية" : "Continue in English"}</a>
            </span>
          ))}
        </p>
      </main>
    </>
  );
}
