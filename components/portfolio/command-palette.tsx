"use client";

import { Command } from "cmdk";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { siteConfig } from "@/lib/data";

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const items = useMemo(
    () => [
      ...siteConfig.navItems.map((item) => ({
        label: item.label,
        action: () => {
          document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        },
      })),
      {
        label: "Contact via email",
        action: () => {
          window.location.href = siteConfig.socialLinks[2]?.href ?? "#contact";
          setOpen(false);
        },
      },
    ],
    [],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open quick search"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 backdrop-blur-xl transition hover:border-cyan-300/30 hover:text-white md:hidden"
      >
        <Search className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-xl transition hover:border-cyan-300/30 hover:text-white md:inline-flex"
      >
        <Search className="h-4 w-4" />
        Quick Search
        <span className="rounded-md border border-white/10 px-2 py-0.5 text-xs text-slate-400">
          Ctrl+K
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/70 px-4 pt-24 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <Command
            className="w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-[0_30px_120px_rgba(15,23,42,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search className="h-4 w-4 text-slate-400" />
              <Command.Input
                placeholder="Search sections, actions, and navigation..."
                className="h-14 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
            <Command.List className="max-h-80 overflow-y-auto p-3">
              <Command.Empty className="px-3 py-6 text-sm text-slate-400">
                No results found.
              </Command.Empty>
              <Command.Group heading="Navigation" className="text-xs text-slate-500">
                {items.map((item) => (
                  <Command.Item
                    key={item.label}
                    onSelect={item.action}
                    className="cursor-pointer rounded-2xl px-3 py-3 text-sm text-slate-200 outline-none transition data-[selected=true]:bg-white/8 data-[selected=true]:text-cyan-300"
                  >
                    {item.label}
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </div>
      ) : null}
    </>
  );
}
