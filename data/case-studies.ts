import {
  getProjectEvidence,
  type SemanticEvidenceModel,
} from "./work-evidence";
import {
  PUBLIC_CASE_STUDY_SLUGS,
  type PublicCaseStudySlug,
} from "./public-portfolio";
import { isValidPublicDate } from "./public-date";
import { searchMetadataIssues } from "@/lib/search";

export interface CaseStudySection {
  id: string;
  title: string;
  lead: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface CaseStudyRecord {
  publicationState: "published";
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  shortTitle: string;
  classification: "Employer project" | "Personal product";
  eyebrow: string;
  headline: string;
  description: string;
  orientation: string;
  summary: string;
  status: string;
  period: string;
  role: string;
  platforms: string;
  constraints: string[];
  ownershipSummary: string;
  decisions: string[];
  reliabilityEvidence: string[];
  observableEvidence: string;
  limitations: string[];
  nextSteps: string[];
  externalUrl?: string;
  externalLabel?: string;
  relatedStudySlug?: string;
  relatedStudyLabel?: string;
  applicationCategory: string;
  operatingSystem: string;
  architectureTitle: string;
  ogSummary: string;
  publishedAt: string;
  lastReviewed: string;
  technologies: string[];
  architecture: Array<{ label: string; detail: string }>;
  sections: CaseStudySection[];
  evidence: SemanticEvidenceModel[];
}

const caseStudyRecords: CaseStudyRecord[] = [
  {
    publicationState: "published",
    slug: "ample-news",
    title: "Ample News Production AI Workflow Case Study",
    seoTitle: "Production AI Workflow Case Study",
    seoDescription:
      "A production AI case study covering grounded research, human decision gates, recoverable provider workflows, media publishing, and correlated observability.",
    shortTitle: "Ample News",
    classification: "Employer project",
    eyebrow: "Employer project · Production AI",
    headline: "Ample News: from grounded research to published media",
    description:
      "How Raphael Mansueto helped build Ample News as a production AI workflow spanning grounded research, agent orchestration, voice interviews, video processing, social publishing, and observability.",
    orientation:
      "A completed employer project delivered under HustleWing, presented as an attributable full-stack and production-AI contribution rather than sole product ownership.",
    summary:
      "Ample News was an employer project delivered under HustleWing. I worked across the production AI and full-stack pipeline that turned company context and current news into interview opportunities, recorded media, and scheduled social content, with typed workflow boundaries, explicit confirmation, recoverable integrations, and end-to-end observability.",
    status: "Completed employer project",
    period: "May 2025 - December 2025",
    role: "Full-Stack AI Integration Engineer, delivered under HustleWing",
    platforms: "Next.js product, AI workflows, voice, video, and social integrations",
    constraints: [
      "Coordinate long-running AI, voice, video, and social-provider work across different delivery and failure models.",
      "Keep state-changing agent behavior behind explicit user confirmation.",
      "Make provider failures and model behavior inspectable without exposing private customer or trace data.",
    ],
    ownershipSummary:
      "Contributed across typed AI workflows, agent behavior, provider boundaries, voice and media integrations, publishing, billing, and observability within the HustleWing delivery team.",
    decisions: [
      "Persisted tracked workflow runs with bounded typed stages instead of treating the pipeline as one request.",
      "Separated read, confirm, and write behavior for state-changing agent actions.",
      "Modeled each social destination as a first-class delivery record with explicit recovery state.",
    ],
    reliabilityEvidence: [
      "Stage-level failure boundaries, concurrency limits, retries, reuse checks, and per-profile isolation.",
      "Webhook and persisted-state coordination across media and social integrations.",
      "Correlated Langfuse, OpenTelemetry, application-log, and Sentry signals.",
    ],
    observableEvidence:
      "The delivered workflow connected research, interview preparation, confirmed interaction, media processing, platform scheduling, and correlated operational telemetry.",
    limitations: [
      "The product was discontinued after insufficient traction; this study makes no commercial-success claim.",
      "The public record omits private prompts, customer data, raw traces, identifiers, URLs, and an unverified time-saving estimate.",
    ],
    nextSteps: [
      "Retain only sanitized public diagrams as visual evidence.",
      "If the project is re-evaluated, measure stage-level completion, recovery, latency, and cost from reviewable data.",
    ],
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    relatedStudySlug: "kudoscourts",
    relatedStudyLabel: "Compare the KudosCourts product-ownership study",
    architectureTitle: "From current news to observable, published media",
    ogSummary:
      "A production AI workflow across grounded research, agents, voice, video, social publishing, and observability.",
    publishedAt: "2026-08-10",
    lastReviewed: "2026-08-10",
    technologies: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Mastra",
      "Vercel AI SDK",
      "Gemini",
      "xAI/Grok",
      "OpenAI",
      "Retell AI",
      "Mux",
      "Ayrshare",
      "Stripe",
      "Firecrawl",
      "Langfuse",
      "OpenTelemetry",
      "Sentry",
      "tRPC",
      "Drizzle ORM",
      "Supabase",
      "XState",
      "Zod",
    ],
    architecture: [
      {
        label: "Context and research",
        detail: "Company, customer, competitor, and current-news evidence",
      },
      {
        label: "Typed AI workflows",
        detail: "Grounded search, topic generation, interviews, and tracked runs",
      },
      {
        label: "Human interaction",
        detail: "Confirmation gates, voice interviews, transcripts, and review",
      },
      {
        label: "Media pipeline",
        detail: "Video storage, captions, clips, overlays, and previews",
      },
      {
        label: "Distribution and telemetry",
        detail: "Per-platform scheduling, webhooks, analytics, and AI traces",
      },
    ],
    sections: [
      {
        id: "problem",
        title: "What workflow did Ample News address?",
        lead:
          "PR content crosses several disconnected activities: understanding a company, following relevant news, preparing an interview, recording it, editing the result, adapting it for each social platform, and tracking publication. The engineering challenge was to make those stages behave as one inspectable product rather than a collection of AI calls and third-party APIs.",
        paragraphs: [
          "Ample News combined a daily research and interview-preparation workflow with a browser-based voice interview, video and caption processing, clip editing, and platform-aware social distribution. Subscriptions, scheduling, analytics, and observability supported the same operating path.",
        ],
      },
      {
        id: "context",
        title: "What was my role and attribution boundary?",
        lead:
          "I contributed as a full-stack engineer on Ample News through HustleWing. My work covered production AI workflows, multi-provider model boundaries, agent behavior, voice and media integrations, social scheduling, billing, and observability across the product.",
        paragraphs: [
          "This case study describes source-supported contributions and the reviewed system architecture. It does not present Ample News as a separate employer, claim sole authorship of every agent or workflow in the repository, or attribute the product's commercial outcome to engineering alone.",
        ],
      },
      {
        id: "orchestration",
        title: "How did the AI workflow remain structured?",
        lead:
          "The Daily Brief moved through explicit, typed stages for run creation, company and customer context, grounded news search, topic generation, interview preparation, email composition, persistence, and delivery. Each stage had bounded inputs and outputs, contextual logging, and an explicit failure boundary.",
        bullets: [
          "Provider selection kept Gemini, xAI/Grok, and OpenAI behind task-oriented service boundaries",
          "Tracked run records made long-running work inspectable beyond one request lifecycle",
          "Structured schemas constrained workflow handoffs and persisted output",
          "Concurrency limits, retry behavior, daily gates, and reuse checks bounded batch ingestion",
          "Per-profile isolation prevented one failure from invalidating an entire batch",
        ],
      },
      {
        id: "agent-safety",
        title: "How were agent actions made safer?",
        lead:
          "The PR assistant routed user intent to specialized behavior for general support, interest updates, and interview editing. Read operations could happen directly, while state-changing tools required confirmation before writing.",
        paragraphs: [
          "Persistent memory carried relevant preferences between sessions, but tool access remained explicit. The read, confirm, write sequence made mutations understandable to the user and easier to trace when behavior did not match the request.",
        ],
      },
      {
        id: "integrations",
        title: "How did the media and publishing stages work as one system?",
        lead:
          "Voice interviews, transcript capture, generated hooks, video storage, captions, clip editing, social scheduling, billing, and analytics crossed providers with different delivery and failure models. The product used provider boundaries, webhooks, cron jobs, persisted status, and recovery paths to coordinate them.",
        bullets: [
          "Retell AI voice interviews used a provider abstraction and an XState recording workflow",
          "Mux and ZapCap supported video playback, caption generation, and webhook-driven processing",
          "Ayrshare publishing used one first-class social-post record per platform, date, profile, and asset",
          "Explicit planned, scheduled, posting, posted, and failed states made platform delivery recoverable",
          "Stripe-backed access rules connected subscriptions to product behavior",
        ],
      },
      {
        id: "observability",
        title: "How was AI behavior made observable?",
        lead:
          "Langfuse and OpenTelemetry connected model calls, Mastra workflows, agents, tools, tokens, latency, and cost to the surrounding product context. Structured application logs and Sentry completed the operational view outside the model boundary.",
        paragraphs: [
          "Tracing volume was treated as an engineering constraint. Low-value infrastructure spans could be filtered while preserving the agent, workflow, tool, and model events needed to investigate behavior and cost.",
        ],
      },
      {
        id: "outcome",
        title: "What does the completed project demonstrate?",
        lead:
          "Ample News demonstrates production AI as workflow engineering: models operated inside typed stages, user confirmations, persistent state, external-service boundaries, recovery paths, and observable operations. The result was a delivered product capability spanning research through distribution, not an isolated chatbot demonstration.",
        paragraphs: [
          "The product was later discontinued after it did not achieve sufficient traction. This case study therefore makes no commercial-success claim and withholds the unverified estimate of daily time saved. Its evidence is the implemented system, the attributable contribution, and the engineering decisions that made a complex AI and media workflow operable.",
        ],
      },
    ],
    evidence: getProjectEvidence("ample-news"),
  },
  {
    publicationState: "published",
    slug: "kudoscourts",
    title: "KudosCourts Realtime Reservation Architecture Case Study",
    seoTitle: "Realtime Reservation Architecture",
    seoDescription:
      "How KudosCourts uses transactional PostgreSQL commands, lifecycle events, and targeted React Query reconciliation to keep competing bookings consistent.",
    shortTitle: "KudosCourts",
    classification: "Personal product",
    eyebrow: "Full-stack product · Realtime reservations",
    headline: "KudosCourts: keeping competing bookings in sync",
    description:
      "How Raphael Mansueto designed a transactional, event-driven reservation lifecycle that resolves competing requests and keeps player and court-owner views in sync across web and mobile.",
    orientation:
      "A live personal product with web operation and a source-reviewed mobile application, owned end to end by Raphael.",
    summary:
      "KudosCourts is a live Philippine sports discovery and reservation product built across web and mobile. I designed its reservation lifecycle so players can request the same available time without falsely holding inventory, while one court-owner decision transactionally claims the slot, resolves competing requests, and updates affected views in real time.",
    status: "Live web platform; mobile application source-reviewed",
    period: "January 2026 - Present",
    role: "Full-stack engineer",
    platforms: "Next.js web, Expo iOS/Android, shared TypeScript services",
    constraints: [
      "Several players can request the same available time, but a pending request must not falsely block everyone else.",
      "Court, coach, umpire, and grouped reservations must resolve consistently when owners act concurrently.",
      "Realtime screens must reflect committed database state across player, owner, detail, chat, and notification projections.",
      "Web and mobile clients must share reservation meaning without duplicating backend lifecycle rules.",
    ],
    ownershipSummary:
      "Designed and built the reservation domain, transactional inventory coordination, lifecycle events, realtime client reconciliation, owner and player workflows, web and Expo clients, notifications, and operational tooling.",
    decisions: [
      "Modeled a pending request as non-blocking intent, then made owner acceptance the transactional point that claims inventory.",
      "Locked reservation targets before rows and retained PostgreSQL exclusion constraints as the final double-booking guard.",
      "Separated transactional commands from read projections in a CQRS-style model, using minimal lifecycle events to trigger targeted React Query reconciliation.",
    ],
    reliabilityEvidence: [
      "Deterministic target locking and database exclusion constraints prevent two accepted bookings from claiming overlapping inventory.",
      "Accepting one request closes competing requests with explicit reasons; grouped reservations resolve all-or-nothing.",
      "Realtime events signal change without becoming the source of truth, so React Query refetches canonical committed state.",
      "Notification delivery remains best-effort outside the booking decision, preserving a successful commit when a provider fails.",
    ],
    observableEvidence:
      "The live web product uses this lifecycle across player requests, court-owner acceptance, payment states, reservation detail, chat, and notifications; the source-reviewed Expo client maps the same domain without claiming an unverified store release.",
    limitations: [
      "Dynamic venue, court, city, booking, user, and release counts are omitted until supported by fresh authoritative measurements.",
      "Availability is only as current as the venue-maintained data behind it.",
    ],
    nextSteps: [
      "Measure competing-request resolution, event-to-view reconciliation latency, and booking conversion from stable instrumentation.",
      "Validate mobile release quality through crash-free sessions and performance evidence before publishing release claims.",
    ],
    externalUrl: "https://kudoscourts.ph",
    externalLabel: "Visit KudosCourts",
    applicationCategory: "SportsApplication",
    operatingSystem: "Web, iOS, Android",
    relatedStudySlug: "cravingsph",
    relatedStudyLabel: "Continue to the CravingsPH transaction-design study",
    architectureTitle: "From competing request to reconciled reservation views",
    ogSummary:
      "Transactional reservation commands, lifecycle events, and targeted realtime reconciliation across web and mobile.",
    publishedAt: "2026-08-09",
    lastReviewed: "2026-08-11",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Expo",
      "React Native",
      "tRPC",
      "TanStack Query",
      "Drizzle ORM",
      "PostgreSQL",
      "Supabase",
      "Zod",
      "QStash",
      "OpenAI",
      "Firecrawl",
      "Crawlee",
    ],
    architecture: [
      {
        label: "Booking request",
        detail: "Player intent is recorded without falsely claiming inventory",
      },
      {
        label: "Transactional command",
        detail: "The target is locked before the reservation transition",
      },
      {
        label: "Committed outcome",
        detail: "One booking wins while competitors close coherently",
      },
      {
        label: "Lifecycle event",
        detail: "A minimal event identifies the committed reservation change",
      },
      {
        label: "Reconciled views",
        detail: "React Query refreshes affected player and owner projections",
      },
    ],
    sections: [
      {
        id: "problem",
        title: "What problem did KudosCourts solve?",
        lead:
          "Philippine sports information is fragmented across Facebook pages, maps, websites, group chats, and direct messages. Players struggle to compare venues, while owners often manage schedules and reservations through tools that were never designed for venue operations.",
        paragraphs: [
          "KudosCourts turns that fragmented information into searchable venue and coach discovery, then gives owners structured tools for listings, courts, schedules, prices, reservations, payments, staff, and notifications. Availability is presented only when a venue actually publishes and maintains it.",
        ],
      },
      {
        id: "ownership",
        title: "What did I own?",
        lead:
          "I carried the product from architecture through public operation: domain modeling, application code, ingestion, API contracts, owner workflows, web and mobile interfaces, notifications, developer integrations, deployment, and the operational tools needed to maintain the directory.",
        bullets: [
          "Public discovery across location, sport, amenities, reviews, photos, and pricing",
          "Venue-owner operations for courts, schedules, availability, reservations, payments, teams, and notifications",
          "Coach discovery and booking, open-play and game-room surfaces, and reservation chat",
          "Typed developer APIs and external availability integrations",
          "An Expo application spanning player, coach, and venue-organization modes",
        ],
      },
      {
        id: "reservation-lifecycle",
        title: "How does one booking safely win competing requests?",
        lead:
          "A pending request records intent without holding inventory, so several players can ask for the same available time. When a court owner accepts one request, a transactional command locks the target before reservation rows, rechecks availability, commits one valid outcome, and closes overlapping requests with an explicit resolution reason.",
        paragraphs: [
          "PostgreSQL exclusion constraints remain the final guard against overlapping accepted inventory. Multi-court reservation groups use the same coordinator and resolve together rather than leaving a player with only part of the requested booking.",
        ],
      },
      {
        id: "realtime",
        title: "How do player and owner views stay in sync?",
        lead:
          "The reservation model uses a pragmatic CQRS-style boundary: transactional commands own state changes, while player and owner screens read purpose-built projections. After a commit, lightweight lifecycle events identify what changed instead of trying to carry every derived view through the realtime channel.",
        paragraphs: [
          "React Query responds by invalidating only the affected reservation summaries, detail, linked booking, chat, alert, and notification keys, then refetches canonical state. Realtime improves responsiveness without becoming the authority for correctness when events are delayed, repeated, or missed.",
        ],
      },
      {
        id: "cross-platform",
        title: "How did web and mobile stay aligned?",
        lead:
          "The Expo client uses feature-level API adapters, Zod-validated responses, TanStack Query, and shared product concepts rather than duplicating backend rules. Contract snapshots and endpoint drift checks expose mismatches between the Next.js API and mobile mappings before they become silent runtime failures.",
        bullets: [
          "Typed Expo Router navigation for player, coach, and organization surfaces",
          "Secure session storage, push notifications, deep links, and connectivity-aware query behavior",
          "Realtime reservation chat plus mobile loading, error, empty, and offline states",
          "A token-driven NativeWind component system with haptics, gestures, and Reanimated transitions",
        ],
      },
      {
        id: "ingestion",
        title: "How does the product absorb existing venue data?",
        lead:
          "Ingestion remains a supporting capability rather than the primary proof. The system can normalize CSV, XLSX, ICS, and image-derived booking data into resumable drafts with row-level provenance, review, validation, and idempotent commit into availability blocks.",
        paragraphs: [
          "AI can infer constrained mappings for irregular source files, but owners review the draft and deterministic parsers and transactional services control the resulting availability changes.",
        ],
      },
      {
        id: "outcome",
        title: "What is the outcome?",
        lead:
          "KudosCourts is live as a national sports directory and reservation product. Its booking lifecycle turns concurrent player intent into one trusted court-owner outcome, then keeps affected web and mobile views current without making realtime delivery the source of truth.",
        paragraphs: [
          "The next measurement focus is practical product evidence: venue-data freshness, owner activation, booking conversion, mobile release quality, crash-free sessions, and performance. Those metrics will be published only when the underlying measurements are stable and reviewable.",
        ],
      },
    ],
    evidence: getProjectEvidence("kudoscourts"),
  },
  {
    publicationState: "published",
    slug: "cravingsph",
    title: "CravingsPH Transactional Restaurant Operations Case Study",
    seoTitle: "Transactional Restaurant Architecture",
    seoDescription:
      "How CravingsPH coordinates concurrent orders, payments, fulfillment, realtime views, and kiosk access through deterministic transactional boundaries.",
    shortTitle: "CravingsPH",
    classification: "Personal product",
    eyebrow: "Personal product · Early partner",
    headline: "CravingsPH: correctness under concurrent restaurant work",
    description:
      "How Raphael Mansueto designed CravingsPH around transactional table sessions, coordinated order state, realtime floor reconciliation, and secure kiosk boundaries.",
    orientation:
      "An early-partner personal product whose implemented restaurant workflows and correctness boundaries are reviewed here without implying broad adoption or measured production volume.",
    summary:
      "CravingsPH connects public restaurant discovery with table sessions, linked orders, staff operations, and kiosk workflows. I designed and built the product end to end, with explicit lifecycle, payment, and fulfillment state regions; command deduplication and row locking for concurrent writes; deterministic multi-order settlement; realtime reconciliation; and scoped device trust.",
    status: "Early partner",
    period: "Ongoing",
    role: "Product owner and engineer",
    platforms: "Next.js web product, restaurant operations, realtime floor, and kiosk",
    constraints: [
      "Guests and multiple staff members can act on the same table session and related orders at nearly the same time.",
      "Lifecycle, payment, and fulfillment progress independently but must never combine into an invalid business state.",
      "Realtime screens are projections of committed state and must recover after missed or repeated events.",
      "Shared kiosk devices need bounded trust rather than reusable full-user credentials.",
    ],
    ownershipSummary:
      "Designed and built the discovery, restaurant, table-session, order, realtime floor, persistence, and kiosk boundaries as one product system.",
    decisions: [
      "Modeled lifecycle, payment, and fulfillment as three named state regions with cross-region guards.",
      "Required command IDs, deterministic row-lock ordering, and deduplication around concurrent session and order mutations.",
      "Reconciled committed realtime events into query caches instead of treating an event as the source of truth.",
      "Used short-lived pairing and restaurant-scoped device trust for kiosk access.",
    ],
    reliabilityEvidence: [
      "Transactional commands lock affected rows in deterministic order and can return benign conflicts when another actor already applied the intended result.",
      "Multi-order settlement validates the whole set before committing one consistent result.",
      "Realtime floor events trigger cache reconciliation against persisted state so missed or repeated events do not define correctness.",
      "Kiosk sessions are scoped to a paired restaurant device rather than inheriting unrestricted account authority.",
    ],
    observableEvidence:
      "The reviewed implementation covers the end-to-end restaurant and user workflows, state model, transactional command boundary, realtime floor behavior, and secure kiosk pairing used in the early-partner product.",
    limitations: [
      "Early-partner status does not establish broad adoption, verified production transaction volume, active payment settlement, or commercial outcome.",
      "CravingsPH is not presented as a universal replacement for every restaurant POS or operating process.",
      "Architecture depth describes implemented behavior; scale and outcome claims remain withheld until measured from reviewable production evidence.",
    ],
    nextSteps: [
      "Instrument command conflict, retry, settlement, and reconciliation behavior before publishing operational metrics.",
      "Validate partner workflows and kiosk recovery under representative staff concurrency.",
      "Publish payment or commercial claims only after the relevant integrations and measurements are active and independently reviewable.",
    ],
    externalUrl: "https://cravings.ph",
    externalLabel: "Visit CravingsPH",
    relatedStudySlug: "ample-news",
    relatedStudyLabel: "Compare the Ample News workflow-observability study",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    architectureTitle: "From a scoped command to reconciled restaurant state",
    ogSummary:
      "Transaction design across three-region order state, deterministic locking, realtime reconciliation, and kiosk trust.",
    publishedAt: "2026-08-10",
    lastReviewed: "2026-08-10",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "XState",
      "tRPC",
      "PostgreSQL",
      "Supabase Realtime",
      "Zod",
    ],
    architecture: [
      {
        label: "Scoped command",
        detail: "Staff, guest, or paired kiosk action with a command identifier",
      },
      {
        label: "Concurrency boundary",
        detail: "Deduplication, validation, and deterministic row locking",
      },
      {
        label: "State regions",
        detail: "Lifecycle, payment, and fulfillment with cross-region guards",
      },
      {
        label: "Atomic commit",
        detail: "Session and linked orders settle as one consistent result",
      },
      {
        label: "Realtime projection",
        detail: "Committed events reconcile floor and query-cache views",
      },
    ],
    sections: [
      {
        id: "problem",
        title: "Why is restaurant work a concurrency problem?",
        lead:
          "A table session can connect guests, several staff members, multiple orders, payment progress, kitchen work, and a shared floor view. Those actors do not wait politely for one another, so a superficially simple status change can race with settlement, cancellation, or fulfillment work.",
        paragraphs: [
          "CravingsPH joins public restaurant and menu discovery to the operational path after a guest arrives: opening a table session, creating linked orders, moving work through preparation and service, settling one or several orders, and keeping the floor view current.",
        ],
      },
      {
        id: "ownership",
        title: "What did I own?",
        lead:
          "I designed and built the product across public discovery, restaurant administration, table sessions, orders, transactional persistence, realtime floor behavior, and kiosk access. That end-to-end boundary made product states and correctness rules part of the same design rather than separate frontend and backend concerns.",
      },
      {
        id: "state-model",
        title: "Why use three coordinated state regions?",
        lead:
          "Lifecycle, payment, and fulfillment answer different questions. A session can remain open while one order is served and another is preparing; payment can be partial without rewriting fulfillment history. Modeling those concerns as named regions preserves their independence while cross-region guards reject combinations the restaurant should never see.",
        bullets: [
          "Lifecycle records whether the session or order remains actionable",
          "Payment records unpaid, partial, settled, or reversed progress",
          "Fulfillment records queued, preparing, ready, and served work",
          "Guards validate the combined state before a command commits",
        ],
      },
      {
        id: "correctness",
        title: "How do simultaneous commands remain safe?",
        lead:
          "Every mutation carries a command identifier, validates current state, and locks affected rows in deterministic order inside a transaction. Repeated commands can be recognized, while competing actions either produce one consistent result or a benign conflict that tells the caller the intended transition was already resolved elsewhere.",
        paragraphs: [
          "Multi-order settlement validates the complete set before changing any member. This avoids a half-settled table when one linked order fails a rule and makes the user-facing result explainable: the operation commits together, retries safely, or returns a conflict without silently losing work.",
        ],
      },
      {
        id: "realtime",
        title: "What role does realtime play?",
        lead:
          "Realtime events make committed restaurant changes visible quickly, but they are not the authority for correctness. Floor and order screens reconcile their caches against persisted state after relevant events, so a missed, delayed, or repeated message does not become the business record.",
      },
      {
        id: "kiosk",
        title: "How is a shared kiosk bounded?",
        lead:
          "A kiosk is paired through a short-lived flow and receives restaurant-scoped device trust. The device can perform the narrow guest-facing work it needs without storing or inheriting an unrestricted staff account session.",
      },
      {
        id: "evidence",
        title: "What does the reviewed product demonstrate?",
        lead:
          "The early-partner implementation demonstrates transaction and workflow design across the restaurant journey: explicit state, deterministic mutation boundaries, recoverable realtime projections, and scoped kiosk authority.",
        paragraphs: [
          "It does not yet establish broad adoption, production transaction scale, active payment settlement, universal POS replacement, or commercial success. Those outcomes require separate operational evidence and remain outside this case study.",
        ],
      },
    ],
    evidence: getProjectEvidence("cravingsph"),
  },
];

