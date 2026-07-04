import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { LocalizedText, MediaAsset } from "@/domain/entities";
import { localize } from "@/domain/entities";
import type { Locale } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface EntityCardProps {
  href: string;
  title: LocalizedText;
  subtitle?: LocalizedText | string;
  image: MediaAsset;
  badge?: string;
  aspect?: "portrait" | "landscape" | "square";
  index?: number;
  className?: string;
}

export function EntityCard({
  href,
  title,
  subtitle,
  image,
  badge,
  aspect = "landscape",
  index = 0,
  className,
}: EntityCardProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Common");

  const aspectClass = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
  }[aspect];

  const subtitleText =
    typeof subtitle === "string" ? subtitle : subtitle ? localize(subtitle, locale) : undefined;

  return (
    <Reveal delay={Math.min(index * 0.06, 0.4)} className={className}>
      <Link href={href} className="group block" aria-label={localize(title, locale)}>
        <div className={cn("relative overflow-hidden rounded-xl bg-muted", aspectClass)}>
          <Image
            src={image.url}
            alt={localize(image.alt, locale)}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          {badge && (
            <Badge className="absolute top-3 start-3 bg-background/90 text-foreground backdrop-blur-sm">
              {badge}
            </Badge>
          )}
        </div>
        <h3 className="mt-3 line-clamp-2 font-heading text-base font-medium text-foreground transition-colors group-hover:text-primary">
          {localize(title, locale)}
        </h3>
        {subtitleText && (
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{subtitleText}</p>
        )}
        <span className="mt-2 inline-block text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          {t("viewDetails")}
        </span>
      </Link>
    </Reveal>
  );
}
