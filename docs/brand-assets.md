# Brand Assets

## Logo

- [`public/images/logo.png`](../public/images/logo.png) — reference in components as `/images/logo.png`
- Intrinsic size 2025 × 776 (aspect ratio ≈ 2.61). The loading screen and navbar both derive their geometry from the rendered element rather than from these numbers, so a replacement of a different aspect ratio will still line up.

## Favicon

- [`public/images/favicon.png`](../public/images/favicon.png) — served through the root layout's `generateMetadata()`, which reads the path from `getSiteSettings()`.

## Notes

- Both paths are **stable**: the client replaces the file in place and expects the change on the next load. Nothing caches them — see the note on `images.unoptimized` in the README.
- Once the CMS exists these become uploaded asset URLs returned by the API. `SiteSettings.logo` and `SiteSettings.favicon` already model them as content rather than constants, so no component needs to change.
