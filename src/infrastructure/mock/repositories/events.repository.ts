import type { EventsRepository, PageQuery } from "@/domain/repositories";
import { mockEvents } from "../data/events";
import { paginate, withLatency } from "../paginate";

export class MockEventsRepository implements EventsRepository {
  async listEvents(q?: PageQuery) {
    return withLatency(paginate(mockEvents, q));
  }

  async getEventBySlug(slug: string) {
    return withLatency(mockEvents.find((e) => e.slug === slug) ?? null);
  }

  async getUpcomingEvents(limit = 4) {
    return withLatency(
      [...mockEvents]
        .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
        .slice(0, limit),
    );
  }
}
