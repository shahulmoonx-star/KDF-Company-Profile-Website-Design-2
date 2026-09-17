# Navigation Structure — Final

Approved menu structure for the KDF site (2026-09-15). This is a **living, CMS-managed structure** — items at any level may be added, removed, renamed, reordered, or regrouped through the future CMS. Nothing about the navbar's code should assume this exact shape stays fixed; see [Implementation Notes](#implementation-notes) below for how that's handled.

## 1. Home

- Distinct homepage hero/value statement
- Proof-point teasers linking to: Solutions, Infrastructure, Sustainability, Certifications, Partners/Clients, Latest News

*(No nav dropdown — the hero/teasers above are homepage content requirements for a later phase, not menu items.)*

## 2. About KDF

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

## 3. Solutions & Products

### 3.1 Drilling & Completion Fluids
Overview · Download Product Catalogue · Drilling Fluid Solutions · Completion Fluid Solutions · Products · Product Data Sheets · Success Stories

### 3.2 Production Chemistry
Overview · Download Product Catalogue · Treat Chemistry · Protect Chemistry · Assure Chemistry · Product Data Sheets · Success Stories

### 3.3 Cementing Solutions
Overview · Download Product Catalogue · Products & Services · Laboratory and Technical Support · Product Data Sheets · Success Stories

## 4. Infrastructure & Capabilities

- Manufacturing Facilities
- Warehousing & Logistics
- Research & Development
- Laboratories & Testing
- Quality Assurance & Quality Control
- Occupational Health, Safety & Environment

## 5. Sustainability

- Sustainability Strategy
- ESG Approach
  - Environmental
  - Social
  - Governance
- Local Content & Kuwaitisation
- CEO Sustainability Message
- Sustainability Reports

## 6. Media & Engagement

- Latest News
  - Corporate announcements
  - Product and technology updates
  - Awards and achievements
  - Events and exhibitions
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

## 7. Work With Us

- Tendering / Supplier Registration
- Careers
  - Working at KDF
  - Current Vacancies
  - Submit Your CV

## 8. Contact Us

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
- The navbar's rendering logic ([`src/components/nav/menu-utils.ts`](../src/components/nav/menu-utils.ts)) makes no assumptions about which items have children, how many levels deep the tree goes, or how many columns a dropdown needs — it's derived purely from the data shape at render time, so CMS edits (adding a child to a previously-flat item, renaming a section, deleting a whole branch) work automatically with zero code changes.
- **No page links yet.** Every item renders as a click target (opens/closes menus; leaf items are inert) rather than an `<a href>` — real routing is out of scope until the corresponding pages exist. `href` stays in the type for when that's wired up.
