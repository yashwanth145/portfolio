"use client";

import { motion } from "framer-motion";

import { SpotlightCard } from "@/components/react-bits/spotlight-card";
import { PageHeading } from "@/components/ui/page-heading";
import { experiences } from "@/lib/data";

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <PageHeading
        eyebrow="Experience"
        accent="Shipped work"
        title="Real projects, production features, and hands-on iteration."
        description="Hands-on full-stack development experience building production-ready features in Agile, remote team environments."
      />

      <div className="mt-12 space-y-6">
        {experiences.map((experience, index) => (
          <motion.div
            key={`${experience.role}-${experience.company}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="block"
          >
            <SpotlightCard borderRadius={32} className="grid gap-6 p-6 md:grid-cols-[0.55fr_1.45fr]">
            <div>
              <p className="text-xs tracking-[0.28em] text-purple-light uppercase">{experience.duration}</p>
              <h3 className="font-magneto mt-3 text-2xl text-card-foreground">{experience.role}</h3>
              <p className="card-muted mt-2 text-sm">{experience.company}</p>
              {experience.location ? (
                <p className="mt-1 text-sm text-muted/80">{experience.location}</p>
              ) : null}
            </div>
            <div className="space-y-5">
              <p className="text-sm leading-7 text-card-muted">{experience.summary}</p>
              <ul className="space-y-2.5">
                {experience.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-7 text-card-muted">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-honey shadow-[0_0_8px_rgba(232,168,56,0.6)]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 pt-1">
                {experience.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-honey/20 bg-black/40 px-3 py-1 text-xs text-honey-light"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
