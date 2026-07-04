"use client";

import Lottie from "lottie-react";
import heritageSpinner from "@/assets/lottie/heritage-spinner.json";

export function LottieLoader({ label }: { label: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[50vh] flex-col items-center justify-center gap-4"
    >
      <div className="w-16">
        <Lottie animationData={heritageSpinner} loop autoplay />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
