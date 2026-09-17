# Color Palette

Sampled directly from [`public/images/logo.png`](../public/images/logo.png) by pixel analysis, then extended into a usable UI palette.

## Core Brand Colors

| Name | Hex | RGB | Source |
|---|---|---|---|
| **Slate 700** (primary) | `#34424C` | 52, 66, 76 | Tanks & wordmark — dominant fill (~57% of the mark) |
| **Signal 500** (accent) | `#F56501` | 245, 101, 1 | Auger panel — the mark's only accent color |

## Slate (Primary) — tints & shades

| Step | Hex |
|---|---|
| 50 | `#F7F9FA` |
| 100 | `#EDF0F3` |
| 200 | `#D5DCE2` |
| 300 | `#ABBAC4` |
| 400 | `#6A8395` |
| 500 | `#4C606E` |
| 600 | `#3E4F5B` |
| **700 (brand)** | `#34424C` |
| 800 | `#28333C` |
| 900 | `#1D262D` |
| 950 | `#11181D` |

## Signal (Accent) — tints & shades

| Step | Hex |
|---|---|
| 50 | `#FEF6F1` |
| 100 | `#FCEADE` |
| 200 | `#F9D3B8` |
| 300 | `#F5B384` |
| 400 | `#F3893F` |
| **500 (brand)** | `#F56501` |
| 600 | `#D15905` |
| 700 | `#AB4A07` |
| 800 | `#863C09` |
| 900 | `#66300A` |
| 950 | `#401F08` |

## Neutrals (text & surfaces)

Cool-cast gray (tuned to the same hue as Slate) rather than a flat gray, so it sits quietly under the brand colors.

| Step | Hex |
|---|---|
| 50 | `#FBFBFB` |
| 100 | `#F6F6F6` |
| 200 | `#EAEBEC` |
| 300 | `#D7D9DA` |
| 400 | `#A4A9AC` |
| 500 | `#7A8085` |
| 600 | `#61676B` |
| 700 | `#4B5053` |
| 800 | `#36393B` |
| 900 | `#252728` |
| 950 | `#161718` |

## Semantic (reserved for later phases)

For form validation and status states once contact/enquiry pages are built. Muted to sit alongside Slate and Signal without competing.

| Name | Hex |
|---|---|
| Success | `#32674E` |
| Warning | `#F3B116` |
| Error | `#A63C30` |
| Info | `#3E7198` |

## Usage Rules

- **Slate carries the site.** Use 700–950 for navigation, footer, and body text; reserve 50–200 for light section backgrounds.
- **Signal is a spotlight, not a fill.** Buttons, links, hover states, and small icon accents — avoid large orange fields.
- **Contrast that just works:** white text on Slate 500–950; dark Slate text on Slate 50–300 and Signal 50–300.
- **On Signal 500,** use white for short UI labels (buttons); avoid long body copy directly on orange.

## Implementation

Wired into Tailwind v4 via `@theme` in [`src/app/globals.css`](../src/app/globals.css), as `brand-*` (primary slate scale — named `brand` rather than `slate` to avoid colliding with Tailwind's built-in `slate` gray scale), `signal-*` (accent orange scale), and `cream-*` (50/100/300 — the warm background family used by the navbar and loading screen). Use as normal Tailwind utilities: `bg-brand-700`, `text-signal-500`, `border-cream-300`, etc.
