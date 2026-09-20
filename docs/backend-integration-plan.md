# Backend Integration Plan

## Direction

This site is being built as a **dynamic, API-driven website**, not a static one:

- **Frontend:** this Next.js app.
- **Backend:** .NET (ASP.NET Core Web API assumed — confirm exact version/style with the backend team).
- **Database:** SQL (SQL Server assumed, as the natural pairing with .NET — the frontend never talks to it directly, only through the API, so this choice doesn't affect frontend work either way).
- **CMS:** a separate content management system, to be built, that writes into the same SQL database the API reads from. Editors manage content there; the API serves it; the frontend renders it.

**Right now** (design/build phase), pages are being built with placeholder/hardcoded content so the visual design can be reviewed without waiting on the backend. **Before production**, every piece of content that a client-side editor should be able to change must be read from the API — nothing that belongs in the CMS should stay hardcoded in the frontend. This document is the plan for getting from one to the other with minimal rework, and the reference for what the backend/CMS need to provide.

## Architecture

```
Browser
  |
  v
Next.js (Server Components, SSR/ISR)
  |
  v
.NET Web API  <---- CMS (admin) writes here too
  |
  v
SQL Database
```

The frontend fetches content **server-side** (Server Components / server-side `fetch`) rather than client-side, so pages stay server-rendered and crawlable even though the content behind them is dynamic.

## Content Inventory

Entities the API needs to expose, derived from the content audit in [`website-content-source.md`](./website-content-source.md). Each will get its own section/page as later phases are built — this is the full target list, not all built yet.

| # | Entity | Notes |
|---|---|---|
| 1 | **Site Settings** | Company name, tagline, logo, social links, phone/email/address, footer text — the small pieces of copy that appear on every page. |
| 2 | **Navigation** | Menu structure, if it should be CMS-editable. Can stay hardcoded in the frontend for v1 if the nav is expected to be stable. |
| 3 | **Homepage** | Hero content, stats (years/employees/countries), latest news/awards teaser, trusted-partner logos. |
| 4 | **About / Who We Are** | Body copy, mission statement, vision statement. |
| 5 | **Leadership** | Chairman's message (text + name), CEO message (text + name). |
| 6 | **Services** (×3) | Drilling & Completion Fluids, Production Technologies, Oilfield Chemical Manufacturing & Supply — each with a strap line, overview, product-category lists, and success stories. |
| 7 | **Quality Policy** | The 6 policy pillars (title + body each). |
| 8 | **Quality Objectives** | The list of 9 objectives. |
| 9 | **Awards & Certifications** | List: year, title, description, category (award / ISO cert / technical award). |
| 10 | **OHS&E** | Policy text, commitment list, management-system list, performance text. |
| 11 | **Sustainability Reports** | List: year, title, PDF link. |
| 12 | **Careers** | Job listings (if/when added) + where applications go. |
| 13 | **Contact** | Office address, phone, email, and the target for contact-form submissions. |

## Proposed API Surface

A starting sketch for alignment with the backend team — endpoint names/shapes will firm up as each section is actually built:

```
GET  /api/site-settings?locale={en|ar}
GET  /api/navigation?locale={en|ar}
GET  /api/home?locale={en|ar}
GET  /api/about
GET  /api/leadership/chairman
GET  /api/leadership/ceo
GET  /api/services
GET  /api/services/{slug}
GET  /api/quality/policy
GET  /api/quality/objectives
GET  /api/certifications
GET  /api/ohse
GET  /api/sustainability-reports
GET  /api/careers
POST /api/contact
POST /api/careers/apply        (future)
```

**Every content endpoint takes a `locale` query param** (`en` or `ar`) and returns already-localized strings — the frontend never ships a translation dictionary to the client; it asks the API for one language at a time, matching the URL the visitor is on. See [`i18n.md`](./i18n.md) for the routing (`/en/...`, `/ar/...`) this pairs with.

## Frontend Data Layer Pattern

Starting with the next content phase, page/section components will **not** hardcode copy directly. Instead:

1. Each entity gets a typed accessor function in `src/lib/content/` (e.g. `getServices()`, `getAboutPage()`), returning a typed shape matching the API contract above.
2. **Today:** those functions return local mock data matching that shape, so pages can be built and reviewed with realistic content before the backend exists.
3. **Later:** swap the function body for a real `fetch(`${process.env.API_BASE_URL}/...`)` call. Nothing in the page components changes — they already consume the typed accessor, not raw strings.
4. Use Next.js's server-side fetching (Server Components, or `fetch` with a `revalidate` option) so content stays server-rendered.
5. Revalidation: start with simple time-based ISR (e.g. `revalidate: 300`); move to on-demand revalidation (a Next.js revalidate API route the CMS calls on publish) once the CMS's save flow is defined.

`getSiteSettings(locale)`, `getMainNavigation(locale)` and `getHomePage(locale)` are the accessors built against this pattern so far (see `src/lib/content/`) — each takes the `Locale` the route is rendering and returns content already localized to it.

Two notes for whoever wires the real endpoints:

- **The homepage is one document, not one request per band.** It is edited as a single page in the CMS, and one round trip keeps the server render fast. `HomePage` in `types.ts` is the contract — every heading, eyebrow and lead on the page is a field on it, so an editor can retitle any band without a frontend change.
- **Numbers are numbers.** Statistics and capacities come back as numeric values with a separate `unit` string rather than pre-formatted display strings, because the UI counts them up on scroll. Sending `"70,000 m²"` as one string would break that.

## Environment Configuration

- `API_BASE_URL` — base URL of the .NET API. Server-side only (not prefixed `NEXT_PUBLIC_`) unless a specific client-side fetch genuinely needs it.
- Template in [`.env.example`](../.env.example); real values go in `.env.local` (dev) or the hosting platform's environment settings (staging/production) — never committed.

## Migration Checklist (once the backend is ready)

1. Confirm final endpoint URLs/response shapes with the backend team; update the API surface above if it changed.
2. Set `API_BASE_URL` in each environment.
3. Swap each `src/lib/content/*.ts` accessor's mock-data body for a real `fetch()` call.
4. Add loading/error/empty states per section.
5. Wire the contact form to `POST /api/contact`.
6. Decide whether mock data files stay (as a local/offline dev fallback) or get removed.
7. Revisit caching/revalidation strategy once real traffic patterns are known.

## Open Questions

- REST confirmed, or is GraphQL preferred? (This plan assumes REST.)
- Are the public `GET` endpoints fully open, or does the frontend need an API key/token?
- Do sustainability-report PDFs and other media get served by the API/CMS as uploaded assets, or stay as static frontend files?
- Does the CMS need preview/draft support before content goes live, or is publish immediate?
- Any real-time requirements, or is periodic revalidation sufficient?
