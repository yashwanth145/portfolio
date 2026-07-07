"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  size: 8 + (index % 5) * 6,
  left: `${(index * 7 + 9) % 100}%`,
  delay: index * 0.3,
  duration: 7 + (index % 4) * 2,
}));

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.18),transparent_22%),radial-gradient(circle_at_bottom,rgba(14,165,233,0.1),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.2),rgba(15,23,42,0.9))]" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-cyan-300/20 shadow-[0_0_30px_rgba(34,211,238,0.35)]"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            bottom: "-10%",
          }}
          animate={{ y: ["0%", "-120vh"], x: [0, particle.id % 2 === 0 ? 20 : -20], opacity: [0, 1, 0] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
