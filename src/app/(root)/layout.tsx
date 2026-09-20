import type { ReactNode } from "react";

/**
 * A separate root layout for the "/" redirect page only (see page.tsx in
 * this folder). It lives in its own route group so it can define its own
 * <html>/<body> without colliding with src/app/[locale]/layout.tsx, which
 * is the root layout for every real page — Next's "multiple root layouts"
 * pattern. Kept deliberately bare: real visitors bounce off this page in a
 * single tick and never see it styled.
 */
export default function RedirectRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
