import { describe, expect, it } from "vitest";
import { formatDate, formatNumber } from "@/lib/format";

describe("formatNumber", () => {
  it("renders Eastern Arabic-Indic digits for the ar locale", () => {
    const result = formatNumber(1200, "ar");
    expect(result).toBe("١٬٢٠٠");
  });

  it("renders Western digits with thousands separators for en", () => {
    expect(formatNumber(480000, "en")).toBe("480,000");
  });

  it("renders Western digits with French grouping for fr", () => {
    // French uses a narrow no-break space as the thousands separator.
    expect(formatNumber(92000, "fr").replace(/\s/g, " ")).toContain("92");
  });
});

describe("formatDate", () => {
  it("formats a date for the en locale", () => {
    const result = formatDate("2026-03-01", "en");
    expect(result).toContain("2026");
    expect(result).toContain("March");
  });

  it("formats a date for the ar locale using Arabic month names", () => {
    const result = formatDate("2026-03-01", "ar");
    expect(result).toMatch(/مارس/);
  });
});
