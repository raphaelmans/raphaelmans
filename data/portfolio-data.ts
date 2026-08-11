import { getProjectEvidence, type SemanticEvidenceModel } from "./work-evidence";
import {
  PUBLIC_CASE_STUDY_SLUGS,
  publicCaseStudyPath,
  type PublicCaseStudySlug,
} from "./public-portfolio";
import { isValidPublicDate } from "./public-date";

export type ExperienceStatus = "Current" | "Completed";
export type WorkStatus = "Live" | "Completed" | "Early access" | "Early partner";

interface ExperienceRecordBase {
  id: string;
  period: string;
  role: string;
  company: string;
  status: ExperienceStatus;
}

export interface PrimaryExperienceRecord extends ExperienceRecordBase {
  presentation: "primary";
  summary: string;
  proofPoints: string[];
  skills: string[];
}

export interface EarlierExperienceRecord extends ExperienceRecordBase {
  presentation: "earlier";
  contribution: string;
  skills: string[];
}

export type ExperienceRecord = PrimaryExperienceRecord | EarlierExperienceRecord;

export interface WorkRecord {
  slug: string;
  homepagePresentation: "flagship" | "supporting";
  title: string;
  classification: "Employer project" | "Personal product";
  status: WorkStatus;
  platforms: string;
  orientation: string;
  problem: string;
  ownership: string;
  decision: string;
  limitations: string;
  tags: string[];
  glowTags: string[];
  externalUrl?: string;
  caseStudyUrl?: string;
  publishedAt: string;
  lastReviewed: string;
  evidence: SemanticEvidenceModel[];
  homepage: {
    context: string;
    decision: string;
    actionLabel: string;
  };
}

export interface SocialLinkData {
  href: string;
  label: string;
}

export const proofStatement =
  "5+ years delivering production AI and integration-heavy products across TypeScript, Go, web, and mobile.";

export const experiences: ExperienceRecord[] = [
  {
    id: "viseo",
    presentation: "primary",
    period: "Jun 2025 - Present",
    role: "Senior Full Stack Developer",
    company: "VISEO",
    status: "Current",
    summary:
      "Building operator workflows and gateway integrations for an institutional digital-asset settlement platform, including the move from an EVM-first product toward equivalent Solana functionality.",
    proofPoints: [
      "Designed a network adapter strategy so one Next.js portal can expose consistent workflows across EVM and Solana without duplicating the interface.",
      "Developing a dedicated Node.js gateway for execution between EVM Layer 2 and Solana Layer 1 while preserving signing and audit-sensitive boundaries.",
    ],
    skills: [
      "Next.js 16 / TypeScript",
      "NestJS",
      "PostgreSQL",
      "AWS",
      "Docker / Kubernetes",
      "EVM / Solana",
      "Viem / Wagmi",
      "Vitest / React Testing Library",
    ],
  },
  {
    id: "hustlewing",
    presentation: "primary",
    period: "Feb 2023 - Dec 2025",
    role: "Full-Stack AI Integration Engineer",
    company: "HustleWing",
    status: "Completed",
    summary:
      "Owned full-stack and AI-integration delivery across HustleWing's core platform and employer products, from customer workflows to production automation.",
    proofPoints: [
      "Led frontend and product delivery for hiring and entrepreneurship workflows, translating requirements into shipped Next.js experiences with design, product, and engineering partners.",
      "Built Go and OpenAI services that turned uploaded resumes into validated profiles and personalized application pitches.",
      "Moved long-running resume processing into Google Cloud Pub/Sub with persisted PostgreSQL run records, traceable state, and explicit failure handling.",
      "Connected grounded research, voice interviews, video processing, human approval, and social publishing in a production AI media workflow with observability across asynchronous stages.",
      "Turned business data into customizable campaign drafts with a feedback loop and human decision gate before final use.",
    ],
    skills: [
      "Next.js / TypeScript",
      "Go / Gin",
      "PostgreSQL / pgvector",
      "OpenAI / Vercel AI SDK",
      "LangGraph / Mastra",
      "Google Cloud Pub/Sub",
      "Docker / Kubernetes",
      "Langfuse / OpenTelemetry",
    ],
  },
  {
    id: "outliant",
    presentation: "earlier",
    period: "Jun 2022 - Nov 2022",
    role: "Full-Stack Developer",
    company: "Outliant",
    status: "Completed",
    contribution:
      "Built Next.js customer experiences, Express APIs, server-rendered forms, and administrative tools for a social platform, then helped clear delayed sprint work.",
    skills: [
      "Next.js / TypeScript",
      "Node.js / Express",
      "REST APIs",
      "Server-side rendering",
      "React Hook Form",
    ],
  },
  {
    id: "vibravid",
    presentation: "earlier",
    period: "Jun 2021 - Mar 2022",
    role: "Junior Software Engineer",
    company: "Vibravid",
    status: "Completed",
    contribution:
      "Built Web3 interfaces and developed, tested, and deployed Solidity contracts on Ethereum, with Tron, WAX, and Syscoin integrations.",
    skills: [
      "Solidity / Ethereum",
      "Hardhat / OpenZeppelin",
      "Mocha / Chai / Jest",
      "Node.js",
      "Tron / WAX / Syscoin",
      "Telegram Bot API",
    ],
  },
];

