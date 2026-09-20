import Image from "next/image";
import LanguageSwitcher from "./nav/LanguageSwitcher";
import MegaMenu from "./nav/MegaMenu";
import MobileMenu from "./nav/MobileMenu";
import NavbarChrome from "./nav/NavbarChrome";
import { getSiteSettings } from "@/lib/content/site";
import { getMainNavigation } from "@/lib/content/navigation";
import type { Locale } from "@/lib/i18n/config";

/*
 * The data-nav-* hooks are what LoadingScreen measures on mount to work out
 * where to fly the logo and where the rule comes to rest. Keep them on the
 * header and the logo if either is restyled or moved — the loader adapts to
 * whatever it measures, but it does need to find these two. This holds
 * regardless of locale/direction: the loader measures the real rendered
 * position, so a mirrored RTL header still lands correctly with no changes
 * to LoadingScreen itself.
 *
 * The header element itself (sticky, data-nav-header, the transparent <->
 * solid switch) lives in NavbarChrome, a client component, since reacting
 * to scroll position needs the browser. Navbar stays a server component
 * that only fetches content and lays out the header's contents.
 */
export default async function Navbar({ locale }: { locale: Locale }) {
  const [site, navigation] = await Promise.all([
    getSiteSettings(locale),
    getMainNavigation(locale),
  ]);

  return (
    <NavbarChrome>
      <div className="flex h-full items-center gap-2 px-3 sm:gap-6 sm:px-6">
        {/* Always on its own cream, rounded-corner card — kept permanent
            rather than switching with the header's transparent/solid
            state, so the mark reads the same over the hero photo as it
            does once the header goes solid on scroll. Smaller on mobile:
            at full size, the card plus the language switcher plus the
            hamburger don't all fit a narrow phone in one row. */}
        <div className="flex shrink-0 items-center rounded-2xl bg-cream-50 px-2.5 py-1.5 shadow-[0_2px_10px_-4px_rgba(17,24,29,0.25)] sm:px-4 sm:py-2">
          <Image
            data-nav-logo
            src={site.logo}
            alt={site.companyName}
            width={320}
            height={118}
            priority
            className="h-10 w-auto sm:h-14"
          />
        </div>
        {/* This wrapper is what centers the mega-menu in the space between
            the logo and the right-side controls, rather than the nav
            hugging the logo — it's a flex-1 that centers its own content,
            not the nav itself being centered against the whole header. */}
        <div className="flex flex-1 justify-center">
          <MegaMenu items={navigation} locale={locale} />
        </div>
        <div className="flex items-center gap-2 sm:gap-5">
          <LanguageSwitcher locale={locale} />
          <MobileMenu
            items={navigation}
            locale={locale}
            logoSrc={site.logo}
            logoAlt={site.companyName}
          />
        </div>
      </div>
    </NavbarChrome>
  );
}
