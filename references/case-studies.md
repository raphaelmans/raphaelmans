# Portfolio Case Studies

---

## Case Study #1: Ugnay — AI-Powered Storefront Builder for Filipino Agents

### The Problem

In the Philippines, independent professionals — insurance advisors, real estate brokers, travel consultants, tutors — often have no online presence. They lose clients to competitors who simply *have a website*. But building one requires technical skills, budget, and time these agents don't have.

Existing website builders still ask too much: pick a template, choose a layout, write your own copy, configure SEO. For a 55-year-old insurance agent in Makati who just wants a professional page, that's a wall.

### What I Built

**Ugnay** (Filipino for "connection") is a conversational AI storefront builder. Instead of forms and templates, agents have a conversation with an AI that builds their page in real-time.

The flow: you arrive, type your name and what you do, and the AI generates a professional page instantly — hero section, services, call-to-action. Then it asks friendly questions: *"What services do you offer?"*, *"Do you have happy clients to feature?"* Each answer adds a section to the live page. One click to publish.

18 hardcoded templates become infinite combinations — the AI composes pages from ~30 component variants on the fly based on the conversation.

### Architecture Highlights

**AI Agent Layer**
- Mastra framework for agent orchestration with observational memory and tool calling
- Vercel AI SDK v6 for streaming responses and structured outputs
- json-render spec engine: pages are JSON specs that the AI modifies through conversation — not string templates, but a typed component tree

**Full Stack**
- Next.js 16 (canary) + React 19 with React Compiler
- tRPC + TanStack Query for type-safe client-server communication
- Drizzle ORM + Supabase (PostgreSQL) with Zod v4 schema validation
- Internationalization (English + Tagalog) via next-intl

