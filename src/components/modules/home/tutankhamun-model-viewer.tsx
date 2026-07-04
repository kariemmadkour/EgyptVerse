"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Play } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";

const TutankhamunHead = dynamic(
  () => import("@/components/motion/tutankhamun-head").then((m) => m.TutankhamunHead),
  { ssr: false },
);

const SKETCHFAB_MODEL_UID = "992c57047cdf4412b970ad798d5ad0c9";
const SKETCHFAB_EMBED_URL =
  `https://sketchfab.com/models/${SKETCHFAB_MODEL_UID}/embed` +
  "?autospin=0.35&autostart=1&preload=1&ui_theme=dark&ui_infos=0" +
  "&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_annotations=0";

/**
 * The hero's 3D showcase: the mask floats free with no frame or "Heritage
 * Sphere" shell (that motif lives only on the Museum object 3D-preview
 * placeholder — see three-artifact-preview.tsx). The full Sketchfab scan is
 * a separate, opt-in experience via a standalone side button + modal rather
 * than a toggle layered on top of the canvas.
 */
export function TutankhamunModelViewer() {
  const t = useTranslations("Home");

  return (
    <div className="flex w-full min-w-0 items-center gap-4">
      <div className="h-[460px] min-w-0 flex-1 sm:h-[520px] lg:h-[620px]">
        <TutankhamunHead />
      </div>

      <Dialog>
        <DialogTrigger
          render={
            <button
              type="button"
              aria-label={t("heroModelToggleOpen")}
              className="flex shrink-0 flex-col items-center gap-2 rounded-full border border-gold/40 bg-basalt/50 px-3 py-4 text-gold-soft backdrop-blur-sm transition-colors hover:bg-basalt/80"
            />
          }
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-gold text-basalt">
            <Play className="size-4 fill-current" aria-hidden />
          </span>
          <span className="max-w-[4.5rem] text-center text-[11px] font-medium leading-tight">
            {t("heroModelSideLabel")}
          </span>
        </DialogTrigger>

        <DialogContent className="bg-basalt">
          <DialogTitle className="px-4 pt-4 text-white">{t("heroModelDialogTitle")}</DialogTitle>
          <div className="relative aspect-square w-full overflow-hidden rounded-xl">
            <iframe
              title={t("heroModelTitle")}
              src={SKETCHFAB_EMBED_URL}
              className="h-full w-full"
              frameBorder="0"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
            />
          </div>
          <a
            href={`https://sketchfab.com/3d-models/tutankhamun-gold-mask-${SKETCHFAB_MODEL_UID}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="px-4 pb-4 text-[11px] text-white/50 underline-offset-2 hover:text-white/80 hover:underline"
          >
            {t("heroModelCredit")}
          </a>
        </DialogContent>
      </Dialog>
    </div>
  );
}
