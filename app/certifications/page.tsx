"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

import { SpotlightCard } from "@/components/react-bits/spotlight-card";
import { PageHeading } from "@/components/ui/page-heading";
import { certifications } from "@/lib/data";

export default function CertificationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <PageHeading
        eyebrow="Certifications"
        accent="Credentials"
        title="Proof of continuous learning and practical curiosity."
        description="Cisco Networking Academy credentials, competition participation certificates, and hands-on achievements — each linked to the original PDF."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((certificate, index) => (
          <motion.a
            key={certificate.name}
            href={certificate.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
            className="group block"
          >
            <SpotlightCard className="p-6">
            <div className="flex items-start justify-between gap-3">
              <Award className="h-6 w-6 shrink-0 text-purple-light" />
              <span className="rounded-full border border-purple/20 bg-purple/5 px-2.5 py-1 text-xs text-purple">
                {certificate.category}
              </span>
            </div>
            <h3 className="font-magneto mt-5 text-xl leading-snug text-card-foreground">
              {certificate.name}
            </h3>
            <p className="card-muted mt-3 text-sm">{certificate.issuer}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm text-purple-light transition group-hover:text-purple">
              View certificate
              <ExternalLink className="h-4 w-4" />
            </span>
            </SpotlightCard>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
