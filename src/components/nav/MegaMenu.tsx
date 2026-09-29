"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NavItem } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/config";
import { getUiStrings } from "@/lib/i18n/ui-strings";
import { buildSections } from "./menu-utils";
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
 *
 * The panel's interior is a two-pane browser — see MenuPanel below for why
 * it is that rather than a row of columns.
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

/**
 * The body of one open panel: a two-pane browser. The left rail lists the
 * section's groups; the right pane shows the links of whichever is
 * selected, gridded into as many tracks as fit.
 *
 * This replaced a row of centered columns whose width came from its own
 * content. That made a flat menu (About KDF, Contact Us — five of the
 * seven top-level items have no sub-groups) render as a single 300px
 * column marooned in a full-width card, which is what the client flagged.
 * Here the panel's footprint is the same for every menu, so the navbar
 * never changes shape between items, and it absorbs a growing sitemap
 * without a redesign: Solutions & Products already carries 25 links.
 *
 * A wholly flat menu has exactly one rail entry, so buildSections puts the
 * pooled flat entry first and it is selected on open — those menus show
 * their links immediately rather than asking for a pointless first choice.
 */
function MenuPanel({
  item,
  strings,
  onNavigate,
}: {
  item: NavItem;
  strings: ReturnType<typeof getUiStrings>;
  onNavigate: () => void;
}) {
  const sections = buildSections(item);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? null);
  const active = sections.find((section) => section.id === activeId) ?? sections[0];

  // A menu with no sub-groups at all still needs its rail suppressed
  // rather than rendered as one lonely entry pointing at itself.
  const showRail = sections.length > 1;

  if (!active) return null;

  return (
    <div className={`grid ${showRail ? "grid-cols-[minmax(0,260px)_minmax(0,1fr)]" : "grid-cols-1"}`}>
      {showRail && (
        <div
          className="flex flex-col gap-0.5 border-e border-brand-200/70 bg-brand-50/60 p-3.5"
          role="tablist"
          aria-orientation="vertical"
          aria-label={item.label}
        >
          {sections.map((section) => {
            const isActive = section.id === active.id;
            const heading = section.heading ?? strings.quickLinksHeading;

            return (
              <button
                key={section.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`flex min-h-[44px] w-full items-center gap-2 rounded-[10px] px-3.5 text-start text-[14.5px] transition-[color,background-color,font-weight] ${
                  isActive
                    ? "bg-cream-50 font-bold text-signal-700 shadow-[0_1px_3px_rgba(17,24,29,0.10)]"
                    : "font-medium text-brand-500 hover:text-signal-700"
                }`}
                // Hover selects as well as click: the rail is a preview
                // control, not a destination, so pointer users never have
                // to click twice to reach a link.
                onMouseEnter={() => setActiveId(section.id)}
                onFocus={() => setActiveId(section.id)}
                onClick={() => setActiveId(section.id)}
              >
                <span className="min-w-0 flex-1">{heading}</span>
                <span
                  className={`shrink-0 text-signal-500 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
                  aria-hidden="true"
                >
                  ›
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="min-w-0 px-8 pb-8 pt-7">
        <p className="mb-1 flex items-center gap-2.5 text-base font-bold text-brand-800">
          <span className="size-2 shrink-0 rounded-full bg-signal-500" aria-hidden="true" />
          {active.heading ?? strings.quickLinksHeading}
        </p>
        {/* Keyed on the active section so the stagger replays each time the
            pane's contents change, rather than swapping in place. */}
        {/* Two fixed tracks rather than auto-fill: the panel's width is
            constant, so a section with few links should fill two columns
            and stop, not spread one link per track across the pane.
            Sections of 1-2 links collapse to a single track. */}
        <ul
          key={active.id}
          className={`mt-4 grid list-none gap-x-6 ${
            active.items.length > 2 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {active.items.map((leaf, index) => (
            <li key={leaf.id}>
              <button
                type="button"
                className="-mx-3 flex min-h-[42px] w-[calc(100%+1.5rem)] animate-[kdf-column-enter_220ms_ease-out_both] items-center rounded-[10px] px-3 text-start text-[14.5px] font-medium text-brand-500 transition-[color,background-color,font-weight] hover:bg-signal-100 hover:font-bold hover:text-signal-700"
                style={{ animationDelay: `${Math.min(index * 25, 140)}ms` }}
                onClick={onNavigate}
              >
                {leaf.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
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
          const isOutgoing = layer.phase === "outgoing";

          return (
            <div
              key={layer.key}
              onAnimationEnd={() => { if (isOutgoing) removeLayer(layer.key); }}
              // Fixed footprint, not edge-to-edge: the whole point of the
              // two-pane layout is that every menu opens the same size, so
              // the panel never restretches between items. Capped at the
              // viewport on narrow desktops so it can't overflow.
              className={`absolute start-6 top-full z-30 w-[min(980px,calc(100vw-3rem))] overflow-hidden rounded-[20px] bg-cream-50 shadow-[0_28px_56px_-20px_rgba(17,24,29,0.30)] ${
                isOutgoing ? "animate-[kdf-panel-exit_150ms_ease-in_both]" : "animate-[kdf-panel-enter_180ms_ease-out_both]"
              }`}
            >
              <span className="absolute inset-y-0 start-0 w-1 bg-signal-500" aria-hidden="true" />
              <MenuPanel item={item} strings={strings} onNavigate={() => chooseId(null)} />
            </div>
          );
        })}
      </nav>
    </>
  );
}
