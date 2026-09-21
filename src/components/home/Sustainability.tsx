"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { HomePage } from "@/lib/content/types";

/**
 * Ported verbatim from design/hazecomfort.com-main's `ServiceShowcase`
 * ("What We Do") — same pinned scroll-stack, same 3D peel/recede transform
 * math, same lerp-smoothed scroll handling, same layout. The client asked
 * for this section to be a literal copy of that component: no design
 * change, only content and images swapped for KDF's own.
 *
 * Two things had to change to make that copy actually render, both
 * mechanical rather than design decisions:
 *
 * 1. The reference's Tailwind classes point at ITS OWN theme tokens
 *    (`bg-primary`, `text-charcoal`, `font-display`, `.gold-label`, a red
 *    `--primary`, a `Plus Jakarta Sans` display font) — none of which
 *    exist in this project's theme. Rather than importing that theme
 *    (which would put a second, unrelated color system into this site),
 *    every class was mapped one-for-one onto KDF's own existing tokens
 *    that already serve the same role elsewhere on this page: the
 *    reference's red accent -> KDF's signal-orange; its charcoal ->
 *    brand-950; its muted grey -> brand-400/500; its border -> cream-300;
 *    its display font -> font-sans (Geist, KDF's own heading face); its
 *    `.gold-label` eyebrow -> the exact `font-mono uppercase
 *    tracking-[0.3em] text-signal-600` treatment every other eyebrow on
 *    this page already uses (see RegionalPresence.tsx). The layout,
 *    spacing, and every animation number are untouched.
 * 2. `lucide-react`'s `ArrowUpRight` icon isn't a dependency of this
 *    project, so it's inlined here as the equivalent SVG rather than
 *    adding a new package for one icon.
 * 3. The reference's breakpoint is `md:` (768px). In this project's
 *    Tailwind v4 build, `md:` variants compile to nothing — verified by
 *    checking the served stylesheets for any `768px` media query; there
 *    isn't one, even though the class names themselves reach the HTML —
 *    and every other section on this page that needs this same
 *    one-column-to-two-column switch already uses `lg:` (1024px) instead
 *    (see RegionalPresence.tsx, Recognition.module.css). So every `md:`
 *    in the original is `lg:` here; nothing else about the breakpoint
 *    logic changed.
 *
 * One departure from "verbatim": the desktop rail's item numbers and
 * titles were sized directly off the reference's own pixel values
 * (10px/13px/15px), but the reference sets them in `Plus Jakarta Sans`
 * while this port uses Geist (`font-sans` here maps to Geist, not that
 * font — see point 1) — different typefaces read at noticeably different
 * perceived sizes at the same px value, and at the reference's exact
 * numbers the rail read as too small in Geist. Bumped to 12px/16px/18px,
 * which is a legibility correction for the font substitution, not a
 * layout redesign.
 *
 * Content stays prop-driven (`content={home.sustainability}`) rather than
 * hardcoded like the reference's own `services` array, so Arabic
 * translation and CMS-editability aren't lost — only `pillar.title`,
 * `pillar.body` and `pillar.image` feed the deck; `pillar.group` and
 * `pillar.tags`, used by the previous version of this section, are not
 * rendered here, matching the reference's own two-field (title/desc) card
 * content exactly.
 */

const VH_PER_CARD = 55; // scroll distance (vh) to move one card

