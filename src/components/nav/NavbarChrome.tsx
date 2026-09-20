"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { NavAppearanceProvider } from "./nav-appearance";

/** Scroll distance before the header switches from transparent to solid. */
const TRANSPARENT_THRESHOLD_PX = 24;
/** Below this, the header always stays visible — otherwise it would hide
 * itself right at the very top of the page, before any real scroll. */
const HIDE_GUARD_PX = 4;
/** Ignore scroll deltas smaller than this — trackpads and some mice report
 * a steady trickle of tiny events that would otherwise flicker the header. */
const MIN_DELTA_PX = 6;

/**
 * The header shell: transparent (white text) at the very top of the page,
 * solid cream (the original design) once scrolled past the threshold, and
 * — independent of that — hidden while scrolling down, revealed again on
 * any scroll upward. `data-nav-header` and the sticky positioning are
 * unchanged from before this existed, so LoadingScreen's runtime
 * measurement of this element is unaffected either way; only its
 * background/border/text/transform react to scroll.
 *
 * The hide/show transform is applied only while `hidden` is true — never
 * an explicit zero-value transform in the visible state — deliberately.
 * `transform` on an ancestor creates a new containing block for any
 * `position: fixed` descendant, which would break MobileMenu's full-screen
 * drawer if the header always carried a transform. It's safe here because
 * the header can only ever be `hidden` while scrolling, and the hamburger
 * that opens the drawer is itself inside the (then off-screen) header, so
 * there's no way to open the drawer while `hidden` is true in the first
 * place — by the time it's reachable again, the header is back to
 * `transform: none`.
 *
 * This is a known simplification: it goes transparent on *every* page at
 * scroll position 0, not just the homepage. That's correct today because
 * the homepage (with its dark-enough hero) is the only page that exists.
 * A future inner page with a light top section and no hero will need
 * either its own dark band up top or a per-page override here — revisit
 * when the first inner page is built.
 */
export default function NavbarChrome({ children }: { children: ReactNode }) {
  const [transparent, setTransparent] = useState(true);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      setTransparent(currentY < TRANSPARENT_THRESHOLD_PX);

      const delta = currentY - lastScrollY.current;
      if (currentY < HIDE_GUARD_PX) {
        setHidden(false);
      } else if (delta > MIN_DELTA_PX) {
        setHidden(true);
      } else if (delta < -MIN_DELTA_PX) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      data-nav-header
      className={`sticky top-0 z-40 h-24 transition-[transform,background-color,border-color,box-shadow] duration-300 ${
        hidden ? "-translate-y-full" : ""
      } ${
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b-[3px] border-signal-500 bg-cream-100 shadow-[0_4px_10px_-6px_rgba(0,0,0,0.12)]"
      }`}
    >
      <NavAppearanceProvider value={{ transparent }}>{children}</NavAppearanceProvider>
    </header>
  );
}
