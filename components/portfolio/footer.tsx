import { Suspense } from "react";
import Link from "next/link";
import { PortfolioActivity } from "@/components/portfolio/portfolio-activity";

export function Footer() {
  return (
    <footer className="border-t border-border pb-10">
      <Suspense fallback={null}>
        <PortfolioActivity />
      </Suspense>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-6">
        <span className="text-xs text-muted-foreground">
          &copy; 2026 Raphael Mansueto
        </span>
        <nav aria-label="Footer utilities" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <Link
            className="min-h-11 content-center rounded-sm hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            href="/engineering"
          >
            Engineering notes
          </Link>
          <a
            className="min-h-11 min-w-11 content-center rounded-sm hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            href="https://github.com/raphaelmans"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="min-h-11 content-center rounded-sm hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            href="#top"
          >
            Back to top
          </a>
          <span className="font-mono">Cebu, PH</span>
        </nav>
      </div>
    </footer>
  );
}
