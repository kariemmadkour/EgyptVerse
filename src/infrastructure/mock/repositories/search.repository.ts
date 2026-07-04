import type { HeritageEntityRef } from "@/domain/entities";
import type { SearchRepository } from "@/domain/repositories";
import { mockBooks } from "../data/library";
import { mockArchivalRecords } from "../data/archives";
import { mockMuseumObjects } from "../data/museum";
import { mockPublications } from "../data/publications";
import { mockEvents } from "../data/events";
import { mockLessons } from "../data/learning";
import { withLatency } from "../paginate";

function matches(text: Record<string, string>, query: string) {
  return Object.values(text).some((t) => t.toLowerCase().includes(query.toLowerCase()));
}

export class MockSearchRepository implements SearchRepository {
  async searchAll(query: string): Promise<HeritageEntityRef[]> {
    if (!query.trim()) return withLatency([]);

    const results: HeritageEntityRef[] = [
      ...mockBooks
        .filter((b) => matches(b.title, query) || matches(b.description, query))
        .map((b) => ({ kind: "book" as const, id: b.id, slug: b.slug, title: b.title, thumbnail: b.cover })),
      ...mockArchivalRecords
        .filter((r) => matches(r.title, query) || matches(r.description, query))
        .map((r) => ({ kind: "archivalRecord" as const, id: r.id, slug: r.slug, title: r.title, thumbnail: r.thumbnail })),
      ...mockMuseumObjects
        .filter((o) => matches(o.title, query) || matches(o.description, query))
        .map((o) => ({ kind: "museumObject" as const, id: o.id, slug: o.slug, title: o.title, thumbnail: o.images[0] })),
      ...mockPublications
        .filter((p) => matches(p.title, query))
        .map((p) => ({ kind: "publication" as const, id: p.id, slug: p.slug, title: p.title, thumbnail: p.cover })),
      ...mockEvents
        .filter((e) => matches(e.title, query))
        .map((e) => ({ kind: "event" as const, id: e.id, slug: e.slug, title: e.title, thumbnail: e.cover })),
      ...mockLessons
        .filter((l) => matches(l.title, query))
        .map((l) => ({ kind: "lesson" as const, id: l.id, slug: l.slug, title: l.title, thumbnail: l.cover })),
    ];

    return withLatency(results);
  }
}
