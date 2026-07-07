"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { Mail } from "lucide-react";

import { SpotlightCard } from "@/components/react-bits/spotlight-card";
import { PageHeading } from "@/components/ui/page-heading";
import { siteConfig } from "@/lib/data";

export default function ContactPage() {
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
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <PageHeading
            eyebrow="Contact"
            accent="Let's connect"
            title="Build something ambitious, memorable, and beautifully engineered."
            description="Use the form to send a message, or reach out directly through your social links."
          />
          <div className="space-y-3">
            {siteConfig.socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-muted transition hover:border-purple/40 hover:text-purple-light"
              >
                <span>{link.label}</span>
                <span>{link.value}</span>
              </Link>
            ))}
          </div>
        </div>

        <SpotlightCard borderRadius={32} className="space-y-4 p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Name" name="name" placeholder="Your name" />
          <Field label="Email" name="email" type="email" placeholder="you@example.com" />
          <label className="block space-y-2">
            <span className="text-sm text-foreground">Message</span>
            <textarea
              name="message"
              placeholder="Tell me about your idea..."
              rows={6}
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/60 focus:border-purple/50 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
            />
          </label>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple to-purple-light px-6 py-3 text-sm font-medium text-white shadow-[0_0_32px_rgba(168,85,247,0.35)] transition hover:shadow-[0_0_44px_rgba(168,85,247,0.5)]"
          >
            Send Message
            <Mail className="h-4 w-4" />
          </button>
          </form>
        </SpotlightCard>
      </div>
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
      <span className="text-sm text-foreground">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/60 focus:border-purple/50 focus:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
      />
    </label>
  );
}
