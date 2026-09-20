"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useIntroReady } from "./intro";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Figures are grouped with Western digits and comma separators in both
 * languages. Gulf corporate publishing overwhelmingly uses Western digits,
 * and it keeps a figure like 28,800,000 identical across the two versions
 * of the page.
 */
const format = new Intl.NumberFormat("en-US");

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts a figure up from zero the first time it scrolls into view.
 *
 * Renders the final value on the server, so the real number is in the
 * markup for search engines and for anyone whose JavaScript never runs; the
 * count only takes over on the client. Gated on the intro handoff for the
 * same reason as Reveal — see intro.ts.
 */
export default function CountUp({ value, duration = 2200 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [armed, setArmed] = useState(false);
  const [display, setDisplay] = useState(value);
  const introReady = useIntroReady();

  useIsomorphicLayoutEffect(() => {
    setArmed(true);
    setDisplay(0);
  }, []);

  useEffect(() => {
    if (!armed || !introReady) return;
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();

        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setDisplay(Math.round(easeOut(progress) * value));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [armed, introReady, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {format.format(display)}
    </span>
  );
}
