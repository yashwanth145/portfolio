"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, ExternalLink, Lock } from "lucide-react";

import { FadeContent } from "@/components/react-bits/fade-content";
import { SpotlightCard } from "@/components/react-bits/spotlight-card";
import { PageHeading } from "@/components/ui/page-heading";
import {
  additionalProjectGroups,
  featuredProjects,
  type Project,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const activeLinks = project.links.filter((link) => link.href && link.href !== "#");

  return (
    <FadeContent delay={(index % 6) * 0.06} y={28}>
      <SpotlightCard className="h-full p-5">
        <div
          className={cn(
            "relative h-36 overflow-hidden rounded-[1.25rem] border border-border bg-gradient-to-br",
            project.accent,
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_40%)]" />
          <div className="absolute inset-x-4 bottom-4">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-foreground backdrop-blur-sm">
              {project.domain}
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <h3 className="font-magneto text-xl text-card-foreground">{project.title}</h3>
            <p className="card-muted mt-2 text-sm leading-7">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-honey/20 bg-black/40 px-2.5 py-1 text-xs text-honey-light"
              >
                {item}
              </span>
            ))}
          </div>

          {activeLinks.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {activeLinks.map((link) => (
                <Link
                  key={`${project.title}-${link.label}`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                    link.label === "GitHub"
                      ? "border border-honey/20 text-honey-light hover:border-purple/30 hover:text-purple-light"
                      : "bg-gradient-to-r from-honey to-honey-light font-medium text-foreground shadow-[0_0_20px_rgba(232,168,56,0.2)]",
                  )}
                >
                  {link.label}
                  {link.label === "GitHub" ? (
                    <Code2 className="h-4 w-4" />
                  ) : (
                    <ExternalLink className="h-4 w-4" />
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-xs text-card-muted">
              {project.links.map((link) => link.label).join(" · ")} — link available on request
            </p>
          )}
        </div>
      </SpotlightCard>
    </FadeContent>
  );
}

export function ProjectsSection() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <FadeContent>
        <PageHeading
          eyebrow="Projects"
          accent="Deployments"
          title="Products, platforms, and systems across the full stack."
          description="From production web and mobile apps to ML pipelines, distributed systems, cloud workloads, and security tooling."
        />
      </FadeContent>

      <div className="mt-12">
        <p className="mb-6 text-xs tracking-[0.28em] text-purple-light uppercase">Featured Projects</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>

      <div className="mt-16 space-y-12">
        <p className="text-xs tracking-[0.28em] text-purple-light uppercase">Additional Projects</p>
        {additionalProjectGroups.map((group) => (
          <div key={group.category}>
            <h3 className="font-magneto mb-6 text-2xl text-foreground">{group.category}</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <FadeContent className="mt-14" delay={0.1}>
        <motion.div
          className="flex gap-4 rounded-[1.75rem] border border-honey/25 bg-honey/5 p-5 sm:items-start"
        >
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-purple-light" />
          <p className="text-sm leading-7 text-muted">
            Many of these repositories are currently set to{" "}
            <span className="font-medium text-purple-light">private</span> due to security concerns,
            proprietary logic, or sensitive deployment details. Public listings here reflect verified
            work — feel free to reach out for demos, walkthroughs, or access where appropriate.
          </p>
        </motion.div>
      </FadeContent>
    </div>
  );
}
