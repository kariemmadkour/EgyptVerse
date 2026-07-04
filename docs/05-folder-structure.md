# Egypt Digital Heritage Platform
## Milestone 5 — Folder Structure

**Status:** Implemented — see the live tree under `src/`

---

## Layering rules

The codebase separates four layers, each only allowed to depend on the ones below it:

```
app/            (routes)          → depends on: components, application, domain
components/     (UI)                → depends on: domain (types only), lib, hooks
application/    (use-case services) → depends on: domain, infrastructure
domain/         (entities, repository interfaces) → depends on: nothing
infrastructure/ (mock data + repos, DI container) → depends on: domain
```

**The rule that matters most:** nothing in `app/` or `components/` ever imports from
`infrastructure/mock/*` directly — everything goes through
`infrastructure/di/container.ts`, which is typed against the `domain/repositories` interfaces.
This is what makes Phase 2's backend swap a one-file change instead of a rewrite.

## Directory reference

| Path | Contents |
|---|---|
| `src/app/[locale]/` | Every route. Pages are thin: fetch via `container`, render a template. |
| `src/components/ui/` | shadcn/Base UI primitives + small composites (breadcrumbs, entity card, forms). |
| `src/components/layout/` | Header (mega menu + mobile sheet), Footer, locale switcher. |
| `src/components/templates/` | The 8 reusable page templates — the only page-layout patterns in the app. |
| `src/components/modules/` | Feature-specific composites that don't belong in a generic template (home hero, chat shell, horizontal era scroller). |
| `src/components/motion/` | Reveal, AnimatedCounter, PageTransition, SmoothScrollProvider, ThreeHeroScene, LottieLoader. |
| `src/components/providers/` | App-wide client providers (TanStack Query). |
| `src/domain/entities/` | One file per content area (library, archives, museum, ...) plus `common.ts` for shared types (`LocalizedText`, `MediaAsset`, `HeritageEntityRef`). |
| `src/domain/repositories/` | Interface-only contracts — no implementation. |
| `src/application/services/` | Cross-repository read models (e.g. `home.service.ts` aggregates 6 repositories for the homepage). |
| `src/infrastructure/mock/data/` | Realistic trilingual mock content. |
| `src/infrastructure/mock/repositories/` | In-memory implementations of the domain interfaces. |
| `src/infrastructure/di/container.ts` | Composition root. |
| `src/i18n/` | next-intl routing, navigation, and request config. |
| `src/lib/` | `format.ts`, `entity-links.ts`, `fonts.ts`, `utils.ts` (cn helper). |
| `src/hooks/` | `use-gsap.ts` — scoped GSAP context + ScrollTrigger registration. |
| `src/constants/` | Static config that isn't content (navigation structure). |
| `messages/` | Translation files, one per locale, shared namespaces across the whole app. |
| `tests/` | Vitest unit tests (`tests/unit`) and component tests (`tests/components`). |

## Why this split (vs. a simpler `components/` + `lib/` app)

A 14-module, 3-language, animation-heavy platform destined for a real backend in Phase 2 needs
the domain/infrastructure separation from day one — retrofitting it after pages already call
mock arrays directly is a much larger effort than starting with the interface boundary. The cost
today is a few extra files per entity; the payoff is that Phase 2 touches exactly one file
(`container.ts`) per repository swapped.