const draftCaseStudySlugs = new Set(["bookagad"]);

function hasText(value: string | undefined) {
  return Boolean(value?.trim());
}

export function validatePublishedCaseStudies(records: readonly CaseStudyRecord[]) {
  const slugs = new Set<string>();
  const searchTitles = new Set<string>();
  const evidenceIds = new Set<string>();

  for (const record of records) {
    const missingFields = [
      ["slug", record.slug],
      ["title", record.title],
      ["SEO title", record.seoTitle],
      ["SEO description", record.seoDescription],
      ["classification", record.classification],
      ["orientation", record.orientation],
      ["status", record.status],
      ["period", record.period],
      ["role", record.role],
      ["platforms", record.platforms],
      ["problem", record.sections.find((section) => section.id === "problem")?.lead],
      ["ownership", record.ownershipSummary],
      ["observable evidence", record.observableEvidence],
    ].filter(([, value]) => !hasText(value));

    const missingCollections = [
      ["constraints", record.constraints],
      ["decisions", record.decisions],
      ["reliability evidence", record.reliabilityEvidence],
      ["limitations", record.limitations],
      ["next steps", record.nextSteps],
      ["technologies", record.technologies],
      ["sections", record.sections],
      ["evidence", record.evidence],
    ].filter(([, values]) => !Array.isArray(values) || values.length === 0);

    if (missingFields.length || missingCollections.length) {
      const missing = [...missingFields, ...missingCollections].map(([name]) => name).join(", ");
      throw new Error(`Case study "${record.slug}" is missing required public evidence: ${missing}`);
    }

    if (record.publicationState !== "published") {
      throw new Error(`Non-published case study "${record.slug}" cannot enter the public set`);
    }
    if (draftCaseStudySlugs.has(record.slug)) {
      throw new Error(`Draft case study "${record.slug}" cannot enter the public set`);
    }
    if (slugs.has(record.slug)) {
      throw new Error(`Duplicate published case-study slug: ${record.slug}`);
    }
    slugs.add(record.slug);

    if (searchTitles.has(record.seoTitle)) {
      throw new Error(`Duplicate case-study search title: ${record.seoTitle}`);
    }
    searchTitles.add(record.seoTitle);
    const searchIssues = searchMetadataIssues({
      title: record.seoTitle,
      description: record.seoDescription,
    });
    if (searchIssues.length > 0) {
      throw new Error(`Case study "${record.slug}" has invalid search metadata: ${searchIssues.join(", ")}`);
    }

    if (!isValidPublicDate(record.publishedAt) || !isValidPublicDate(record.lastReviewed)) {
      throw new Error(`Case study "${record.slug}" has invalid publication or review metadata`);
    }
    if (record.lastReviewed < record.publishedAt) {
      throw new Error(`Case study "${record.slug}" was reviewed before its publication date`);
    }

    const sectionIds = new Set(record.sections.map((section) => section.id));
    for (const model of record.evidence) {
      const complete =
        hasText(model.id) &&
        model.projectSlug === record.slug &&
        hasText(model.title) &&
        hasText(model.summary) &&
        hasText(model.accessibilityContext) &&
        ["sequence", "correlation", "coordinated-state"].includes(model.kind) &&
        model.placement === "case-study" &&
        sectionIds.has(model.caseStudySectionId);

      if (!complete) {
        throw new Error(`Case study "${record.slug}" has incomplete semantic evidence: ${model.id}`);
      }
      if (evidenceIds.has(model.id)) {
        throw new Error(`Duplicate semantic-evidence id: ${model.id}`);
      }
      evidenceIds.add(model.id);

      const nodes =
        model.kind === "sequence"
          ? model.stages
          : model.kind === "correlation"
            ? [model.anchor, ...model.signals]
            : [model.command, model.concurrencyGate, model.stateRegions, model.reconciliation];
      if (nodes.some((node) => !hasText(node.id) || !hasText(node.label) || !hasText(node.detail))) {
        throw new Error(`Semantic evidence "${model.id}" has an unlabeled node`);
      }
    }
    if (record.slug === "ample-news" && record.evidence.length < 2) {
      throw new Error("Ample News requires separate workflow and observability evidence");
    }
  }

  return records;
}

