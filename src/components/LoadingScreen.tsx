"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { signalIntroDone } from "./motion/intro";
import styles from "./LoadingScreen.module.css";

/**
 * How long the handoff's own CSS keyframes run (LoadingScreen.module.css:
 * `measure`, `playhead`, `placeMark`, `plateIn`, `furniture` — every one of
 * them is `ANIMATION_MS` long). Set once here and pushed into the CSS as
 * the `--anim-ms` custom property below, rather than kept as a second
 * `3700ms` literal in the stylesheet: two independently-hand-tuned numbers
 * is exactly how HOLD_MS previously drifted to 4500ms, 800ms past the
 * point the mark actually finishes travelling — the overlay held fully
 * opaque, logo already docked, doing nothing, for that whole 800ms before
 * it even started to fade. Single source of truth closes that gap for
 * good instead of re-tuning two numbers to line up by hand.
 */
export const ANIMATION_MS = 3700;
/** A brief, deliberate beat once the mark settles, before the fade begins. */
const SETTLE_MS = 150;
export const HOLD_MS = ANIMATION_MS + SETTLE_MS;
export const FADE_MS = 700;

/** Width the mark is drawn at while it is being placed. */
const DESIGN_WIDTH = 320;
/** Vertical centre of the composition, as a fraction of the overlay height. */
const STAGE_CENTRE = 0.42;
/** Gap between the bottom of the mark and the measured rule. */
const RULE_GAP = 48;
/** Length of the rule while it is filling, before it becomes the border. */
const GAUGE_WIDTH = 340;
/** Width the caption spreads across — wider than the rule, so it reads easily. */
const LABEL_WIDTH = 560;
/** Thickness of the navbar's orange bottom border, which the rule becomes. */
const BORDER_PX = 3;

/**
 * sessionStorage, not localStorage: scoped to one tab and cleared when it
 * closes, so a brand-new tab always gets the sequence again while a
 * language switch or an in-tab reload doesn't replay it.
 */
const SEEN_KEY = "kdf:loading-seen";

function alreadySeenThisTab(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    // Storage blocked (private-browsing lockdown, etc.) — play it safe and
    // just show the sequence rather than risk a permanently-skipped intro.
    return false;
  }
}

function markSeenThisTab(): void {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Nothing to do — worst case it plays again next time in this tab.
  }
}

// useLayoutEffect warns during SSR; this component renders on the server too.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * "Precision Rule" loading screen.
 *
 * A measured rule fills beneath the mark, read off by a travelling playhead.
 * When the measure completes the drafting furniture retires and the rule
 * carries the mark into the navbar, coming to
 * rest as the navbar's own orange border. Because every element ends exactly
 * on its real counterpart, the overlay's fade is invisible — the navbar does
 * not change at all across the handoff, only the page behind it.
 *
 * Nothing about the navbar is hardcoded here. The real header and logo are
 * measured on mount, so restyling the navbar can never desynchronise the
 * landing — which is what broke this animation before.
 *
 * Plays once per browser tab. A fresh tab always gets the full sequence;
 * navigating or switching language inside the same tab does not replay it.
 * See `alreadySeenThisTab`/`markSeenThisTab` above for the sessionStorage
 * mechanics. The server-rendered markup always plays the sequence — the
 * skip only ever happens client-side, in the layout effect below, before
 * the browser paints, so a repeat visit in the same tab never flashes the
 * overlay at all.
 */
