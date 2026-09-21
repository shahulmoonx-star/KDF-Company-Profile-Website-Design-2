import type { Locale } from "./config";

/**
 * Interface chrome text — labels the UI needs regardless of what the CMS
 * ever returns (aria-labels, control text). This is NOT content: it never
 * comes from the API, so it lives as a small static dictionary here rather
 * than going through the src/lib/content/ accessor pattern. Keep it short;
 * anything a content editor should be able to change belongs in the CMS
 * instead, as a typed accessor.
 */
export interface UiStrings {
  closePreview: string;
  enlargeImage: string;
  mapLabel: string;
  openMenu: string;
  closeMenu: string;
  skipToContent: string;
  allRightsReserved: string;
  developedBy: string;
  /** Fallback column heading for a mega-menu column that has no natural
   * group name of its own (menu-utils' flat leftover chunk) — deliberately
   * a standard web convention ("Quick Links") rather than a vague "More",
   * since it has to read sensibly over very different leftover content
   * (About KDF's Milestones/Awards/Facilities, Contact's two enquiry
   * types) without claiming a false thematic connection between them. */
  quickLinksHeading: string;
  languageSwitcherLabel: string;
  /** Each language names itself, in its own script — the standard convention. */
  languageNames: Record<Locale, string>;
  /** Compact form for the switcher on narrow screens, where "English" /
   * "العربية" side by side don't leave room for the rest of the header. */
  languageShortNames: Record<Locale, string>;
}

const uiStrings: Record<Locale, UiStrings> = {
  en: {
    closePreview: "Close preview",
    enlargeImage: "Enlarge image",
    mapLabel: "Map showing KDF's location",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",
    allRightsReserved: "All rights reserved.",
    developedBy: "Designed and developed by",
    quickLinksHeading: "Quick Links",
    languageSwitcherLabel: "Choose language",
    languageNames: { en: "English", ar: "العربية" },
    languageShortNames: { en: "EN", ar: "AR" },
  },
  ar: {
    closePreview: "إغلاق المعاينة",
    enlargeImage: "تكبير الصورة",
    mapLabel: "خريطة توضح موقع KDF",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    skipToContent: "تخطي إلى المحتوى",
    allRightsReserved: "جميع الحقوق محفوظة.",
    developedBy: "تصميم وتطوير",
    quickLinksHeading: "روابط سريعة",
    languageSwitcherLabel: "اختر اللغة",
    languageNames: { en: "English", ar: "العربية" },
    languageShortNames: { en: "EN", ar: "AR" },
  },
};

export function getUiStrings(locale: Locale): UiStrings {
  return uiStrings[locale];
}
