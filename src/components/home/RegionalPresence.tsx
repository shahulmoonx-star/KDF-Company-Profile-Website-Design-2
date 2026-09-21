"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { geoMercator } from "d3-geo";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "./SectionHeading";
import type { HomePage } from "@/lib/content/types";
import styles from "./RegionalPresence.module.css";

/**
 * Reach and scale, as two chapters of one section: the map (where KDF
 * operates) and the manufacturing figures that used to be their own
 * "Infrastructure & capabilities" section (what KDF operates). Both
 * visible together, nothing hidden behind a tab.
 *
 * The band used to be a flat sheet of brand-950 with the dark map panel
 * sitting on it, so the panel had nothing to read against. Now the band is
 * cream and the panel is framed like an instrument mounted on a bright
 * wall, giving the dark panel edge something to read against.
 *
 * The landmasses themselves were later brightened (cream/light-brand tones
 * rather than the original dark slate-on-slate) once real use showed the
 * countries were too close in value to the panel background to read
 * clearly — the map was legible as a shape but not as a set of distinct,
 * nameable countries. Every plotted country is also clickable now, not
 * just its list row or marker: clicking the landmass itself selects that
 * location the same way clicking its row does, via the same
 * `GEO_NAME_TO_ID` lookup used to connect `Geography`'s `properties.name`
 * (the basemap's own English country names) to `location.id`.
 *
 * Neither `content.lead` nor `capability.lead` is rendered. Both stay in
 * the content model — the CMS fields and the API contract are unchanged,
 * and the interior pages still use them — but this band now leads with a
 * heading, a photograph and its figures instead of paragraphs.
 *
 * The location list is the section's real interaction: each row is a track
 * whose fill is that country's great-circle distance from Kuwait as a
 * share of the furthest one, computed from the same coordinates the map
 * plots. So the row *is* the bar — no separate chart furniture — and
 * selecting one drives the map.
 *
 * Ported from the Lovable-generated reference build at
 * design/kdf-kuwait-fluid-spark-main (its `Presence` section) — every
 * label that sits on the map, not just the copy around it, comes from
 * `content`, so the Arabic build shows Arabic markers rather than an
 * English map with translated text wrapped around it.
 *
 * The basemap is real GCC/MENA country geometry
 * (public/maps/countries-50m.json, Natural Earth 1:50m via world-atlas),
 * not a drawn approximation.
 *
 * `react-simple-maps` fetches the basemap client-side and only ever
 * touches `window` inside its own effect, so this whole section has to be
 * a client component — there is no way to resolve the country geometry on
 * the server with this library.
 */

const MAP_WIDTH = 900;
const MAP_HEIGHT = 700;

// Same center/scale the reference build tuned for this exact set of
// countries — kept as-is rather than re-derived.
const projection = geoMercator()
  .center([50, 26])
  .scale(1750)
  .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);

// Shaded a shade lighter than the rest of the basemap so the region the
// section is actually about reads at a glance. Qatar has no marker of its
// own but is still part of the GCC, so it's tinted along with the rest.
const GCC_COUNTRIES = new Set([
  "Kuwait",
  "Saudi Arabia",
  "United Arab Emirates",
  "Oman",
  "Bahrain",
  "Iraq",
  "Qatar",
]);

// The basemap's `properties.name` is the country's plain English name
// (Natural Earth's own naming), which doesn't match every `location.id` —
// most obviously "United Arab Emirates" vs "uae" and "Saudi Arabia" vs
// "saudi". This is what lets a click on the landmass itself resolve to the
// same location a click on its list row or marker would select.
const GEO_NAME_TO_LOCATION_ID: Record<string, string> = {
  "Saudi Arabia": "saudi",
  "United Arab Emirates": "uae",
  Oman: "oman",
  Bahrain: "bahrain",
  Iraq: "iraq",
  Kuwait: "kuwait",
};

