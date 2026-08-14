import type { PublicCaseStudySlug } from "./public-portfolio";
import { isValidPublicDate } from "./public-date";
import { searchMetadataIssues } from "@/lib/search";

export type EngineeringNoteGroup = "Production AI operations" | "Transactional product systems";

export interface EngineeringNoteSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface EngineeringNoteVisual {
  title: string;
  summary: string;
  steps: Array<{ label: string; detail: string }>;
}

export interface EngineeringNoteRecord {
  publicationState: "published" | "draft";
  pageKind: "evidence-note";
  slug: string;
  intent: string;
  group: EngineeringNoteGroup;
  title: string;
  seoTitle: string;
  description: string;
  directAnswer: string;
  publishedAt: string;
  lastReviewed: string;
  supportingCaseStudySlugs: PublicCaseStudySlug[];
  topics: string[];
  sections: EngineeringNoteSection[];
  visual?: EngineeringNoteVisual;
}

export const engineeringIndexSearchMetadata = {
  title: "Engineering Notes",
  description:
    "Evidence-led notes on production AI, transactional systems, realtime interfaces, and the engineering decisions behind Raphael Mansueto's portfolio work.",
} as const;

const engineeringNoteRecords: EngineeringNoteRecord[] = [
  {
    publicationState: "published",
    pageKind: "evidence-note",
    slug: "human-decision-gates-production-ai",
    intent: "How should production AI workflows keep state-changing actions under human control?",
    group: "Production AI operations",
    title: "Human decision gates in production AI workflows",
    seoTitle: "Human Decision Gates in Production AI",
    description:
      "A pattern for keeping AI-assisted state changes customizable and reviewable through explicit confirmation, typed handoffs, and persisted workflow state.",
    directAnswer:
      "Separate generation from mutation. Let the system gather context and prepare a typed proposal, then require an explicit human decision before application code performs a state-changing action.",
    publishedAt: "2026-08-12",
    lastReviewed: "2026-08-12",
    supportingCaseStudySlugs: ["ample-news"],
    topics: ["Production AI", "Human-in-the-loop", "Typed workflows"],
    visual: {
      title: "A decision boundary, not a decorative approval step",
      summary:
        "The model can prepare work, but the product owns the transition from a reviewable proposal to persisted state.",
      steps: [
        { label: "Ground context", detail: "Collect the business and workflow evidence needed for the task." },
        { label: "Prepare typed output", detail: "Constrain the draft to a schema the product can inspect and render." },
        { label: "Ask for a decision", detail: "Expose approve, improve, or reject paths before any mutation." },
        { label: "Commit and trace", detail: "Application code validates, persists, and records the confirmed outcome." },
      ],
    },
    sections: [
      {
        id: "boundary",
        title: "Put the boundary before the write",
        paragraphs: [
          "A human-in-the-loop label is not enough. The important design choice is where authority changes hands. In the Ample News assistant, read behavior could run directly, while state-changing tools followed a read, confirm, write sequence. The user reviewed the intended change before the application accepted it as product state.",
          "That boundary keeps AI useful without treating model output as an instruction that must be executed. The model proposes; the product validates; the person decides.",
        ],
      },
      {
        id: "customizable",
        title: "Make feedback part of the product path",
        paragraphs: [
          "A decision gate should support more than approve or cancel. An improve path lets a person change direction while the relevant context is still available. The revised proposal remains reviewable, and rejection ends the attempted change without leaving ambiguous partial state.",
        ],
        bullets: [
          "Show the proposed effect in product language, not raw model output",
          "Preserve the feedback that produced a revision when it is safe to retain",
          "Require a fresh confirmation after material changes",
          "Keep the final mutation inside deterministic application code",
        ],
      },
      {
        id: "persistence",
        title: "Persist the workflow around the model call",
        paragraphs: [
          "Long-running AI work crosses request lifecycles and provider boundaries. A tracked run with bounded stages makes the draft, decision, retry, and final state inspectable. Typed inputs and outputs keep each handoff explicit, while stage-level failure boundaries prevent one provider error from obscuring the rest of the run.",
        ],
      },
      {
        id: "tradeoffs",
        title: "Use gates where the cost of a wrong write is real",
        paragraphs: [
          "Confirmation adds latency and can become ritual if every low-risk interaction asks for permission. Use it for actions that change customer-visible state, publish externally, spend money, or are difficult to reverse. Read-only retrieval and clearly reversible local edits can use lighter controls.",
          "This pattern demonstrates a reviewable production boundary; it does not claim that human review makes model output correct by itself.",
        ],
      },
    ],
  },
  {
    publicationState: "published",
    pageKind: "evidence-note",
    slug: "trace-ai-workflows-end-to-end",
    intent: "How can teams trace AI behavior across application and provider boundaries?",
    group: "Production AI operations",
    title: "Tracing AI workflows across the whole product",
    seoTitle: "Tracing AI Workflows End to End",
    description:
      "How correlated Langfuse, OpenTelemetry, application logs, and Sentry signals make long-running AI and provider workflows reviewable and recoverable.",
    directAnswer:
      "Carry one run identity across model calls, workflow stages, tools, application logs, and provider callbacks. Each telemetry system can keep its specialty while the shared identity reconstructs one product outcome.",
    publishedAt: "2026-08-12",
    lastReviewed: "2026-08-12",
    supportingCaseStudySlugs: ["ample-news"],
    topics: ["Langfuse", "OpenTelemetry", "Sentry", "Observability"],
    sections: [
      {
        id: "correlation",
        title: "Start with the product run, not the model call",
        paragraphs: [
          "A model trace explains only one part of a production workflow. Ample News crossed grounded research, topic generation, interview preparation, voice and video providers, social scheduling, and delivery callbacks. A tracked workflow run supplied the product-level identity needed to relate those stages.",
          "Langfuse captured model, agent, tool, token, latency, and cost behavior. OpenTelemetry connected those spans to the surrounding workflow. Structured application logs and Sentry covered operational context and failures outside the model boundary.",
        ],
      },
      {
        id: "signals",
        title: "Let each signal answer a different question",
        paragraphs: [
          "Forcing every detail into one observability product usually weakens the result. The useful design is correlation, not duplication.",
        ],
        bullets: [
          "AI traces explain prompts, tools, model responses, tokens, and cost",
          "Distributed traces explain stage and provider latency across service boundaries",
          "Application logs explain domain state and recovery decisions",
          "Error monitoring explains exceptions, releases, and affected execution context",
        ],
      },
      {
        id: "volume",
        title: "Control telemetry volume deliberately",
        paragraphs: [
          "Long-running workflows can produce more spans than operators can use. Low-value infrastructure spans should be filtered while agent, workflow, tool, and model events remain available. Sampling and retention are product-operability decisions because they affect both investigation quality and cost.",
        ],
      },
      {
        id: "limits",
        title: "Observability makes behavior inspectable, not automatically correct",
        paragraphs: [
          "Correlation shortens the path from a failed product outcome to the responsible stage, but it does not replace typed boundaries, retries, idempotency, or human decisions. Private prompts, customer data, raw traces, and provider identifiers also require disclosure controls before any evidence is made public.",
        ],
      },
    ],
  },
  {
    publicationState: "published",
    pageKind: "evidence-note",
    slug: "transactional-reservation-boundaries",
    intent: "How can a reservation system accept one competing request without double booking?",
    group: "Transactional product systems",
    title: "Transactional boundaries for competing reservations",
    seoTitle: "Transactional Reservation Boundaries",
    description:
      "How target-first locking, PostgreSQL exclusion constraints, and atomic competing-request resolution keep reservation acceptance consistent under concurrency.",
    directAnswer:
      "Treat pending requests as intent, then make acceptance the inventory-claiming transaction. Lock the reservation target first, recheck availability, commit one winner, and close overlapping requests coherently.",
    publishedAt: "2026-08-12",
    lastReviewed: "2026-08-12",
    supportingCaseStudySlugs: ["kudoscourts"],
    topics: ["PostgreSQL", "Transactions", "Reservation systems", "Concurrency"],
    visual: {
      title: "One transaction decides the inventory outcome",
      summary:
        "Requests can coexist until acceptance; the database boundary resolves contention before any realtime projection updates.",
      steps: [
        { label: "Record intent", detail: "Pending requests do not falsely remove inventory from other players." },
        { label: "Lock the target", detail: "Acceptance locks the court, coach, umpire, or grouped target first." },
        { label: "Commit one outcome", detail: "Availability is rechecked and exclusion constraints remain the final guard." },
        { label: "Resolve competitors", detail: "Overlapping requests close with explicit reasons in the same coordinated decision." },
      ],
    },
    sections: [
      {
        id: "intent",
        title: "Do not confuse a request with inventory ownership",
        paragraphs: [
          "If the first pending request blocks a time slot, an unanswered request can make valid inventory appear unavailable. KudosCourts records pending requests as intent instead. Several players may request the same visible time until an authorized acceptance decides which request claims it.",
        ],
      },
      {
        id: "lock-order",
        title: "Lock the scarce target before reservation rows",
        paragraphs: [
          "The acceptance command locks the reservation target, rechecks the current state, and then changes the selected request. A deterministic target-first order gives concurrent commands the same contention boundary. PostgreSQL exclusion constraints remain the final database guard against overlapping accepted inventory.",
        ],
      },
      {
        id: "resolution",
        title: "Resolve the complete decision atomically",
        paragraphs: [
          "Accepting one request is not complete if competing requests remain actionable. The command commits the winner and closes affected overlaps with explicit resolution reasons. Grouped reservations use the same coordinator and resolve all-or-nothing so a player does not receive an unexplained partial booking.",
        ],
      },
      {
        id: "tradeoffs",
        title: "Keep secondary delivery outside the booking decision",
        paragraphs: [
          "Notifications and realtime delivery should follow the committed outcome without deciding it. A provider failure must not roll back a valid booking. The trade-off is that secondary delivery becomes best-effort and needs its own retry or recovery path.",
          "This boundary protects overlapping accepted inventory; it does not make venue-maintained availability fresher than its source data.",
        ],
      },
    ],
  },
  {
    publicationState: "published",
    pageKind: "evidence-note",
    slug: "realtime-react-query-reconciliation",
    intent: "How should realtime events update React Query views without becoming the source of truth?",
    group: "Transactional product systems",
    title: "Realtime reconciliation with React Query",
    seoTitle: "Realtime UI Reconciliation",
    description:
      "Why realtime events should signal committed change while targeted React Query invalidation refetches canonical state across affected reservation views.",
    directAnswer:
      "Publish a minimal lifecycle event after commit, invalidate only the affected React Query keys, and refetch canonical state. Realtime improves responsiveness without owning correctness.",
    publishedAt: "2026-08-12",
    lastReviewed: "2026-08-12",
    supportingCaseStudySlugs: ["kudoscourts"],
    topics: ["TanStack Query", "React Query", "Realtime", "CQRS"],
    sections: [
      {
        id: "authority",
        title: "Let events announce change, not define truth",
        paragraphs: [
          "KudosCourts uses transactional commands for reservation state changes and purpose-built projections for player and owner views. After commit, a lightweight lifecycle event identifies what changed. The client then asks the application for current persisted state.",
          "This keeps a delayed, repeated, or missed event from becoming the business record. The event is a prompt to reconcile, not a replacement for the committed reservation.",
        ],
      },
      {
        id: "targeting",
        title: "Invalidate the smallest coherent set of views",
        paragraphs: [
          "A reservation decision can affect summary lists, detail, the linked booking, chat, alerts, and notifications. Invalidating every query wastes bandwidth and creates visual churn; invalidating too little leaves contradictory screens. The lifecycle event carries enough identity to select the affected keys without copying the entire domain object into the message.",
        ],
      },
      {
        id: "cqrs",
        title: "Use a pragmatic CQRS-style boundary",
        paragraphs: [
          "Commands own validation, locking, and mutation. Screens read projections shaped for their jobs. React Query coordinates those reads and their freshness, while the database remains authoritative. This separation is useful even without a fully event-sourced system, and the KudosCourts implementation makes no event-sourcing claim.",
        ],
      },
      {
        id: "recovery",
        title: "Design for reconnect and refetch",
        paragraphs: [
          "The client must recover after losing a subscription or returning from the background. Refetch-on-focus, explicit invalidation after local commands, and canonical detail reads close gaps that realtime delivery cannot guarantee. The result is eventual visual convergence after a transactionally correct decision.",
        ],
      },
    ],
  },
];

