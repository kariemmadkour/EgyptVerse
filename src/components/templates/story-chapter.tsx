"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ImmersiveChapter } from "./immersive-story-template";

export function StoryChapter({
  chapter,
  reversed,
}: {
  chapter: ImmersiveChapter;
  reversed?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.96]);

  return (
    <section
      ref={ref}
      className="container-heritage grid grid-cols-1 items-center gap-10 py-20 md:grid-cols-2 md:py-32 lg:gap-16"
    >
      <div className={cn("relative", reversed && "md:order-2")}>
        <div className="sticky top-24">
          <motion.div
            style={{ scale }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-xl"
          >
            <motion.div style={{ y }} className="absolute inset-[-6%]">
              <Image
                src={chapter.imageUrl}
                alt={chapter.imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div style={{ opacity }} className={cn(reversed && "md:order-1")}>
        {chapter.eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wider text-terracotta">
            {chapter.eyebrow}
          </p>
        )}
        <h2 className="mt-2 text-balance font-heading text-2xl font-semibold tracking-tight md:text-3xl">
          {chapter.heading}
        </h2>
        <p className="mt-4 text-balance leading-relaxed text-foreground/85 md:text-lg">
          {chapter.body}
        </p>
      </motion.div>
    </section>
  );
}
