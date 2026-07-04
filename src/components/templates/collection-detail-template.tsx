import Image from "next/image";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { EntityCard } from "@/components/ui/entity-card";
import { Reveal } from "@/components/motion/reveal";
import { entityRefHref } from "@/lib/entity-links";
import type { HeritageEntityRef } from "@/domain/entities";

interface CollectionDetailTemplateProps {
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  narrative: string;
  coverUrl: string;
  coverAlt: string;
  itemRefs: HeritageEntityRef[];
}

export function CollectionDetailTemplate({
  breadcrumbs,
  eyebrow,
  title,
  narrative,
  coverUrl,
  coverAlt,
  itemRefs,
}: CollectionDetailTemplateProps) {
  return (
    <div id="main-content">
      <Breadcrumbs items={breadcrumbs} />
      <section className="container-heritage py-10 md:py-16">
        <Reveal className="relative aspect-[21/9] overflow-hidden rounded-2xl bg-muted">
          <Image src={coverUrl} alt={coverAlt} fill sizes="100vw" className="object-cover" priority />
        </Reveal>
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-terracotta">{eyebrow}</p>
          <h1 className="mt-2 text-balance font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-balance leading-relaxed text-foreground/85">{narrative}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {itemRefs.map((ref, i) => (
            <EntityCard
              key={ref.id}
              href={entityRefHref(ref.kind, ref.slug)}
              title={ref.title}
              image={ref.thumbnail}
              aspect="portrait"
              index={i}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
