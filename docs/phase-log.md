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

## Phase 2 — Bilingual routing, the navigation menu and the homepage (2026-09-19)

**English / Arabic.** The site is now bilingual with real locale routing (`/en`, `/ar`) rather than a client-side toggle, including a right-to-left Arabic layout. Routing, locale detection and the content/chrome split are documented in [`i18n.md`](./i18n.md). RTL is handled with CSS logical properties rather than mirrored stylesheets, so a single layout serves both directions — the loading screen, for one, lands correctly on the mirrored navbar with no code specific to either direction.

**Navigation.** The approved menu is live: a desktop mega-menu whose columns are derived from the data's own shape at render time (`src/components/nav/menu-utils.ts`), and a mobile drawer with a recursive accordion to the tree's full depth. Both read the same `getMainNavigation(locale)` accessor, so a CMS edit at any level needs no code change.

Two visual decisions, from client review of two directions explored on a design canvas: the panel keeps the bolder treatment (floating card, orange accent bar, dot-bullet column headings), while the **open top-level item is marked with an underline, never a filled background** — orange stays an accent rather than a fill. The language switcher follows the same rule.

**Homepage.** Eight bands — hero, business footprint, solutions selector, manufacturing capability, awards timeline, sustainability, news and contact — written from the verbatim client copy in [`website-content-source.md`](./website-content-source.md) and served by one `getHomePage(locale)` accessor.

The motion system behind it is worth knowing about before editing any of it:

- **Reveals are gated on the loading screen's handoff.** `src/components/motion/intro.ts` carries a one-way signal that the loader fires as its fade begins; every reveal and count-up waits for it. Without that gate, entrance animations run and finish underneath the overlay and the visitor arrives at a page that has already moved. The signal carries no timings, so neither module depends on the other's durations, and a fallback timer keeps the page working if the loader is ever removed.
- **Content is visible by default.** Hidden state is applied on the client before first paint, so the page still reads with JavaScript disabled instead of rendering blank.
- **Transform and opacity only**, and again **no `prefers-reduced-motion` gate** anywhere — same reason as the loading screen.

**Typography.** Geist has no Arabic coverage, so IBM Plex Sans Arabic loads alongside it and applies on `html[lang="ar"]`; both load in both locales so shared Latin fragments (KDF, ISO 9001, Treat/Protect/Assure) stay consistent.

**Hero rebuilt as a full-bleed image slideshow (2026-09-19, later the same day).** The original drawn-SVG hero (`HeroBackdrop.tsx`, since deleted) was replaced with `HeroSlideshow.tsx`: exactly one viewport tall (`h-svh`), bleeding up under the header via a negative margin so the header can go transparent and overlay it. Copy was cut to an eyebrow, a small title and one CTA — no lead paragraph, no second button; both were removed from `HomePage`'s type, not just unrendered. `NavbarChrome.tsx` gives the header a transparent/white-text state at the top of the page and its original solid state once scrolled past ~24px, shared with MegaMenu, LanguageSwitcher and the mobile hamburger through a small context (`nav-appearance.tsx`) rather than prop-drilling. A dark top-and-bottom gradient sits over the slideshow so white nav text and the white heading stay legible against whatever photograph is behind them.

The two slides were, at first, temporary SVG placeholders standing in for real photography — replaced the same day with real photos supplied directly (`public/images/hero/hero-banner-1.jpg`, a rig at golden hour; `hero-banner-2.jpg`, a coastal manufacturing facility, both a close match to the sourcing prompts below), at which point `HeroSlideshow` switched from a plain `<img>` to `next/image` as already planned. The two prompts, refined after a first pass read as generic stock photography, kept here as the record of what was asked for and delivered:

> **Image 1 — drilling rig, golden hour.** Wide-angle photograph of a modern onshore drilling rig at golden hour in a desert oilfield (Gulf/Kuwait setting), shot from a low, sweeping angle. Bright, sun-drenched sky in warm amber and pale gold tones, soft lens flare, minimal cloud. The derrick sits in the right third of the frame, leaving open sky across the left two-thirds for text overlay. Clean desert ground, subtle heat-haze, a sense of scale and precision engineering. Wide 16:9 or 21:9 aspect ratio, high resolution, sharp focus, photorealistic editorial/corporate style — no people in the foreground, no logos or text baked in.
>
> **Image 2 — manufacturing facility, Shuaiba Industrial Area.** Wide-angle photograph of an industrial chemical manufacturing and blending facility in Kuwait's Shuaiba Industrial Area, on the flat arid coastline south of Kuwait City. Bright midday sun typical of the Kuwaiti coast — pale, slightly hazy sky rather than a crystal-clear postcard blue, with a warm dusty undertone from the desert air. Storage tanks, pipework and a processing tower sit in the right third of the frame against the open sky, flat sandy terrain and a hint of the Gulf coastline at the horizon. Open sky and haze across the left two-thirds for text overlay. Wide 16:9 or 21:9 aspect ratio, high resolution, photorealistic documentary/editorial style — grounded and real rather than a polished stock-photo look, no people in the foreground, no logos or text baked in.

**Hero copy rewritten (same day, third pass).** The eyebrow and headline were both judged unprofessional and rewritten from scratch — the eyebrow's "Kuwait & the GCC · Since 1966" middot-joined-fragments format was dropped for a single continuous clause, and the one long headline that wrapped across three lines was replaced with two short, deliberate lines (`titleLine1`/`titleLine2` on `HomePage.hero`, rendered as two explicit blocks rather than left to wrap). The footer strapline — "We strive for excellence," lifted verbatim from the client's existing site — was replaced too, since it read as generic; the replacement ties into this project's own "Precision Rule" design vocabulary instead.

**Fourth pass, same day: scrim removed, logo gets its own card, intro plays once per tab, scrollbar hidden.** The dark gradient added over the hero slideshow for text legibility was removed outright at the client's request — worth knowing if legibility becomes a problem against a future replacement photo, since nothing currently compensates for it. The navbar logo now sits on its own small rounded `bg-cream-50` card (`Navbar.tsx`) rather than directly on the transparent header, so it stays legible against whatever part of the hero photo is behind it; `data-nav-logo` stays on the `<Image>` itself, not the new wrapper, so LoadingScreen's measurement is unaffected. `LoadingScreen` now checks `sessionStorage` before playing (`SESSION_KEY = "kdf_intro_played"`) and skips straight to done — before paint, via the same layout effect that does the measurement — if it already ran once in this tab; switching language is a fresh render of the same client component, which was replaying the whole sequence every time before this. And the browser's own scrollbar is hidden site-wide (`globals.css`, `html`) — scrolling itself is untouched, only the track/thumb chrome.

**Known gap:** the transparent header is scroll-position-only, not hero-aware — it goes transparent at the top of *any* page. Correct today since the homepage is the only page built; will need either a dark top band on every future page or a per-page override once the first inner page exists.

**Still open.** Every homepage target is inert — no destination pages exist yet, per [`navigation-structure.md`](./navigation-structure.md). The Arabic is a first-pass translation awaiting KDF's review, and the source site's own contradictions (450 vs 500+ employees, ISO revision years) are recorded but not resolved.

_Next phases will be logged here as scope is provided._
