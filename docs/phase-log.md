# Phase Log

What was delivered in each phase, and the decisions behind it.

## Phase 1 — Framework, ownership and the loading screen (2026-09-16)

**Ownership and licensing.** The repository now states its ownership explicitly: KDF owns the site, Uniweb IT Solutions is the developer and copyright holder, and the year is 2026. Recorded in [`../README.md`](../README.md), [`../LICENSE`](../LICENSE) (proprietary, all rights reserved) and `package.json`, and surfaced in the app's metadata through the same API-driven accessor the rest of the site uses.

**API-driven architecture.** The site is dynamic: a separate .NET Web API over SQL, managed through a CMS, serves every piece of content including images. The frontend is built against typed accessors in `src/lib/content/` that return mock data today and real `fetch` calls later, with no change to consuming components — see [`backend-integration-plan.md`](./backend-integration-plan.md). `getSiteSettings()` is the first of these and already drives the page title, description, favicon and authorship metadata. No caching layer sits in front of any asset, since editors replace files at stable paths and expect the change on the next load.

**Brand.** The palette was sampled from the logo by pixel analysis and wired into Tailwind v4 as `@theme` tokens — see [`color-palette.md`](./color-palette.md). Brand marks live at `public/images/logo.png` and `public/images/favicon.png` ([`brand-assets.md`](./brand-assets.md)).

**Loading screen — "Precision Rule".** The approved sequence, chosen by the client from three directions explored on a design canvas (the artboards are kept in `design/loading-sequence/`). The mark is placed, a measured rule fills beneath it along a tick scale read off by a travelling playhead, and when the measure completes the drafting furniture retires and the rule carries the mark into the navbar — coming to rest as the navbar's own orange border, so the page reveal never disturbs the navbar logo.

Two implementation rules matter and should not be undone:

- **Transform-only animation.** Only `transform` and `opacity` are animated; animating `left`/`top` forces a layout pass every frame and was the original cause of visible jank.
- **Runtime measurement, not hardcoded pixels.** `LoadingScreen` measures `[data-nav-header]` and `[data-nav-logo]` with `getBoundingClientRect()` on mount and feeds CSS custom properties, so the landing is exact on any viewport and self-heals if the navbar is restyled. `Navbar.tsx` carries those two hooks — keep them if it is reworked.

There is deliberately **no `prefers-reduced-motion` branch**: the approved design mockup always animates, and gating the sequence on that media query meant reviewers with Windows animation effects switched off never saw it at all.

**Content reference.** The existing kdf.com.kw site was crawled in full and captured verbatim in [`website-content-source.md`](./website-content-source.md) as the source for rewriting the new site's copy. The client-approved menu is recorded in [`navigation-structure.md`](./navigation-structure.md) and modelled as a recursive, CMS-editable `NavItem` shape.

**Repository cleanup.** Everything not part of this foundation was removed — the exploratory homepage hero, the client-logos strip and their placeholder imagery, duplicate brand files at the repository root, and AI assistant instruction files (now ignored rather than tracked). The navbar was kept because it and the loading screen are deliberately coupled.

_Next phases will be logged here as scope is provided._
