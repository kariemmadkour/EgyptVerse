import type { LocalizedText, MediaAsset } from "./common";

export interface Lesson {
  id: string;
  slug: string;
  pathSlug: string;
  title: LocalizedText;
  summary: LocalizedText;
  body: LocalizedText;
  durationMinutes: number;
  cover: MediaAsset;
  order: number;
}

export interface LearningPath {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  level: "beginner" | "intermediate" | "advanced";
  cover: MediaAsset;
  lessonIds: string[];
}
