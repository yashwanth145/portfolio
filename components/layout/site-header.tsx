"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(3,3,3,0.72)] backdrop-blur-xl"
    >
      <div className="mx-auto max-w-6xl px-6 py-5 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="font-magneto text-2xl text-purple-light transition group-hover:text-honey-light">
              YR
            </span>
            <span className="font-magneto text-lg tracking-wide text-foreground">yashwanth</span>
          </Link>

          <Link
            href="/contact"
            className="rounded-full border border-purple/30 bg-white/5 px-4 py-2 text-xs font-medium tracking-wider text-foreground uppercase shadow-[0_0_24px_rgba(168,85,247,0.2)] transition hover:scale-[1.03] hover:border-purple-light/50 hover:shadow-[0_0_32px_rgba(168,85,247,0.25)]"
          >
            Let&apos;s talk
          </Link>
        </div>

        <nav className="mt-4 flex gap-5 overflow-x-auto pb-1 md:mt-5 md:justify-center md:gap-8">
          {siteConfig.navItems.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative shrink-0 text-sm tracking-[0.12em] uppercase transition",
                    isActive ? "font-medium text-purple-light" : "text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-purple to-purple-light" />
                  ) : null}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}