export default function LoadingScreen() {
  const [phase, setPhase] = useState<"playing" | "fading" | "done">("playing");
  const [measured, setMeasured] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  // Read by the timer effect below so it never schedules a fade/done
  // transition for a sequence that was skipped outright.
  const skippedRef = useRef(false);
  // React's Strict Mode (on by default under `next dev`) intentionally
  // double-invokes effects on mount to surface missing-cleanup bugs. This
  // effect has no cleanup, so both calls run back to back: the first marks
  // the tab as seen, and — without this guard — the second call would then
  // find that mark and skip straight to "done", so the sequence silently
  // never played on ANY dev-mode load, in any tab. The guard makes the
  // whole effect a no-op on the replay, so the real logic runs exactly
  // once per mount, matching production (where Strict Mode's double-invoke
  // doesn't happen at all).
  const hasRunRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    if (alreadySeenThisTab()) {
      skippedRef.current = true;
      // Before paint: React resolves this state change before the browser
      // ever draws the "playing" frame, so nothing flashes on screen.
      signalIntroDone();
      setPhase("done");
      return;
    }
    markSeenThisTab();

    const overlay = overlayRef.current;
    if (!overlay) return;

    // The keyframes' own duration, driven from here rather than a second
    // hardcoded "3700ms" in the stylesheet — see the ANIMATION_MS comment.
    overlay.style.setProperty("--anim-ms", `${ANIMATION_MS}ms`);
    overlay.style.setProperty("--fade-ms", `${FADE_MS}ms`);

    const header = document.querySelector<HTMLElement>("[data-nav-header]");
    const navLogo = document.querySelector<HTMLElement>("[data-nav-logo]");

    // Without a navbar to land on, the CSS fallbacks still give a sane result.
    if (header && navLogo) {
      const logoRect = navLogo.getBoundingClientRect();
      const headerRect = header.getBoundingClientRect();

      // clientWidth excludes any scrollbar gutter, so the composition stays
      // centred on what the viewer actually sees.
      const stageW = overlay.clientWidth;
      const stageH = overlay.clientHeight;

      const designW = Math.min(DESIGN_WIDTH, stageW * 0.72);
      const startScale = designW / logoRect.width;
      const startH = designW * (logoRect.height / logoRect.width);

      const centreY = stageH * STAGE_CENTRE;
      const startX = (stageW - designW) / 2;
      const startY = centreY - startH / 2;
      const ruleStartY = startY + startH + RULE_GAP;

      // The rule fills to a fixed measure, then scales out to the full width.
      const gaugeW = Math.min(GAUGE_WIDTH, stageW * 0.62);
      const gaugeX = (stageW - gaugeW) / 2;

      // The caption sits on a wider measure than the rule so the two labels
      // spread apart and stay comfortably readable.
      const labelW = Math.min(LABEL_WIDTH, stageW * 0.86);

      const vars: Record<string, string> = {
        "--logo-w": `${logoRect.width}px`,
        "--logo-end-x": `${logoRect.left}px`,
        "--logo-end-y": `${logoRect.top}px`,
        "--logo-start-x": `${startX}px`,
        "--logo-start-y": `${startY}px`,
        "--logo-start-scale": `${startScale}`,
        "--rule-start-y": `${ruleStartY}px`,
        "--rule-end-y": `${headerRect.bottom - BORDER_PX}px`,
        "--rule-scale": `${gaugeW / stageW}`,
        "--gauge-x": `${gaugeX}px`,
        "--gauge-w": `${gaugeW}px`,
        "--head-x0": `${gaugeX}px`,
        "--head-x1": `${gaugeX + gaugeW}px`,
        "--label-w": `${labelW}px`,
        "--label-x": `${(stageW - labelW) / 2}px`,
        "--nav-h": `${headerRect.height}px`,
      };

      for (const [key, value] of Object.entries(vars)) {
        overlay.style.setProperty(key, value);
      }
    }

    setMeasured(true);
  }, []);

  useEffect(() => {
    // Nothing to schedule for a tab that already skipped straight to "done".
    if (skippedRef.current) return;

    // The sequence runs for every viewer. It is deliberately not gated on
    // prefers-reduced-motion — see the note at the foot of the stylesheet.
    const fadeTimer = setTimeout(() => {
      setPhase("fading");
      // Released as the fade begins, not after it: the page's own entrance
      // animations rise in while this overlay dissolves. Timings are not
      // shared — see motion/intro.ts.
      signalIntroDone();
    }, HOLD_MS);
    const doneTimer = setTimeout(() => setPhase("done"), HOLD_MS + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} ${measured ? "" : styles.pending} ${
        phase === "fading" ? styles.fading : ""
      }`}
      aria-hidden="true"
    >
      <div className={styles.plate} />

      <div className={styles.ticks} />
      <div className={styles.track} />
      <div className={styles.rule} />
      <div className={styles.head} />

      <div className={`${styles.label} ${styles.labelStart}`}>
        Kuwait Drilling Fluids
      </div>
      <div className={`${styles.label} ${styles.labelEnd}`}>Est 1966</div>

      <div className={styles.mark}>
        <Image
          src="/images/logo.png"
          alt=""
          width={320}
          height={118}
          priority
        />
      </div>
    </div>
  );
}
