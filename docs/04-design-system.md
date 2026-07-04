# EgyptVerse Platform
## Milestone 4 — Design System

**Status:** Implemented in [src/app/globals.css](../src/app/globals.css) and [src/lib/fonts.ts](../src/lib/fonts.ts)

---

## Visual identity

No existing digital brand guideline was supplied (see assumptions in
[01-requirements-validation.md](./01-requirements-validation.md)), so this system proposes an
original palette inspired by Egyptian material culture rather than a literal flag/seal palette:

| Token | Inspiration | Usage |
|---|---|---|
| `--lapis` / `--lapis-deep` | Lapis lazuli, used in Pharaonic jewelry and funerary art | Primary brand color, dark hero backgrounds |
| `--gold` / `--gold-soft` | Gilding on funerary masks and manuscripts | CTAs, accents, featured badges |
| `--papyrus` | Papyrus paper | Warm off-white base background (not pure white) |
| `--terracotta` | Nile-clay pottery | Secondary accent (eyebrows, category labels) |
| `--faience` | Egyptian faience ceramics (turquoise-blue glaze) | Reserved accent for future chart/data use |
| `--basalt` | Basalt stone | Near-black, used for overlays/gradients instead of pure `#000` |

All tokens are CSS custom properties in `:root`/`.dark`, remapped through Tailwind v4's
`@theme inline` block so they're usable directly as utilities (`bg-gold`, `text-terracotta`,
`bg-lapis-deep`, etc.) alongside the standard shadcn semantic tokens (`background`, `primary`,
`card`, ...).

## Typography

Two type systems, switched automatically by `html[dir]` in `globals.css`:

| Role | Latin (en/fr) | Arabic |
|---|---|---|
| Heading | Fraunces (serif, editorial, museum-catalog feel) | Noto Kufi Arabic |
| Body | Inter | Noto Sans Arabic |

Loaded via `next/font/google` in [src/lib/fonts.ts](../src/lib/fonts.ts) — self-hosted, zero
layout shift, no external font requests at runtime.

## Motion tokens

Shared easing/duration custom properties in `globals.css`, used consistently by Framer Motion,
GSAP, and CSS transitions so the whole platform moves with one signature feel:

```css
--ease-premium: cubic-bezier(0.16, 1, 0.3, 1);   /* the "premium" ease-out used everywhere */
--ease-in-premium: cubic-bezier(0.7, 0, 0.84, 0);
--duration-fast: 200ms;
--duration-base: 400ms;
--duration-slow: 700ms;
--duration-cinematic: 1200ms;
```

All animation respects `prefers-reduced-motion: reduce` — enforced both globally (a CSS rule
collapsing all durations to near-zero) and per-component (Framer's `useReducedMotion`, explicit
checks in the Three.js scene and Lenis provider).

## Spacing & layout

- `container-heritage` utility: centered, max-width 1440px, responsive horizontal padding
  (24px → 64px).
- 8 reusable page templates (see [02-information-architecture.md](./02-information-architecture.md#4-the-8-reusable-page-templates))
  are the only layout patterns in the app — no bespoke one-off page layouts.

## Component library

Built on shadcn's Base UI preset (not Radix) with the `--rtl` flag enabled at generation time —
every primitive (Button, Dialog/Sheet, Dropdown, Navigation Menu, Tabs, Accordion, etc.) is
logical-property-aware out of the box. Higher-level composites live in `components/ui` (cards,
breadcrumbs, forms) and `components/templates` (the 8 page templates).

## Iconography

Lucide (via the `lucide-react` icon set referenced in `components.json`). Note: this project's
installed `lucide-react` version has dropped brand/social logos; footer social links use
semantically generic icons (RSS, Mail, Send) rather than a fake brand mark.
