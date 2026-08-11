import { ArrowDownRight, Download } from "lucide-react";

export function Hero() {
  return (
    <header className="pt-[120px] pb-16">
      <p className="mb-4 text-sm text-muted-foreground">
        Raphael Mansueto · Senior Full-Stack Engineer · AI Integrations
      </p>
      <h1 className="m-0 max-w-[680px] text-pretty text-[46px] font-semibold leading-[1.06] tracking-[-0.04em] max-sm:text-[36px]">
        Reliable systems for work that crosses <span className="text-primary">hard boundaries.</span>
      </h1>

      <p className="mt-5 max-w-[650px] text-pretty text-xl leading-[1.5] text-secondary-foreground max-sm:text-lg">
        I turn integration-heavy workflows into reliable products across AI,
        data, web, and mobile.
      </p>

      <p className="mt-4 max-w-[620px] text-[15px] leading-[1.7] text-muted-foreground">
        Currently a Senior Full Stack Developer at VISEO, building institutional
        settlement workflows across EVM and Solana.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
        <a
          href="#experience"
          data-primary-hero-action
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground no-underline transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          View experience
          <ArrowDownRight className="size-4" aria-hidden="true" />
        </a>
        <a
          href="/resume.pdf"
          download
          className="inline-flex min-h-11 items-center gap-2 rounded-sm px-2 py-2.5 text-sm text-muted-foreground no-underline transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Download résumé
          <Download className="size-4" aria-hidden="true" />
        </a>
      </div>

    </header>
  );
}
