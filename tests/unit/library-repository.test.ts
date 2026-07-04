import { describe, expect, it } from "vitest";
import { MockLibraryRepository } from "@/infrastructure/mock/repositories/library.repository";

describe("MockLibraryRepository", () => {
  const repo = new MockLibraryRepository();

  it("lists books with pagination metadata", async () => {
    const result = await repo.listBooks({ page: 1, pageSize: 5 });
    expect(result.items).toHaveLength(5);
    expect(result.pageSize).toBe(5);
    expect(result.total).toBeGreaterThan(5);
  });

  it("filters books by a case-insensitive title query", async () => {
    const result = await repo.listBooks({ query: "kalila" });
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items.every((b) => b.slug === "kalila-wa-dimna")).toBe(true);
  });

  it("resolves a book by slug", async () => {
    const book = await repo.getBookBySlug("kalila-wa-dimna");
    expect(book?.title.en).toBe("Kalila wa-Dimna");
  });

  it("returns null for an unknown slug", async () => {
    const book = await repo.getBookBySlug("does-not-exist");
    expect(book).toBeNull();
  });

  it("returns featured books limited to the requested count", async () => {
    const featured = await repo.getFeaturedBooks(3);
    expect(featured).toHaveLength(3);
  });
});
