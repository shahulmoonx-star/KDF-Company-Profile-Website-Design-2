import type { NavItem } from "@/lib/content/types";

/**
 * One rendered column of a mega-menu panel. A child item that itself has
 * children becomes its own headed column; childless (leaf) children are
 * pooled together and chunked into columns of MAX_FLAT_PER_COLUMN so a
 * section with many flat links (no sub-groups) still wraps sensibly.
 *
 * Pure and CMS-shape-agnostic on purpose, matching the contract in
 * docs/navigation-structure.md: it derives columns from whatever shape the
 * data has at render time, so adding/removing/regrouping items at any depth
 * needs no code change here.
 */
export interface MenuColumn {
  id: string;
  heading: string | null;
  items: NavItem[];
}

const MAX_FLAT_PER_COLUMN = 6;

export function buildColumns(item: NavItem): MenuColumn[] {
  const children = item.children ?? [];
  const groups = children.filter((child) => (child.children?.length ?? 0) > 0);
  const flat = children.filter((child) => (child.children?.length ?? 0) === 0);

  const columns: MenuColumn[] = groups.map((group) => ({
    id: group.id,
    heading: group.label,
    items: group.children ?? [],
  }));

  for (let i = 0; i < flat.length; i += MAX_FLAT_PER_COLUMN) {
    columns.push({
      id: `${item.id}-flat-${i}`,
      heading: null,
      items: flat.slice(i, i + MAX_FLAT_PER_COLUMN),
    });
  }

  return columns;
}
