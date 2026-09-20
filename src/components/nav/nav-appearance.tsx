"use client";

import { createContext, useContext } from "react";

/**
 * Whether the header is currently rendering transparent-over-hero or its
 * normal solid state — set by NavbarChrome, read by every nav control that
 * needs to invert its own colors (white on the hero photo, brand-dark once
 * solid). A context instead of threading a boolean prop through Navbar ->
 * MegaMenu/LanguageSwitcher/MobileMenu, since Navbar itself doesn't need
 * the value, only its client descendants do.
 *
 * The default (false = solid) is a safe fallback for any consumer rendered
 * outside NavbarChrome — it should never actually apply in practice.
 */
interface NavAppearance {
  transparent: boolean;
}

const NavAppearanceContext = createContext<NavAppearance>({ transparent: false });

export const NavAppearanceProvider = NavAppearanceContext.Provider;

export function useNavAppearance(): NavAppearance {
  return useContext(NavAppearanceContext);
}
