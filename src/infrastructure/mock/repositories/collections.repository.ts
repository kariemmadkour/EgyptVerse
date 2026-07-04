import type { CollectionsRepository } from "@/domain/repositories";
import { mockDigitalCollections } from "../data/collections";
import { withLatency } from "../paginate";

export class MockCollectionsRepository implements CollectionsRepository {
  async listCollections() {
    return withLatency(mockDigitalCollections);
  }

  async getCollectionBySlug(slug: string) {
    return withLatency(mockDigitalCollections.find((c) => c.slug === slug) ?? null);
  }
}
