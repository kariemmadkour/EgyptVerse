import Image from "next/image";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Share2, Download } from "lucide-react";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

export interface MetadataRow {
  label: string;
  value: string;
}

interface ItemDetailTemplateProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  badges?: string[];
  metadata: MetadataRow[];
  relatedTitle?: string;
  related?: ReactNode;
  showDownload?: boolean;
  /** Overrides the static image with a richer viewer (e.g. a 3D preview) when available. */
  mediaViewer?: ReactNode;
}

export function ItemDetailTemplate({
  breadcrumbs,
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt,
  badges = [],
  metadata,
  relatedTitle,
  related,
  showDownload = false,
  mediaViewer,
}: ItemDetailTemplateProps) {
  const t = useTranslations("Common");

  return (
    <div id="main-content">
      <Breadcrumbs items={breadcrumbs} />
      <article className="container-heritage grid gap-10 py-10 md:grid-cols-2 md:py-16 lg:gap-16">
        <Reveal className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
          <Image src={imageUrl} alt={imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" priority />
          {mediaViewer && <div className="absolute inset-0 bg-basalt">{mediaViewer}</div>}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge key={badge} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
          <h1 className="mt-4 text-balance font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h1>
          {subtitle && <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>}
          <p className="mt-5 text-balance leading-relaxed text-foreground/85">{description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6">
            {metadata.map((row) => (
              <div key={row.label}>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {row.label}
                </dt>
                <dd className="mt-1 text-sm font-medium text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2">
              <Share2 className="size-4" aria-hidden />
              {t("share")}
            </Button>
            {showDownload && (
              <Button variant="outline" className="gap-2">
                <Download className="size-4" aria-hidden />
                {t("download")}
              </Button>
            )}
          </div>
        </Reveal>
      </article>

      {related && (
        <section className="container-heritage border-t border-border py-16 md:py-24">
          {relatedTitle && (
            <h2 className="font-heading text-2xl font-semibold tracking-tight">{relatedTitle}</h2>
          )}
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {related}
          </div>
        </section>
      )}
    </div>
  );
}