// Bahrain's marker sits close enough to the coast that its default
// right-growing label collides with the landmass — the only location that
// needs its text pushed the other way. A geometry fix, not a locale one,
// so it applies the same regardless of language.
const LABEL_OVERRIDE: Partial<Record<string, { dx: number; anchor: "start" | "end" }>> = {
  bahrain: { dx: -9, anchor: "end" },
};

// At this map's scale, Bahrain's real island projects to roughly 5×15px —
// smaller than the marker drawn on top of it, so even though the basemap
// now genuinely includes it (see the 50m-resolution note below), it reads
// as invisible and the marker looks like it's floating in open water.
// Every other plotted country is 26px+ across at this same scale — this is
// the one exception. Drawing a small stand-in island (same fill as the
// real landmass, generously oversized) fixes what the real geometry can't
// show at this zoom, without fabricating anything about its position.
const ISLAND_HALO: Partial<Record<string, number>> = {
  bahrain: 9,
};

/** A quadratic Bezier arc between two [lon, lat] points, bowed perpendicular
 *  to the straight line between them — the same construction the reference
 *  build used for its Kuwait-to-neighbour connectors. */
function arcPath(a: [number, number], b: [number, number]): string {
  const pa = projection(a);
  const pb = projection(b);
  if (!pa || !pb) return "";
  const mx = (pa[0] + pb[0]) / 2;
  const my = (pa[1] + pb[1]) / 2;
  const dx = pb[0] - pa[0];
  const dy = pb[1] - pa[1];
  const cx = mx + dy * 0.18;
  const cy = my - dx * 0.18;
  return `M${pa[0]},${pa[1]} Q${cx},${cy} ${pb[0]},${pb[1]}`;
}

/** Great-circle distance in kilometres (haversine). Computed from the same
 *  [lon, lat] pairs the map plots, so the figure printed next to each
 *  location can never drift out of sync with where its marker actually
 *  sits — and it's a real, checkable number, not a decorative one. */
function distanceKm(a: [number, number], b: [number, number]): number {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b[1] - a[1]);
  const dLon = toRad(b[0] - a[0]);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[1])) * Math.cos(toRad(b[1])) * Math.sin(dLon / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
}

const GAUGE_RADIUS = 30;
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_RADIUS;

/** The capability figures' ring — item.fill (0–1) drawn as a dial. Sized by
 *  its class rather than width/height attributes so the viewBox can stay at
 *  the geometry it was authored against. Draws in once on mount via a CSS
 *  custom-property keyframe, the same "runs once, unconditionally" approach
 *  the map's own connector arcs already use in this file. */
function CapabilityGauge({ fill, delay }: { fill: number; delay: number }) {
  const offset = GAUGE_CIRCUMFERENCE * (1 - Math.min(1, Math.max(0, fill)));
  const gaugeStyle = {
    "--gauge-circumference": GAUGE_CIRCUMFERENCE,
    "--gauge-offset": offset,
    animationDelay: `${delay}ms`,
  } as CSSProperties;

  return (
    <svg viewBox="0 0 72 72" className="h-[68px] w-[68px] -rotate-90 shrink-0" aria-hidden="true">
      {/* Translucent cream rather than a solid navy: the track now sits over
          a photograph and has to hold on light and dark areas of it alike. */}
      <circle
        cx="36"
        cy="36"
        r={GAUGE_RADIUS}
        fill="none"
        stroke="rgba(253,251,247,0.18)"
        strokeWidth="6"
      />
      <circle
        cx="36"
        cy="36"
        r={GAUGE_RADIUS}
        fill="none"
        stroke="#f56501"
        strokeWidth="6"
        strokeLinecap="round"
        className={styles.gaugeRing}
        style={gaugeStyle}
      />
    </svg>
  );
}

