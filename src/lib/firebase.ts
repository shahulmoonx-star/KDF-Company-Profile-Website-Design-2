import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

// Public client config for the kdf-website-design-1 Firebase project. These
// values identify the project to Firebase; they aren't secrets (Firebase's
// security model relies on Firestore/Storage rules and App Check, not on
// hiding this object), so it's fine for it to live in client-shipped code.
const firebaseConfig = {
  apiKey: "AIzaSyBiBHxKZpw8v44-omRgPMYwgEaVW3UulRM",
  authDomain: "kdf-website-design-1.firebaseapp.com",
  projectId: "kdf-website-design-1",
  storageBucket: "kdf-website-design-1.firebasestorage.app",
  messagingSenderId: "340421883317",
  appId: "1:340421883317:web:cf3c0592a6e7c57c4e95fc",
  measurementId: "G-1RKTWJEC0W",
};

export const firebaseApp: FirebaseApp = getApps()[0] ?? initializeApp(firebaseConfig);

let analyticsPromise: Promise<Analytics | null> | null = null;

/**
 * Analytics reads window/indexedDB and isn't supported in every browser, so
 * this resolves to null instead of throwing during server rendering or on
 * an unsupported client rather than assuming a normal browser tab.
 */
export function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (!analyticsPromise) {
    analyticsPromise = isSupported().then((supported) =>
      supported ? getAnalytics(firebaseApp) : null,
    );
  }
  return analyticsPromise;
}
