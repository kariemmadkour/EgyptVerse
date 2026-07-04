import type { PageQuery, PublicationsRepository } from "@/domain/repositories";
import { mockJournals, mockPublications } from "../data/publications";
import { paginate, withLatency } from "../paginate";

export class MockPublicationsRepository implements PublicationsRepository {
  async listPublications(q?: PageQuery) {
    return withLatency(paginate(mockPublications, q));
  }

  async getPublicationBySlug(slug: string) {
    return withLatency(mockPublications.find((p) => p.slug === slug) ?? null);
  }

  async listJournals() {
    return withLatency(mockJournals);
  }

  async getJournalBySlug(slug: string) {
    return withLatency(mockJournals.find((j) => j.slug === slug) ?? null);
  }
}
