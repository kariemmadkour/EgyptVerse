import { describe, expect, it } from "vitest";
import { paginate } from "@/infrastructure/mock/paginate";

describe("paginate", () => {
  const items = Array.from({ length: 25 }, (_, i) => i + 1);

  it("defaults to page 1 with a page size of 12", () => {
    const result = paginate(items);
    expect(result.page).toBe(1);
    expect(result.pageSize).toBe(12);
    expect(result.items).toEqual(items.slice(0, 12));
    expect(result.total).toBe(25);
  });

  it("slices the correct page window", () => {
    const result = paginate(items, { page: 3, pageSize: 10 });
    expect(result.items).toEqual([21, 22, 23, 24, 25]);
    expect(result.total).toBe(25);
  });

  it("returns an empty page past the end of the list", () => {
    const result = paginate(items, { page: 10, pageSize: 10 });
    expect(result.items).toEqual([]);
  });
});
