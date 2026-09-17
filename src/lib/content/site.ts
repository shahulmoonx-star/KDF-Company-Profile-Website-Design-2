import type { SiteSettings } from "./types";

/**
 * Mock site settings.
 *
 * This is temporary content. Once the .NET API is available, replace the
 * body of getSiteSettings() below with a real fetch — nothing else in the
 * app needs to change, since every consumer already goes through this one
 * function. See docs/backend-integration-plan.md.
 */
const siteSettings: SiteSettings = {
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
};

export async function getSiteSettings(): Promise<SiteSettings> {
  // TODO(backend): once the .NET API is live, replace this with:
  //   const res = await fetch(`${process.env.API_BASE_URL}/site-settings`);
  //   return res.json();
  return siteSettings;
}
