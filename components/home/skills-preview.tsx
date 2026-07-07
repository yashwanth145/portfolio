import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FadeContent } from "@/components/react-bits/fade-content";
import { SpotlightCard } from "@/components/react-bits/spotlight-card";
import { PageHeading } from "@/components/ui/page-heading";
import { learningAreas } from "@/lib/data";

const previewCategories = learningAreas.slice(0, 6);

export function SkillsPreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <FadeContent>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <PageHeading
            eyebrow="Technical Arsenal"
            accent="Expertise"
            title="A spectrum of engineering craft."
            description="From full-stack product development to AI, cybersecurity, embedded systems, and cloud-native architectures."
          />
          <Link
            href="/skills"
            className="inline-flex shrink-0 items-center gap-2 text-sm text-purple-light transition hover:text-purple"
          >
            View all skills
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </FadeContent>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {previewCategories.map((area, index) => (
          <FadeContent key={area.title} delay={index * 0.08}>
            <SpotlightCard className="h-full p-5">
              <h3 className="font-magneto text-lg text-card-foreground">{area.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {area.items.slice(0, 4).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-purple/25 bg-white/5 px-2.5 py-1 text-xs text-purple-light"
                  >
                    {item}
                  </span>
                ))}
                {area.items.length > 4 ? (
                  <span className="text-xs text-purple-light">+{area.items.length - 4} more</span>
                ) : null}
              </div>
            </SpotlightCard>
          </FadeContent>
        ))}
      </div>
    </section>
  );
}
