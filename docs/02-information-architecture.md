# Egypt Digital Heritage Platform
## Milestone 2 — Information Architecture

**Status:** Draft — pending stakeholder approval
**Depends on:** [01-requirements-validation.md](./01-requirements-validation.md) (assumptions accepted)

---

## 1. IA Principles

1. **14 modules, not 14 top-level nav items.** A flat mega-menu with 14 entries would fail any
   usability heuristic for a premium institution. Modules are grouped into **4 navigation
   pillars** by user intent, matching how the British Library / Library of Congress structure
   their sites.
2. **Template reuse over one-off pages.** Every page in the sitemap maps to one of **8 reusable
   page templates** (Section 4). No module gets bespoke page logic — this directly feeds
   Milestone 6/8 and satisfies the "never duplicate logic" mandate.
3. **Content graph, not silos.** A single manuscript can be a Library catalog record, a Museum
   object, an Archive item, and a member of a Digital Collection simultaneously. IA models this
   as a **shared entity graph** with cross-linking, not four separate databases-in-spirit.
4. **Locale-prefixed, slug-stable routing.** URLs are prefixed by locale (`/ar`, `/en`, `/fr`) but
   path segments after the locale use **stable, transliteration-neutral slugs** (e.g.
   `/ar/library`, `/en/library`) rather than fully translated paths (e.g. `/ar/المكتبة`). This is
   the same pattern used by Bibliotheca Alexandrina and most large multilingual institutions —
   it keeps analytics, sharing, and SEO canonicalization simple while all *visible* labels,
   metadata, and breadcrumbs remain fully localized. **Decision made under "proceed with
   assumptions"; flag if you'd prefer fully translated slugs.**

---

## 2. Navigation Pillars (Primary Mega-Menu)

| Pillar | Modules grouped underneath | Nav label (EN example) |
|---|---|---|
| **Explore** | National Library, National Archives, Digital Museum, Digital Collections | "Explore the Collections" |
| **Experience** | Virtual Exhibitions, Interactive Timelines, Restoration Laboratory | "Experience Our Heritage" |
| **Engage** | Research Portal, Educational Platform, Events Portal, AI Heritage Assistant | "Engage & Learn" |
| **Access** | Membership Portal, Digital Reading Room, Publications | "Access & Membership" |

Plus persistent global elements: **Search** (global, entity-aware), **Locale switcher**
(AR / EN / FR), **Utility nav** (About, Visit, Contact, Accessibility, News), **Footer** (sitemap,
legal, social, partner/government links).

---

## 3. Full Sitemap

```
/[locale]/
├── (home)                                   → Home
│
├── explore/
│   ├── library/                              → Library Hub
│   │   ├── browse                            → Listing (filters: era, language, subject, format)
│   │   ├── [bookId]                          → Item Detail
│   │   └── collections/[collectionSlug]      → Collection Detail (within Library)
│   ├── archives/                             → Archives Hub
│   │   ├── browse                            → Listing (finding-aid style filters)
│   │   ├── [recordId]                        → Item Detail (archival record)
│   │   └── fonds/[fondsSlug]                  → Collection Detail (archival fonds/series)
│   ├── museum/                                → Museum Hub
│   │   ├── galleries                         → Listing (gallery grid)
│   │   ├── galleries/[gallerySlug]            → Listing (objects within a gallery)
│   │   └── objects/[objectId]                → Item Detail (3D/high-res viewer)
│   └── collections/                          → Digital Collections Hub (cross-module thematic)
│       └── [collectionSlug]                  → Collection Detail (aggregates Library+Archive+Museum)
│
├── experience/
│   ├── exhibitions/                          → Exhibitions Hub
│   │   └── [exhibitionSlug]                  → Immersive Story (scroll-driven, pinned sections)
│   ├── timelines/                            → Timeline Hub (era navigator)
│   │   └── [eraSlug]                          → Immersive Story (era deep dive + event nodes)
│   └── restoration-lab/                      → Lab Overview
│       └── [caseStudySlug]                   → Immersive Story (conservation case study)
│
├── engage/
│   ├── research/                             → Research Portal Home
│   │   ├── search                            → Search Results (advanced/faceted)
│   │   └── requests                          → Workflow (material request / citation export, mocked)
│   ├── learn/                                → Educational Platform Hub
│   │   ├── [pathSlug]                        → Listing (lessons within a learning path)
│   │   └── [pathSlug]/[lessonSlug]           → Item Detail (lesson content)
│   ├── events/                                → Events Hub (calendar + list view toggle)
│   │   └── [eventSlug]                       → Item Detail (event + RSVP workflow, mocked)
│   └── assistant/                             → AI Heritage Assistant (full-page chat shell)
│
├── access/
│   ├── membership/                            → Membership Hub (tiers/benefits)
│   │   ├── join                              → Workflow (mocked signup)
│   │   └── account                           → Dashboard (mocked auth-gated)
│   ├── reading-room/                          → Reading Room Gate (access explainer)
│   │   └── session/[itemId]                  → Dashboard (secure viewer shell, mocked access)
│   └── publications/                          → Publications Hub
│       ├── journals/[journalSlug]             → Collection Detail (issues of a periodical)
│       └── [publicationId]                   → Item Detail
│
├── search                                     → Search Results (global, cross-module)
├── about/                                     → Static/Content
├── visit/                                     → Static/Content
├── news/                                      → Listing → Item Detail
├── contact/                                   → Static/Content (form workflow, mocked)
├── accessibility/                             → Static/Content
├── legal/(privacy|terms)                      → Static/Content
└── sitemap                                    → Static/Content (human-readable sitemap)
```

