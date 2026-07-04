import type { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";

interface StaticTemplateProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  intro: string;
  children?: ReactNode;
}

export function StaticTemplate({ breadcrumbs, title, intro, children }: StaticTemplateProps) {
  return (
    <div id="main-content">
      <Breadcrumbs items={breadcrumbs} />
      <section className="container-heritage max-w-3xl py-10 md:py-16">
        <Reveal>
          <h1 className="text-balance font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-balance text-lg leading-relaxed text-muted-foreground">
            {intro}
          </p>
        </Reveal>
        {children && <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">{children}</div>}
      </section>
    </div>
  );
}
