"use client";

import Image from "next/image";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { StoryChapter } from "@/components/templates/story-chapter";

export interface ImmersiveChapter {
  id: string;
  eyebrow?: string;
  heading: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
}

interface ImmersiveStoryTemplateProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle: string;
  heroImageUrl: string;
  heroImageAlt: string;
  chapters: ImmersiveChapter[];
}

export function ImmersiveStoryTemplate({
  breadcrumbs,
  title,
  subtitle,
  heroImageUrl,
  heroImageAlt,
  chapters,
}: ImmersiveStoryTemplateProps) {
  return (
    <div id="main-content">
      <Breadcrumbs items={breadcrumbs} />

      <section className="relative mt-6 flex h-[85vh] items-end overflow-hidden">
        <Image
          src={heroImageUrl}
          alt={heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-basalt via-basalt/30 to-transparent" />
        <div className="container-heritage relative z-10 pb-16 text-white">
          <h1 className="max-w-3xl text-balance font-heading text-4xl font-semibold tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/80 md:text-xl">{subtitle}</p>
        </div>
      </section>

      <div>
        {chapters.map((chapter, i) => (
          <StoryChapter key={chapter.id} chapter={chapter} reversed={i % 2 === 1} />
        ))}
      </div>
    </div>
  );
}
