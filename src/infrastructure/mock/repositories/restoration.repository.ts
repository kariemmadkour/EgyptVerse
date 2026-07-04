import type { RestorationRepository } from "@/domain/repositories";
import { mockRestorationCaseStudies } from "../data/restoration";
import { withLatency } from "../paginate";

export class MockRestorationRepository implements RestorationRepository {
  async listCaseStudies() {
    return withLatency(mockRestorationCaseStudies);
  }

  async getCaseStudyBySlug(slug: string) {
    return withLatency(mockRestorationCaseStudies.find((c) => c.slug === slug) ?? null);
  }
}
