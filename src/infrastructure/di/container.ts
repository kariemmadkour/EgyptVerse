import { MockLibraryRepository } from "@/infrastructure/mock/repositories/library.repository";
import { MockArchivesRepository } from "@/infrastructure/mock/repositories/archives.repository";
import { MockMuseumRepository } from "@/infrastructure/mock/repositories/museum.repository";
import { MockCollectionsRepository } from "@/infrastructure/mock/repositories/collections.repository";
import { MockExhibitionsRepository } from "@/infrastructure/mock/repositories/exhibitions.repository";
import { MockTimelinesRepository } from "@/infrastructure/mock/repositories/timelines.repository";
import { MockRestorationRepository } from "@/infrastructure/mock/repositories/restoration.repository";
import { MockLearningRepository } from "@/infrastructure/mock/repositories/learning.repository";
import { MockEventsRepository } from "@/infrastructure/mock/repositories/events.repository";
import { MockPublicationsRepository } from "@/infrastructure/mock/repositories/publications.repository";
import { MockMembershipRepository } from "@/infrastructure/mock/repositories/membership.repository";
import { MockNewsRepository } from "@/infrastructure/mock/repositories/news.repository";
import { MockSearchRepository } from "@/infrastructure/mock/repositories/search.repository";

/**
 * Single composition root. Every page/service resolves its repository from here.
 * Phase 2 swaps individual entries (e.g. MockLibraryRepository -> SupabaseLibraryRepository)
 * without touching any calling code, since all callers only see the domain interfaces.
 */
export const container = {
  library: new MockLibraryRepository(),
  archives: new MockArchivesRepository(),
  museum: new MockMuseumRepository(),
  collections: new MockCollectionsRepository(),
  exhibitions: new MockExhibitionsRepository(),
  timelines: new MockTimelinesRepository(),
  restoration: new MockRestorationRepository(),
  learning: new MockLearningRepository(),
  events: new MockEventsRepository(),
  publications: new MockPublicationsRepository(),
  membership: new MockMembershipRepository(),
  news: new MockNewsRepository(),
  search: new MockSearchRepository(),
};