---

## 4. The 8 Reusable Page Templates

Every URL above is an instance of one of these — this is what Milestones 6–8 will build as
components/layouts, not per-module one-offs.

| # | Template | Used by | Key composed elements |
|---|---|---|---|
| 1 | **Home** | `/` | Hero (3D/video), module showcase grid, editorial storytelling strip, featured exhibition, stats/counters |
| 2 | **Hub / Landing** | Library, Archives, Museum, Collections, Exhibitions, Timelines, Lab, Learn, Events, Membership, Publications, Research, Reading Room | Hero banner, featured items, sub-navigation, entry points to Listing/Detail |
| 3 | **Listing / Browse** | Book browse, archive browse, gallery grid, event calendar, publication catalog | Facet/filter sidebar, sort, pagination or infinite scroll, card grid |
| 4 | **Item Detail** | Book, archival record, museum object, lesson, event, publication | Media viewer (image/3D/PDF-mock), metadata panel, related items, citation/share |
| 5 | **Collection Detail** | Library/Archive collections, Digital Collections, journal issues | Curated narrative intro + aggregated item grid across source modules |
| 6 | **Immersive Story** | Exhibitions, Timeline eras, Restoration case studies | GSAP pinned scroll sections, parallax, full-bleed media, chaptered navigation |
| 7 | **Search Results** | Global search, Research Portal search | Query input, facets, result cards, "did you mean," empty states |
| 8 | **Dashboard / Workflow** | Membership account, Reading Room session, Research requests, Event RSVP, Contact form | Mocked-auth-gated shell, step forms, status states |
| — | **Static/Content** | About, Visit, News, Accessibility, Legal, Sitemap | Rich text + media blocks, no dynamic data dependency |

The **AI Heritage Assistant** is a special case: a persistent global widget (available from any
page) *plus* a dedicated full-page experience at `/engage/assistant` — both share one chat-shell
component.

---

## 5. Cross-Module Content Graph

Rather than 14 isolated silos, entities share a common backbone so a single heritage item can
surface everywhere it's relevant:

```
HeritageEntity (base)
 ├── LibraryBook           → appears in: Library browse, Digital Collections, Search, Timelines
 ├── ArchivalRecord        → appears in: Archives browse, Digital Collections, Research Portal, Reading Room
 ├── MuseumObject          → appears in: Museum galleries, Digital Collections, Exhibitions
 ├── PublicationIssue      → appears in: Publications, Research Portal
 └── TimelineEvent         → references any of the above as "related artifacts"
```

This graph is what the DTO layer (Milestone 10) will formalize — e.g. an Exhibition detail page
can pull in a `MuseumObject`, a `LibraryBook`, and a `TimelineEvent` into one narrative without
module-specific coupling.

---

## 6. Global Search Behavior

Single global search is **entity-aware**: results are grouped by type (Books, Archival Records,
Museum Objects, Events, Publications, Lessons) rather than one flat list — consistent with how
the Library of Congress and British Library differentiate catalog vs. archive vs. digitized
image results.

---

## 7. Navigation Depth & Breadcrumbs

Maximum depth is **4 levels** from home (e.g. `Home → Explore → Library → Book Detail`).
Breadcrumbs are mandatory on every Listing, Detail, and Collection Detail template for
orientation and accessibility (WCAG 2.4.8).

---

## 8. Open Decision Flagged

- **Slug translation** (Section 1, point 4): proceeding with stable English-based slugs across
  all locales. If the Authority requires fully Arabic/French URL paths for branding or SEO
  reasons in-market, this is a routing-config change, not a rearchitecture — flag anytime before
  Milestone 5 (Folder Structure) locks it in.

---

## 9. Definition of Done — Milestone 2

- Every one of the 14 modules has a confirmed place in the sitemap and pillar grouping.
- Every URL maps to exactly one of the 8 reusable templates.
- Cross-module content relationships are defined before any component is built.
- No page requires bespoke, one-off logic outside the template system.

---

## 10. Requested Decision

Please confirm or amend:
- Pillar grouping (Section 2) — does "Explore / Experience / Engage / Access" match how you want
  users to think about the site, or would you group modules differently?
- Sitemap (Section 3) ✅ / additions or removals?
- Slug strategy (Section 8) ✅ proceed / prefer fully localized paths?

Once confirmed, Milestone 3 (UX Flows) begins.
