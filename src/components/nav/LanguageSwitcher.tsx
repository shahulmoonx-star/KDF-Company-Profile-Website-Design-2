"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildLocalePath, locales, type Locale } from "@/lib/i18n/config";
import { getUiStrings } from "@/lib/i18n/ui-strings";
import { useNavAppearance } from "./nav-appearance";

const LOCALE_COOKIE = "kdf_locale";

/**
 * Language switcher: swaps the locale segment of the current path (so
 * switching language never drops the visitor back to the homepage) and
 * remembers the choice in the same cookie the proxy reads, so a later
 * prefix-less visit returns to this language.
 *
 * A segmented pill toggle — a filled dark "thumb" behind the active
 * language inside a soft track — rather than the earlier underline
 * treatment. This is a deliberately different visual language from the
 * mega-menu's active-state underline: that restraint was feedback specific
 * to the nav's own open/closed indicator, not a site-wide ban on a filled
 * control, and a two-option toggle reads more clearly as a toggle with a
 * solid state than with a line under text. The fill is brand-950 (the
 * site's dark neutral, also the hero's primary button), not signal-orange,
 * so it doesn't reintroduce the heavy orange-fill look that was moved away
 * from elsewhere.
 */
export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const strings = getUiStrings(locale);
  const { transparent } = useNavAppearance();

  return (
    <div
      role="group"
      aria-label={strings.languageSwitcherLabel}
      className={`flex items-center gap-0.5 rounded-full p-1 transition-colors duration-300 ${
        transparent ? "bg-white/15 backdrop-blur-sm" : "bg-cream-100"
      }`}
    >
      {locales.map((target) => {
        const isActive = target === locale;
        return (
          <Link
            key={target}
            href={buildLocalePath(pathname, target)}
            hrefLang={target}
            aria-current={isActive ? "true" : undefined}
            onClick={() => {
              document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=${60 * 60 * 24 * 365}`;
            }}
            className={`rounded-full px-2.5 py-1.5 text-[13px] font-semibold transition-all duration-200 sm:px-4 ${
              isActive
                ? "bg-brand-950 text-cream-50 shadow-[0_2px_6px_-1px_rgba(17,24,29,0.35)]"
                : transparent
                  ? "text-white/70 hover:text-white"
                  : "text-brand-400 hover:text-brand-700"
            }`}
          >
            <span className="sm:hidden">{strings.languageShortNames[target]}</span>
            <span className="hidden sm:inline">{strings.languageNames[target]}</span>
          </Link>
        );
      })}
    </div>
  );
}
