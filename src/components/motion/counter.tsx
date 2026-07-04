"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { formatNumber } from "@/lib/format";
import type { Locale } from "@/i18n/routing";

interface AnimatedCounterProps {
  value: number;
  className?: string;
  suffix?: string;
  locale?: Locale;
}

export function AnimatedCounter({ value, className, suffix = "", locale = "en" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => formatNumber(Math.floor(v), locale));

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [isInView, value, motionValue, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