export default function RegionalPresence({
  content,
  capability,
}: {
  content: HomePage["presence"];
  capability: HomePage["capability"];
}) {
  // null = resting state, every route shown at the same calm brightness —
  // exactly how this looked before selection existed. Picking a location
  // (from the list; the map mirrors it) brightens its own arc and dims the
  // rest, and clicking it again — or the HQ row — clears the selection.
  const [activeId, setActiveId] = useState<string | null>(null);

  const distances = content.locations.map((location) =>
    distanceKm(content.hq.coordinates, location.coordinates),
  );
  const maxDistance = Math.max(...distances);

  return (
    <section className="relative isolate overflow-hidden bg-cream-50">
      <div className="mx-auto max-w-[1280px] px-6 py-12 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="max-w-md">
            <Reveal
              as="p"
              className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-signal-600"
            >
              {content.eyebrow}
            </Reveal>

            <Reveal
              as="h2"
              delay={90}
              className="mt-4 text-[2.05rem] leading-[1.08] font-semibold tracking-tight text-balance text-brand-950 sm:text-[2.7rem]"
            >
              <span className="block">{content.title}</span>
              <span className="block text-signal-500">{content.titleHighlight}</span>
            </Reveal>

            <Reveal
              variant="rule"
              delay={380}
              className="mt-6 block h-[3px] w-20 rounded-full bg-signal-500 rtl:origin-right"
            />

            <div className="mt-8 flex flex-col gap-2">
              {/* The HQ is not one of the distances, so it is not a track —
                  it is the origin every track is measured from, and it
                  carries the brand colour outright. */}
              <Reveal delay={340} className="block">
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  aria-pressed={activeId === null}
                  className="flex w-full items-center gap-3 rounded-xl bg-signal-500 px-4 py-3.5 text-start shadow-[0_14px_30px_-18px_rgba(245,101,1,0.9)] transition-colors duration-300 hover:bg-signal-600"
                >
                  <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                    <span className={`absolute inset-0 rounded-full bg-cream-50/70 ${styles.hqPulse}`} />
                    <span className="relative m-auto h-2 w-2 rounded-full bg-cream-50" />
                  </span>
                  <span className="text-sm font-semibold text-cream-50">{content.hq.name}</span>
                  <span className="ms-auto font-mono text-[10px] uppercase tracking-[0.2em] text-cream-50/80">
                    {content.hqSublabel}
                  </span>
                </button>
              </Reveal>

              {content.locations.map((location, index) => {
                const isActive = activeId === location.id;
                const km = distances[index];
                const pct = Math.max(10, Math.round((km / maxDistance) * 100));
                return (
                  <Reveal key={location.id} delay={400 + index * 70} className="block">
                    <button
                      type="button"
                      onClick={() => setActiveId(isActive ? null : location.id)}
                      aria-pressed={isActive}
                      className={`relative isolate flex w-full items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-start ring-1 transition-all duration-300 ${
                        isActive ? "ring-signal-500" : "ring-cream-300 hover:ring-brand-300"
                      }`}
                    >
                      {/* The row is the bar: the fill runs to this country's
                          share of the furthest distance. */}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-y-0 start-0 -z-10 transition-colors duration-300 ${
                          isActive ? "bg-signal-500/15" : "bg-cream-100"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 shrink-0 rounded-full transition-colors duration-300 ${
                          isActive ? "bg-signal-500" : "bg-brand-300"
                        }`}
                      />
                      <span
                        className={`flex-1 text-sm transition-colors duration-300 ${
                          isActive ? "font-semibold text-brand-950" : "text-brand-700"
                        }`}
                      >
                        {location.name}
                      </span>
                      <span
                        className={`font-mono text-[12px] tabular-nums transition-colors duration-300 ${
                          isActive ? "font-semibold text-signal-600" : "text-brand-500"
                        }`}
                      >
                        {km} {content.distanceUnit}
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* The frame, not the map: a cream mount with a hairline edge, so
              the dark panel reads as an instrument on a bright wall. */}
          <Reveal
            delay={200}
            className="rounded-[30px] border border-cream-300 bg-cream-100 p-2 shadow-[0_30px_70px_-42px_rgba(17,24,29,0.6)]"
          >
            <div className="relative overflow-hidden rounded-3xl border border-brand-700 bg-brand-800">
              <div className={`pointer-events-none absolute inset-0 ${styles.panelGrid}`} aria-hidden="true" />

              <span className="pointer-events-none absolute start-5 top-4 z-10 font-mono text-[10px] tracking-[0.3em] text-brand-400">
                {content.coordinatesLabel}
              </span>
              <span className="pointer-events-none absolute end-5 top-4 z-10 font-mono text-[10px] tracking-[0.3em] text-brand-400">
                {content.regionLabel}
              </span>
              <span className="pointer-events-none absolute start-5 bottom-4 z-10 font-mono text-[10px] tracking-[0.3em] text-brand-400">
                {content.networkLabel}
              </span>

              <ComposableMap
                projection={projection}
                width={MAP_WIDTH}
                height={MAP_HEIGHT}
                style={{ width: "100%", height: "auto", display: "block" }}
              >
                <Geographies geography="/maps/countries-50m.json">
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const name = (geo.properties?.name as string) ?? "";
                      const isGcc = GCC_COUNTRIES.has(name);
                      const locationId = GEO_NAME_TO_LOCATION_ID[name];
                      // The HQ itself has no list row to select/deselect via —
                      // clicking Kuwait on the map clears the selection, the
                      // same as clicking the HQ row does.
                      const isClickable = locationId !== undefined;
                      const isActive = locationId !== undefined && locationId === activeId;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onClick={
                            isClickable
                              ? () => setActiveId(locationId === "kuwait" ? null : isActive ? null : locationId)
                              : undefined
                          }
                          // This build of react-simple-maps has no
                          // default/hover/pressed style API (that's an older
                          // major version) — `style` here is a plain SVG
                          // style object, so hover has to come from the
                          // stylesheet's real `:hover` pseudo-class instead.
                          className={isClickable ? styles.geoClickable : undefined}
                          style={{
                            fill: isActive ? "#f5b384" : isGcc ? "#d5dce2" : "#abbac4",
                            stroke: isActive ? "#f56501" : "#6a8395",
                            strokeWidth: isActive ? 1.4 : 0.6,
                            outline: "none",
                            cursor: isClickable ? "pointer" : "default",
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {content.locations
                  .filter((location) => ISLAND_HALO[location.id])
                  .map((location) => {
                    const projected = projection(location.coordinates);
                    if (!projected) return null;
                    const [hx, hy] = projected;
                    const r = ISLAND_HALO[location.id]!;
                    const isActive = activeId === location.id;
                    return (
                      <ellipse
                        key={`${location.id}-halo`}
                        cx={hx}
                        cy={hy}
                        rx={r}
                        ry={r * 1.7}
                        fill={isActive ? "#f5b384" : "#d5dce2"}
                        stroke={isActive ? "#f56501" : "#6a8395"}
                        strokeWidth={1}
                        className="cursor-pointer"
                        onClick={() => setActiveId(isActive ? null : location.id)}
                      />
                    );
                  })}

                {content.locations.map((location, index) => {
                  const isActive = activeId === location.id;
                  return (
                    <path
                      key={location.id}
                      d={arcPath(content.hq.coordinates, location.coordinates)}
                      fill="none"
                      stroke="#f56501"
                      strokeOpacity={isActive || activeId === null ? 0.55 : 0.2}
                      strokeWidth={isActive ? 2.2 : 1.2}
                      strokeLinecap="round"
                      strokeDasharray="4 4"
                      className={`${styles.drawLine} ${isActive ? styles.arcFlow : ""}`}
                      style={{ animationDelay: `${300 + index * 180}ms` }}
                    />
                  );
                })}

                <g fill="#f56501">
                  {content.locations.map((location, index) => (
                    <circle key={location.id} r={2.4} opacity={0.9}>
                      <animateMotion
                        dur="3.6s"
                        begin={`${1 + index * 0.25}s`}
                        repeatCount="indefinite"
                        path={arcPath(content.hq.coordinates, location.coordinates)}
                      />
                    </circle>
                  ))}
                </g>

                {content.locations.map((location) => {
                  const override = LABEL_OVERRIDE[location.id];
                  const isActive = activeId === location.id;
                  return (
                    <Marker key={location.id} coordinates={location.coordinates}>
                      <circle
                        r={isActive ? 6 : 5}
                        fill={isActive ? "#f56501" : "#28333c"}
                        stroke="#fdfbf7"
                        strokeWidth={1.5}
                        className="cursor-pointer"
                        onClick={() => setActiveId(isActive ? null : location.id)}
                      />
                      <circle r={2} fill="#fdfbf7" className="pointer-events-none" />
                      {/* A light halo behind the label text rather than a
                          plain fill colour: with the landmass now bright
                          (cream/light-brand, not the original dark slate),
                          dark label text needs its own contrast plate to
                          stay legible over both the pale landmass and the
                          open (dark brand-800) sea alike. */}
                      <text
                        x={override?.dx ?? 9}
                        y={4}
                        textAnchor={override?.anchor ?? "start"}
                        style={{
                          fontFamily: "var(--font-sans), sans-serif",
                          fontSize: 12,
                          fontWeight: isActive ? 700 : 600,
                          fill: isActive ? "#f56501" : "#1d262d",
                          paintOrder: "stroke",
                          stroke: "#fdfbf7",
                          strokeWidth: 3,
                          strokeLinejoin: "round",
                        }}
                      >
                        {location.name}
                      </text>
                    </Marker>
                  );
                })}

                <Marker coordinates={content.hq.coordinates}>
                  <circle r={11} fill="#f56501" opacity={0.22} className={styles.hqPulse} />
                  <circle r={7} fill="#f56501" stroke="#fdfbf7" strokeWidth={1.5} />
                  <circle r={2.8} fill="#fdfbf7" />
                  <text
                    x={12}
                    y={-6}
                    style={{
                      fontFamily: "var(--font-sans), sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      fill: "#ab4a07",
                      paintOrder: "stroke",
                      stroke: "#fdfbf7",
                      strokeWidth: 3,
                      strokeLinejoin: "round",
                    }}
                  >
                    {content.hq.name}
                  </text>
                  <text
                    x={12}
                    y={8}
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 10,
                      fill: "#1d262d",
                      letterSpacing: "0.12em",
                      paintOrder: "stroke",
                      stroke: "#fdfbf7",
                      strokeWidth: 3,
                      strokeLinejoin: "round",
                    }}
                  >
                    {content.hqSublabel}
                  </text>
                </Marker>
              </ComposableMap>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Second chapter, still the same section: the manufacturing figures
          that used to be a separate "Infrastructure & capabilities" band.
          They are numbers about a physical place, so they are set over a
          photograph of it and given the full width of the page rather than
          boxed into four bordered cards. The ring gauges stay — they are
          the same grammar the location tracks above use: a value, and a
          shape that fills to match it. */}
      <div className="relative isolate overflow-hidden">
        <Image src={capability.image} alt={capability.imageAlt} fill sizes="100vw" className="-z-20 object-cover" />
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-950/72" />
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_120%_at_12%_0%,rgba(245,101,1,0.22),transparent_62%)]"
        />

        <div className="mx-auto max-w-[1280px] px-6 py-12 lg:py-16">
          <SectionHeading eyebrow={capability.eyebrow} title={capability.title} tone="dark" />

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:mt-14 lg:grid-cols-4">
            {capability.items.map((item, index) => (
              <Reveal
                key={item.id}
                delay={index * 110}
                className="relative lg:border-s lg:border-brand-700/70 lg:ps-8 lg:first:border-s-0 lg:first:ps-0"
              >
                <CapabilityGauge fill={item.fill} delay={index * 110 + 220} />
                <p className="mt-5 font-mono text-[1.85rem] leading-none font-semibold text-cream-50 sm:text-[2.2rem]">
                  <CountUp value={item.value} />
                </p>
                <span className="mt-1.5 inline-block rounded-full bg-signal-500/15 px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] text-signal-400 uppercase">
                  {item.unit}
                </span>
                <p className="mt-2.5 text-xs leading-snug text-brand-300">{item.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
