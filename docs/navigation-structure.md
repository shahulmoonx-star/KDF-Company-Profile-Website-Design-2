# Navigation Structure — Final

Approved menu structure for the KDF site, revised 2026-09-19 (superseding the 2026-09-15 version below it in git history). This is a **living, CMS-managed structure** — items at any level may be added, removed, renamed, reordered, or regrouped through the future CMS. Nothing about the navbar's code should assume this exact shape stays fixed; see [Implementation Notes](#implementation-notes) below for how that's handled.

**Changes from the first approved version:** Home was removed as a nav item (the homepage is still the site's `/` route, it's just not a menu entry). Work With Us was folded into Media & Engagement rather than staying a standalone top-level section. About KDF, Infrastructure & Capabilities and Sustainability were each regrouped to cut down the number of flat top-level items — see the note in [Implementation Notes](#implementation-notes) about why Solutions & Products was deliberately left alone.

## 1. About KDF

- Who We Are
  - Company Overview
  - History since 1966
  - KDF–SLB Partnership
- Vision, Mission & Values
- Our Leadership
- Governance
  - Board of Directors
  - Chairman's Message
  - Code of Conduct / Business Integrity
- Milestones
- Awards & Certifications
- Our Facilities

## 2. Solutions & Products

### 3.1 Drilling & Completion Fluids
Overview · Download Product Catalogue · Drilling Fluid Solutions · Completion Fluid Solutions · Products · Product Data Sheets · Success Stories

### 3.2 Production Chemistry
Overview · Download Product Catalogue · Treat Chemistry · Protect Chemistry · Assure Chemistry · Product Data Sheets · Success Stories

### 2.3 Cementing Solutions
Overview · Download Product Catalogue · Products & Services · Laboratory and Technical Support · Product Data Sheets · Success Stories

## 3. Infrastructure & Capabilities

- Operations
  - Manufacturing Facilities
  - Warehousing & Logistics
- Research & Development
- Quality & Safety
  - Laboratories & Testing
  - Quality Assurance & Quality Control
  - Occupational Health, Safety & Environment

## 4. Sustainability

- Sustainability Strategy
- ESG Approach
  - Environmental
  - Social
  - Governance
- Local Content & Kuwaitisation
- Reporting
  - CEO Sustainability Message
  - Sustainability Reports

## 5. Media & Engagement

- Latest News
  - Corporate announcements
  - Product and technology updates
  - Awards and achievements
  - Events and exhibitions
  - Tendering / Supplier Registration *(folded in from the former Work With Us section — see the flag below)*
  - Working at KDF
  - Current Vacancies
  - Submit Your CV
- Photo Gallery
  - Facilities
  - Operations
  - Corporate events
  - Awards and exhibitions
- Partners & Clients
  - Technology partners
  - Business partners
  - Key clients
  - Industries served

*Flag for a later pass: these four career/tendering items sit under a column literally labelled "Latest News," which is a heading/content mismatch worth revisiting — e.g. renaming that column, or moving them once there's a place with more room. Kept as specified for now.*

## 6. Contact Us

- General Enquiry — form fields: Name, Company, Email, Phone, Subject, Message *(field spec for the future contact form, not a nav item)*
- Technical Query — form fields: Product/Solution Category, Technical Requirements, Document Upload, Contact Info *(field spec for the future contact form, not a nav item)*
- Locations & Contact Information
  - Head office
  - Manufacturing facilities
  - Warehousing locations
  - Regional offices
  - Telephone and email
  - Location map

---

## Implementation Notes

Because this structure is CMS-managed and can change shape at any depth, the navbar is built against a **generic recursive data model**, not a type per menu level:

```ts
interface NavItem {
  id: string;
  label: string;
  href?: string;
  children?: NavItem[];
}
```

- Implemented in [`src/lib/content/navigation.ts`](../src/lib/content/navigation.ts), following the same pattern as [`backend-integration-plan.md`](./backend-integration-plan.md): an accessor function (`getMainNavigation()`) that today returns mock data matching this exact structure, and later becomes a `fetch()` call to the API — no changes needed anywhere else.
- The navbar's rendering logic ([`src/components/nav/menu-utils.ts`](../src/components/nav/menu-utils.ts)) makes no assumptions about which items have children or how many columns a dropdown needs — column count and grouping are derived purely from the data shape at render time, so CMS edits (adding a child to a previously-flat item, renaming a section, deleting a whole branch) work automatically with zero code changes.
- **Desktop depth is capped at two levels below each top-level item** (a column heading and its direct leaf items) — the mega-menu panel does not recurse into a leaf's own children, only the mobile drawer's accordion does. This is why Solutions & Products keeps its original flat item lists rather than gaining a third level of grouping: it already has one level of grouping (each product line is its own column), and a "Resources" sub-group inside that would render on mobile but not on desktop. Keep any future regrouping within that limit, or extend `MegaMenu.tsx` to recurse deeper first.
- **No page links yet.** Every item renders as a click target (opens/closes menus; leaf items are inert) rather than an `<a href>` — real routing is out of scope until the corresponding pages exist. `href` stays in the type for when that's wired up.
