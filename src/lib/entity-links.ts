import type { EntityKind } from "@/domain/entities";

const kindToBasePath: Record<EntityKind, string> = {
  book: "/explore/library",
  archivalRecord: "/explore/archives",
  museumObject: "/explore/museum/objects",
  exhibition: "/experience/exhibitions",
  timelineEvent: "/experience/timelines",
  publication: "/access/publications",
  event: "/engage/events",
  lesson: "/engage/learn",
};

export function entityRefHref(kind: EntityKind, slug: string): string {
  return `${kindToBasePath[kind]}/${slug}`;
}
