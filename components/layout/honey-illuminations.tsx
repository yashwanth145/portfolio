"use client";

import { motion } from "framer-motion";

export function HoneyIlluminations() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,217,138,0.35),transparent_42%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_30%,rgba(167,139,250,0.12),transparent_28%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_80%,rgba(245,215,142,0.2),transparent_35%)]" />

      <motion.div
        className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,217,138,0.55),transparent_70%)] blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(232,168,56,0.35),transparent_70%)] blur-3xl"
        animate={{ x: [0, -24, 0], y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.14),transparent_70%)] blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -14, 0] }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  );
}
