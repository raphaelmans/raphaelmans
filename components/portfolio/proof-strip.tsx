import { proofStatement } from "@/data/portfolio-data";

export function ProofStrip() {
  return (
    <aside
      aria-label="Experience highlights"
      data-proof-statement
      className="mb-[84px] border-y border-border py-5"
    >
      <p className="max-w-[660px] text-sm leading-[1.7] text-muted-foreground">
        <strong className="font-medium text-foreground">5+ years</strong>{" "}
        {proofStatement.replace(/^5\+ years\s*/i, "")}
      </p>
    </aside>
  );
}