export default function Sustainability({ content }: { content: HomePage["sustainability"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const services = content.pillars;
  const N = services.length;

  useEffect(() => {
    let raf = 0;
    let target = 0;
    let current = -1;

    const computeTarget = () => {
      const el = sectionRef.current;
      if (!el) return;
      const range = el.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      target = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / range));
    };

    // start at the real scroll position (no animate-in from 0 on reload mid-page)
    computeTarget();
    current = target;
    setProgress(current);

    // lerp toward the scroll position every frame — smooths out
    // the discrete jumps of mouse-wheel scrolling
    const loop = () => {
      computeTarget();
      const diff = target - current;
      if (Math.abs(diff) > 0.0004) {
        current += diff * 0.12;
        setProgress(current);
      } else if (current !== target) {
        current = target;
        setProgress(current);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const activeFloat = progress * (N - 1);
  const active = Math.round(activeFloat);

  const jumpTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (i / (N - 1)) * range, behavior: "smooth" });
  };

  return (
    <section
      id="sustainability"
      ref={sectionRef}
      className="relative bg-cream-50"
      style={{ height: `calc(${(N - 1) * VH_PER_CARD}vh + 100vh)` }}
    >
      {/* pinned viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* blueprint grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,101,1,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,101,1,1) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        {/* giant ghost counter — brand orange, at an opacity that keeps it
            clearly legible against KDF's cream backdrop without competing
            with the card content in front of it. */}
        <span className="absolute right-4 lg:right-10 top-6 lg:top-10 font-sans font-black text-[90px] lg:text-[160px] leading-none text-signal-500/[0.28] select-none pointer-events-none">
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="relative max-w-7xl w-full mx-auto px-6 grid lg:grid-cols-[1fr_1.25fr] gap-8 lg:gap-14 items-center">
          {/* ---- LEFT: header + service rail ---- */}
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-signal-600 mb-3">
              {content.eyebrow}
            </p>
            <h2 className="font-sans text-3xl lg:text-5xl font-bold leading-tight mb-3 lg:mb-5 text-balance text-brand-950">
              {content.title}
            </h2>
            <p className="hidden lg:block text-brand-500 text-base leading-relaxed mb-8">
              {content.quote}
            </p>

            {/* rail — desktop */}
            <div className="hidden lg:flex gap-4">
              {/* progress track */}
              <div className="relative w-0.5 bg-cream-300 self-stretch rounded-full">
                <span
                  className="absolute top-0 left-0 w-full bg-signal-500 rounded-full"
                  style={{ height: `${progress * 100}%` }}
                />
              </div>
              <ul className="flex flex-col gap-2.5">
                {services.map((s, i) => {
                  const isActive = i === active;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => jumpTo(i)}
                        className={`flex items-baseline gap-3 text-left transition-all duration-300 ${
                          isActive ? "text-brand-950" : "text-brand-400/50 hover:text-brand-400"
                        }`}
                      >
                        <span className={`font-mono text-[12px] font-bold tracking-wider ${isActive ? "text-signal-500" : ""}`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-sans leading-snug transition-all duration-300 ${
                            isActive ? "font-bold text-[18px]" : "font-medium text-[16px]"
                          }`}
                        >
                          {s.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* counter — mobile */}
            <p className="lg:hidden text-sm text-brand-500 font-semibold tracking-widest">
              <span className="font-mono text-signal-500 font-bold">{String(active + 1).padStart(2, "0")}</span>
              <span className="mx-1.5 text-cream-300">/</span>
              <span className="font-mono">{N}</span>
              <span className="ml-3 text-xs font-normal normal-case tracking-normal text-brand-400/60">keep scrolling</span>
            </p>
          </div>

          {/* ---- RIGHT: 3D card deck ---- */}
          <div className="relative h-[46vh] lg:h-[62vh] max-h-[560px]" style={{ perspective: "1400px" }}>
            {services.map((s, i) => {
              const delta = i - activeFloat;
              if (delta > 3.5 || delta < -1.05) return null;

              let transform: string;
              let opacity = 1;
              let filter = "none";
              if (delta < 0) {
                // leaving — peels up & tilts away in 3D
                const t = Math.min(1, -delta);
                transform = `translateY(${-t * 110}%) rotateX(${t * 24}deg) scale(${1 + t * 0.04})`;
                opacity = Math.max(0, 1 - t * 1.15);
              } else {
                // stacked behind — recedes downward with depth
                const d = Math.min(delta, 3);
                transform = `translateY(${d * 4.2}%) translateZ(${-d * 90}px)`;
                filter = `brightness(${1 - d * 0.16})`;
                opacity = d > 2.6 ? Math.max(0, 1 - (d - 2.6) / 0.9) : 1;
              }

              return (
                <div
                  key={s.id}
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.28)] will-change-transform"
                  style={{
                    transform,
                    opacity,
                    filter,
                    zIndex: N - i,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Image src={s.image} alt={s.title} fill sizes="(max-width: 768px) 100vw, 62vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

                  {/* card content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                    <span className="block h-0.5 w-12 bg-signal-500 mb-4" />
                    <h3 className="font-sans text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">{s.title}</h3>
                    <p className="text-white/70 text-sm lg:text-base leading-relaxed max-w-md mb-5">{s.body}</p>
                    <a
                      href="#sustainability"
                      className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest group"
                    >
                      <span className="w-8 h-8 rounded-full bg-signal-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" aria-hidden="true">
                          <path d="M7 17 17 7M7 7h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      Explore
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
