"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  borderRadius?: number;
  edgeSensitivity?: number;
};

function getCenter(el: HTMLElement) {
  const { width, height } = el.getBoundingClientRect();
  return [width / 2, height / 2] as const;
}

function getEdgeProximity(el: HTMLElement, x: number, y: number) {
  const [cx, cy] = getCenter(el);
  const dx = x - cx;
  const dy = y - cy;
  let kx = Infinity;
  let ky = Infinity;
  if (dx !== 0) kx = cx / Math.abs(dx);
  if (dy !== 0) ky = cy / Math.abs(dy);
  return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
}

function getCursorAngle(el: HTMLElement, x: number, y: number) {
  const [cx, cy] = getCenter(el);
  const dx = x - cx;
  const dy = y - cy;
  if (dx === 0 && dy === 0) return 0;
  const radians = Math.atan2(dy, dx);
  let degrees = radians * (180 / Math.PI) + 90;
  if (degrees < 0) degrees += 360;
  return degrees;
}

function buildOuterGlow(intensity: number) {
  const alpha = Math.min(intensity, 1);
  return [
    `0 0 18px rgba(255, 237, 213, ${0.22 * alpha})`,
    `0 0 36px rgba(192, 132, 252, ${0.28 * alpha})`,
    `0 0 72px rgba(124, 58, 237, ${0.2 * alpha})`,
    `0 0 120px rgba(88, 28, 135, ${0.12 * alpha})`,
  ].join(", ");
}

export function SpotlightCard({
  children,
  className,
  borderRadius = 28,
  edgeSensitivity = 28,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorAngle, setCursorAngle] = useState(45);
  const [edgeProximity, setEdgeProximity] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const colorSensitivity = edgeSensitivity + 20;

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setPointer({ x, y });
    setEdgeProximity(getEdgeProximity(card, x, y));
    setCursorAngle(getCursorAngle(card, x, y));
  }, []);

  const borderOpacity = isHovered
    ? Math.max(0, (edgeProximity * 100 - colorSensitivity) / (100 - colorSensitivity))
    : 0;
  const glowOpacity = isHovered
    ? Math.max(0, (edgeProximity * 100 - edgeSensitivity) / (100 - edgeSensitivity))
    : 0;

  const angleDeg = `${cursorAngle.toFixed(2)}deg`;
  const borderColors = ["#fff7ed", "#f3e8ff", "#e9d5ff", "#c084fc", "#a855f7", "#7c3aed", "#fff7ed"];

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        setEdgeProximity(0);
      }}
      className="group relative isolate h-full"
      style={{
        borderRadius: `${borderRadius}px`,
        boxShadow: glowOpacity > 0 ? buildOuterGlow(glowOpacity) : undefined,
        transition: "box-shadow 0.25s ease",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          borderRadius: `${borderRadius}px`,
          opacity: borderOpacity,
          padding: "1px",
          background: `conic-gradient(from ${angleDeg} at 50% 50%, ${borderColors.join(", ")})`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          borderRadius: `${borderRadius}px`,
          opacity: glowOpacity * 0.45,
          background: `
            radial-gradient(520px circle at ${pointer.x}px ${pointer.y}px, rgba(255,237,213,0.14), transparent 42%),
            radial-gradient(360px circle at ${pointer.x}px ${pointer.y}px, rgba(168,85,247,0.2), transparent 45%)
          `,
        }}
      />

      <div
        className={cn(
          "honey-card relative h-full overflow-hidden rounded-[inherit] transition-transform duration-300",
          className,
        )}
      >
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

type CountUpProps = {
  value: string;
  className?: string;
  delay?: number;
};

export function CountUp({ value, className, delay = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const numeric = parseInt(value.replace(/\D/g, ""), 10);
    const suffix = value.replace(/[0-9]/g, "");
    if (Number.isNaN(numeric)) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now() + delay * 1000;

    const tick = (now: number) => {
      if (now < start) {
        frame = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min((now - start) / 900, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(`${Math.round(numeric * eased)}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value, delay]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
