import type { PublicCaseStudySlug } from "./public-portfolio";

export type EvidencePlacement = "case-study";

export interface EvidenceNode {
  id: string;
  label: string;
  detail: string;
}

interface EvidenceModelBase {
  id: string;
  projectSlug: PublicCaseStudySlug;
  placement: EvidencePlacement;
  caseStudySectionId: string;
  title: string;
  summary: string;
  accessibilityContext: string;
}

export interface SequenceEvidenceModel extends EvidenceModelBase {
  kind: "sequence";
  stages: EvidenceNode[];
}

export interface CorrelationEvidenceModel extends EvidenceModelBase {
  kind: "correlation";
  anchor: EvidenceNode;
  signals: EvidenceNode[];
}

export interface CoordinatedStateEvidenceModel extends EvidenceModelBase {
  kind: "coordinated-state";
  command: EvidenceNode;
  concurrencyGate: EvidenceNode;
  stateRegions: EvidenceNode;
  reconciliation: EvidenceNode;
}

export type SemanticEvidenceModel =
  | SequenceEvidenceModel
  | CorrelationEvidenceModel
  | CoordinatedStateEvidenceModel;

export const evidenceRegistry = {
  kudoscourts: [
    {
      id: "kudoscourts-reservation-coordination",
      projectSlug: "kudoscourts",
      placement: "case-study",
      caseStudySectionId: "reservation-lifecycle",
      kind: "sequence",
      title: "One accepted booking, every affected view in sync",
      summary:
        "The booking decision commits before lightweight events tell affected screens what to refresh.",
      accessibilityContext:
        "A four-stage reservation sequence from a player request through a transactional inventory claim and lifecycle event to targeted React Query reconciliation.",
      stages: [
        {
          id: "booking-request",
          label: "Booking request",
          detail: "A pending request records player intent without falsely holding inventory.",
        },
        {
          id: "transactional-claim",
          label: "Transactional claim",
          detail: "Target locks and database constraints commit one valid booking outcome.",
        },
        {
          id: "lifecycle-event",
          label: "Lifecycle event",
          detail: "A minimal committed event identifies the reservation state change.",
        },
        {
          id: "targeted-reconciliation",
          label: "Targeted reconciliation",
          detail: "React Query refreshes only affected player, owner, chat, and inbox views.",
        },
      ],
    },
  ],
  "ample-news": [
    {
      id: "ample-news-recoverable-workflow",
      projectSlug: "ample-news",
      placement: "case-study",
      caseStudySectionId: "orchestration",
      kind: "sequence",
      title: "Long-running work stays reviewable and recoverable",
      summary:
        "Each stage records progress before work moves across people or providers.",
      accessibilityContext:
        "A five-stage sequence from grounded research through typed workflow stages, human confirmation, recoverable delivery, and correlated operations.",
      stages: [
        {
          id: "grounded-research",
          label: "Grounded research",
          detail: "Business context and current news establish the working evidence.",
        },
        {
          id: "typed-stages",
          label: "Typed workflow",
          detail: "Bounded stages persist structured handoffs and failure state.",
        },
        {
          id: "human-confirmation",
          label: "Human confirmation",
          detail: "State-changing actions wait for an explicit decision.",
        },
        {
          id: "recoverable-delivery",
          label: "Recoverable delivery",
          detail: "Media and publishing providers expose retryable progress.",
        },
        {
          id: "correlated-operations",
          label: "Correlated operations",
          detail: "One run identity connects application and AI telemetry.",
        },
      ],
    },
    {
      id: "ample-news-correlated-observability",
      projectSlug: "ample-news",
      placement: "case-study",
      caseStudySectionId: "observability",
      kind: "correlation",
      title: "One run identity connects the operating story",
      summary:
        "Correlated signals make model behavior inspectable inside the surrounding product workflow.",
      accessibilityContext:
        "A central workflow run associated with agent decisions, provider activity, delivery state, and application events.",
      anchor: {
        id: "workflow-run",
        label: "Workflow run",
        detail: "A persisted identity carries product context across boundaries.",
      },
      signals: [
        {
          id: "agent-decisions",
          label: "Agent decisions",
          detail: "Tools, models, tokens, latency, and cost.",
        },
        {
          id: "provider-activity",
          label: "Provider activity",
          detail: "Voice, media, publishing, and webhook status.",
        },
        {
          id: "delivery-state",
          label: "Delivery state",
          detail: "Planned, scheduled, posting, posted, or failed.",
        },
        {
          id: "application-events",
          label: "Application events",
          detail: "Persisted stage changes, logs, and exceptions.",
        },
      ],
    },
  ],
  cravingsph: [
    {
      id: "cravingsph-coordinated-transaction",
      projectSlug: "cravingsph",
      placement: "case-study",
      caseStudySectionId: "correctness",
      kind: "coordinated-state",
      title: "Concurrent work resolves to one trusted state",
      summary:
        "A guarded command commits coordinated restaurant state before realtime screens reconcile.",
      accessibilityContext:
        "A four-stage flow from a scoped command through command deduplication and deterministic locking, coordinated lifecycle, payment, and fulfillment regions, then post-commit reconciliation.",
      command: {
        id: "scoped-command",
        label: "Scoped command",
        detail: "A staff, guest, or kiosk action includes a command ID.",
      },
      concurrencyGate: {
        id: "concurrency-gate",
        label: "Concurrency gate",
        detail: "Deduplication, validation, and deterministic row locking.",
      },
      stateRegions: {
        id: "coordinated-regions",
        label: "Coordinated state regions",
        detail: "Lifecycle, payment, and fulfillment commit with cross-region guards.",
      },
      reconciliation: {
        id: "post-commit-reconciliation",
        label: "Post-commit reconciliation",
        detail: "Committed events refresh floor and query-cache views.",
      },
    },
  ],
} as const satisfies Record<PublicCaseStudySlug, readonly SemanticEvidenceModel[]>;

export function getProjectEvidence(slug: PublicCaseStudySlug): SemanticEvidenceModel[] {
  return [...evidenceRegistry[slug]];
}

export function getEvidenceNodeCount(model: SemanticEvidenceModel) {
  switch (model.kind) {
    case "sequence":
      return model.stages.length;
    case "correlation":
      return 1 + model.signals.length;
    case "coordinated-state":
      return 4;
  }
}
