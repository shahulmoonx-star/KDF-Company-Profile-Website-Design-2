"use client";

import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/config";
import { getUiStrings } from "@/lib/i18n/ui-strings";
import { buildColumns } from "./menu-utils";
import { ChevronIcon } from "./icons";
import { useNavAppearance } from "./nav-appearance";

/**
 * Desktop mega-menu: click a top-level item to open its panel, click again
 * (or the same triggers below) to close. Hover-to-open was deliberately
 * ruled out — the brief asked for click-driven open/close.
 *
 * Active/open state is shown with an underline accent, never a filled
 * background — client feedback on an earlier bolder direction (a filled
 * brand-orange pill on the open item) was to keep that restraint: orange as
 * a thin accent, not a fill. The panel chrome itself (floating rounded
 * card, accent bar, dot-bullet column headings) keeps that bolder
 * direction's look — only the top-level trigger's own indicator changed.
 */
export default function MegaMenu({ items, locale }: { items: NavItem[]; locale: Locale }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const strings = getUiStrings(locale);
  const { transparent } = useNavAppearance();

  useEffect(() => {
    if (!openId) return;

    function handlePointerDown(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenId(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenId(null);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openId]);

  return (
    <>
      {openId && (
        <div
          className="fixed inset-x-0 top-24 bottom-0 z-20 bg-brand-950/5"
          onClick={() => setOpenId(null)}
          aria-hidden="true"
        />
      )}
      <nav ref={navRef} aria-label="Primary" className="hidden items-center gap-1 lg:flex">
        {items.map((item) => {
          const hasChildren = (item.children?.length ?? 0) > 0;
          const isOpen = openId === item.id;
          const columns = isOpen ? buildColumns(item) : [];

          return (
            <div key={item.id}>
              <button
                type="button"
                className="group flex min-h-11 flex-col items-center gap-1.5 px-3.5 py-2.5"
                aria-expanded={hasChildren ? isOpen : undefined}
                aria-haspopup={hasChildren ? "true" : undefined}
                onClick={() => setOpenId(hasChildren ? (isOpen ? null : item.id) : null)}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className={`text-[14.5px] font-medium tracking-[0.01em] transition-colors ${
                      isOpen
                        ? transparent
                          ? "text-signal-300"
                          : "text-signal-700"
                        : transparent
                          ? "text-cream-50 group-hover:text-signal-300"
                          : "text-brand-800 group-hover:text-signal-600"
                    }`}
                  >
                    {item.label}
                  </span>
                  {hasChildren && (
                    <ChevronIcon
                      className={`transition-transform duration-150 ${
                        isOpen
                          ? `rotate-180 ${transparent ? "text-signal-300" : "text-signal-700"}`
                          : transparent
                            ? "text-cream-50 group-hover:text-signal-300"
                            : "text-brand-800 group-hover:text-signal-600"
                      }`}
                    />
                  )}
                </span>
                <span
                  className={`h-0.5 w-full origin-center rounded-full transition-transform duration-150 ease-out ${
                    transparent ? "bg-signal-300" : "bg-signal-500"
                  } ${isOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  aria-hidden="true"
                />
              </button>

              {hasChildren && isOpen && (
                <div className="absolute inset-x-6 top-full z-30 animate-[kdf-panel-enter_160ms_ease-out] overflow-hidden rounded-[20px] bg-cream-50 shadow-[0_28px_56px_-20px_rgba(17,24,29,0.30)]">
                  <span className="absolute inset-y-0 start-0 w-1 bg-signal-500" aria-hidden="true" />
                  <div
                    className="grid justify-center gap-11 ps-14 pe-8 pb-11 pt-10"
                    style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 300px))` }}
                  >
                    {columns.map((column, index) => (
                      <div
                        key={column.id}
                        className="animate-[kdf-column-enter_220ms_ease-out_both]"
                        style={{ animationDelay: `${Math.min(index * 35, 140)}ms` }}
                      >
                        <p className="mb-4 flex items-center gap-2.5 text-base font-bold text-brand-800">
                          <span className="size-2 shrink-0 rounded-full bg-signal-500" aria-hidden="true" />
                          {column.heading ?? strings.quickLinksHeading}
                        </p>
                        <ul className="flex flex-col">
                          {column.items.map((leaf) => (
                            <li key={leaf.id}>
                              <button
                                type="button"
                                className="-mx-3 flex min-h-[42px] w-[calc(100%+1.5rem)] items-center rounded-[10px] px-3 text-start text-[14.5px] text-brand-500 transition-colors hover:bg-signal-100 hover:text-signal-700"
                                onClick={() => setOpenId(null)}
                              >
                                {leaf.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
