# EgyptVerse

**Phase 1 — Frontend.** A premium, trilingual digital heritage platform for the General
Authority of the National Library and Archives of Egypt, unifying the National Library,
National Archives, Digital Museum, and 11 other public programs into one experience.

EgyptVerse is a visual fork of the Egypt Digital Heritage platform: real, curated photography
(sourced from Wikimedia Commons, credited in [`public/images/CREDITS.json`](public/images/CREDITS.json))
replaces the placeholder imagery, and each pillar/module carries a distinct ornamental design
language — Pharaonic, Islamic, or Greco-Roman/Coptic — layered on top of the shared lapis/gold/
papyrus palette and type system (see [`docs/04-design-system.md`](docs/04-design-system.md) and
`src/components/decorative/heritage-patterns.tsx`).

This phase ships the complete frontend — every module, page template, animation, and piece of
content-shaped UI — backed by a swappable mock data layer. There is no database, no
authentication, and no server-side business logic yet; see [Backend readiness](#backend-readiness-phase-2)
below for how Phase 2 plugs in without a UI rewrite.

## Tech stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
GSAP + ScrollTrigger · Framer Motion · Three.js / React Three Fiber · Lottie · Lenis smooth
scroll · shadcn UI (Base UI primitives) · Zustand · TanStack Query · next-intl

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000/ar (redirects from /)
```

Other scripts:

```bash
npm run build      # production build
npm run start       # serve the production build
npm run lint         # ESLint
npm run test          # run the Vitest suite once
npm run test:watch    # Vitest in watch mode
```

## Languages

Arabic (default), English, French — locale-prefixed routing (`/ar`, `/en`, `/fr`), automatic
RTL/LTR switching, and localized metadata, dates, and numbers (Eastern Arabic-Indic digits for
Arabic). Every visible string comes from `messages/{locale}.json` — see [`messages/en.json`](messages/en.json)
for the full key structure.

## The 14 modules

Grouped into 4 navigation pillars (see [`src/constants/navigation.ts`](src/constants/navigation.ts)):

| Pillar | Modules |
|---|---|
| Explore the Collections | National Library, National Archives, Digital Museum, Digital Collections |
| Experience Our Heritage | Virtual Exhibitions, Interactive Timelines, Restoration Laboratory |
| Engage & Learn | Research Portal, Educational Platform, Events Portal, AI Heritage Assistant |
| Access & Membership | Membership, Digital Reading Room, Publications |

Every route is an instance of one of **8 reusable page templates** in
[`src/components/templates/`](src/components/templates) — Hub, Listing, Item Detail, Collection
Detail, Immersive Story, Search Results, Dashboard Shell, and Static. No module has bespoke,
one-off page logic.

## Architecture

```
src/
  app/[locale]/         Routes only — thin server components that fetch via the DI container
                         and pass data into a template.
  components/
    ui/                  Design-system primitives (shadcn/Base UI derived: button, card, etc.)
    layout/              Header (mega menu), Footer, locale switcher
    templates/           The 8 reusable page templates
    modules/              Feature-specific composites (home hero, chat shell, era scroller)
    motion/               Animation primitives (Reveal, AnimatedCounter, Lenis/GSAP providers,
                          Three.js hero scene, Lottie loader)
    providers/            App-wide client providers (TanStack Query)
  domain/
    entities/             Plain TypeScript types for every content entity (LocalizedText-based,
                          not hardcoded strings)
    repositories/          Interfaces only — the sole contract the UI depends on
  application/services/    Composed read models (e.g. the Home page's cross-module showcase)
  infrastructure/
    mock/data/              Realistic mock content, 3-locale (ar/en/fr)
    mock/repositories/       In-memory implementations of the domain repository interfaces
    di/container.ts          Composition root — the only place that knows mocks are mocks
  i18n/                    next-intl routing/navigation/request config
  lib/                     format.ts (locale-aware numbers/dates), entity-links.ts, utils.ts
  hooks/                   use-gsap.ts (scoped GSAP context + ScrollTrigger registration)
```

## Backend readiness (Phase 2)

Every page reads data through `container.<module>.<method>()` — never a direct `fetch` or
hardcoded array. To connect a real backend in Phase 2:

1. Implement the relevant interface from [`src/domain/repositories/index.ts`](src/domain/repositories/index.ts)
   (Supabase, Oracle JDBC, SQL Server JDBC, IBM Db2, or PostgreSQL-backed — anything implementing
   the same async methods).
2. Swap the entry in [`src/infrastructure/di/container.ts`](src/infrastructure/di/container.ts).
3. No component, page, or template changes required.

## Animation system

- **Scroll reveals & stat counters** — Framer Motion (`components/motion/reveal.tsx`,
  `counter.tsx`), respecting `prefers-reduced-motion`.
- **Page transitions** — Framer Motion `AnimatePresence` keyed by pathname.
- **Smooth scroll** — Lenis, driven by GSAP's ticker and synced to `ScrollTrigger.update` for
  frame-accurate pinning.
- **GSAP ScrollTrigger** — horizontal pinned-scroll storytelling on the Timelines hub
  (`components/modules/timelines/horizontal-era-scroller.tsx`). Uses `pinType: "transform"`
  because the Framer Motion page-transition wrapper puts a `transform` on its ancestor tree,
  which would otherwise break `position: fixed` pinning.
- **Exhibitions / Timeline eras** — sticky-image + scroll-linked parallax chapters
  (`components/templates/story-chapter.tsx`).
- **3D hero** — React Three Fiber wireframe icosahedron + particle field, dynamically imported
  (`ssr: false`) since WebGL is client-only.
- **Lottie** — used for the AI Assistant's "typing" indicator, not as a route-level loading
  screen (a global `loading.tsx` was tried and reverted — it forced every statically-generated
  page into dynamic SSR, which conflicts with the Core Web Vitals target).

## Testing

Vitest + React Testing Library, configured in [`vitest.config.ts`](vitest.config.ts). Coverage
focuses on the parts of a mock-data frontend that are actually worth unit testing: the
repository layer, locale-aware formatting, entity-to-route mapping, and one animated component.

```bash
npm run test
```

## Documentation index

- [docs/01-requirements-validation.md](docs/01-requirements-validation.md)
- [docs/02-information-architecture.md](docs/02-information-architecture.md)
- [docs/03-ux-flows.md](docs/03-ux-flows.md)
- [docs/04-design-system.md](docs/04-design-system.md)
- [docs/05-folder-structure.md](docs/05-folder-structure.md)

## Known Phase 1 limitations

- All content (books, archives, museum objects, etc.) is realistic **mock data**, not real
  archival holdings — see assumptions in [docs/01-requirements-validation.md](docs/01-requirements-validation.md).
- Images are placeholder photography (picsum.photos), not real digitized assets.
- Authentication, membership checkout, and the Reading Room access gate are UI-complete but
  unauthenticated — there is no real login, and no data is persisted.
- The AI Heritage Assistant returns canned, keyword-matched replies — no live model is called.
