import type { EngineeringNoteVisual } from "@/data/engineering-notes";

export function EngineeringSequence({ visual }: { visual: EngineeringNoteVisual }) {
  return (
    <figure
      data-engineering-visual
      aria-labelledby="engineering-sequence-title"
      className="border-b border-border py-10"
    >
      <figcaption>
        <h2
          id="engineering-sequence-title"
          className="text-xl font-medium tracking-[-0.02em] text-balance"
        >
          {visual.title}
        </h2>
        <p className="mt-3 max-w-[680px] text-sm leading-[1.7] text-muted-foreground text-pretty">
          {visual.summary}
        </p>
      </figcaption>
      <ol data-engineering-sequence className="mt-6 divide-y divide-border border-y border-border">
        {visual.steps.map((step, index) => (
          <li
            key={step.label}
            className="grid gap-2 py-4 sm:grid-cols-[32px_180px_1fr] sm:items-baseline sm:gap-5"
          >
            <span className="font-mono text-xs text-primary" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong className="text-sm font-medium text-foreground">{step.label}</strong>
            <span className="text-sm leading-[1.65] text-muted-foreground">{step.detail}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
