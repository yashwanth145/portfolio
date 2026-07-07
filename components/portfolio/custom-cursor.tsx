"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 250 });
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 250 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    const onOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      setHovered(Boolean(target?.closest("a, button, input, textarea")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
      <motion.div
        className="absolute h-3 w-3 rounded-full bg-cyan-300"
        style={{ translateX: cursorX, translateY: cursorY }}
      />
      <motion.div
        className="absolute h-12 w-12 rounded-full border border-cyan-300/50 bg-cyan-300/5 backdrop-blur-sm"
        animate={{ scale: hovered ? 1.6 : 1, opacity: hovered ? 0.9 : 0.55 }}
        style={{ translateX: ringX, translateY: ringY, x: -18, y: -18 }}
      />
    </div>
  );
}
