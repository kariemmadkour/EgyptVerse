import { describe, expect, it } from "vitest";
import { MockSearchRepository } from "@/infrastructure/mock/repositories/search.repository";

describe("MockSearchRepository", () => {
  const repo = new MockSearchRepository();

  it("returns no results for an empty query", async () => {
    const results = await repo.searchAll("   ");
    expect(results).toEqual([]);
  });

  it("finds matches by title across the Library module", async () => {
    const results = await repo.searchAll("rosetta");
    expect(results.some((r) => r.kind === "book" && r.slug === "rosetta-decipherment-journal")).toBe(
      true,
    );
  });

  it("matches Arabic-language queries against localized titles", async () => {
    const results = await repo.searchAll("قناع");
    expect(results.some((r) => r.kind === "museumObject")).toBe(true);
  });
});
