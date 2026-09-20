"use client";

import Image from "next/image";
import styles from "./HeroSlideshow.module.css";

export interface HeroSlide {
  src: string;
  alt: string;
}

/**
 * Full-bleed background slideshow: every slide stays pinned at `inset-0`
 * and the transition between them is a pure opacity crossfade — the active
 * slide fades in over whichever one was showing, which stays put
 * underneath it rather than moving out of the way. A crossfade can't
 * produce a gap: both images are always exactly the full size of the
 * frame, so there's nothing for the container's own background to show
 * through no matter where the transition is.
 *
 * `index` is controlled by the caller (Hero.tsx) rather than owned here —
 * Hero also drives the on-screen slide indicator and prev/next controls,
 * and all three need to agree on which slide is active.
 *
 * Each image also has a slow, continuous, independent zoom (see
 * HeroSlideshow.module.css) — that's where the sense of motion comes
 * from, rather than from the transition itself.
 *
 * No prefers-reduced-motion gate, per this project's standing rule — see
 * LoadingScreen.tsx.
 */
export default function HeroSlideshow({
  slides,
  index,
}: {
  slides: HeroSlide[];
  index: number;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-brand-950" aria-hidden="true">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 overflow-hidden transition-opacity duration-[1200ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${styles.kenBurns}`}
          />
        </div>
      ))}
    </div>
  );
}
