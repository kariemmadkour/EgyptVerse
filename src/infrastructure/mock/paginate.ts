import type { Paginated, PageQuery } from "@/domain/repositories";

export function paginate<T>(items: T[], q?: PageQuery): Paginated<T> {
  const page = q?.page ?? 1;
  const pageSize = q?.pageSize ?? 12;
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total: items.length,
    page,
    pageSize,
  };
}

/** Simulates network latency so loading/skeleton states are meaningfully exercised. */
export function withLatency<T>(value: T, ms = 120): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
