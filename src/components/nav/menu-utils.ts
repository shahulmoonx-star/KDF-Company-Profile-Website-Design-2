import type { NavItem } from "@/lib/content/types";

/**
 * One entry in the mega-menu's left rail, and the links its right pane
 * shows when it is selected.
 *
 * The panel's width is fixed and the pane grids its own links, so a
 * section is never split across columns: one nav group is exactly one rail
 * entry, and the flat (childless) children of a menu are pooled into a
 * single entry. This replaced an earlier buildColumns() that chunked flat
 * links into fixed-width columns for a panel that sized itself to its
 * content — see MenuPanel in MegaMenu.tsx for why that went.
 *
 * Pure and CMS-shape-agnostic on purpose, matching the contract in
 * docs/navigation-structure.md: derived from whatever shape the data has
 * at render time, so adding, removing or regrouping items at any depth
 * needs no code change here.
 */
export interface MenuSection {
  id: string;
  /** Null for the pooled flat entry, which has no group name of its own —
   *  the caller substitutes the "Quick Links" UI string. */
  heading: string | null;
  items: NavItem[];
}

export function buildSections(item: NavItem): MenuSection[] {
  const children = item.children ?? [];
  const groups = children.filter((child) => (child.children?.length ?? 0) > 0);
  const flat = children.filter((child) => (child.children?.length ?? 0) === 0);

  const sections: MenuSection[] = groups.map((group) => ({
    id: group.id,
    heading: group.label,
    items: group.children ?? [],
  }));

  // Flat leftovers become one entry, listed first: on a wholly flat menu
  // (About KDF, Contact Us) it is the only entry, so the panel opens
  // straight onto those links with nothing to choose first.
  if (flat.length > 0) {
    sections.unshift({ id: `${item.id}-flat`, heading: null, items: flat });
  }

  return sections;
}
