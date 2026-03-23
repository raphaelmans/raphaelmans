# Raphael Mansueto — Portfolio Knowledgebase

> Single source of truth for the raphaelmansueto.com overhaul.
> Last updated: March 24, 2026

---

## Identity

- **Full name:** Raphael James Marie Anthony Mansueto
- **Location:** Cebu City, Cebu, 6000, Philippines
- **Email:** raphaelmansueto@gmail.com
- **Phone:** +63 9282406854
- **GitHub:** [raphaelmans](https://github.com/raphaelmans)
- **LinkedIn:** [raphaelmansueto](https://linkedin.com/in/raphaelmansueto)
- **X/Twitter:** [raphaeljamesm](https://x.com/raphaeljamesm)
- **Calendly:** [calendly.com/raphaelmansueto/30min](https://calendly.com/raphaelmansueto/30min)
- **Personal site:** [raphaelmansueto.com](https://www.raphaelmansueto.com/)
- **Agency site:** [rethndr.com](https://rethndr.com/) (subtle link only, not featured)
- **Photo:** exists at `raphaelmans` repo → `public/assets/images/me.jpeg`

---

## Education

- **Cebu Institute of Technology University** — Cebu, Philippines
- BS in Computer Science
- GPA: 4.58 / 5.00, Cum Laude

---

## Awards & Recognition

- **Rank 7, 7th TOPCIT Philippines 2022** — CHED Philippines. National IT skills assessment.
- **2nd Place, CIB.O Interschool Hackathon 2023** — Cebu IT BPM Organization. Solutions for job hiring processes.

---

## Professional Experience (Verified Timeline)

### 1. VISEO (Contractor) · Digital Asset Settlement Platform
- **Period:** June 9, 2025 – Present
- **Title:** Senior FullStack Developer
- **Company:** VISEO (contractor/BPO), Hong Kong client (remote)
- **NDA:** Do NOT name custody providers, banking partners, or blockchain infrastructure vendors

**What I built:**
- Delivered the complete operator-facing frontend platform: admin, compliance, client management, transactions, and ledger — all settlement operations run through it (10 feature modules, 30+ routes)
- Unified wallet-based signing and enterprise API execution into one transport layer so upstream services interact with smart contracts without knowing which path is used
- Built 3 NestJS gateway services enabling automated custody lock → on-chain posting → confirmation → fund release across banking and blockchain partners
- Extracted shared gateway-lib providing transaction execution, gas estimation, and nonce management — eliminated duplicated logic across all services
- Secured institutional custody flows end-to-end: AWS KMS signing, mutual TLS, JWT, EIP-712 tamper evidence
- Primary liaison with blockchain team for contract specifications; co-designed gateway abstraction layer with CTO
- Type-safe smart contract integration using ABIType and Viem across 27+ contract interfaces
- Authentication: Microsoft Entra ID (Azure AD) SSO with JWT refresh and middleware-based route protection
- State management: TanStack React Query
- Testing: Vitest unit/contract specs, React Testing Library, factory-generated webhook payloads

**Stack:** Next.js 16 · React 19 · TypeScript 5.9 · NestJS 11 · Solidity · Viem · ABIType · TanStack Query · AWS KMS · Zod · Vitest · React Testing Library · Docker · Kubernetes · Swagger/OpenAPI

---

### 2. Ample — AI-Powered PR Content Production Pipeline
- **Period:** May 2025 – December 2025
- **Title:** Full Stack Engineer (client project, part-time alongside Hustlewing transition)
- **Company:** US client (remote)
- **Status:** Product shut down — no traction, but the engineering work stands

**What the product did (end-to-end pipeline):**
1. **Daily Brief** — Cron triggers: fetch company context → real-time news search (xAI/Grok + Gemini + Firecrawl) → personalized interview topics → email invitation via Resend
2. **PR Agent Chat ("Jessica")** — Intent classification → sub-agent routing → topic search, interest management, interview editing. Persistent memory.
3. **Voice Interview** — Retell AI in-browser (WebRTC), dynamic segment prompts, post-call Gemini hook generation from transcript
4. **Video Processing** — Mux hosting → ZapCap auto-captioning → clip editor with overlays (dnd-kit, @napi-rs/canvas server-side)
5. **Social Distribution** — Auto-create posts per platform → daily planner with per-platform rules (caps, intervals) → cron poster via Ayrshare → webhook status tracking → metrics dashboard
6. **Monetization** — Stripe subscription with @supabase/stripe-sync-engine, catalog prefilling, subscription gating

**What I built:**
- Built the Daily Brief pipeline (8-step Mastra workflow) that replaced manual news scanning
- Engineered multi-LLM routing: xAI for real-time news grounding, Gemini for generation, OpenAI for structured outputs — behind provider-agnostic AnalysisSearchService with runtime selection and caching
- Built 5 specialized Mastra agents with intent classification, persistent memory, tool calling
- Built batch ingestion processing full user base daily: p-limit concurrency, ET timezone gating, story deduplication via embedding similarity, reuse-or-create decision trees
- Implemented AI observability: Langfuse + OpenTelemetry with custom span filtering (AI/Mastra kept, infra dropped)
- Integrated Retell AI voice interviews with provider pattern (swappable implementations)
- Wired clip-to-social pipeline: Mux → ZapCap → editor → scheduled multi-platform posting
- Built per-platform scheduling engine with atomic status transitions (planned → scheduled → posting → posted/failed)
- Orchestrated webhooks across full pipeline: Mux, ZapCap, Ayrshare, Stripe, Cal.com, Retell — each event triggers next stage
- Integrated Stripe with two-way database sync and feature gating
- Reduced Langfuse tracing costs via custom span filtering

**Stack:** Next.js 15 · React 19 · TypeScript · Mastra · AI SDK v5 · Gemini · xAI/Grok · OpenAI · Retell AI · tRPC 11 · TanStack Query · Drizzle ORM · Supabase · Zod · XState · Zustand · Mux · Ayrshare · Stripe · Cal.com · Firecrawl · ZapCap · Langfuse · OpenTelemetry · Sentry · Resend · Mixpanel · assistant-ui · dnd-kit · @napi-rs/canvas · Tailwind · Radix UI

---

### 3. Hustlewing
- **Period:** February 16, 2023 – April 14, 2025
- **Title:** Lead Front-End Engineer
- **Company:** Hustlewing, Illinois, US (Remote)

**What I did:**
- Spearheaded migration from Webflow to scalable Next.js application — 300% user base growth in six months
- Leveraged OpenAI's LLM and LangChain ecosystem to automate resume extraction/analysis — 20% engagement lift
- Built chatbot-driven agentic UX agents for seamless record updates
- Directed major design overhauls and feature updates, managed task boards and cross-team collaboration
- Authored comprehensive unit and integration tests with Jest and React Testing Library

**Stack:** React · Next.js · TypeScript · OpenAI · LangChain · Supabase · Zustand · TanStack Query · Jest · React Testing Library

---

### 4. Outliant
- **Period:** June 27, 2022 – November 18, 2022
- **Title:** Full-Stack Developer
- **Company:** Outliant, Texas, US (Remote)

**What I did:**
- Designed and implemented end-to-end features: React/Next.js frontend + RESTful APIs with Node.js/Express
- Maintained and refactored codebases to optimize performance and reduce technical debt
- Specialized in form-intensive applications and admin dashboards with react-hook-form and Next.js SSR

**Stack:** React · Next.js · Node.js · Express · TypeScript · Jest

---

### 5. Vibravid
- **Period:** June 3, 2021 – March 29, 2022
- **Title:** Junior Software Engineer
- **Company:** Vibravid, Michigan, US (Remote)

**What I did:**
- Developed Web3.js-based UIs in AngularJS for smart contract interactions
- Configured, tested, and deployed custom Solidity smart contracts on Ethereum via Hardhat and OpenZeppelin
- Integrated Tron, WAX, and Syscoin blockchain APIs for cryptocurrency transactions
- Built Telegram bot to manage Syscoin social interactions and automate airdrop distributions

**Stack:** AngularJS · Web3.js · Solidity · Hardhat · OpenZeppelin · Node.js · Mocha · Jest · Telegram Bot API

---

## Side Projects

### Ugnay — AI-Powered Storefront Builder
- **URL:** [ugnay.ph](https://ugnay.ph)
- **Status:** In development
- **What it is:** Conversational AI platform enabling Filipino independent agents (insurance, real estate, travel) to build professional web pages through conversation instead of forms
- **Key points:**
  - Replaced 5-step form onboarding with 2-step conversation
  - AI modifies typed JSON spec (json-render), not raw HTML — infinite layout combinations from composable section variants
  - 6 swappable AI service abstractions (LLM, embedding, search, image gen, document parser, job queue) behind interfaces with DI
  - RAG pipeline (pgvector) feeding visitor-facing chatbot with transparency rules (refuses to hallucinate)
  - QStash async job pipeline for document parsing, embedding, blog generation, knowledge sync
  - TDD-first: Vitest + Playwright, OpenSpec validation gates
- **Stack:** Next.js 16 · React 19 · TypeScript 5.9 · Mastra · Vercel AI SDK v6 · AI Elements · tRPC · TanStack Query · Zustand · Drizzle ORM · Supabase · pgvector · Zod v4 · QStash · Resend · json-render · next-intl · Vitest · Playwright · Biome

### KudosCourts — Sports Court Discovery & Booking
- **URL:** [kudoscourts.ph](https://kudoscourts.ph)
- **Status:** Launched
- **What it is:** Sports court discovery and reservation platform for the Philippine market
- **Key points:**
  - Booking engine with full lifecycle (reserve → confirm → check-in → complete/no-show/cancel) across walk-in, advance, membership, and recurring models
  - Event-driven notification system via QStash async processing
  - Built solo: architecture, code, design system (teal/orange palette, Outfit + Source Sans 3), marketing, #buildinpublic
- **Stack:** Next.js 16 · React · TypeScript · AI SDK · Supabase · Drizzle ORM · TanStack Query · Zustand · XState · tRPC · Zod · QStash · Resend · Vitest · Playwright · Tailwind · shadcn/ui

---

## Rethndr Solutions

- **URL:** [rethndr.com](https://rethndr.com/)
- **What:** Registered sole proprietorship (DTI) for AI consultancy services
- **Team:** Raphael (Founder), Christian Anunciado (Co-founder), Jude Detuya (Co-founder)
- **Portfolio projects (shared with personal site):** Vectle, Dorshy, Takingyo, FusionPMS, HustleWing, Great Vet
- **Treatment on personal portfolio:** Subtle link only — not featured, not branded. This is a personal portfolio, not an agency page.

---

## Existing Sites — What to Keep / Kill

### raphaelmansueto.com (current)
**Keep:**
- "RM" nav logo
- Photo with offset border decoration
- OG image setup (`/og` route)
- Calendly integration
- Contact form (email: raphaelmansueto@gmail.com)
- Socials: GitHub, LinkedIn, X/Twitter, Email

**Kill:**
- Blog section (Payload CMS) — placeholder content, not maintained
- Projects section showing only Rethndr portfolio (Vectle, Dorshy, etc.) — replace with Ugnay, KudosCourts
- Work Experience page (only shows Hustlewing, Outliant, Vibravid) — add VISEO and Ample
- Hero copy ("Passionate Full-Stack Developer focused on Front-End Engineering") — completely outdated
- Footer "© {year} Your Name" — literally never updated
- `/work-experience` and `/contact-me` as separate routes — merge into single page

### rethndr.com
**Carry over subtly:**
- Shared portfolio screenshots (Vectle, Dorshy, etc.) — can reference as "earlier client work"
- NDA disclaimer concept ("We've worked on many more solutions under NDAs")
- Calendly link now routes through raphaelmansueto/30min

---

## Design System (Decided)

- **Theme:** Sky clarity — dark zinc base + sky blue accent
- **Base palette (zinc):** #09090b → #18181b → #27272a → #3f3f46 → #71717a → #a1a1aa → #fafafa
- **Accent palette (sky):** #0c4a6e → #0284c7 → #38bdf8 → #7dd3fc → #e0f2fe
- **Usage:** Sky for links, CTAs, active states, AI/agent badge tints. Zinc neutrals for everything else.
- **shadcn/ui base color:** Zinc with CSS variables (oklch)
- **Typography:** Geist Sans + Geist Mono (or Inter as fallback)
- **Layout:** Single page, single column scroll, max-width ~720px
- **Aesthetic:** Dark, text-focused, engineering precision. No gradients, no illustrations, no stock photos.
- **Motion:** Subtle scroll-triggered fade-up. Hover states on cards. No parallax, no page transitions.
- **Copy tone:** Direct. Action verbs. No superlatives. No em-dashes. No "shipping". Let the work speak.

---

## Copy Guidelines (Learned from iteration)

These rules were established through multiple rounds of review. Follow them for all future copy changes.

### Voice and tone
- **No em-dashes or en-dashes.** Use commas, periods, colons, or restructure the sentence. Em-dashes are the #1 AI-detection signal.
- **No "shipping/ship/shipped".** Use "deliver", "build", "launch" instead. "Shipping" reads as unprofessional startup slang.
- **No vague filler.** "Global teams", "end-to-end", "cutting-edge" are empty calories. Say what you actually mean or cut it.
- **No exaggeration.** "Every line written under strict compliance review" is the kind of claim that makes hiring managers roll their eyes. If you've been at one compliance job for less than a year, don't write copy that implies a decade of it.
- **No resume-speak.** "I architect production AI systems" is stiff. Write like a person, not a LinkedIn headline.

### Structure
- **Hero and About must do different work.** The hero is the hook (identity + differentiator). The About section is the expansion (how I work + range + credentials). Never repeat the same claim in both.
- **Lead with the differentiator.** The "I build WITH AI" angle is what separates Raphael from other fullstack engineers. It goes first, not buried in paragraph 3.
- **Experience descriptions need outcomes, not just build lists.** Every role should answer "what happened because I built this?" not just "what did I build?" Hustlewing's "300% growth" is the model. VISEO's security details are proof enough without claiming outcomes.
- **Project descriptions lead with the user, not the tech.** "Filipino agents get a professional web page" not "Conversational AI that builds web pages."

### What NOT to do
- **Don't count features as a flex.** "10 feature modules, 30+ routes, 27+ contract interfaces" is cringe on a portfolio. It reads as padding. Describe what the system does, not how many files it has.
- **Don't namedrop tools in the wrong section.** AWS KMS belongs in experience tags, not in the About section. About should focus on concepts (security, process, coordination), not specific tools.
- **Don't take instructions literally.** "Separation of devops and developers" means cross-team coordination in a large org, not a literal statement about org chart boundaries.
- **Don't describe AI tools incorrectly.** Claude Code and Codex are used interchangeably depending on the task. Don't assign specific roles to each unless Raphael specifies.
- **Don't duplicate VISEO details.** VISEO compliance details live in the Experience section only. The About section references the concept of compliance-grade work without repeating specifics.

### Narrative arc (decided)
The page tells one story in this order:
1. **Hero:** Identity + AI-first differentiator + "production, not demos"
2. **About P1:** How I work (AI-assisted development, Claude Code, Codex, custom skills, TDD-first)
3. **About P2:** Range (same discipline scales to compliance-grade environments)
4. **About P3:** Credentials + freelance availability
5. **Experience:** Prove it (career arc from first role to compliance fintech)
6. **Projects:** Initiative (side projects, user-first framing)
7. **Awards:** Third-party credibility
8. **Services:** CTA

### AI tooling positioning
- Raphael uses Claude Code and Codex **interchangeably** depending on the task at hand
- They are for **streamlining workflow**, not "autonomous execution"
- He writes **custom AI skills** that enforce TDD-first architecture
- He uses **spec-driven pipelines** that validate before deployment
- The key claim: delivers at a pace and cost that doesn't make sense for a solo engineer
- In compliance environments (VISEO), AI tooling is NOT used in the codebase. This shows range.

---

## Development Approach (for About/footer)

- **TDD-first:** Vitest unit + Playwright E2E, mocked service interfaces, eval scripts for AI quality gating
- **Spec-driven:** OpenSpec pipeline with validation gates, agentic coding loops
- **AI-native tooling:** Claude Code, Codex, Desktop Commander MCP, Ralph Orchestrator
- **Clean architecture:** Router → UseCase → Service → Repository with full DI, Zod-typed contracts at every boundary

---

## Positioning

- **Title:** Full Stack AI Engineer
- **Hero subtitle:** I build with AI the way most engineers use linters: always on, deeply integrated. Multi-agent pipelines, LLM orchestration, and RAG systems that run in production, not demos. Based in Cebu, Philippines.
- **Target audience:** Hiring managers, startup founders, freelance clients on Upwork/LinkedIn
- **Freelance availability:** Part-time, project-based, flexible hours
- **Rate target:** $30–50/hr starting (with room to raise quickly based on Ample + VISEO portfolio)

---

## CV Skills (from 2025 PDF — needs updating)

**Listed on CV:** JavaScript, TypeScript, Go, ReactJS, NextJS, AngularJS, NodeJS, HTML5 & CSS3, Web3.js, Solidity, Blockchain, Hardhat, Jest, Mocha, Chai, React Testing Library, PostgreSQL, MongoDB, Git, Docker, AI SDKs

**Missing from CV (add for overhaul):**
- Mastra, Vercel AI SDK, AI Elements, Gemini, xAI/Grok, OpenAI (multi-provider routing)
- NestJS, tRPC, Drizzle ORM, Zod, TanStack Query
- Supabase, Upstash Redis, pgvector, QStash
- Viem, ABIType, AWS KMS, EIP-712, mTLS
- Retell AI, Mux, Ayrshare, Stripe, Cal.com, Firecrawl, Langfuse, OpenTelemetry
- Kubernetes, Sentry, Resend, Mixpanel
- Vitest, Playwright, Biome
- Zustand, XState, assistant-ui, dnd-kit, Framer Motion

---

## Files Reference

| File | Purpose |
|---|---|
| `case-studies.md` | Detailed narrative case studies (Ugnay, KudosCourts, Ample, VISEO) |
| `portfolio-brief.md` | Harvard-style concise brief for Upwork/LinkedIn/quick-send |
| `portfolio-v2.jsx` | React artifact v2 (needs rebuild with corrected facts) |
| Personal repo: `/Users/raphaelm/Documents/Coding/raphaelmans` | Current site codebase (Next.js + Payload CMS) |
| Agency repo: `/Users/raphaelm/Documents/Coding/rethndr` | rethndr.com codebase |
| Ugnay repo: `/Users/raphaelm/Documents/Coding/startups/ugnayph` | Ugnay codebase |
| Ample repo: `/Users/raphaelm/Documents/Work/ample` | Ample codebase |
| CV: `/Users/raphaelm/Downloads/raphaelmansueto-cv-2025.pdf` | Current CV (needs updating) |
| Harvard guide: `/Users/raphaelm/Downloads/2024-HES_resume-and-letter.pdf` | Resume best practices reference |
