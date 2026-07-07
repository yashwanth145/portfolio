"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const GridScan = dynamic(
  () => import("@/components/react-bits/grid-scan").then((mod) => mod.GridScan),
  { ssr: false },
);

const INTRO_STORAGE_KEY = "portfolio-grid-scan-intro-seen";

export function GridScanIntro() {
  const [active, setActive] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(INTRO_STORAGE_KEY) === "1") return;
    setActive(true);
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    setFadeOut(true);
    window.setTimeout(() => setActive(false), 700);
  };

  if (!active) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] bg-[#030303] transition-opacity duration-700",
        fadeOut && "opacity-0",
      )}
      aria-hidden
    >
      <GridScan
        autoScanOnMount
        onScanComplete={handleComplete}
        sensitivity={0.55}
        lineThickness={1}
        linesColor="#2F293A"
        gridScale={0.1}
        scanColor="#FF9FFC"
        scanOpacity={0.4}
        enablePost
        bloomIntensity={0.6}
        chromaticAberration={0.002}
        noiseIntensity={0.01}
        lineJitter={0.1}
        scanGlow={0.5}
        scanSoftness={2}
        scanDirection="forward"
        scanDuration={2.4}
        scanDelay={9999}
        enableWebcam={false}
        showPreview={false}
        className="h-full w-full"
        style={{ width: "100%", height: "100%", position: "relative" }}
      />
    </div>
  );
}