const featuredWorkRecords: WorkRecord[] = [
  {
    slug: "ample-news",
    homepagePresentation: "flagship",
    title: "Ample News",
    classification: "Employer project",
    status: "Completed",
    platforms: "Production AI, voice, video, and social workflow",
    orientation: "Employer project delivered under HustleWing with bounded contribution.",
    problem:
      "A HustleWing employer project that connected grounded news research, typed AI workflows, voice interviews, video processing, social publishing, billing, and observability as one product.",
    ownership:
      "Contributed full-stack and production-AI work across agent behavior, provider boundaries, tracked workflows, media integrations, scheduling, and product surfaces.",
    decision:
      "Made asynchronous behavior inspectable through explicit state, retries, confirmation gates, structured logs, Langfuse, and OpenTelemetry.",
    limitations:
      "Discontinued; no commercial-success or unverified time-saving claim.",
    tags: [
      "Next.js 15",
      "TypeScript",
      "Mastra",
      "AI SDK",
      "Gemini",
      "Retell AI",
      "Langfuse",
      "OpenTelemetry",
    ],
    glowTags: ["Mastra", "AI SDK", "Langfuse"],
    caseStudyUrl: "/work/ample-news",
    publishedAt: "2026-08-10",
    lastReviewed: "2026-08-10",
    evidence: getProjectEvidence("ample-news"),
    homepage: {
      context:
        "Made a production AI media workflow operable across research, interviews, video, approval, publishing, and observability.",
      decision:
        "Turned long-running AI and provider work into explicit, recoverable stages with confirmation gates and correlated telemetry.",
      actionLabel: "Read the Ample News case study",
    },
  },
  {
    slug: "kudoscourts",
    homepagePresentation: "supporting",
    title: "KudosCourts Web + Mobile",
    classification: "Personal product",
    status: "Live",
    platforms: "Next.js web platform + Expo mobile application",
    orientation: "Personal product owned end to end; live web and source-reviewed mobile.",
    problem:
      "A Philippine sports discovery and reservation product spanning public venue data, owner operations, transactional booking workflows, realtime updates, chat, and web/mobile delivery.",
    ownership:
      "Built the product, architecture, ingestion pipeline, web and mobile clients, and operational tooling end to end.",
    decision:
      "Coordinates competing booking requests through transactional inventory claims, lifecycle events, and targeted realtime reconciliation.",
    limitations:
      "Dynamic venue, booking, user, and release counts remain omitted until freshly verified.",
    tags: [
      "Next.js 16",
      "Expo",
      "React Native",
      "TypeScript",
      "tRPC",
      "PostgreSQL",
      "Supabase",
      "QStash",
    ],
    glowTags: ["Next.js 16", "Expo", "React Native"],
    externalUrl: "https://kudoscourts.ph",
    caseStudyUrl: "/work/kudoscourts",
    publishedAt: "2026-08-09",
    lastReviewed: "2026-08-11",
    evidence: getProjectEvidence("kudoscourts"),
    homepage: {
      context:
        "Keeps booking decisions and affected player and operator views aligned across a live web and mobile reservation product.",
      decision:
        "Transactional commands commit one booking outcome, then lifecycle events trigger targeted React Query refreshes across player and operator views.",
      actionLabel: "Read the KudosCourts case study",
    },
  },
  {
    slug: "cravingsph",
    homepagePresentation: "supporting",
    title: "CravingsPH",
    classification: "Personal product",
    status: "Early partner",
    platforms: "Restaurant discovery and operations",
    orientation: "Early-partner personal product with implemented, source-reviewed architecture.",
    problem:
      "A transaction-heavy restaurant product covering public menus, table sessions, linked orders, realtime floor operations, and secure kiosk workflows.",
    ownership:
      "Designed and built the public discovery, restaurant operations, realtime floor, data, and secure kiosk boundaries as one product system.",
    decision:
      "Uses row locking, command deduplication, deterministic settlement, and explicit lifecycle, payment, and fulfillment state regions for concurrent staff actions.",
    limitations:
      "No claim of broad adoption, production transaction volume, active payments, universal POS replacement, or commercial outcome.",
    tags: ["Next.js 16", "TypeScript", "XState", "tRPC", "PostgreSQL", "Supabase Realtime"],
    glowTags: ["XState", "Supabase Realtime"],
    externalUrl: "https://cravings.ph",
    caseStudyUrl: "/work/cravingsph",
    publishedAt: "2026-08-10",
    lastReviewed: "2026-08-10",
    evidence: getProjectEvidence("cravingsph"),
    homepage: {
      context:
        "Keeps concurrent ordering, payment, and fulfillment work aligned across guest, staff, and kiosk surfaces.",
      decision:
        "Used command IDs, deterministic row locks, and coordinated lifecycle, payment, and fulfillment regions to make concurrent staff actions safe.",
      actionLabel: "Read the CravingsPH case study",
    },
  },
];

