"use client";

import { useSyncExternalStore } from "react";

/**
 * The handoff between the loading screen and the page beneath it.
 *
 * Everything that animates on the homepage waits for this signal. Without
 * it, entrance animations would run and finish underneath the loading
 * overlay, and the visitor would arrive to a page that had already moved —
 * the exact failure mode this project has hit before.
 *
 * The loading screen fires the signal as its own fade begins, so page
 * content rises in while the overlay dissolves rather than after it.
 * Coupling is one-way and untimed: the loader announces, listeners react,
 * and neither imports the other's durations.
 *
 * Modelled as an external store rather than component state because that is
 * what it is — one flag on the document, read by many components, written
 * once from outside React.
 */
export const INTRO_DONE_EVENT = "kdf:intro-done";

/**
 * Safety net: if the loader is ever removed, fails, or never mounts, page
 * animations must still run rather than leave content invisible. Longer
 * than the loading sequence, so it only fires when the signal genuinely
 * never arrives.
 */
const INTRO_FALLBACK_MS = 7000;

export function signalIntroDone() {
  document.documentElement.dataset.introDone = "true";
  window.dispatchEvent(new Event(INTRO_DONE_EVENT));
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(INTRO_DONE_EVENT, onStoreChange);
  const fallback = setTimeout(() => {
    signalIntroDone();
  }, INTRO_FALLBACK_MS);

  return () => {
    window.removeEventListener(INTRO_DONE_EVENT, onStoreChange);
    clearTimeout(fallback);
  };
}

const getSnapshot = () => document.documentElement.dataset.introDone === "true";

/** The overlay is always present in the server-rendered markup. */
const getServerSnapshot = () => false;

export function useIntroReady(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
