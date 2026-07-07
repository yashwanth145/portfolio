"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type FadeContentProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function FadeContent({ children, className, delay = 0, y = 32 }: FadeContentProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

type StaggerTagsProps = {
  tags: string[];
  className?: string;
  delay?: number;
};

export function StaggerTags({ tags, className, delay = 0 }: StaggerTagsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag, index) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, y: 14, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.45,
            delay: delay + index * 0.07,
            ease,
          }}
          className="rounded-full border border-purple/30 bg-white/5 px-3 py-1.5 text-xs tracking-[0.18em] text-purple-light uppercase"
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
}