const featuredWorkBySlug = new Map(
  featuredWorkRecords.map((record) => [record.slug, record] as const)
);

export const featuredWork = PUBLIC_CASE_STUDY_SLUGS.map((slug) => {
  const record = featuredWorkBySlug.get(slug);
  if (!record) {
    throw new Error(`Featured-work manifest is missing record: ${slug}`);
  }
  return record;
});

if (featuredWorkRecords.length !== featuredWork.length) {
  const unlistedRecords: string[] = [];
  for (const record of featuredWorkRecords) {
    if (!PUBLIC_CASE_STUDY_SLUGS.includes(record.slug as PublicCaseStudySlug)) {
      unlistedRecords.push(record.slug);
    }
  }
  const unlisted = unlistedRecords.join(", ");
  throw new Error(`Featured-work records are missing from the manifest: ${unlisted}`);
}

export function validateFeaturedWork(records: readonly WorkRecord[]) {
  const flagshipCount = records.filter(
    (record) => record.homepagePresentation === "flagship"
  ).length;
  const supportingCount = records.filter(
    (record) => record.homepagePresentation === "supporting"
  ).length;

  if (
    flagshipCount !== 1 ||
    supportingCount !== 2 ||
    records[0]?.slug !== "ample-news" ||
    records[0]?.homepagePresentation !== "flagship"
  ) {
    throw new Error(
      "Featured work requires Ample News as one flagship followed by two supporting records"
    );
  }

  for (const record of records) {
    if (
      !record.orientation.trim() ||
      !record.problem.trim() ||
      !record.ownership.trim() ||
      !record.decision.trim() ||
      !record.limitations.trim() ||
      !record.homepage.context.trim() ||
      !record.homepage.decision.trim() ||
      !record.homepage.actionLabel.trim() ||
      !isValidPublicDate(record.publishedAt) ||
      !isValidPublicDate(record.lastReviewed) ||
      record.lastReviewed < record.publishedAt ||
      record.evidence.some((model) => model.placement !== "case-study") ||
      record.caseStudyUrl !== publicCaseStudyPath(record.slug as PublicCaseStudySlug)
    ) {
      throw new Error(`Featured work record "${record.slug}" is incomplete`);
    }
  }
}

validateFeaturedWork(featuredWork);

export interface Award {
  title: string;
  org: string;
  detail: string;
  url?: string;
}

export const awards: Award[] = [
  {
    title: "Rank 7, 7th TOPCIT Philippines 2022",
    org: "CHED Philippines",
    detail: "National IT skills assessment",
    url: "https://www.facebook.com/photo?fbid=629547822532809&set=pcb.629697909184467",
  },
  {
    title: "2nd Place, CIB.O Interschool Hackathon 2023",
    org: "Cebu IT BPM Organization",
    detail: "Solutions for job hiring processes",
    url: "https://www.facebook.com/cit.university.ccs/posts/779608360620590/",
  },
];

export const socialLinks: SocialLinkData[] = [
  { href: "https://github.com/raphaelmans", label: "GitHub" },
  { href: "https://linkedin.com/in/raphaelmansueto", label: "LinkedIn" },
  { href: "https://x.com/raphaeljamesm", label: "X/Twitter" },
  { href: "mailto:raphaelmansueto@gmail.com", label: "Email" },
  { href: "https://calendly.com/raphaelmansueto/30min", label: "Book a call" },
];
