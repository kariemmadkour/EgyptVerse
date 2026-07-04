import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

interface ContentSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  viewAllLabel?: string;
  viewAllHref?: string;
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ContentSection({
  eyebrow,
  title,
  description,
  viewAllLabel,
  viewAllHref,
  children,
  columns = 4,
  className,
}: ContentSectionProps) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <section className={cn("container-heritage py-16 md:py-24", className)}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        {viewAllLabel && viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {viewAllLabel}
          </Link>
        )}
      </div>
      <div className={cn("mt-10 grid grid-cols-1 gap-x-6 gap-y-10", gridCols)}>{children}</div>
    </section>
  );
}