**AI Infrastructure**
- 6 swappable service abstractions: LLM provider, embedding service, search/scrape, image generation, document parser, job queue — all behind interfaces with DI via factories
- RAG pipeline with pgvector for knowledge retrieval (agent's services, FAQs, testimonials feed the visitor chatbot)
- QStash (Upstash) message queue for async AI jobs: document parsing, embedding, blog generation, knowledge sync — with JWT-signed webhooks, backlog drain, and retry
- Visitor-facing AI chatbot grounded in the agent's own content with transparency rules (confident answer / partial / "I don't know" + CTA)
- Automated blog generation pipeline: topic selection → RAG retrieval → LLM draft → image generation → social content (LinkedIn + Facebook captions)

**Quality & DevOps**
- TDD-first: Vitest unit tests with mocked AI service interfaces + Playwright E2E
- OpenSpec-driven development: specs define changes, agents implement, validation gates enforce
- Biome for linting/formatting, strict TypeScript
- Eval scripts for chatbot quality: retrieval accuracy >85%, answer grounding >90%, false-fallback rate <5%

### Tech Stack

`Next.js 16` · `React 19` · `TypeScript 5.9` · `Mastra` · `Vercel AI SDK v6` · `tRPC` · `TanStack Query` · `Drizzle ORM` · `Supabase` · `Zod v4` · `QStash` · `Upstash Redis` · `pgvector` · `json-render` · `Tailwind CSS` · `shadcn/ui` · `Vitest` · `Playwright` · `Biome`

### What This Demonstrates

- End-to-end AI product: from agent orchestration to streaming UI to async job pipelines
- Production patterns: rate limiting, graceful degradation (skip features if env vars aren't set), signature-verified webhooks, eval-gated quality
- Spec-driven AI rendering: the AI doesn't generate HTML — it modifies a typed JSON spec that a component registry renders, making AI outputs predictable and safe
- Layered architecture: Router → UseCase → Service → Repository with full DI, mockable at every layer

---

## Case Study #2: KudosCourts — Sports Court Discovery & Booking for the Philippines

### The Problem

Finding and booking a badminton, basketball, or tennis court in the Philippines is painful. Court information is scattered across Facebook groups, Viber threads, and word of mouth. Venue owners manage bookings through chat messages and paper logbooks. Players waste time calling around, and venues lose bookings to disorganization.

### What I Built

**KudosCourts** (kudoscourts.ph) is a sports court discovery and reservation platform. Players search courts by sport, location, and availability. Venue owners get a dashboard to manage courts, time slots, pricing, and bookings. The platform connects both sides with real-time notifications.

### Architecture Highlights

**Booking Engine**
- Hybrid state machine for booking lifecycle management — handling the complexity of reservations, confirmations, cancellations, and no-shows
- Multiple booking models to support different venue types: walk-in, advance reservation, membership, and recurring schedules
- Time slot management with conflict detection and automatic availability updates

**Real-Time Notification System**
- QStash as the message queue broker for reliable async delivery
- Event-driven architecture: booking events trigger notification pipelines
- Multi-channel notifications: in-app, email (Resend), and SMS-ready (Semaphore API evaluated for PH market)

**Frontend Architecture**
- Progressive loading patterns with TanStack Query for instant-feeling UI
- Event-driven cache reconciliation: when a booking state changes, related queries invalidate automatically
- CQRS-inspired read/write separation via TanStack Query + tRPC

**Full Stack**
- Next.js + React + TypeScript on Supabase
- Supabase Auth with Google OAuth (handled Android/iOS redirect edge cases for staging builds)
- Tailwind CSS + shadcn/ui design system with a custom teal/orange/warm-neutral palette using Outfit and Source Sans 3 typography

**Marketing & Launch**
- Social media content strategy across Facebook, TikTok, Instagram (carousel format), and Reddit
- Landing pages built as part of the design system playground
- Investor pitch materials and venue owner brochure
- #buildinpublic presence — building and sharing progress publicly

### Tech Stack

`Next.js` · `React` · `TypeScript` · `Supabase` · `TanStack Query` · `tRPC` · `QStash` · `Resend` · `Tailwind CSS` · `shadcn/ui` · `Zod`

### What This Demonstrates

- Shipping to real users in a specific market — not a demo, but a product with real venues and real players
- Complex domain modeling: booking lifecycle state machines, multi-model scheduling, conflict resolution
- Production infrastructure: async job processing, rate limiting, multi-channel notifications
- Full product ownership: architecture, code, design system, marketing materials, #buildinpublic content — all solo

---

## Case Study #3: Ample — AI-Powered PR Content Production Pipeline (Full Stack Engineer, 6 months)

*Client project. Built the full stack for a platform that turns real-time news into published social media clips — automatically.*

### The Problem

PR professionals live in a brutal daily loop: scan news for relevant stories, craft personalized interview pitches, schedule and conduct interviews, edit the recordings into clips, write captions per platform, schedule posts across social channels, and track what performed. Every step is manual. Every step eats hours.

The vision: **what if AI could run the entire pipeline — from news discovery to published clip — with the PR professional only stepping in to record the interview?**

### What I Built

A complete automated PR content factory. Here's the pipeline end-to-end:

**Stage 1: Daily Brief — AI finds your news**

Every day, a Mastra workflow fires:
1. Fetch the user's company context (what they do, who their customers are, who their competitors are)
2. Search real-time news via **xAI/Grok** (grounded in X/Twitter + web + news), **Google Gemini** (grounded search), and **Firecrawl** (web scraping) — three providers routed by use case through a provider-agnostic service layer
3. Generate interview topics grounded in actual news stories, personalized to the user's industry, competitors, and target customer profile
4. Generate interview segments with questions and talking points per topic
5. Compose a personalized email invitation and send via **Resend**

The batch ingestion pipeline processes multiple user profiles in parallel with concurrency limiting (p-limit), ET timezone gating for daily caps, story deduplication via embedding similarity, and a reuse-or-create decision tree that avoids duplicate interviews for the same news story.

**Stage 2: PR Agent Chat — AI helps you prep**

"Jessica" is a conversational PR assistant built with Mastra agents and **assistant-ui** (React). The system uses an intent classification agent to route messages to specialized sub-agents:
- Topic search agent (fetches fresh news-backed suggestions via xAI in real-time)
- Interest management agent (updates user preferences with confirmation loops)
- Interview editing agent (modifies active interview topics, questions, and descriptions)

All agents share persistent memory so context carries across sessions. Multi-turn tool calling with Zod-typed inputs/outputs.

**Stage 3: Voice Interview — AI moderates the recording**

The user records a live voice interview in the browser via **Retell AI** (WebRTC). Dynamic variables are injected per interview segment — the AI interviewer adapts its prompts based on the prepared topic. Post-call: the transcript is captured and **Gemini** auto-generates a "hook" (attention-grabbing summary) for the video.

The voice agent integration uses a provider pattern (swappable implementations), layered architecture (DTO → tRPC router → controller → service → Retell SDK), and the goTry result pattern for error handling.

**Stage 4: Video Processing — AI cuts and captions**

The recording is hosted on **Mux** (HLS playback). **ZapCap** webhooks auto-generate subtitles and captions. A video editor with an overlay system, drag-and-drop reordering (**dnd-kit**), and server-side canvas rendering (**@napi-rs/canvas**) lets users cut the interview into shareable clips.

**Stage 5: Social Distribution — AI schedules and posts**

This is where it all comes together. When a clip is created:
1. The system auto-creates one `social_post` row per platform (Facebook, Twitter/X, LinkedIn, Instagram, YouTube, TikTok — 11 platforms supported)
2. A daily planner cron assigns each post to a timeslot based on per-platform rules (daily caps, minimum intervals, content limits — all codified in a typed platform config)
3. Per-platform poster crons fire every 30 minutes, pick scheduled posts, and publish via **Ayrshare** (multi-platform social API) — one call per platform, not batched
4. **Ayrshare** webhooks track post status back to the system
5. A social metrics dashboard pulls cross-platform analytics

The scheduling engine uses atomic status transitions (`planned → scheduled → posting → posted/failed`) to prevent double-posting, with bounded retry on transient failures.

**Stage 6: Monetization**

**Stripe** subscription with **@supabase/stripe-sync-engine** for two-way sync between Stripe and the database, catalog prefilling scripts, webhook handling, and subscription gating middleware.

### The Architecture That Makes It Work

- **4 Mastra workflows** orchestrating the core pipeline: Daily Brief (8 steps), batch news ingestion, interview topic generation, PR personalization
- **5 specialized Mastra agents** with intent classification routing and persistent memory
- **3 LLM providers** (Gemini, xAI/Grok, OpenAI) routed per use case through a provider-agnostic `AnalysisSearchService` with runtime provider selection and optional caching
- **Full AI observability**: Langfuse + OpenTelemetry with custom span filtering (AI/Mastra spans kept, Next.js infra spans dropped) for cost control
- **10+ external services** all webhook-integrated: Mux, Retell AI, Ayrshare, Stripe, Cal.com, Firecrawl, ZapCap, Langfuse, Sentry, Resend, Mixpanel
- **Clean layered architecture**: Providers → Services → Tools → Workflows → API routes, with Zod schemas at every boundary, DI via `servicesBuilder()`, and structured Pino logging throughout

### Tech Stack

`Next.js 15` · `React 19` · `TypeScript` · `Mastra` · `AI SDK v5` · `Gemini` · `xAI/Grok` · `OpenAI` · `Retell AI` · `tRPC 11` · `TanStack Query` · `Drizzle ORM` · `Supabase` · `Zod` · `XState` · `Zustand` · `Mux` · `Ayrshare` · `Stripe` · `Cal.com` · `Firecrawl` · `ZapCap` · `Langfuse` · `OpenTelemetry` · `Sentry` · `Resend` · `Mixpanel` · `assistant-ui` · `dnd-kit` · `@napi-rs/canvas` · `Tailwind` · `Radix UI`

### What This Demonstrates

- **End-to-end AI pipeline engineering**: Not isolated features — a continuous automated flow where each stage's output feeds the next, from news search to published social clip
- **Multi-agent orchestration with production patterns**: Intent routing, sub-agent delegation, persistent memory, tool calling with confirmation loops, batch processing with concurrency control
- **Multi-LLM architecture**: Three providers (Gemini, xAI, OpenAI) chosen per use case based on strengths — xAI for real-time news grounding, Gemini for generation and hooks, OpenAI for structured outputs — all behind a swappable provider interface
- **Complex scheduling systems**: Per-platform social posting with configurable rules, timezone-aware cron execution, atomic status transitions, and idempotent operations
- **Integration density at production quality**: 10+ external services, all with webhook handling, error recovery, and structured observability — not just "connected" but orchestrated into a coherent pipeline

---

## Case Study #4: Enterprise Digital Asset Settlement Platform (Team Lead)

*Company name withheld — blockchain-based fintech platform, Hong Kong*

### The Problem

A digital asset settlement platform needed to bridge traditional finance (banks, custody providers) with blockchain-based settlement. This required secure, reliable integrations with multiple external financial institutions, a production-grade frontend for platform operations, and smart contract interaction across different execution models — all under strict regulatory and security requirements.

### My Role

**Channels & Integration Team Lead** — responsible for the entire frontend application and three critical payment gateway services. Reported to CTO on system design decisions. Traveled to Hong Kong for technical workshops with stakeholders.

### What I Built

#### Frontend Platform (900+ TypeScript Files)

- Architected a Next.js 16 application with layered architecture and clear module boundaries
- Type-safe smart contract integration using ABIType and Viem, supporting 27+ contract interfaces with compile-time type inference
- Dual-transport execution layer: direct wallet signing (MetaMask, hardware wallets) AND enterprise API-based transaction submission
- Combined Redux Toolkit (7 slices) with TanStack Query for optimal client/server state handling
- Microsoft Entra ID (Azure AD) SSO authentication with JWT refresh and middleware-based route protection
- 10 major feature modules: platform admin, compliance, client management, transactions, ledger systems (30+ sub-routes)

#### Three Production Gateway Services (NestJS)

- **Token KMS Gateway** — JWT-authenticated bridge between custody platform and blockchain, with maker-checker workflows, AWS KMS signing, and EIP-712 tamper evidence generation
- **Digital Asset Custody Gateway** — NestJS 11 service bridging settlement webhooks to custody APIs and smart contracts, with lifecycle callbacks (locked → posted → confirmed → reverted), mTLS, encrypted responses, and Zod-validated payloads
- **Bank API Gateway** — Fiat-to-crypto settlement integration handling payment initiation, virtual accounts, credit/debit webhooks, and mTLS auth

#### Shared Infrastructure Library

- Built `gateway-lib`: shared TypeScript library providing ExecutionDispatcher for blockchain transactions (gas estimation, nonce management), reusable service base classes for 15+ domain services, external API clients, AWS KMS signer factories, and structured logging

### Tech Stack

`Next.js 16` · `React 19` · `TypeScript 5.9` · `NestJS 11` · `Viem` · `ABIType` · `Redux Toolkit` · `TanStack Query` · `AWS KMS` · `JWT` · `mTLS` · `Zod` · `Jest` · `Supertest` · `Docker` · `Kubernetes` · `Swagger/OpenAPI`

### What This Demonstrates

- Enterprise-grade architecture: 900+ file frontend with layered separation, 3 gateway services with security-first design
- Financial institution integration: custody platforms, banking APIs, blockchain — all under regulatory compliance constraints
- Team leadership: managed frontend + integration workstreams, liaised with blockchain team, assisted CTO on system design
- Security engineering: AWS KMS, mTLS, JWT, EIP-712 signatures, encrypted payloads — not just auth, but defense-in-depth
- Testing discipline: Jest unit/contract specs, Supertest E2E, factory-generated payloads, HTML workflow reports

---

## About Me

I'm a Full Stack AI Engineer and Team Lead with production experience across AI-native products, enterprise fintech, and market-focused side projects.

**Professional work:**
- Built an AI-native PR platform with 15+ Mastra workflows, 5 specialized agents (Gemini, xAI, OpenAI), Retell voice AI, Mux video pipeline, Ayrshare social automation, Stripe billing, and Langfuse observability — 10+ integrated services in a single Next.js app (6 months)
- Led a Channels & Integration team building a blockchain-based digital asset settlement platform — a 900+ file Next.js 16 frontend with type-safe smart contract integration, and 3 NestJS gateway services bridging major financial institutions with on-chain settlement (ongoing)

**Side projects:**
- Building AI-powered products for the Philippine market — conversational page builders with Mastra agents, booking platforms with complex state machines, and async notification pipelines powered by QStash

**This combination means I can:**
- Build multi-agent AI systems with Mastra — workflows, memory, tool calling, observability (Langfuse)
- Add AI features to your existing Next.js / React app (chat, agents, structured outputs, streaming)
- Integrate complex external services — video (Mux), payments (Stripe), voice AI (Retell), social media APIs, scheduling (Cal.com)
- Architect enterprise-grade integrations — payment gateways, third-party APIs, webhook orchestration, mTLS
- Ship a full stack app end-to-end: Supabase + Drizzle + tRPC + TanStack Query + Next.js
- Set up AI observability, async job processing, rate limiting, and cron-based pipelines

**Core stack:** Next.js 16 · React 19 · TypeScript · NestJS · Mastra · Vercel AI SDK · Gemini · OpenAI · tRPC · TanStack Query · Viem · Supabase · Drizzle ORM · Zod · Mux · Stripe · Langfuse · QStash · AWS KMS · Tailwind · shadcn/ui

Open to part-time freelance and project-based work.
