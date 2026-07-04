import type { TimelinesRepository } from "@/domain/repositories";
import { mockTimelineEras } from "../data/timelines";
import { withLatency } from "../paginate";

export class MockTimelinesRepository implements TimelinesRepository {
  async listEras() {
    return withLatency(mockTimelineEras);
  }

  async getEraBySlug(slug: string) {
    return withLatency(mockTimelineEras.find((e) => e.slug === slug) ?? null);
  }
}
