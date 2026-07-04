import type { LibraryRepository, PageQuery } from "@/domain/repositories";
import { mockBooks, mockLibraryCollections } from "../data/library";
import { paginate, withLatency } from "../paginate";

export class MockLibraryRepository implements LibraryRepository {
  async listBooks(q?: PageQuery) {
    const filtered = q?.query
      ? mockBooks.filter((b) =>
          Object.values(b.title).some((t) => t.toLowerCase().includes(q.query!.toLowerCase())),
        )
      : mockBooks;
    return withLatency(paginate(filtered, q));
  }

  async getBookBySlug(slug: string) {
    return withLatency(mockBooks.find((b) => b.slug === slug) ?? null);
  }

  async listCollections() {
    return withLatency(mockLibraryCollections);
  }

  async getCollectionBySlug(slug: string) {
    return withLatency(mockLibraryCollections.find((c) => c.slug === slug) ?? null);
  }

  async getBooksByIds(ids: string[]) {
    return withLatency(mockBooks.filter((b) => ids.includes(b.id)));
  }

  async getFeaturedBooks(limit = 6) {
    return withLatency(mockBooks.slice(0, limit));
  }
}
