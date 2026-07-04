import Image from "next/image";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";

interface RestorationCaseTemplateProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  summary: string;
  beforeUrl: string;
  beforeAlt: string;
  afterUrl: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
  metadata: { label: string; value: string }[];
}

export function RestorationCaseTemplate({
  breadcrumbs,
  title,
  summary,
  beforeUrl,
  beforeAlt,
  afterUrl,
  afterAlt,
  beforeLabel,
  afterLabel,
  metadata,
}: RestorationCaseTemplateProps) {
  return (
    <div id="main-content">
      <Breadcrumbs items={breadcrumbs} />
      <section className="container-heritage py-10 md:py-16">
        <Reveal className="max-w-3xl">
          <h1 className="text-balance font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-balance leading-relaxed text-muted-foreground">{summary}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
              <Image src={beforeUrl} alt={beforeAlt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover grayscale" />
              <span className="absolute top-4 start-4 rounded-full bg-basalt/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                {beforeLabel}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
              <Image src={afterUrl} alt={afterAlt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
              <span className="absolute top-4 start-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wide text-basalt">
                {afterLabel}
              </span>
            </div>
          </Reveal>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-3">
          {metadata.map((row) => (
            <div key={row.label}>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {row.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
