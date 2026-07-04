import type { LearningRepository } from "@/domain/repositories";
import { mockLearningPaths, mockLessons } from "../data/learning";
import { withLatency } from "../paginate";

export class MockLearningRepository implements LearningRepository {
  async listPaths() {
    return withLatency(mockLearningPaths);
  }

  async getPathBySlug(slug: string) {
    return withLatency(mockLearningPaths.find((p) => p.slug === slug) ?? null);
  }

  async getLesson(pathSlug: string, lessonSlug: string) {
    return withLatency(
      mockLessons.find((l) => l.pathSlug === pathSlug && l.slug === lessonSlug) ?? null,
    );
  }

  async getLessonsByPath(pathSlug: string) {
    return withLatency(
      mockLessons.filter((l) => l.pathSlug === pathSlug).sort((a, b) => a.order - b.order),
    );
  }
}
