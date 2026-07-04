"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Runs a GSAP animation scoped to `scope`, automatically reverted on unmount
 * or dependency change. Skips animation entirely under prefers-reduced-motion.
 */
export function useGsapScope<T extends HTMLElement>(
  callback: (context: { scope: RefObject<T | null>; gsap: typeof gsap }) => void,
  deps: unknown[] = [],
) {
  const scope = useRef<T>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !scope.current) return;

    const ctx = gsap.context(() => callback({ scope, gsap }), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}

export { gsap, ScrollTrigger };
