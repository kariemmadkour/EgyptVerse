import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AnimatedCounter } from "@/components/motion/counter";

describe("AnimatedCounter", () => {
  it("mounts and renders its suffix once observed as in-view", () => {
    render(<AnimatedCounter value={92000} locale="en" suffix="+" />);
    expect(screen.getByText(/\+/)).toBeInTheDocument();
  });

  it("mounts without throwing for the ar locale", () => {
    render(<AnimatedCounter value={3} locale="ar" />);
    // The count-up itself runs on requestAnimationFrame over ~1.8s, so this
    // test only verifies the component renders correctly pre-animation; the
    // locale-aware digit formatting is covered by lib/format.test.ts.
    expect(document.querySelector("span")).toBeInTheDocument();
  });
});
