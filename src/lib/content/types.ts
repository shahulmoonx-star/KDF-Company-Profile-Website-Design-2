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
