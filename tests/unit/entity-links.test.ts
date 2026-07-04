import { describe, expect, it } from "vitest";
import { entityRefHref } from "@/lib/entity-links";

describe("entityRefHref", () => {
  it("maps each entity kind to its module's base path", () => {
    expect(entityRefHref("book", "kalila-wa-dimna")).toBe("/explore/library/kalila-wa-dimna");
    expect(entityRefHref("archivalRecord", "suez-canal-concession-deed")).toBe(
      "/explore/archives/suez-canal-concession-deed",
    );
    expect(entityRefHref("museumObject", "funerary-mask-priestess")).toBe(
      "/explore/museum/objects/funerary-mask-priestess",
    );
    expect(entityRefHref("publication", "annals-egyptology-vol-12")).toBe(
      "/access/publications/annals-egyptology-vol-12",
    );
    expect(entityRefHref("event", "curators-night-tour")).toBe(
      "/engage/events/curators-night-tour",
    );
    expect(entityRefHref("lesson", "reading-hieroglyphs")).toBe(
      "/engage/learn/reading-hieroglyphs",
    );
  });
});
