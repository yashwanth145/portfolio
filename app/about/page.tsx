"use client";

import { motion } from "framer-motion";

import { LearningAreasGrid } from "@/components/portfolio/learning-areas-grid";
import { SpotlightCard } from "@/components/react-bits/spotlight-card";
import { PageHeading } from "@/components/ui/page-heading";
import { aboutCards, journey, learningAreas } from "@/lib/data";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <PageHeading
        eyebrow="About"
        accent="The story"
        title="Designing experiences that feel alive, intentional, and engineered."
        description="Product-minded developer focused on elegant interfaces, resilient systems, and meaningful visual storytelling across web, mobile, AI, and security."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {aboutCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="h-full"
          >
            <SpotlightCard className="p-6">
              <h3 className="font-magneto text-xl text-card-foreground">{card.title}</h3>
              <p className="card-muted mt-3 text-sm leading-7">{card.description}</p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <SpotlightCard borderRadius={32} className="relative min-h-[320px] p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,217,138,0.2),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(167,139,250,0.12),transparent_40%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl border border-purple/25 bg-white/5 font-magneto text-2xl font-semibold text-purple-light">
              YR
            </div>
            <div>
              <p className="text-xs tracking-[0.28em] text-purple-light uppercase">Profile Snapshot</p>
              <p className="mt-3 text-sm leading-7 text-muted">
                Product-minded developer with a focus on elegant interfaces, clean systems, and memorable visual storytelling.
              </p>
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard borderRadius={32} className="p-6">
          <p className="mb-6 text-xs tracking-[0.28em] text-purple-light uppercase">Journey Timeline</p>
          <div className="space-y-4">
            {journey.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-[72px_1fr]"
              >
                <div className="text-sm font-semibold text-purple-light">{item.year}</div>
                <div>
                  <h3 className="font-medium text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-card-muted">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </SpotlightCard>
      </div>

      <div className="mt-16">
        <PageHeading
          eyebrow="Skills"
          title="Things I have learnt."
          description="Languages, systems, security, AI, and engineering foundations explored across my learning journey."
        />
        <LearningAreasGrid areas={learningAreas} className="mt-10" />
      </div>
    </div>
  );
}
