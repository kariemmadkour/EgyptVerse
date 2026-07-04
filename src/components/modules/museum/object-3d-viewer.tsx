"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const ThreeArtifactPreview = dynamic(
  () => import("@/components/motion/three-artifact-preview").then((m) => m.ThreeArtifactPreview),
  { ssr: false },
);

export function Object3DViewer() {
  const t = useTranslations("Modules");

  return (
    <div className="relative h-full w-full">
      <ThreeArtifactPreview />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-basalt/80 to-transparent px-4 pb-3 pt-8 text-center text-xs font-medium uppercase tracking-wide text-gold">
        {t("museum.threeDPreviewLabel")}
      </span>
    </div>
  );
}
