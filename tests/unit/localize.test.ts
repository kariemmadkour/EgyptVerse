import { describe, expect, it } from "vitest";
import { localize, type LocalizedText } from "@/domain/entities";

const text: LocalizedText = {
  ar: "المكتبة الوطنية",
  en: "National Library",
  fr: "Bibliothèque nationale",
};

describe("localize", () => {
  it("returns the string for the requested locale", () => {
    expect(localize(text, "ar")).toBe("المكتبة الوطنية");
    expect(localize(text, "fr")).toBe("Bibliothèque nationale");
  });

  it("falls back to English when a translation is missing", () => {
    const partial = { en: "National Archives" } as LocalizedText;
    expect(localize(partial, "fr")).toBe("National Archives");
  });
});
