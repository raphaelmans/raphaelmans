import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { EngineeringNoteRecord } from "@/data/engineering-notes";

export function RelatedEngineeringNotes({ notes }: { notes: readonly EngineeringNoteRecord[] }) {
  if (notes.length === 0) return null;

  return (
    <aside aria-labelledby="engineering-notes-heading" className="border-t border-border py-14">
      <h2 id="engineering-notes-heading" className="text-2xl font-medium tracking-[-0.025em] text-balance">
        Engineering notes from this work
      </h2>
      <p className="mt-3 max-w-[680px] text-sm leading-[1.7] text-muted-foreground text-pretty">
        Focused explanations of the decisions behind this case study.
      </p>
      <ul className="mt-6 divide-y divide-border border-y border-border">
        {notes.map((note) => (
          <li key={note.slug}>
            <Link
              href={`/engineering/${note.slug}`}
              className="group flex min-h-20 items-center justify-between gap-6 py-4 text-foreground no-underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="font-medium tracking-[-0.01em] text-pretty">{note.title}</span>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