function hasText(value: string | undefined) {
  return Boolean(value?.trim());
}

export function publishedEngineeringNotes(records: readonly EngineeringNoteRecord[]) {
  return records.filter((record) => record.publicationState === "published");
}

export function programmaticExpansionAllowed({
  evidenceBackedTopicCount,
  hasRecurringSearchDemand,
}: {
  evidenceBackedTopicCount: number;
  hasRecurringSearchDemand: boolean;
}) {
  return evidenceBackedTopicCount >= 12 && hasRecurringSearchDemand;
}

export function validateEngineeringNotes(
  records: readonly EngineeringNoteRecord[],
  publicCaseStudySlugs: readonly string[]
) {
  const slugs = new Set<string>();
  const intents = new Set<string>();

  for (const record of records) {
    if (record.publicationState !== "published") continue;

    if (
      record.pageKind !== "evidence-note" ||
      !hasText(record.slug) ||
      !hasText(record.intent) ||
      !hasText(record.title) ||
      !hasText(record.seoTitle) ||
      !hasText(record.description) ||
      !hasText(record.directAnswer) ||
      record.sections.length === 0 ||
      record.topics.length === 0 ||
      record.supportingCaseStudySlugs.length === 0
    ) {
      throw new Error(`Engineering note "${record.slug}" is missing required evidence`);
    }
    if (slugs.has(record.slug)) throw new Error(`Duplicate engineering-note slug: ${record.slug}`);
    if (intents.has(record.intent)) throw new Error(`Duplicate engineering-note intent: ${record.intent}`);
    slugs.add(record.slug);
    intents.add(record.intent);

    if (!isValidPublicDate(record.publishedAt) || !isValidPublicDate(record.lastReviewed)) {
      throw new Error(`Engineering note "${record.slug}" has invalid publication metadata`);
    }
    if (record.lastReviewed < record.publishedAt) {
      throw new Error(`Engineering note "${record.slug}" was reviewed before publication`);
    }
    const issues = searchMetadataIssues({ title: record.seoTitle, description: record.description });
    if (issues.length > 0) {
      throw new Error(`Engineering note "${record.slug}" has invalid search metadata: ${issues.join(", ")}`);
    }
    if (record.supportingCaseStudySlugs.some((slug) => !publicCaseStudySlugs.includes(slug))) {
      throw new Error(`Engineering note "${record.slug}" references unpublished evidence`);
    }
    if (record.sections.some((section) => !hasText(section.id) || !hasText(section.title) || section.paragraphs.length === 0)) {
      throw new Error(`Engineering note "${record.slug}" contains an incomplete section`);
    }
  }

  return records;
}

validateEngineeringNotes(engineeringNoteRecords, ["ample-news", "kudoscourts", "cravingsph"]);

export const engineeringNotes = publishedEngineeringNotes(engineeringNoteRecords);

export function getPublishedEngineeringNote(slug: string) {
  return engineeringNotes.find((note) => note.slug === slug);
}

export function getPublishedEngineeringNotesForCaseStudy(slug: string) {
  return engineeringNotes.filter((note) => note.supportingCaseStudySlugs.includes(slug as PublicCaseStudySlug));
}
