"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import type { HomePage } from "@/lib/content/types";
import HeroSlideshow from "./HeroSlideshow";
import styles from "./Hero.module.css";

const SLIDE_INTERVAL_MS = 6000;

/**
 * The two temporary hero photographs, each paired with a short caption for
 * the on-screen slide indicator. This pairing is presentation for the
 * placeholder photography, not CMS content, so it lives here rather than
 * in HomePage["hero"] — swapping in the client's real photography later
 * only means editing this array.
 */
const HERO_SLIDES = [
  { src: "/images/hero/hero-banner-1.jpg", caption: "Fluid Technologies" },
  { src: "/images/hero/hero-banner-2.jpg", caption: "Manufacturing Excellence" },
];

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4.5 10h11M10.5 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d={direction === "next" ? "M7.5 4l6 6-6 6" : "M12.5 4l-6 6 6 6"}
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Full-bleed image hero: exactly one viewport tall, bleeding up under the
 * transparent header (the `-mt-24` cancels out the header's own height, so
 * the slideshow starts at the true top of the page rather than below the
 * sticky header's flow position — see NavbarChrome for the header side of
 * this). Deliberately minimal copy — an eyebrow and a short title, no lead
 * paragraph — so the photography carries the section rather than text.
 *
 * The slide index is owned here, not inside HeroSlideshow, because the
 * indicator and the prev/next controls below need to read and drive the
 * same value the slideshow is animating on. Advancing manually restarts
 * the autoplay timer rather than letting it fire again immediately after.
 *
 * Buttons rather than links throughout the homepage: no destination pages
 * exist yet, and docs/navigation-structure.md settles that every target
 * stays inert until the section it points at is built.
 */
export default function Hero({ content }: { content: HomePage["hero"] }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
  }, []);

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartTimer]);

  const goTo = (next: number) => {
    setIndex(next);
    restartTimer();
  };
  const goNext = () => goTo((index + 1) % HERO_SLIDES.length);
  const goPrev = () => goTo((index - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <section className="relative isolate -mt-24 h-svh overflow-hidden">
      <HeroSlideshow
        slides={HERO_SLIDES.map((slide) => ({ src: slide.src, alt: "" }))}
        index={index}
      />

      {/* Two scrims stacked: a horizontal one that darkens the left third
          where the text sits (the photo itself stays legible on the
          right), and a light vertical one that keeps the transparent
          header's white text and the bottom control bar readable without
          visibly flattening the image. */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/60 from-0% via-black/15 via-45% to-transparent to-80%"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/35 from-0% via-transparent via-35% to-black/45 to-100%"
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col justify-end px-6 pb-14 lg:px-12 lg:pb-16">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="max-w-2xl">
            <Reveal as="div" className="flex flex-wrap items-center gap-2.5">
              <span className="h-px w-8 bg-signal-500" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
                {content.eyebrow}
              </span>
              <span className="rounded-full bg-signal-500 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.3em] text-white">
                {content.eyebrowHighlight}
              </span>
            </Reveal>

            <Reveal
              as="h1"
              variant="rise"
              delay={110}
              className="mt-5 text-4xl leading-[1.15] font-semibold tracking-[-0.01em] text-cream-50 [text-shadow:0_4px_24px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl"
            >
              {content.title}
            </Reveal>

            <Reveal delay={380} className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="group inline-flex items-center gap-3 rounded-full bg-signal-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(245,101,1,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-signal-600"
              >
                {content.primaryCta}
                <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/10"
              >
                {content.secondaryCta}
              </button>
            </Reveal>
          </div>

          <Reveal
            delay={700}
            className="mt-14 flex flex-wrap items-end justify-between gap-8 border-t border-white/20 pt-6 pe-24 sm:pe-0"
          >
            <div className="flex flex-col gap-2.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-white/85">
                {String(index + 1).padStart(2, "0")} — {HERO_SLIDES[index].caption}
              </span>
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((slide, i) => (
                  <button
                    key={slide.src}
                    type="button"
                    aria-current={i === index}
                    aria-label={slide.caption}
                    onClick={() => goTo(i)}
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      i === index ? "w-10 bg-signal-500" : "w-6 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Hidden below sm: at phone widths there isn't room for this
                next to the prev/next controls, which sit on top of this
                row (see the absolutely positioned group below) rather
                than sharing its flex layout. */}
            <div className="hidden items-center gap-6 sm:flex">
              <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-white/70">
                {content.strapline}
              </p>
              <div className={styles.cueTrack} aria-hidden="true">
                <span className={styles.cueHead} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute end-4 bottom-14 z-10 flex items-center gap-2 sm:end-6 sm:gap-3 lg:end-12 lg:bottom-16">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/70 hover:bg-white/10 rtl:-scale-x-100 sm:h-11 sm:w-11"
        >
          <ChevronIcon direction="prev" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/70 hover:bg-white/10 rtl:-scale-x-100 sm:h-11 sm:w-11"
        >
          <ChevronIcon direction="next" />
        </button>
      </div>
    </section>
  );
}
