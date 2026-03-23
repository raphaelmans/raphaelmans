"use client";

import { useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollState } from "@/hooks/use-scroll-state";
import { NAV_SECTIONS } from "@/data/portfolio-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const active = useActiveSection(NAV_SECTIONS);
  const scrolled = useScrollState();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 border-b-[0.5px]",
        scrolled || open
          ? "bg-[#09090b]/88 backdrop-blur-[12px] border-white/[0.06]"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-[740px] mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <a
            href="#"
            className="text-base font-semibold text-foreground no-underline tracking-[-0.02em]"
          >
            RM
          </a>

          <div className="hidden sm:flex gap-6">
            {NAV_SECTIONS.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={cn(
                  "text-sm font-mono tracking-[0.02em] no-underline transition-colors duration-150 py-1.5 px-1 focus-visible:text-accent-sky focus-visible:outline-none",
                  active === section ? "text-accent-sky" : "text-zinc-500"
                )}
              >
                {section}
              </a>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden p-2 -mr-2 text-zinc-400 hover:text-foreground transition-colors duration-150 focus-visible:outline-none"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
              className="transition-transform duration-200"
            >
              {open ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div
          className={cn(
            "sm:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
            open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-1 pb-4">
            {NAV_SECTIONS.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-sm font-mono tracking-[0.02em] no-underline py-2.5 px-3 rounded-md transition-colors duration-150",
                  active === section
                    ? "text-accent-sky bg-accent-sky/5"
                    : "text-zinc-400 hover:text-foreground hover:bg-white/[0.03]"
                )}
              >
                {section}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
