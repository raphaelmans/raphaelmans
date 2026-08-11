import type {
  CorrelationEvidenceModel,
  CoordinatedStateEvidenceModel,
  EvidenceNode,
  SemanticEvidenceModel,
  SequenceEvidenceModel,
} from "@/data/work-evidence";

function OverviewStep({ node, index }: { node: EvidenceNode; index: number }) {
  return (
    <li
      data-evidence-node={node.id}
      className="relative border-l border-border py-2 pl-9 first:border-transparent md:border-l-0 md:border-t md:px-2 md:pb-0 md:pt-8 md:first:border-transparent"
    >
      <span className="absolute left-0 top-1.5 flex size-7 -translate-x-1/2 items-center justify-center rounded-full border border-primary/40 bg-background font-mono text-xs text-primary md:left-2 md:top-0 md:-translate-y-1/2 md:translate-x-0">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="text-xs font-semibold leading-[1.45] text-foreground sm:text-sm">
        {node.label}
      </span>
    </li>
  );
}

function SequenceModel({ model }: { model: SequenceEvidenceModel }) {
  return (
    <ol data-evidence-overview className="grid gap-0 md:grid-flow-col md:auto-cols-fr">
      {model.stages.map((stage, index) => (
        <OverviewStep key={stage.id} node={stage} index={index} />
      ))}
    </ol>
  );
}

function CorrelationModel({ model }: { model: CorrelationEvidenceModel }) {
  return (
    <div data-evidence-overview className="grid gap-4 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.6fr)] md:items-center">
      <div data-evidence-node={model.anchor.id} className="border-l-2 border-primary py-1 pl-4">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-primary">Anchor</p>
        <p className="mt-1 text-sm font-semibold text-foreground">{model.anchor.label}</p>
      </div>
      <ul aria-label={`Signals connected to ${model.anchor.label}`} className="grid grid-cols-2 gap-x-5 gap-y-3 border-l border-border pl-5">
        {model.signals.map((signal) => (
          <li key={signal.id} data-evidence-node={signal.id} className="text-xs font-semibold leading-[1.45] text-foreground sm:text-sm">
            {signal.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CoordinatedStateModel({ model }: { model: CoordinatedStateEvidenceModel }) {
  const stages = [model.command, model.concurrencyGate, model.stateRegions, model.reconciliation];
  return (
    <ol data-evidence-overview className="grid gap-0 md:grid-flow-col md:auto-cols-fr">
      {stages.map((stage, index) => (
        <OverviewStep key={stage.id} node={stage} index={index} />
      ))}
    </ol>
  );
}

function EvidenceDetails({ model }: { model: SemanticEvidenceModel }) {
  const nodes =
    model.kind === "sequence"
      ? model.stages
      : model.kind === "correlation"
        ? [model.anchor, ...model.signals]
        : [model.command, model.concurrencyGate, model.stateRegions, model.reconciliation];

  return (
    <details data-evidence-details className="mt-5 border-t border-border pt-3 text-sm">
      <summary className="min-h-11 cursor-pointer rounded-sm py-3 font-medium text-foreground underline decoration-border underline-offset-4 marker:text-primary hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
        Inspect stage details
      </summary>
      <dl className="grid gap-x-6 gap-y-4 pb-2 pt-3 sm:grid-cols-2">
        {nodes.map((node) => (
          <div key={node.id}>
            <dt className="text-sm font-medium text-foreground">{node.label}</dt>
            <dd className="mt-1 text-sm leading-[1.6] text-muted-foreground">{node.detail}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

export function EvidenceModel({ model }: { model: SemanticEvidenceModel }) {
  return (
    <section
      id={model.id}
      data-evidence-model={model.id}
      data-evidence-kind={model.kind}
      data-evidence-placement="case-study"
      aria-label={model.accessibilityContext}
      className="mt-8 max-w-[760px] border-y border-border py-6"
    >
      <h3 className="text-base font-semibold tracking-[-0.01em] text-foreground">{model.title}</h3>
      <p className="mt-2 max-w-[650px] text-sm leading-[1.65] text-muted-foreground">{model.summary}</p>
      <div className="mt-4">
        {model.kind === "sequence" && <SequenceModel model={model} />}
        {model.kind === "correlation" && <CorrelationModel model={model} />}
        {model.kind === "coordinated-state" && <CoordinatedStateModel model={model} />}
      </div>
      <EvidenceDetails model={model} />
    </section>
  );
}
