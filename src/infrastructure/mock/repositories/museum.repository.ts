import type { MuseumRepository } from "@/domain/repositories";
import { mockMuseumGalleries, mockMuseumObjects } from "../data/museum";
import { withLatency } from "../paginate";

export class MockMuseumRepository implements MuseumRepository {
  async listGalleries() {
    return withLatency(mockMuseumGalleries);
  }

  async getGalleryBySlug(slug: string) {
    return withLatency(mockMuseumGalleries.find((g) => g.slug === slug) ?? null);
  }

  async getObjectBySlug(slug: string) {
    return withLatency(mockMuseumObjects.find((o) => o.slug === slug) ?? null);
  }

  async getObjectsByIds(ids: string[]) {
    return withLatency(mockMuseumObjects.filter((o) => ids.includes(o.id)));
  }

  async getFeaturedObjects(limit = 6) {
    return withLatency(mockMuseumObjects.filter((o) => o.featured).slice(0, limit));
  }
}
