"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { useIntroReady } from "./intro";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type RevealVariant = "up" | "rise" | "fade" | "rule" | "column";

/**
 * Scroll-triggered entrance. Renders its children, then reveals them the
 * first time they scroll into view — once, never re-hiding.
 *
 * Two deliberate properties:
 *
 * 1. **Visible by default.** The server-rendered markup carries no hidden
 *    state; the hidden state is applied on the client before first paint.
 *    If JavaScript never runs, the page reads normally instead of staying
 *    blank — worth the small amount of extra machinery on a corporate site.
 * 2. **Gated on the intro.** Nothing observes until the loading screen has
 *    handed over, so content already in view animates as the overlay
 *    dissolves rather than invisibly behind it.
 *
 * There is deliberately no prefers-reduced-motion branch. The client
 * reviews this site on a machine with reduced motion switched on, and
 * suppressing motion there means they see none of it. Do not add one
 * without asking.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
}: {
  children?: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);
  const introReady = useIntroReady();

  // Before paint, so the un-hidden markup is never visible on screen.
  useIsomorphicLayoutEffect(() => setArmed(true), []);

  useEffect(() => {
    if (!armed || !introReady || shown) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [armed, introReady, shown]);

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal={armed ? (shown ? "shown" : "hidden") : undefined}
      data-reveal-variant={variant}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
