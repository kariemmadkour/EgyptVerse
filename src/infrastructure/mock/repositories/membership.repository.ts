import type { MembershipRepository } from "@/domain/repositories";
import { mockMembershipTiers } from "../data/membership";
import { withLatency } from "../paginate";

export class MockMembershipRepository implements MembershipRepository {
  async listTiers() {
    return withLatency(mockMembershipTiers);
  }

  async getTierBySlug(slug: string) {
    return withLatency(mockMembershipTiers.find((t) => t.slug === slug) ?? null);
  }
}
