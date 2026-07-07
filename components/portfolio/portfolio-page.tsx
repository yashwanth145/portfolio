"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import {
  ArrowRight,
  Award,
  ExternalLink,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

import { AnimatedBackground } from "@/components/portfolio/animated-background";
import { CommandPalette } from "@/components/portfolio/command-palette";
import { CustomCursor } from "@/components/portfolio/custom-cursor";
import { LearningAreasGrid } from "@/components/portfolio/learning-areas-grid";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  aboutCards,
  certifications,
  experiences,
  journey,
  siteConfig,
  learningAreas,
  stats,
} from "@/lib/data";

const HeroCanvas = dynamic(
  () => import("@/components/portfolio/hero-canvas").then((mod) => mod.HeroCanvas),
  {
    ssr: false,
    loading: () => <div className="h-[420px] w-full rounded-[2rem] border border-white/10 bg-white/5" />,
  },
);

const sectionMotion = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export function PortfolioPage() {
  const [typedText, setTypedText] = useState("");
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fullText = "Building immersive web experiences with code, motion, and AI.";
    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(fullText.slice(0, index));

      if (index === fullText.length) {
        window.clearInterval(interval);
      }
    }, 35);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!heroRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
        },
      );

      gsap.to(".hero-glow", {
        y: -18,
        x: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => context.revert();
  }, []);


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    const url = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `Portfolio inquiry from ${name}`,
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

    window.location.href = url;
  };

  return (
    <div className="relative overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <CustomCursor />
      <AnimatedBackground />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/65 backdrop-blur-2xl dark:bg-slate-950/65">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="#home" className="text-sm font-semibold tracking-[0.3em] text-white uppercase">
            YR
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-300 transition hover:text-cyan-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <CommandPalette />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section
          id="home"
          ref={heroRef}
          className="mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8"
        >
          <div className="relative">
            <div className="hero-glow absolute -left-8 top-8 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="hero-glow absolute left-24 top-36 h-44 w-44 rounded-full bg-violet-500/20 blur-3xl" />
            <motion.div
              initial="hidden"
              animate="visible"
              variants={sectionMotion}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              
              <div className="space-y-6">
                <p className="hero-reveal flex items-center gap-2 text-sm text-slate-300">
                  <MapPin className="h-4 w-4 text-cyan-300" />
                  {siteConfig.location}
                </p>
                <h1 className="hero-reveal max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                  {siteConfig.name}
                  <span className="mt-3 block bg-[linear-gradient(90deg,#67e8f9,#c084fc,#f8fafc)] bg-clip-text text-transparent">
                    {siteConfig.role}
                  </span>
                </h1>
                <p className="hero-reveal min-h-14 max-w-2xl text-lg leading-8 text-slate-300">
                  {typedText}
                  <span className="ml-1 inline-block h-6 w-px animate-pulse bg-cyan-300 align-middle" />
                </p>
              </div>
              <div className="hero-reveal flex flex-col gap-4 sm:flex-row">
                <MagneticButton href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </MagneticButton>
                <MagneticButton href="#contact" className="bg-white/5">
                  Contact Me
                </MagneticButton>
              </div>
              <div className="hero-reveal grid gap-4 pt-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_10px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl"
                  >
                    <div className="text-3xl font-semibold text-white">{stat.value}</div>
                    <div className="mt-2 text-sm text-slate-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-4 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_20px_120px_rgba(8,47,73,0.35)] backdrop-blur-2xl">
              <HeroCanvas />
              <div className="absolute inset-x-6 bottom-6 rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white">Realtime creative engineering</p>
                    <p className="mt-1 text-sm text-slate-300">
                      3D hero scene, animated background, and motion-first UX.
                    </p>
                  </div>
                  <Sparkles className="h-5 w-5 text-cyan-300" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHeading
            eyebrow="About"
            title="Designing interfaces that feel futuristic, tactile, and alive."
            description="I love creating digital experiences that feel cinematic without sacrificing speed, accessibility, or maintainability."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {aboutCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <h3 className="text-lg font-medium text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="relative min-h-[340px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.25),transparent_35%)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-slate-900/70 text-2xl font-semibold text-white">
                  YR
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Profile Snapshot</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Product-minded developer with a focus on elegant interfaces, clean systems, and memorable visual storytelling.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <p className="mb-6 text-sm uppercase tracking-[0.3em] text-cyan-300">Journey Timeline</p>
              <div className="space-y-5">
                {journey.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="grid gap-4 rounded-[1.5rem] border border-white/8 bg-slate-950/50 p-4 sm:grid-cols-[80px_1fr]"
                  >
                    <div className="text-sm font-semibold text-cyan-300">{item.year}</div>
                    <div>
                      <h3 className="text-base font-medium text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:p-8"
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Things I Have Learnt</p>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
                  Languages, systems, security, AI, and engineering foundations I have explored across my learning journey.
                </p>
              </div>
              <Link
                href="#skills"
                className="inline-flex shrink-0 items-center gap-2 text-sm text-cyan-300 transition hover:text-cyan-200"
              >
                View full skills
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <LearningAreasGrid areas={learningAreas} compact />
          </motion.div>
        </section>

        <section id="skills" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHeading
            eyebrow="Skills"
            title="A balanced toolkit for polished products and scalable experiences."
            description="From programming fundamentals and DSA to full-stack development, cybersecurity, AI, embedded systems, and emerging technologies."
          />
          <LearningAreasGrid areas={learningAreas} className="mt-10" />
        </section>

        <ProjectsSection />

        <section id="certifications" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHeading
            eyebrow="Certifications"
            title="Proof of continuous learning and practical curiosity."
            description="Cisco Networking Academy credentials, competition participation certificates, and hands-on achievements — each linked to the original PDF."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((certificate, index) => (
              <motion.a
                key={certificate.name}
                href={certificate.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
                className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <Award className="h-6 w-6 shrink-0 text-cyan-300" />
                  <span className="rounded-full border border-white/10 bg-slate-950/50 px-2.5 py-1 text-xs text-slate-300">
                    {certificate.category}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-medium leading-snug text-white">{certificate.name}</h3>
                <p className="mt-3 text-sm text-slate-300">{certificate.issuer}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-300 transition group-hover:text-cyan-200">
                  View certificate
                  <ExternalLink className="h-4 w-4" />
                </span>
              </motion.a>
            ))}
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <SectionHeading
            eyebrow="Experience"
            title="Experience shaped by real projects, shipped interfaces, and hands-on iteration."
            description="Hands-on full-stack development experience building production-ready features in Agile, remote team environments."
          />
          <div className="mt-10 space-y-6">
            {experiences.map((experience, index) => (
              <motion.div
                key={`${experience.role}-${experience.company}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:grid-cols-[0.55fr_1.45fr]"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">{experience.duration}</p>
                  <h3 className="mt-3 text-xl font-medium text-white">{experience.role}</h3>
                  <p className="mt-2 text-sm text-slate-300">{experience.company}</p>
                  {experience.location ? (
                    <p className="mt-1 text-sm text-slate-400">{experience.location}</p>
                  ) : null}
                </div>
                <div className="space-y-5">
                  <p className="text-sm leading-7 text-slate-300">{experience.summary}</p>
                  <ul className="space-y-2.5">
                    {experience.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-3 text-sm leading-7 text-slate-300"
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {experience.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs text-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
            <div className="space-y-6">
              <SectionHeading
                eyebrow="Contact"
                title="Let's build something ambitious, memorable, and beautifully engineered."
                description="Use the form to send a message, or reach out directly through your social links. The submit action opens the user’s mail client by default for easy local setup."
              />
              <div className="space-y-3">
                {siteConfig.socialLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-4 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:text-cyan-300"
                  >
                    <span>{link.label}</span>
                    <span>{link.value}</span>
                  </Link>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Name" name="name" placeholder="Your name" />
              <Field label="Email" name="email" type="email" placeholder="you@example.com" />
              <label className="block space-y-2">
                <span className="text-sm text-slate-200">Message</span>
                <textarea
                  name="message"
                  placeholder="Tell me about your idea..."
                  rows={6}
                  required
                  className="w-full rounded-[1.5rem] border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40"
                />
              </label>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(90deg,#22d3ee,#a855f7)] px-6 py-3 text-sm font-medium text-slate-950 transition hover:brightness-110"
              >
                Send Message
                <Mail className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-6 py-8 text-sm text-slate-400 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p>
            {siteConfig.name} / Modern portfolio experience / Ready for deployment on Vercel
          </p>
          <div className="flex items-center gap-4">
            {siteConfig.socialLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition hover:text-cyan-300">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-slate-200">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="w-full rounded-[1.5rem] border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/40"
      />
    </label>
  );
}
