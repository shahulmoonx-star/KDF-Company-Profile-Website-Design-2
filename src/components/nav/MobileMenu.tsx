"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/config";
import { getUiStrings } from "@/lib/i18n/ui-strings";
import { ChevronIcon, CloseIcon, HamburgerIcon } from "./icons";
import { useNavAppearance } from "./nav-appearance";

const DEPTH_STYLE = [
  "text-[15px] font-semibold text-brand-800",
  "text-[14px] font-medium text-brand-500",
  "text-[13.5px] font-normal text-brand-400",
];
const DEPTH_INDENT = ["1.25rem", "2.5rem", "3.75rem"];

/**
 * One level of the drawer's accordion. Deliberately owns its own
 * `expandedId` — scoped to just its own siblings — rather than each row
 * tracking its own open/closed flag. That's what makes opening one item
 * close whichever sibling was open, at every depth, for free: there is
 * only ever one "open" id per sibling group to begin with.
 */
function MobileMenuList({
  items,
  depth,
  onNavigate,
}: {
  items: NavItem[];
  depth: number;
  onNavigate: () => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const rowRefs = useRef(new Map<string, HTMLLIElement>());

  // Confirms the choice: scrolls whichever row was just opened into view,
  // so expanding a section low in a long list doesn't leave its newly
  // revealed children sitting off-screen below the fold.
  useEffect(() => {
    if (!expandedId) return;
    rowRefs.current.get(expandedId)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [expandedId]);

  return (
    <ul className={depth > 0 ? "animate-[kdf-column-enter_240ms_ease-out]" : undefined}>
      {items.map((item) => {
        const hasChildren = (item.children?.length ?? 0) > 0;
        const isExpanded = expandedId === item.id;
        const level = Math.min(depth, DEPTH_STYLE.length - 1);

        return (
          <li
            key={item.id}
            className="relative"
            ref={(node) => {
              if (!node) return;
              rowRefs.current.set(item.id, node);
              return () => {
                rowRefs.current.delete(item.id);
              };
            }}
          >
            {isExpanded && (
              <span className="absolute inset-y-0 start-0 w-[3px] bg-signal-500" aria-hidden="true" />
            )}
            <button
              type="button"
              className={`flex min-h-12 w-full items-center justify-between pe-5 text-start transition-colors ${
                depth === 0 ? "border-b border-cream-300" : ""
              } ${isExpanded ? "bg-cream-100" : "hover:bg-cream-100"}`}
              style={{ paddingInlineStart: DEPTH_INDENT[level] }}
              aria-expanded={hasChildren ? isExpanded : undefined}
              onClick={() =>
                hasChildren ? setExpandedId(isExpanded ? null : item.id) : onNavigate()
              }
            >
              <span className={DEPTH_STYLE[level]}>{item.label}</span>
              {hasChildren && (
                <ChevronIcon
                  className={`shrink-0 text-brand-400 transition-transform duration-150 ${isExpanded ? "rotate-180" : ""}`}
                />
              )}
            </button>
            {hasChildren && isExpanded && (
              <MobileMenuList items={item.children!} depth={depth + 1} onNavigate={onNavigate} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Mobile nav: a hamburger trigger plus a full-screen drawer with a
 * recursive expand/collapse accordion (up to the data's real depth — no
 * level limit is assumed, matching docs/navigation-structure.md). Mirrors
 * MegaMenu's data and click-driven open/close model, just laid out for a
 * narrow viewport instead of a floating panel.
 */
export default function MobileMenu({
  items,
  locale,
  logoSrc,
  logoAlt,
}: {
  items: NavItem[];
  locale: Locale;
  logoSrc: string;
  logoAlt: string;
}) {
  const [open, setOpen] = useState(false);
  const strings = getUiStrings(locale);
  const { transparent } = useNavAppearance();

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`flex size-11 items-center justify-center transition-colors lg:hidden ${
          transparent ? "text-cream-50" : "text-brand-800"
        }`}
        onClick={() => setOpen(true)}
        aria-label={strings.openMenu}
      >
        <HamburgerIcon />
      </button>

      <div
        className={`fixed inset-0 z-50 flex flex-col bg-cream-50 transition-transform duration-[220ms] ease-[cubic-bezier(.22,1,.36,1)] lg:hidden ${
          open ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex h-18 shrink-0 items-center justify-between border-b-[3px] border-signal-500 bg-cream-100 px-5">
          <Image src={logoSrc} alt={logoAlt} width={320} height={118} className="h-8 w-auto" />
          <button
            type="button"
            className="flex size-11 items-center justify-center text-brand-800"
            onClick={() => setOpen(false)}
            aria-label={strings.closeMenu}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          <MobileMenuList items={items} depth={0} onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </>
  );
}
