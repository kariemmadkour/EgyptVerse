import type { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description?: string;
  notice?: string;
  children: ReactNode;
  className?: string;
}

export function DashboardShell({
  breadcrumbs,
  title,
  description,
  notice,
  children,
  className,
}: DashboardShellProps) {
  return (
    <div id="main-content">
      <Breadcrumbs items={breadcrumbs} />
      <section className="container-heritage py-10 md:py-16">
        <Reveal>
          <h1 className="text-balance font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-2xl text-balance leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </Reveal>

        {notice && (
          <div className="mt-6 rounded-xl border border-gold/40 bg-gold-soft/40 px-5 py-4 text-sm text-foreground">
            {notice}
          </div>
        )}

        <div className={cn("mt-10 rounded-2xl border border-border bg-card p-6 md:p-10", className)}>
          {children}
        </div>
      </section>
    </div>
  );
}
