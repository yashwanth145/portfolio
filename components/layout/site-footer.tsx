import Link from "next/link";

import { siteConfig } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-6 py-10 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="font-magneto text-2xl text-purple-light">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-muted">Full Stack · AI · Systems Engineering</p>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          {siteConfig.socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted transition hover:text-purple-light"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
