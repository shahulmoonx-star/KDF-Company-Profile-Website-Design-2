"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
/** One panel currently in the DOM: `outgoing` cross-fades out while a new
 *  `incoming` layer fades in on top of it at the same time — never a gap
 *  where neither is visible. `key` forces React to treat each stack entry
 *  as a fresh element so its CSS animation always restarts, even when
 *  switching directly from one item straight to another. */
interface PanelLayer {
  key: number;
  itemId: string;
  phase: "incoming" | "outgoing";
}

export default function MegaMenu({ items, locale }: { items: NavItem[]; locale: Locale }) {
  const [openId, setOpenId] = useState<string | null>(null);
  // Up to two layers at once: the panel switching from and the one
  // switching to, cross-fading in place — see PanelLayer above. A plain
  // open-from-closed or close-to-nothing only ever has one layer.
  const [layers, setLayers] = useState<PanelLayer[]>([]);
  const nextKey = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const strings = getUiStrings(locale);
  const { transparent } = useNavAppearance();

  /** The single place `openId` ever changes — every transition (click a
   *  trigger, click outside, Escape) routes through here. Switching
   *  directly between two open items keeps the old layer mounted as
   *  `outgoing` (its own fade-out plays) while a new `incoming` layer
   *  mounts on top (its fade-in plays at the same time) — a real
   *  cross-fade, not a close-then-reopen with a blank gap between. */
  const chooseId = useCallback((nextId: string | null) => {
    setOpenId(nextId);
    setLayers((current) => {
      // Every layer already in the stack — whatever its current phase —
      // is now on its way out, so it gets marked outgoing and keeps its
      // own fade-out. The bug this replaced filtered out layers already
      // marked "incoming" instead of converting them, which deleted the
      // still-showing panel outright rather than fading it: exactly the
      // instant-cut behaviour this whole layering exists to avoid.
      const outgoing = current.map((layer): PanelLayer => ({ ...layer, phase: "outgoing" }));

      if (nextId === null) return outgoing;

      return [...outgoing, { key: nextKey.current++, itemId: nextId, phase: "incoming" }];
    });
  }, []);

  /** Drops a layer once its own exit animation finishes — CSS-driven
   *  cleanup rather than a hardcoded timer kept separately in sync with
   *  the animation's duration. */
  const removeLayer = useCallback((key: number) => {
    setLayers((current) => current.filter((layer) => layer.key !== key));
  }, []);

  useEffect(() => {
    if (!openId) return;

    function handlePointerDown(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        chooseId(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") chooseId(null);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openId, chooseId]);

  return (
    <>
      {openId && (
        <div
          className="fixed inset-x-0 top-24 bottom-0 z-20 bg-brand-950/5"
          onClick={() => chooseId(null)}
          aria-hidden="true"
        />
      )}
      <nav ref={navRef} aria-label="Primary" className="hidden items-center gap-1 lg:flex">
        {items.map((item) => {
          const hasChildren = (item.children?.length ?? 0) > 0;
          const isOpen = openId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className="group flex min-h-11 flex-col items-center gap-1.5 px-3.5 py-2.5"
              aria-expanded={hasChildren ? isOpen : undefined}
              aria-haspopup={hasChildren ? "true" : undefined}
              onClick={() => chooseId(hasChildren ? (isOpen ? null : item.id) : null)}
            >
              <span className="flex items-center gap-1.5">
                <span
                  className={`text-[14.5px] tracking-[0.01em] transition-[color,font-weight] group-hover:font-bold ${
                    isOpen
                      ? `font-bold ${transparent ? "text-signal-300" : "text-signal-700"}`
                      : transparent
                        ? "font-medium text-cream-50 group-hover:text-signal-300"
                        : "font-medium text-brand-800 group-hover:text-signal-600"
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
          );
        })}

        {/* Stacked, cross-fading panels rather than one panel whose content
            is swapped: switching directly from one open item to another
            keeps the old panel mounted (fading out) while the new one
            mounts on top of it in the same spot (fading in) at the same
            time, so there is never a frame where neither is visible. Each
            layer's own `key` (see PanelLayer) forces a fresh element, so
            its animation always plays from the start even when the same
            item is chosen again right after leaving. */}
        {layers.map((layer) => {
          const item = items.find((candidate) => candidate.id === layer.itemId);
          if (!item) return null;
          const columns = buildColumns(item);
          const isOutgoing = layer.phase === "outgoing";

          return (
            <div
              key={layer.key}
              onAnimationEnd={() => { if (isOutgoing) removeLayer(layer.key); }}
              className={`absolute inset-x-6 top-full z-30 overflow-hidden rounded-[20px] bg-cream-50 shadow-[0_28px_56px_-20px_rgba(17,24,29,0.30)] ${
                isOutgoing ? "animate-[kdf-panel-exit_150ms_ease-in_both]" : "animate-[kdf-panel-enter_180ms_ease-out_both]"
              }`}
            >
              <span className="absolute inset-y-0 start-0 w-1 bg-signal-500" aria-hidden="true" />
              <div
                className="grid justify-center gap-11 ps-14 pe-8 pb-11 pt-10"
                style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 300px))` }}
              >
                {columns.map((column, index) => (
                  <div
                    key={column.id}
                    className={isOutgoing ? undefined : "animate-[kdf-column-enter_220ms_ease-out_both]"}
                    style={isOutgoing ? undefined : { animationDelay: `${Math.min(index * 35, 140)}ms` }}
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
                            className="-mx-3 flex min-h-[42px] w-[calc(100%+1.5rem)] items-center rounded-[10px] px-3 text-start text-[14.5px] font-medium text-brand-500 transition-[color,background-color,font-weight] hover:bg-signal-100 hover:font-bold hover:text-signal-700"
                            onClick={() => chooseId(null)}
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
          );
        })}
      </nav>
    </>
  );
}