export const caseStudies = PUBLIC_CASE_STUDY_SLUGS.map((slug, index) => {
  const record = caseStudyRecords.find((candidate) => candidate.slug === slug);
  if (!record) {
    throw new Error(`Published case-study manifest is missing record: ${slug}`);
  }
  const nextSlug = PUBLIC_CASE_STUDY_SLUGS[(index + 1) % PUBLIC_CASE_STUDY_SLUGS.length];
  const nextRecord = caseStudyRecords.find((candidate) => candidate.slug === nextSlug);
  if (!nextRecord) {
    throw new Error(`Published case-study manifest is missing continuation record: ${nextSlug}`);
  }
  return {
    ...record,
    relatedStudySlug: nextSlug,
    relatedStudyLabel: `Continue to the ${nextRecord.shortTitle} case study`,
  };
});

if (caseStudyRecords.length !== caseStudies.length) {
  const unlistedRecords: string[] = [];
  for (const record of caseStudyRecords) {
    if (!PUBLIC_CASE_STUDY_SLUGS.includes(record.slug as PublicCaseStudySlug)) {
      unlistedRecords.push(record.slug);
    }
  }
  const unlisted = unlistedRecords.join(", ");
  throw new Error(`Published case-study records are missing from the manifest: ${unlisted}`);
}

validatePublishedCaseStudies(caseStudies);

export function getPublishedCaseStudy(slug: string) {
  if (draftCaseStudySlugs.has(slug)) return undefined;
  return caseStudies.find(
    (caseStudy) => caseStudy.publicationState === "published" && caseStudy.slug === slug
  );
}
