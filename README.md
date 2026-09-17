# KDF — Corporate Profile Website

Corporate profile website for **Kuwait Drilling Fluids & Oil Service Company (KDF)** — Kuwait's and the GCC's leading manufacturer and service provider for drilling fluids, production chemistry, and cementing solutions, established in 1966.

| | |
|---|---|
| **Owner** | Kuwait Drilling Fluids & Oil Service Company (KDF) |
| **Developer & copyright holder** | [Uniweb IT Solutions](https://uniwebonline.com) |
| **Year** | 2026 |
| **Licence** | Proprietary — All Rights Reserved. See [LICENSE](./LICENSE). |

## Architecture

This repository is the **frontend only**. The site is dynamic and API-driven: **every** piece of content — text, images, navigation, documents — is served by a separate **.NET Web API** backed by a **SQL** database and managed through a CMS. Nothing that an editor should be able to change may stay hardcoded in this repository.

```
Browser
  |
  v
Next.js (Server Components, SSR/ISR)   <- this repository
  |
  v
.NET Web API  <---- CMS (admin) writes here too
  |
  v
SQL Database
```

Content is fetched **server-side** (Server Components / server-side `fetch`) so pages stay server-rendered and crawlable even though the content behind them is dynamic.

### The data-layer contract

The backend does not exist yet, so the frontend is built against typed accessors that return mock data today and real API responses later — with no changes to the components that consume them.

1. Every entity gets a typed accessor in [`src/lib/content/`](./src/lib/content) (e.g. `getSiteSettings()`, `getMainNavigation()`), returning a shape declared in [`types.ts`](./src/lib/content/types.ts).
2. **Today** those functions return local mock data matching that shape.
3. **Later** the function body is swapped for a real `fetch(\`${process.env.API_BASE_URL}/…\`)`. Page components already consume the accessor, not raw strings, so they do not change.

**Every new section must follow this pattern.** Do not hardcode copy, image paths, or menu items into a component. The full plan — content inventory, proposed REST surface, revalidation strategy and migration checklist — is in [`docs/backend-integration-plan.md`](./docs/backend-integration-plan.md).

### Assets are not cached

[`next.config.ts`](./next.config.ts) sets `images.unoptimized: true`, disabling Next.js's Image Optimization pipeline entirely. Content editors replace files at stable paths and expect the change on the very next load, so no caching layer may sit in front of an asset the client or the CMS updates. Do not add one — image optimisation, long `revalidate` windows or service workers — without asking.

## Getting started

Copy the environment template and point it at your local API:

```bash
cp .env.example .env.local
```

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Project structure

```
src/
  app/                    App Router entry, root layout, global styles
  components/             Shared UI (navbar, loading screen)
  lib/content/            Typed data accessors — mock now, API later
public/images/            Brand assets (logo.png, favicon.png)
docs/                     Project documentation (see below)
design/                   Loading-screen design canvas artboards
```

### Currently built

- **Loading screen** — the "Precision Rule" sequence: the mark is placed, a measured rule fills beneath it, then the rule carries the mark into the navbar and comes to rest as the navbar's orange border. It measures the real navbar at runtime, so the landing stays exact if the navbar is restyled.
- **Navbar** — the site header the loading screen hands off to. The two are deliberately coupled via the `data-nav-header` and `data-nav-logo` hooks; keep them if the navbar is reworked.

Everything else is added phase by phase and logged in [`docs/phase-log.md`](./docs/phase-log.md).

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router, TypeScript)
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) v4 — the brand palette is declared as `@theme` tokens in [`src/app/globals.css`](./src/app/globals.css); there is no `tailwind.config.js`
- [ESLint](https://eslint.org)

## Documentation

| Document | Contents |
|---|---|
| [`project-brief.md`](./docs/project-brief.md) | Client, developer, stack, conventions |
| [`backend-integration-plan.md`](./docs/backend-integration-plan.md) | API architecture, content inventory, migration checklist |
| [`color-palette.md`](./docs/color-palette.md) | Brand palette sampled from the logo, and its usage rules |
| [`brand-assets.md`](./docs/brand-assets.md) | Logo and favicon locations |
| [`navigation-structure.md`](./docs/navigation-structure.md) | The client-approved site menu |
| [`website-content-source.md`](./docs/website-content-source.md) | Verbatim content audit of the existing kdf.com.kw site |
| [`phase-log.md`](./docs/phase-log.md) | What was delivered in each phase |

---

© 2026 Uniweb IT Solutions. All Rights Reserved. Built for Kuwait Drilling Fluids & Oil Service Company.
