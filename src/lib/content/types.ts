/**
 * Shapes the frontend consumes. Every one of these mirrors a response the
 * .NET API will eventually return — nothing here may assume the data is
 * local. See docs/backend-integration-plan.md.
 */

/**
 * Site-wide settings: the ownership, branding and contact details that
 * appear across every page. CMS-managed, so treat every field as editable
 * content rather than a constant — including the logo and favicon paths,
 * which become uploaded asset URLs once the CMS exists.
 */
export interface SiteSettings {
  /** Full legal name of the company that owns the site. */
  companyName: string;
  /** Short form used where the full name will not fit. */
  shortName: string;
  /** One-line description used for metadata and social previews. */
  description: string;
  /** Agency that built and holds copyright in the site. */
  developer: {
    name: string;
    url?: string;
  };
  /** Year shown in the copyright notice. */
  copyrightYear: number;
  /** Paths (later: API asset URLs) for the brand marks. */
  logo: string;
  favicon: string;
  /** Head-office contact details, shown in the footer and contact section. */
  contact: {
    addressLines: string[];
    phone: string;
    email: string;
  };
}

/**
 * Generic recursive nav item. Deliberately shape-agnostic: a CMS editor can
 * add, remove, rename, reorder, or regroup items at any depth, so nothing
 * that consumes this type may assume a fixed number of levels or a fixed
 * set of ids/labels. See docs/navigation-structure.md.
 */
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  children?: NavItem[];
}

/**
 * Homepage content. One entity (GET /api/home?locale=…) rather than a
 * request per section: the homepage is edited as a single page in the CMS,
 * and one round trip keeps the server render fast.
 *
 * Every section carries its own headings, so a content editor can retitle
 * or re-word any band without a frontend change. Numbers are real numbers,
 * not pre-formatted strings, because the UI animates them — see CountUp.
 */
export interface HomeStat {
  id: string;
  value: number;
  suffix?: string;
  label: string;
}

/** A client whose logo appears in the homepage's trusted-by marquee. */
export interface HomeClient {
  id: string;
  /** Company name. Not drawn on screen — it is the logo's alt text. */
  name: string;
  /** Path (later: a CMS asset URL) to the client's logo. */
  logo: string;
}

export interface HomeSolution {
  id: string;
  title: string;
  strap: string;
  /** Path (later: a CMS asset URL) to this discipline's photograph. */
  image: string;
  capabilities: string[];
}

/** One stage of the Treat / Protect / Assure production-chemistry sequence. */
export interface HomeProductionPillar {
  id: string;
  /** Always "Treat", "Protect" or "Assure" — the client's own product-line
   *  brand names, which stay in Latin script in both locales. */
  title: string;
  description: string;
  /** Specific chemical categories under this stage, shown as small tags. */
  tags: string[];
  /** Path to this stage's photograph. */
  image: string;
}

/** One point on the regional-presence map — KDF's HQ or one of the
 *  countries it serves from there. */
export interface HomePresenceLocation {
  id: string;
  name: string;
  /** [longitude, latitude], plotted directly onto the map projection. */
  coordinates: [number, number];
}

/** A manufacturing capacity figure, drawn as a filling gauge. */
export interface HomeCapacity {
  id: string;
  value: number;
  unit: string;
  label: string;
  /** How full this gauge draws, 0–1 — a visual weight, not a measured ratio. */
  fill: number;
}

export interface RecognitionImage {
  image: string;
  imageAlt: string;
  /** Temporary photography. Set false for real certificate scans (shown uncropped). */
  imagePlaceholder?: boolean;
}

export interface HomeAward extends RecognitionImage {
  id: string;
  year: string;
  title: string;
  shortTitle: string;
}

export interface HomeCertification extends RecognitionImage {
  id: string;
  standard: string;
  label: string;
}

export interface HomeNewsItem {
  id: string;
  year: string;
  category: string;
  title: string;
}

export interface HomePage {
  hero: {
    eyebrow: string;
    /** Trailing clause of the eyebrow, set apart in a brand-orange badge. */
    eyebrowHighlight: string;
    title: string;
    strapline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  footprint: {
    eyebrow: string;
    title: string;
    /** Lead-in line above the client logos. */
    clientsLead: string;
    clients: HomeClient[];
    stats: HomeStat[];
  };
  solutions: {
    eyebrow: string;
    title: string;
    lead: string;
    items: HomeSolution[];
  };
  production: {
    eyebrow: string;
    lead: string;
    /** Exactly three: Treat, Protect, Assure, in that order — the heading
     *  is built from these titles rather than stored separately. */
    pillars: HomeProductionPillar[];
  };
  presence: {
    eyebrow: string;
    title: string;
    /** Second line of the title, set apart in brand orange. */
    titleHighlight: string;
    lead: string;
    /** Small caption under the HQ marker on the map, e.g. "Headquarters". */
    hqSublabel: string;
    /** Coordinate readout printed in the map panel's corner. */
    coordinatesLabel: string;
    regionLabel: string;
    networkLabel: string;
    /** Unit suffix for the great-circle distance printed next to each
     *  location in the list, e.g. "km". */
    distanceUnit: string;
    /** Name here already reads as the full HQ label, e.g. "Kuwait HQ". */
    hq: HomePresenceLocation;
    locations: HomePresenceLocation[];
  };
  capability: {
    eyebrow: string;
    title: string;
    lead: string;
    /** Backdrop photograph for the band. Content, not a constant — a CMS
     *  editor swaps it exactly the way they swap a solution's photo. */
    image: string;
    items: HomeCapacity[];
  };
  recognition: {
    eyebrow: string;
    title: string;
    lead: string;
    awards: HomeAward[];
    certifications: HomeCertification[];
  };
  sustainability: {
    eyebrow: string;
    title: string;
    quote: string;
    attribution: string;
    pillars: { id: string; title: string; body: string; image: string; imageAlt: string }[];
  };
  news: {
    eyebrow: string;
    title: string;
    items: HomeNewsItem[];
  };
  contact: {
    title: string;
    image: string;
    imageAlt: string;
    cta: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
  };
}
