import type { ExhibitionsRepository } from "@/domain/repositories";
import { mockExhibitions } from "../data/exhibitions";
import { withLatency } from "../paginate";

export class MockExhibitionsRepository implements ExhibitionsRepository {
  async listExhibitions() {
    return withLatency(mockExhibitions);
  }

  async getExhibitionBySlug(slug: string) {
    return withLatency(mockExhibitions.find((e) => e.slug === slug) ?? null);
  }
}
