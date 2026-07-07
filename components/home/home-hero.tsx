"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

import { FadeContent, StaggerTags } from "@/components/react-bits/fade-content";
import { CountUp, SpotlightCard } from "@/components/react-bits/spotlight-card";
import { FuzzyText } from "@/components/react-bits/fuzzy-text";
import { ShinyText } from "@/components/react-bits/text-effects";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { siteConfig, stats } from "@/lib/data";
import { featuredProjects } from "@/lib/projects";

export function HomeHero() {
  const [typedText, setTypedText] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!typing) return;

    const fullText = "I build scalable web applications, mobile products, and intelligent AI systems.";
    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(fullText.slice(0, index));
      if (index === fullText.length) window.clearInterval(interval);
    }, 26);

    return () => window.clearInterval(interval);
  }, [typing]);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 lg:px-8 lg:pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-10"
      >
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-magneto text-sm tracking-[0.35em] text-purple-light uppercase"
          >
            <ShinyText text={siteConfig.name} />
          </motion.p>

          <h1 className="max-w-5xl">
            <span className="sr-only">
              One man&apos;s engineering is another man&apos;s miracle.
            </span>
            <FuzzyText
              baseIntensity={0.2}
              hoverIntensity={0.5}
              enableHover
              fontFamily="Magneto, Impact, sans-serif"
              fontSize="clamp(1.65rem, 4.5vw, 3.5rem)"
              fontWeight={700}
              gradient={["#f5d78e", "#e8a838", "#c084fc", "#a855f7"]}
              className="block"
              onReady={() => setTyping(true)}
            >
              One man&apos;s engineering is another man&apos;s miracle.
            </FuzzyText>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-muted"
          >
            <MapPin className="h-4 w-4 text-purple-light" />
            {siteConfig.location}
          </motion.p>

          <p className="max-w-2xl text-lg leading-8 text-muted">
            {typing ? (
              <>
                {typedText}
                <span className="ml-1 inline-block h-5 w-px animate-pulse bg-honey align-middle" />
              </>
            ) : (
              <span className="text-muted/50">&nbsp;</span>
            )}
          </p>
        </div>

        <StaggerTags
          tags={["Full Stack", "AI Engineering", "Cloud", "Cybersecurity", "Systems"]}
          delay={0.9}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <MagneticButton href="/projects" variant="primary">
            View Projects
            <ArrowRight className="ml-2 h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="/contact" variant="secondary">
            Contact Me
          </MagneticButton>
        </motion.div>

        <div className="grid gap-4 pt-4 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <FadeContent key={stat.label} delay={index * 0.1} y={24}>
              <SpotlightCard className="rounded-3xl p-6">
                <div className="font-magneto text-4xl text-honey-light">
                  <CountUp value={stat.value} delay={index * 0.12} />
                </div>
                <div className="card-muted mt-2 text-sm">{stat.label}</div>
              </SpotlightCard>
            </FadeContent>
          ))}
        </div>
      </motion.div>

      <FadeContent className="mt-20" delay={0.1}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.28em] text-purple-light uppercase">Deployments</p>
            <h2 className="font-magneto mt-2 text-3xl text-foreground">Featured Work</h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-purple-light"
          >
            /view_all_projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProjects.slice(0, 3).map((project, index) => (
            <FadeContent key={project.title} delay={index * 0.1}>
              <SpotlightCard className="h-full p-6">
                <span className="rounded-full border border-purple/30 bg-purple/10 px-3 py-1 text-xs text-purple-light">
                  {project.domain}
                </span>
                <h3 className="font-magneto mt-5 text-2xl text-card-foreground">{project.title}</h3>
                <p className="card-muted mt-3 text-sm leading-7">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-honey/20 bg-black/40 px-2.5 py-1 text-xs text-honey-light"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </FadeContent>
          ))}
        </div>
      </FadeContent>
    </section>
  );
}
