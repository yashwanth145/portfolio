"use client";

import Link from "next/link";
import { useRef } from "react";

import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

export function MagneticButton({
  href,
  children,
  className,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const node = ref.current;
    if (!node) return;

    const bounds = node.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);
    node.style.transform = `translate(${offsetX * 0.15}px, ${offsetY * 0.15}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition duration-300",
        variant === "primary" &&
          "bg-gradient-to-r from-purple to-purple-light text-white shadow-[0_0_32px_rgba(168,85,247,0.4)] hover:shadow-[0_0_44px_rgba(168,85,247,0.55)]",
        variant === "secondary" &&
          "border border-white/15 bg-white/5 text-foreground hover:border-purple/40 hover:text-purple-light",
        className,
      )}
    >
      {children}
    </Link>
  );
}
