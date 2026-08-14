"use client";

import { useEffect, useRef, useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollState } from "@/hooks/use-scroll-state";
import { NAV_SECTIONS } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { BrandHomeLink } from "@/components/brand/brand-home-link";
import { ThemeMenu } from "./theme-menu";

const navIds = NAV_SECTIONS.map((section) => section.id);

export function Navbar() {
  const active = useActiveSection(navIds);
  const scrolled = useScrollState();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      requestAnimationFrame(() => triggerRef.current?.focus());
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function closeAtDestination(sectionId: string) {
    setOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(sectionId)?.focus({ preventScroll: true });
    });
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b-[0.5px]",
        open
          ? "border-border bg-background"
          : scrolled
            ? "border-border bg-sticky backdrop-blur-[12px] transition-[background-color,backdrop-filter,border-color] duration-300"
            : "bg-transparent border-transparent transition-[background-color,backdrop-filter,border-color] duration-300"
      )}
    >
      <div className="max-w-[740px] mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <BrandHomeLink href="#top" />

          <div className="flex items-center gap-1">
            <div className="hidden items-center gap-4 sm:flex">
              {NAV_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={cn(
                    "inline-flex min-h-11 items-center px-1 text-sm no-underline transition-colors duration-150 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    active === section.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {section.label}
                </a>
              ))}
            </div>

            <ThemeMenu />

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((current) => !current)}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:hidden"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
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
        </div>

        {open && (
          <div id="mobile-navigation" className="sm:hidden">
            <div className="flex flex-col gap-1 pb-4">
              {NAV_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => closeAtDestination(section.id)}
                  className={cn(
                    "flex min-h-11 items-center rounded-md px-3 py-2.5 text-sm no-underline transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    active === section.id
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {section.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
