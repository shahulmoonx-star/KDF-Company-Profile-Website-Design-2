"use client";

import { useEffect } from "react";
import { getFirebaseAnalytics } from "@/lib/firebase";

/** Initializes Firebase Analytics on mount; renders nothing. */
export default function FirebaseAnalytics() {
  useEffect(() => {
    getFirebaseAnalytics();
  }, []);

  return null;
}
