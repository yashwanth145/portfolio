"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,217,138,0.4),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,rgba(167,139,250,0.14),transparent_32%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_90%,rgba(245,215,142,0.22),transparent_38%)]" />

      <motion.div
        className="aurora-blob absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,217,138,0.5),transparent_68%)] blur-3xl"
        animate={{ x: [0, 80, 20, 0], y: [0, -40, 30, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora-blob absolute -right-24 top-1/4 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(232,168,56,0.38),transparent_70%)] blur-3xl"
        animate={{ x: [0, -60, -20, 0], y: [0, 50, -20, 0], scale: [1, 0.94, 1.06, 1] }}
        transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="aurora-blob absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.16),transparent_72%)] blur-3xl"
        animate={{ x: [0, 40, -30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(232,168,56,0.18)_1px,transparent_1px)] [background-size:24px_24px]" />
    </div>
  );
}
