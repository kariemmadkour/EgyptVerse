"use client";

import { useTranslations } from "next-intl";

const SKETCHFAB_MODEL_UID = "992c57047cdf4412b970ad798d5ad0c9";
const SKETCHFAB_EMBED_URL =
  `https://sketchfab.com/models/${SKETCHFAB_MODEL_UID}/embed` +
  "?autospin=0.35&autostart=1&preload=1&ui_theme=dark&ui_infos=0" +
  "&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_annotations=0&transparent=1";

/**
 * Real, interactive 3D scan of Tutankhamun's golden mask (CC BY, "Tutankhamun
 * Gold Mask" by amirfiala1 on Sketchfab) — the platform's flagship "explore
 * in 3D" showcase, distinct from the generic wireframe artifact placeholder
 * used elsewhere for objects without a real scan (see three-artifact-preview.tsx).
 */
export function TutankhamunModelViewer() {
  const t = useTranslations("Home");

  return (
    <div className="relative w-full max-w-md rounded-3xl border border-gold/30 bg-basalt/40 p-2 shadow-2xl backdrop-blur-md md:max-w-none">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-basalt">
        <iframe
          title={t("heroModelTitle")}
          src={SKETCHFAB_EMBED_URL}
          className="h-full w-full"
          frameBorder="0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
        />
      </div>
      <div className="flex items-center justify-between gap-2 px-2 pb-1 pt-2">
        <p className="text-xs font-medium uppercase tracking-wide text-gold-soft">
          {t("heroModelTitle")}
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
