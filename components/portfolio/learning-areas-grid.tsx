"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness, Code2, GraduationCap, Sparkles } from "lucide-react";

import { FadeContent } from "@/components/react-bits/fade-content";
import { SpotlightCard } from "@/components/react-bits/spotlight-card";
import { learningAreas } from "@/lib/data";
import { cn } from "@/lib/utils";

const skillIcons = [Code2, Sparkles, GraduationCap, BriefcaseBusiness];

type LearningAreasGridProps = {
  areas?: typeof learningAreas;
  className?: string;
  compact?: boolean;
};

export function LearningAreasGrid({
  areas = learningAreas,
  className,
  compact = false,
}: LearningAreasGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        compact ? "sm:grid-cols-2 xl:grid-cols-3" : "gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {areas.map((area, index) => {
        const Icon = skillIcons[index % skillIcons.length];

        return (
          <FadeContent key={area.title} delay={compact ? 0 : index * 0.04} y={20}>
            <SpotlightCard className={cn(compact ? "p-4" : "p-6")}>
              <div className={cn("flex items-center gap-3", compact ? "mb-3" : "mb-5")}>
                {!compact && (
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 4 }}
                    className="rounded-2xl border border-purple/25 bg-white/5 p-3 text-purple-light shadow-[0_0_16px_rgba(168,85,247,0.12)]"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                )}
                <h3 className={cn("font-magneto text-card-foreground", compact ? "text-sm" : "text-lg")}>
                  {area.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {area.items.map((item) => (
                  <span
                    key={item}
                    className={cn(
                      "rounded-full border border-honey/20 bg-black/40 text-honey-light",
                      compact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
                    )}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </FadeContent>
        );
      })}
    </div>
  );
}
