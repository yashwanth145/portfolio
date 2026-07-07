"use client";

import { LearningAreasGrid } from "@/components/portfolio/learning-areas-grid";
import { FadeContent } from "@/components/react-bits/fade-content";
import { CountUp, SpotlightCard } from "@/components/react-bits/spotlight-card";
import { PageHeading } from "@/components/ui/page-heading";
import { learningAreas } from "@/lib/data";

const totalSkills = learningAreas.reduce((sum, area) => sum + area.items.length, 0);

export function SkillsSection() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <PageHeading
        eyebrow="Skills"
        accent="Technical stack"
        title="Everything I have learned and built with."
        description="Programming languages, frameworks, databases, AI tools, cybersecurity, cloud platforms, DevOps, and developer tooling — organized by domain."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <FadeContent delay={0.05}>
          <SpotlightCard className="p-6 text-center">
            <div className="font-magneto text-4xl text-purple-light">
              <CountUp value={`${learningAreas.length}`} />
            </div>
            <p className="card-muted mt-2 text-sm">Skill domains</p>
          </SpotlightCard>
        </FadeContent>
        <FadeContent delay={0.1}>
          <SpotlightCard className="p-6 text-center">
            <div className="font-magneto text-4xl text-purple-light">
              <CountUp value={`${totalSkills}+`} delay={0.1} />
            </div>
            <p className="card-muted mt-2 text-sm">Technologies & concepts</p>
          </SpotlightCard>
        </FadeContent>
        <FadeContent delay={0.15}>
          <SpotlightCard className="p-6 text-center">
            <div className="font-magneto text-4xl text-purple-light">
              <CountUp value="4+" delay={0.2} />
            </div>
            <p className="card-muted mt-2 text-sm">Core engineering pillars</p>
          </SpotlightCard>
        </FadeContent>
      </div>

      <LearningAreasGrid areas={learningAreas} className="mt-12" />
    </div>
  );
}
