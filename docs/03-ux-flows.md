# Egypt Digital Heritage Platform
## Milestone 3 — UX Flows

**Status:** Implemented in Phase 1 frontend
**Depends on:** [02-information-architecture.md](./02-information-architecture.md)

This milestone documents the primary user journeys the Phase 1 frontend was built to support,
each mapped to the pages/templates that realize it.

---

## Flow 1 — General visitor discovers an artifact

1. **Home** (`/`) — hero, featured exhibition, featured books/objects, timeline teaser.
2. Clicks a featured book → **Item Detail** (`/explore/library/[bookId]`) — full metadata,
   share/download actions, related items.
3. Related item card → another **Item Detail**, or "View all" → **Listing**
   (`/explore/library/browse`) with search + pagination.
4. Breadcrumbs allow returning to the **Hub** (`/explore/library`) at any point.

No dead ends: every detail page surfaces related items; every listing surfaces a search box.

## Flow 2 — Researcher requests restricted material

1. **Research Portal Hub** (`/engage/research`) → two entry cards: Advanced Search, Material
   Requests.
2. **Search Results** (`/engage/research/search`) — entity-aware, grouped by type.
3. Finds a restricted archival record → **Item Detail** shows `accessLevel: "reading-room"`.
4. Submits a request via **Dashboard/Workflow** (`/engage/research/requests`) — mocked form,
   confirmation state, no real backend call.
5. Alternatively, joins as a **Researcher**-tier member first via
   `/access/membership` → `/access/membership/join`, then requests
   `/access/reading-room` access directly.

## Flow 3 — Visitor becomes a member

1. **Membership Hub** (`/access/membership`) — three tiers, benefits compared side by side,
   "Most popular" tier highlighted.
2. **Join** (`/access/membership/join`) — mocked signup form.
3. **Account** (`/access/membership/account`) — mocked signed-in dashboard showing tier and
   benefits (explicitly labeled as a Phase 1 mock — no real auth exists yet).

## Flow 4 — Immersive exhibition storytelling

1. **Exhibitions Hub** (`/experience/exhibitions`) — grouped by Current / Upcoming / Past.
2. Selects an exhibition → **Immersive Story** (`/experience/exhibitions/[exhibitionSlug]`) —
   full-bleed hero, chaptered scroll-linked parallax sections, no pagination or sidebar chrome
   to preserve the cinematic feel.
3. Cross-links: a chapter can reference a museum object or timeline event (via the shared
   content graph), inviting the visitor back into Explore.

## Flow 5 — Event discovery and RSVP

1. **Events Hub** (`/engage/events`) — filterable/searchable listing.
2. **Item Detail** (`/engage/events/[eventSlug]`) — date, venue, capacity/seats-left, inline
   mocked RSVP form.
3. Confirmation state shown inline; no redirect, no real reservation persisted.

## Flow 6 — AI Heritage Assistant

1. Accessible from any page via the header (Phase 2 candidate: persistent widget) or directly at
   `/engage/assistant`.
2. Chat shell with a welcome message, canned keyword-matched replies, and a visible "this is a
   Phase 1 mock" disclaimer — sets correct expectations rather than pretending to be a live model.

---

## Cross-cutting UX rules applied everywhere

- **Breadcrumbs** on every Listing/Detail/Collection page (WCAG 2.4.8, and prevents dead ends).
- **Empty states** on every listing/search when there are zero results.
- **RTL parity** — every flow above was verified in Arabic with full mirroring, not just LTR.
- **No orphan CTAs** — every hub's primary CTA leads to a working listing or detail page, never
  a stub.
