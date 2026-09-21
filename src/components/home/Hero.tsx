"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/motion/Reveal";
import type { HomePage } from "@/lib/content/types";
import HeroSlideshow from "./HeroSlideshow";

const SLIDE_INTERVAL_MS = 6000;

const HERO_IMAGES = [
  "/hero-image-1.png",
  "/hero-image-2.png",
  "/hero-image-3.png",
  "/hero-image-4.png",
  "/hero-image-5.png",
] as const;

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
 * this). Each photograph carries one short, relevant title so the imagery
 * remains the focus of the section.
 *
 * The slide index is owned here, not inside HeroSlideshow, because the
 * indicator and the prev/next controls below need to read and drive the
 * same value the slideshow is animating on. Advancing manually restarts
 * the autoplay timer rather than letting it fire again immediately after.
 *
 */
export default function Hero({ content }: { content: HomePage["hero"] }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slides = HERO_IMAGES.map((src, slideIndex) => ({
    src,
    ...content.slides[slideIndex],
  }));
  const activeSlide = slides[index];

  const restartTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
  }, [slides.length]);

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
  const goNext = () => goTo((index + 1) % slides.length);
  const goPrev = () => goTo((index - 1 + slides.length) % slides.length);

  return (
    <section className="relative isolate -mt-24 h-svh overflow-hidden">
      <HeroSlideshow
        slides={slides.map((slide) => ({ src: slide.src, alt: slide.alt }))}
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
            <Reveal
              key={activeSlide.src}
              as="h1"
              variant="rise"
              delay={110}
              className="text-4xl leading-[1.12] font-semibold tracking-[-0.02em] text-cream-50 [text-shadow:0_4px_24px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl"
            >
              {activeSlide.title}
            </Reveal>
          </div>

          <Reveal
            delay={700}
            className="mt-10 flex items-end border-t border-white/20 pt-6 pe-24 sm:pe-0"
          >
            <div className="flex flex-col gap-2.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-white/85">
                {String(index + 1).padStart(2, "0")} — {activeSlide.caption}
              </span>
              <div className="flex items-center gap-2">
                {slides.map((slide, i) => (
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
