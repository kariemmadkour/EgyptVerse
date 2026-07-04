import type {
  ArchivalFonds,
  ArchivalRecord,
  DigitalCollection,
  Exhibition,
  HeritageEntityRef,
  HeritageEvent,
  Journal,
  LearningPath,
  Lesson,
  LibraryBook,
  LibraryCollection,
  MembershipTier,
  MuseumGallery,
  MuseumObject,
  NewsArticle,
  Publication,
  RestorationCaseStudy,
  TimelineEra,
} from "@/domain/entities";

/**
 * Repository interfaces define the only contract the UI is allowed to depend on.
 * Phase 1 ships mock implementations (`src/infrastructure/mock`); Phase 2 swaps in
 * Supabase/Oracle/SQL Server/Db2/Postgres-backed implementations behind the same
 * interfaces via `src/infrastructure/di`, with zero changes to components or pages.
 */

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PageQuery {
  page?: number;
  pageSize?: number;
  query?: string;
}

export interface LibraryRepository {
  listBooks(q?: PageQuery): Promise<Paginated<LibraryBook>>;
  getBookBySlug(slug: string): Promise<LibraryBook | null>;
  listCollections(): Promise<LibraryCollection[]>;
  getCollectionBySlug(slug: string): Promise<LibraryCollection | null>;
  getBooksByIds(ids: string[]): Promise<LibraryBook[]>;
  getFeaturedBooks(limit?: number): Promise<LibraryBook[]>;
}

export interface ArchivesRepository {
  listRecords(q?: PageQuery): Promise<Paginated<ArchivalRecord>>;
  getRecordBySlug(slug: string): Promise<ArchivalRecord | null>;
  listFonds(): Promise<ArchivalFonds[]>;
  getFondsBySlug(slug: string): Promise<ArchivalFonds | null>;
  getRecordsByIds(ids: string[]): Promise<ArchivalRecord[]>;
}

export interface MuseumRepository {
  listGalleries(): Promise<MuseumGallery[]>;
  getGalleryBySlug(slug: string): Promise<MuseumGallery | null>;
  getObjectBySlug(slug: string): Promise<MuseumObject | null>;
  getObjectsByIds(ids: string[]): Promise<MuseumObject[]>;
  getFeaturedObjects(limit?: number): Promise<MuseumObject[]>;
}

export interface CollectionsRepository {
  listCollections(): Promise<DigitalCollection[]>;
  getCollectionBySlug(slug: string): Promise<DigitalCollection | null>;
}

export interface ExhibitionsRepository {
  listExhibitions(): Promise<Exhibition[]>;
  getExhibitionBySlug(slug: string): Promise<Exhibition | null>;
}

export interface TimelinesRepository {
  listEras(): Promise<TimelineEra[]>;
  getEraBySlug(slug: string): Promise<TimelineEra | null>;
}

export interface RestorationRepository {
  listCaseStudies(): Promise<RestorationCaseStudy[]>;
  getCaseStudyBySlug(slug: string): Promise<RestorationCaseStudy | null>;
}

export interface LearningRepository {
  listPaths(): Promise<LearningPath[]>;
  getPathBySlug(slug: string): Promise<LearningPath | null>;
  getLesson(pathSlug: string, lessonSlug: string): Promise<Lesson | null>;
  getLessonsByPath(pathSlug: string): Promise<Lesson[]>;
}

export interface EventsRepository {
  listEvents(q?: PageQuery): Promise<Paginated<HeritageEvent>>;
  getEventBySlug(slug: string): Promise<HeritageEvent | null>;
  getUpcomingEvents(limit?: number): Promise<HeritageEvent[]>;
}

export interface PublicationsRepository {
  listPublications(q?: PageQuery): Promise<Paginated<Publication>>;
  getPublicationBySlug(slug: string): Promise<Publication | null>;
  listJournals(): Promise<Journal[]>;
  getJournalBySlug(slug: string): Promise<Journal | null>;
}

export interface MembershipRepository {
  listTiers(): Promise<MembershipTier[]>;
  getTierBySlug(slug: string): Promise<MembershipTier | null>;
}

export interface NewsRepository {
  listArticles(q?: PageQuery): Promise<Paginated<NewsArticle>>;
  getArticleBySlug(slug: string): Promise<NewsArticle | null>;
  getLatestArticles(limit?: number): Promise<NewsArticle[]>;
}

export interface SearchRepository {
  searchAll(query: string): Promise<HeritageEntityRef[]>;
}
