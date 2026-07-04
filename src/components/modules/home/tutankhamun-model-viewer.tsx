"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Box, ScanEye } from "lucide-react";

const TutankhamunMaskSphere = dynamic(
  () => import("@/components/motion/tutankhamun-mask-sphere").then((m) => m.TutankhamunMaskSphere),
  { ssr: false },
);

const SKETCHFAB_MODEL_UID = "992c57047cdf4412b970ad798d5ad0c9";
const SKETCHFAB_EMBED_URL =
  `https://sketchfab.com/models/${SKETCHFAB_MODEL_UID}/embed` +
  "?autospin=0.35&autostart=1&preload=1&ui_theme=dark&ui_infos=0" +
  "&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_annotations=0&transparent=1";

/**
 * The hero's 3D showcase. Defaults to a custom, self-hosted scroll-reactive
 * model (TutankhamunMaskSphere — a faceted gold shell wrapped around the real
 * mask texture, echoing the "Heritage Sphere" motif but tied to scroll
 * position). The full Sketchfab scan (free-orbit, zoom, fullscreen) stays
 * available as a toggle rather than being replaced.
 */
export function TutankhamunModelViewer() {
  const t = useTranslations("Home");
  const [showSketchfab, setShowSketchfab] = useState(false);

  return (
    <div className="relative w-full max-w-md rounded-3xl border border-gold/30 bg-basalt/40 p-2 shadow-2xl backdrop-blur-md md:max-w-none">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-basalt">
        {showSketchfab ? (
          <iframe
            title={t("heroModelTitle")}
            src={SKETCHFAB_EMBED_URL}
            className="h-full w-full"
            frameBorder="0"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
          />
        ) : (
          <TutankhamunMaskSphere />
        )}

        <button
          type="button"
          onClick={() => setShowSketchfab((v) => !v)}
          aria-label={showSketchfab ? t("heroModelToggleClose") : t("heroModelToggleOpen")}
          className="absolute end-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-basalt/70 px-3 py-1.5 text-[11px] font-medium text-gold-soft backdrop-blur-sm transition-colors hover:bg-basalt/90"
        >
          {showSketchfab ? <Box className="size-3.5" aria-hidden /> : <ScanEye className="size-3.5" aria-hidden />}
          {showSketchfab ? t("heroModelToggleClose") : t("heroModelToggleOpen")}
        </button>
      </div>
      <div className="flex items-center justify-between gap-2 px-2 pb-1 pt-2">
        <p className="text-xs font-medium uppercase tracking-wide text-gold-soft">
          {showSketchfab ? t("heroModelTitle") : t("heroModelScrollHint")}
        </p>
        <a
          href={`https://sketchfab.com/3d-models/tutankhamun-gold-mask-${SKETCHFAB_MODEL_UID}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-[11px] text-white/50 underline-offset-2 hover:text-white/80 hover:underline"
        >
          {t("heroModelCredit")}
        </a>
      </div>
    </div>
  );
}
