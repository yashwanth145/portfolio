"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  by?: "words" | "chars";
  onComplete?: () => void;
};

export function SplitText({
  text,
  className,
  delay = 0,
  by = "words",
  onComplete,
}: SplitTextProps) {
  const parts = by === "words" ? text.split(" ") : text.split("");
  const lastIndex = parts.length - 1;

  return (
    <span className={cn("inline", className)} aria-label={text}>
      {parts.map((part, index) => (
        <motion.span
          key={`${part}-${index}`}
          className="inline-block"
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.55,
            delay: delay + index * 0.07,
            ease,
          }}
          onAnimationComplete={index === lastIndex ? onComplete : undefined}
        >
          {by === "words" ? (
            <>
              {part}
              {index < lastIndex ? "\u00A0" : ""}
            </>
          ) : (
            part
          )}
        </motion.span>
      ))}
    </span>
  );
}

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
  onComplete?: () => void;
};

export function BlurText({ text, className, delay = 0, onComplete }: BlurTextProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 20, filter: "blur(14px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.85, delay, ease }}
      onAnimationComplete={onComplete}
    >
      {text}
    </motion.span>
  );
}

type ShinyTextProps = {
  text: string;
  className?: string;
};

export function ShinyText({ text, className }: ShinyTextProps) {
  return (
    <span
      className={cn(
        "shiny-text inline-block bg-[linear-gradient(110deg,#c8871f_0%,#ffd98a_25%,#f5d78e_50%,#a78bfa_75%,#c8871f_100%)] bg-[length:200%_auto] bg-clip-text text-transparent",
        className,
      )}
    >
      {text}
    </span>
  );
}
