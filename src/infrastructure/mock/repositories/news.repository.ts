import type { NewsRepository, PageQuery } from "@/domain/repositories";
import { mockNewsArticles } from "../data/news";
import { paginate, withLatency } from "../paginate";

export class MockNewsRepository implements NewsRepository {
  async listArticles(q?: PageQuery) {
    return withLatency(paginate(mockNewsArticles, q));
  }

  async getArticleBySlug(slug: string) {
    return withLatency(mockNewsArticles.find((a) => a.slug === slug) ?? null);
  }

  async getLatestArticles(limit = 3) {
    return withLatency(
      [...mockNewsArticles]
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit),
    );
  }
}
