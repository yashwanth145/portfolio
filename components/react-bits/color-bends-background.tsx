"use client";

import { useEffect, useRef } from "react";

type ColorBendsBackgroundProps = {
  color?: string;
  speed?: number;
  rotation?: number;
};

export function ColorBendsBackground({
  color = "#A855F7",
  speed = 0.2,
  rotation = 35,
}: ColorBendsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animationId = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const drawDots = (width: number, height: number) => {
      const gap = 26;
      ctx.fillStyle = "rgba(255, 255, 255, 0.055)";
      for (let x = gap / 2; x < width; x += gap) {
        for (let y = gap / 2; y < height; y += gap) {
          ctx.beginPath();
          ctx.arc(x, y, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawBand = (
      width: number,
      height: number,
      time: number,
      offset: number,
      alpha: number,
      thickness: number,
    ) => {
      const angle = (rotation * Math.PI) / 180;
      const cx = width * 0.42 + Math.sin(time * 0.7 + offset) * width * 0.08;
      const cy = height * 0.55 + Math.cos(time * 0.55 + offset) * height * 0.06;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.filter = "blur(72px)";

      const gradient = ctx.createLinearGradient(-width, 0, width, 0);
      gradient.addColorStop(0, "rgba(168, 85, 247, 0)");
      gradient.addColorStop(0.35, `rgba(168, 85, 247, ${alpha * 0.35})`);
      gradient.addColorStop(0.5, `rgba(192, 132, 252, ${alpha})`);
      gradient.addColorStop(0.65, `rgba(124, 58, 237, ${alpha * 0.85})`);
      gradient.addColorStop(1, "rgba(124, 58, 237, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(-width * 0.9, -thickness / 2, width * 1.8, thickness);
      ctx.restore();
      ctx.filter = "none";
    };

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const time = frame * speed * 0.016;

      ctx.fillStyle = "#030303";
      ctx.fillRect(0, 0, width, height);

      drawDots(width, height);

      drawBand(width, height, time, 0, 0.55, 220);
      drawBand(width, height, time, 1.8, 0.38, 180);
      drawBand(width, height, time, 3.2, 0.28, 140);

      const fade = ctx.createLinearGradient(0, 0, 0, height);
      fade.addColorStop(0, "rgba(3, 3, 3, 0.75)");
      fade.addColorStop(0.35, "rgba(3, 3, 3, 0)");
      fade.addColorStop(1, "rgba(3, 3, 3, 0.85)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, width, height);

      frame += 1;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [color, speed, rotation]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
