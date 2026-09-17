# Project Brief

## Client

**Kuwait Drilling Fluids & Oil Service Company (KDF)**

## Developer

**Uniweb IT Solutions**

## Project Type

Corporate profile website — a **dynamic, API-driven site**. This Next.js app is the frontend only; content is served by a separate .NET Web API backed by a SQL database, managed through a CMS to be built. See [`backend-integration-plan.md`](./backend-integration-plan.md) for the full architecture, content inventory, and migration plan from today's placeholder content to live API data.

## Tech Stack

**Frontend (this repo)**
- Next.js (App Router, TypeScript)
- Tailwind CSS
- ESLint

**Backend (separate repo/team)**
- .NET Web API
- SQL database
- CMS (build TBD) writing into the same database

## Approach

The project is being built phase by phase. Each phase's scope, decisions, and content are logged in [`phase-log.md`](./phase-log.md) as they're delivered.

## Repository Layout

Project files live at the repository root (no nested subfolder) — `src/app`, `public`, `docs`, etc. are all directly under the repo root.

## Git Conventions

- **Commit identity** (local to this repo, not the machine's global git config): name `Shahul Hameed`, email `shahul@uniwebonline.com` — matches the `shahul-uniweb` GitHub account. Commits made with a different email will show up under a different GitHub identity, since GitHub attributes commits by matching the commit email to a verified account email, not by the freeform name string.
- **No AI co-authorship lines** in commit messages or anywhere else in this repo, per client preference — this overrides the default attribution some tooling adds automatically.
