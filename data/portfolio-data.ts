export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
  glowTags: string[];
}

export interface Project {
  title: string;
  url?: string;
  description: string;
  tags: string[];
  glowTags: string[];
}

export interface Service {
  title: string;
  description: string;
}

export interface SocialLinkData {
  href: string;
  label: string;
}

export const NAV_SECTIONS = ["about", "experience", "projects", "awards", "services"] as const;

export const experiences: Experience[] = [
  {
    period: "Jun 2025 →",
    role: "Senior FullStack Developer",
    company: "VISEO · Digital Asset Settlement",
    description:
      "Building the platform that bridges traditional finance with on-chain settlement. Delivered the operator-facing frontend covering admin, compliance, transactions, and ledger. Built the gateway services that automate the full custody-to-settlement flow. All institutional transfers secured with AWS KMS signing and EIP-712 tamper evidence.",
    tags: ["Next.js 16", "TypeScript", "NestJS", "Solidity", "Viem", "ABIType", "TanStack Query", "AWS KMS", "Zod", "Vitest", "React Testing Library", "Docker", "K8s"],
    glowTags: ["Next.js 16", "NestJS", "Solidity", "Viem"],
  },
  {
    period: "May to Dec 2025",
    role: "Full Stack Engineer",
    company: "Ample · AI PR Pipeline",
    description:
      "Automated the entire PR workflow from news research to social posting, replacing 3 to 4 hours of daily manual work. Built specialized AI agents with intent classification, persistent memory, and tool calling. Routed xAI, Gemini, and OpenAI per task behind one provider-agnostic interface. Wired voice interviews, auto-captioned clips, and scheduled multi-platform distribution into a single event-driven pipeline.",
    tags: ["Mastra", "AI SDK", "assistant-ui", "Gemini", "xAI", "Retell AI", "tRPC", "Drizzle", "Zustand", "TanStack Query", "Mux", "Stripe", "Langfuse", "OpenTelemetry"],
    glowTags: ["Mastra", "AI SDK", "assistant-ui", "Gemini", "xAI", "Retell AI"],
  },
  {
    period: "Feb 2023 to Apr 2025",
    role: "Lead Front-End Engineer",
    company: "Hustlewing",
    description:
      "Led the migration from Webflow to Next.js. User base grew 300% in six months. Embedded OpenAI and LangChain for resume extraction and chatbot-driven UX, lifting engagement 20%. Directed design overhauls, managed cross-team delivery, and authored comprehensive test coverage.",
    tags: ["Next.js", "React", "OpenAI", "LangChain", "Supabase", "Zustand", "TanStack Query", "Jest", "React Testing Library"],
    glowTags: ["OpenAI", "LangChain"],
  },
  {
    period: "Jun to Nov 2022",
    role: "Full-Stack Developer",
    company: "Outliant",
    description:
      "Built end-to-end features for a social platform, both the React/Next.js frontend and RESTful APIs. Took over delayed sprints and brought them to on-time delivery. Specialized in form-heavy workflows and admin dashboards.",
    tags: ["React", "Next.js", "Node.js", "Express", "TypeScript", "Jest"],
    glowTags: [],
  },
  {
    period: "Jun 2021 to Mar 2022",
    role: "Junior Software Engineer",
    company: "Vibravid",
    description:
      "First engineering role. Built Web3 UIs for smart contract interactions and deployed Solidity contracts on Ethereum via Hardhat. Integrated three blockchain APIs (Tron, WAX, Syscoin) and built a Telegram bot that automated community airdrops.",
    tags: ["AngularJS", "Web3.js", "Solidity", "Hardhat", "Node.js", "Mocha", "Jest"],
    glowTags: ["Solidity", "Web3.js"],
  },
];

export const projects: Project[] = [
  {
    title: "Ugnay: AI Storefront Builder",
    url: "https://ugnay.ph",
    description:
      "Filipino insurance and real estate agents get a professional web page through a two-step conversation instead of a form. AI modifies a typed JSON spec, not raw HTML, so layouts are composable and infinite. Swappable AI service abstractions behind DI. RAG-powered visitor chatbot grounded in the agent's own content. TDD-first with Vitest and Playwright.",
    tags: ["Mastra", "AI SDK v6", "AI Elements", "Next.js 16", "tRPC", "TanStack Query", "Zustand", "Supabase", "Drizzle", "pgvector", "Zod", "next-intl", "QStash", "Resend", "Vitest", "Playwright"],
    glowTags: ["Mastra", "AI SDK v6", "AI Elements"],
  },
  {
    title: "KudosCourts: Sports Court Booking",
    url: "https://kudoscourts.ph",
    description:
      "Find and book sports courts anywhere in the Philippines. Handles the full booking lifecycle from reservation to check-in across walk-in, advance, membership, and recurring models. Event-driven notifications via QStash. Built solo from architecture to marketing.",
    tags: ["Next.js 16", "TypeScript", "AI SDK", "Supabase", "Drizzle", "tRPC", "TanStack Query", "Zustand", "XState", "Zod", "QStash", "Resend", "Vitest", "Playwright"],
    glowTags: [],
  },
];

export const services: Service[] = [
  {
    title: "AI for your SaaS",
    description: "Chat, agents, RAG, streaming added to your existing app",
  },
  {
    title: "Multi-agent systems",
    description: "Mastra workflows, tool calling, memory, observability",
  },
  {
    title: "Full stack apps",
    description: "Next.js · Supabase · tRPC · Drizzle, end-to-end",
  },
  {
    title: "Enterprise integrations",
    description: "Payment gateways, webhooks, auth flows, billing",
  },
];

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
