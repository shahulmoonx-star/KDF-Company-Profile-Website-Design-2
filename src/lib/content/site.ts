import type { Locale } from "@/lib/i18n/config";
import type { SiteSettings } from "./types";

/**
 * Mock site settings, one per locale.
 *
 * This is temporary content. Once the .NET API is available, replace the
 * body of getSiteSettings() below with a real fetch (the API takes a locale
 * and returns already-localized strings, the same way it does today) —
 * nothing else in the app needs to change. See docs/backend-integration-plan.md.
 *
 * The Arabic company name matches the wordmark printed on the logo itself
 * (public/images/logo.png) rather than a fresh translation, so the two stay
 * consistent. The Arabic description is a first-pass translation pending
 * KDF's review — see docs/i18n.md.
 */
const siteSettingsByLocale: Record<Locale, SiteSettings> = {
  en: {
    companyName: "Kuwait Drilling Fluids & Oil Service Company",
    shortName: "KDF",
    description:
      "Kuwait's and the GCC's leading manufacturer and service provider for drilling fluids, production chemistry, and cementing solutions since 1966.",
    developer: {
      name: "Uniweb IT Solutions",
      url: "https://uniwebonline.com",
    },
    copyrightYear: 2026,
    logo: "/images/logo.png",
    favicon: "/images/favicon.png",
    contact: {
      addressLines: ["Shuaiba Industrial Area", "P.O. Box 4544, Safat 13046", "Kuwait"],
      phone: "+965 2326 2434",
      email: "info@kdf.com.kw",
    },
  },
  ar: {
    companyName: "الشركة الكويتية لسوائل الحفر والخدمات النفطية",
    shortName: "KDF",
    description:
      "الشركة الرائدة في الكويت ودول مجلس التعاون الخليجي في تصنيع وتوفير سوائل الحفر وكيمياء الإنتاج وحلول الإسمنت منذ عام 1966.",
    developer: {
      // Brand name kept in Latin script, matching common Gulf corporate practice.
      name: "Uniweb IT Solutions",
      url: "https://uniwebonline.com",
    },
    copyrightYear: 2026,
    logo: "/images/logo.png",
    favicon: "/images/favicon.png",
    contact: {
      addressLines: ["منطقة الشعيبة الصناعية", "ص.ب. 4544، الصفاة 13046", "الكويت"],
      phone: "+965 2326 2434",
      email: "info@kdf.com.kw",
    },
  },
};

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  // TODO(backend): once the .NET API is live, replace this with:
  //   const res = await fetch(`${process.env.API_BASE_URL}/site-settings?locale=${locale}`);
  //   return res.json();
  return siteSettingsByLocale[locale];
}
