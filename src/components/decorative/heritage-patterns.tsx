import type { SVGProps } from "react";

/**
 * Section design-language accents. Each renders a subtle, tileable motif
 * true to one design tradition (Pharaonic / Islamic / Greco-Roman) so a
 * pillar reads as its own "world" while sharing one type system, palette,
 * and motion language with the rest of the platform (see docs/04-design-system.md).
 */

export type SectionTheme = "pharaonic" | "islamic" | "greco-roman" | "modern" | "general" | "manuscripts";

/** Lotus-and-bud frieze, after the Kheker/lotus bands common atop Pharaonic temple walls. */
export function PharaonicPattern(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <pattern
          id="pharaonic-frieze"
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 52 Q16 20 32 52 Q48 20 64 52"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path d="M32 52 L32 34" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <circle cx="32" cy="30" r="4" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M0 60 H64" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pharaonic-frieze)" />
    </svg>
  );
}

/** Classic 8-point girih star tessellation, the backbone of Islamic geometric ornament. */
export function IslamicPattern(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <pattern
          id="islamic-girih"
          width="56"
          height="56"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="8" y="8" width="40" height="40" transform="rotate(0 28 28)" />
            <rect
              x="8"
              y="8"
              width="40"
              height="40"
              transform="rotate(45 28 28)"
            />
            <circle cx="28" cy="28" r="10" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-girih)" />
    </svg>
  );
}

/** Greek key / meander border, the signature motif of Greco-Roman ornament. */
export function GrecoRomanPattern(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <pattern
          id="greco-meander"
          width="48"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 20 H12 V4 H36 V12 H20 V20 H48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#greco-meander)" />
    </svg>
  );
}

/**
 * The "melting pot" motif — one repeating tile stitching together a fragment
 * of each tradition (girih star, meander, lotus frieze) side by side. Used
 * only for the Manuscripts section, where all five scripts are the point.
 */
export function MixedPattern(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <pattern id="mixed-heritage" width="168" height="56" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="8" y="8" width="40" height="40" />
            <rect x="8" y="8" width="40" height="40" transform="rotate(45 28 28)" />
            <circle cx="28" cy="28" r="10" />
          </g>
          <path
            d="M56 44 H68 V28 H92 V36 H76 V44 H112"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <g fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M120 44 Q136 12 152 44 Q168 12 184 44" />
            <path d="M152 44 L152 26" />
            <circle cx="152" cy="22" r="4" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mixed-heritage)" />
    </svg>
  );
}

export function SectionPattern({
  theme,
  className,
}: {
  theme: SectionTheme;
  className?: string;
}) {
  if (theme === "islamic") return <IslamicPattern className={className} />;
  if (theme === "greco-roman") return <GrecoRomanPattern className={className} />;
  if (theme === "pharaonic") return <PharaonicPattern className={className} />;
  if (theme === "manuscripts") return <MixedPattern className={className} />;
  return null;
}
