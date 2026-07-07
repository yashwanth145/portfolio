"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2 } from "lucide-react";

import { cn } from "@/lib/utils";

export function PlayGameFab() {
  const pathname = usePathname();
  if (pathname.startsWith("/game")) return null;

  return (
    <Link
      href="/game"
      className={cn(
        "fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full",
        "border border-purple/35 bg-[rgba(8,8,8,0.88)] px-5 py-3 text-sm font-medium text-foreground",
        "shadow-[0_0_32px_rgba(168,85,247,0.35)] backdrop-blur-xl transition",
        "hover:scale-[1.04] hover:border-purple-light/50 hover:text-purple-light",
        "hover:shadow-[0_0_44px_rgba(168,85,247,0.5)]",
      )}
    >
      <Gamepad2 className="h-4 w-4 text-purple-light" />
      Play Game
    </Link>
  );
}
