import type { ArchivesRepository, PageQuery } from "@/domain/repositories";
import { mockArchivalFonds, mockArchivalRecords } from "../data/archives";
import { paginate, withLatency } from "../paginate";

export class MockArchivesRepository implements ArchivesRepository {
  async listRecords(q?: PageQuery) {
    const filtered = q?.query
      ? mockArchivalRecords.filter((r) =>
          Object.values(r.title).some((t) => t.toLowerCase().includes(q.query!.toLowerCase())),
        )
      : mockArchivalRecords;
    return withLatency(paginate(filtered, q));
  }

  async getRecordBySlug(slug: string) {
    return withLatency(mockArchivalRecords.find((r) => r.slug === slug) ?? null);
  }

  async listFonds() {
    return withLatency(mockArchivalFonds);
  }

  async getFondsBySlug(slug: string) {
    return withLatency(mockArchivalFonds.find((f) => f.slug === slug) ?? null);
  }

  async getRecordsByIds(ids: string[]) {
    return withLatency(mockArchivalRecords.filter((r) => ids.includes(r.id)));
  }
}
