import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-terracotta">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
