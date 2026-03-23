import { useState, useEffect, useRef } from "react";

// ── Tokens ──
const C = {
  bg: "#09090b",
  card: "#111113",
  border: "rgba(255,255,255,0.06)",
  borderHover: "rgba(255,255,255,0.1)",
  text: "#fafafa",
  sub: "#a1a1aa",
  dim: "#63636e",
  accent: "#38bdf8",
  accentDark: "#0c4a6e",
  glow: "rgba(56,189,248,0.05)",
};
const mono = "'JetBrains Mono','SF Mono','Fira Code',monospace";

// ── Hooks ──
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

// ── Primitives ──
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "none" : "translateY(10px)",
        transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Tag({ children, glow }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 11,
        fontFamily: mono,
        padding: "3px 8px",
        borderRadius: 4,
        letterSpacing: "0.01em",
        background: glow ? C.accentDark : "rgba(255,255,255,0.04)",
        color: glow ? "#7dd3fc" : C.sub,
        border: glow ? "none" : `0.5px solid ${C.border}`,
      }}
    >
      {children}
    </span>
  );
}

function Section({ id, label, children }) {
  return (
    <section id={id} style={{ paddingBottom: 72 }}>
      <Reveal>
        <h2
          style={{
            fontSize: 12,
            fontFamily: mono,
            fontWeight: 500,
            color: C.accent,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          {label}
        </h2>
        {children}
      </Reveal>
    </section>
  );
}

// ── Cards ──
function ExperienceItem({ period, role, company, children, tags = [], glowTags = [] }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: 16,
        borderRadius: 8,
        border: `0.5px solid ${hov ? C.borderHover : "transparent"}`,
        background: hov ? "rgba(255,255,255,0.015)" : "transparent",
        transition: "all 0.2s",
        marginLeft: -16,
        marginRight: -16,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 16,
          marginBottom: 6,
        }}
      >
        <h3
          style={{
            fontSize: 15,
            fontWeight: 500,
            margin: 0,
            color: hov ? C.accent : C.text,
            transition: "color 0.15s",
            lineHeight: 1.3,
          }}
        >
          {role}{" "}
          <span style={{ fontWeight: 400, color: C.sub }}>· {company}</span>
        </h3>
        <span
          style={{
            fontSize: 11,
            fontFamily: mono,
            color: C.dim,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {period}
        </span>
      </div>

      <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.65, margin: "0 0 10px" }}>
        {children}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {tags.map((t, i) => (
          <Tag key={i} glow={glowTags.includes(t)}>{t}</Tag>
        ))}
      </div>
    </div>
  );
}

function ProjectItem({ title, url, children, tags = [], glowTags = [] }) {
  const [hov, setHov] = useState(false);
  const El = url ? "a" : "div";
  const props = url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <El
      {...props}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "block",
        padding: 16,
        borderRadius: 8,
        border: `0.5px solid ${hov ? C.borderHover : "transparent"}`,
        background: hov ? "rgba(255,255,255,0.015)" : "transparent",
        transition: "all 0.2s",
        textDecoration: "none",
        marginLeft: -16,
        marginRight: -16,
        cursor: url ? "pointer" : "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
        <h3
          style={{
            fontSize: 15,
            fontWeight: 500,
            margin: 0,
            color: hov ? C.accent : C.text,
            transition: "color 0.15s",
          }}
        >
          {title}
        </h3>
        {url && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            style={{
              opacity: hov ? 0.7 : 0.25,
              transition: "all 0.15s",
              transform: hov ? "translate(1px,-1px)" : "none",
            }}
          >
            <path
              d="M3.5 2h6.5v6.5M9.5 2.5L2 10"
              stroke={C.accent}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.6, margin: "0 0 10px" }}>
        {children}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {tags.map((t, i) => (
          <Tag key={i} glow={glowTags.includes(t)}>{t}</Tag>
        ))}
      </div>
    </El>
  );
}

// ── Social Icon ──
function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="social-icon"
      style={{ color: C.dim, transition: "color 0.15s" }}
    >
      {children}
    </a>
  );
}

// ── Nav ──
const SECTIONS = ["about", "experience", "projects", "services"];

// ── Page ──
export default function Portfolio() {
  const active = useActiveSection(SECTIONS);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div
      style={{
        background: C.bg,
        color: C.text,
        minHeight: "100vh",
        fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* ── Navbar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: scrolled ? "rgba(9,9,11,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? `0.5px solid ${C.border}` : "0.5px solid transparent",
          transition: "all 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: 680,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 52,
          }}
        >
          <a
            href="#"
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: C.text,
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            RM
          </a>
          <div style={{ display: "flex", gap: 20 }}>
            {SECTIONS.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                style={{
                  fontSize: 12,
                  fontFamily: mono,
                  color: active === s ? C.accent : C.dim,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "color 0.15s",
                }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Content ── */}
      <main style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px" }}>
        {/* ── Hero ── */}
        <header style={{ paddingTop: 120, paddingBottom: 56 }}>
          <Reveal>
            <h1 style={{ fontSize: 38, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
              Raphael Mansueto
            </h1>
          </Reveal>
          <Reveal delay={60}>
            <p style={{ fontSize: 18, color: C.sub, margin: "10px 0 0" }}>
              Full Stack <span style={{ color: C.accent }}>AI Engineer</span>
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ fontSize: 14, color: C.dim, margin: "14px 0 0", lineHeight: 1.65, maxWidth: 480 }}>
              I build AI-powered products end-to-end — from multi-agent pipelines to production frontends. Based in Cebu, Philippines. Working globally.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ display: "flex", gap: 14, marginTop: 24, alignItems: "center" }}>
              <SocialLink href="https://github.com/raphaelmans" label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/></svg>
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/raphaelmansueto" label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </SocialLink>
              <SocialLink href="mailto:raphaelmansueto@gmail.com" label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>
              </SocialLink>
              <SocialLink href="https://calendly.com/rethndr/15" label="Book a call">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              </SocialLink>
            </div>
          </Reveal>
        </header>

        {/* ── About ── */}
        <Section id="about" label="About">
          <div style={{ fontSize: 14, color: C.sub, lineHeight: 1.75 }}>
            <p style={{ margin: "0 0 12px" }}>
              I architect <span style={{ color: C.text }}>production AI systems</span> and build products for the Philippine market. My work spans multi-agent orchestration, enterprise fintech integrations, and full stack product development — always TypeScript, always production.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              Recently I built an <span style={{ color: C.text }}>AI content pipeline</span> that automated 3–4 hours of daily PR work into a single voice interview — wiring Mastra agents, 3 LLM providers, voice AI, video processing, and social distribution into one flow. Currently shipping <span style={{ color: C.text }}>fintech-grade blockchain settlement infrastructure</span> — gateway services, custody flows, and smart contract integrations for institutional finance.
            </p>
            <p style={{ margin: 0 }}>
              Evenings and weekends I ship side projects — a{" "}
              <a href="https://ugnay.ph" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "none" }}>conversational AI storefront builder</a> and a{" "}
              <a href="https://kudoscourts.ph" target="_blank" rel="noopener noreferrer" style={{ color: C.accent, textDecoration: "none" }}>sports court booking platform</a>. BS Computer Science from CIT University, Cum Laude. Open to part-time freelance.
            </p>
          </div>
        </Section>

        {/* ── Experience ── */}
        <Section id="experience" label="Experience">
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <ExperienceItem period="Jun 2025 →" role="Software Engineer" company="VISEO · Digital Asset Settlement"
              tags={["Next.js 16", "TypeScript", "NestJS", "Viem", "AWS KMS", "Docker", "K8s"]}
              glowTags={["Next.js 16", "NestJS", "Viem"]}>
              Building blockchain-based fintech bridging traditional finance with on-chain settlement. Delivered the sole operator-facing frontend (admin, compliance, transactions, ledger). Built 3 NestJS gateway services enabling automated custody-to-settlement flow. Unified wallet signing and enterprise API execution into one transport layer. Secured institutional transfers with AWS KMS, mTLS, and EIP-712.
            </ExperienceItem>

            <ExperienceItem period="May – Dec 2025" role="Full Stack Engineer" company="Ample · AI PR Pipeline"
              tags={["Mastra", "AI SDK", "Gemini", "xAI", "Retell AI", "tRPC", "Mux", "Stripe", "Langfuse"]}
              glowTags={["Mastra", "AI SDK", "Gemini", "xAI", "Retell AI"]}>
              Automated the full PR workflow: daily AI news research → personalized interview topics → Retell voice interviews → auto-captioned clips → scheduled multi-platform social posting. Routed 3 LLM providers per task behind a provider-agnostic interface. Orchestrated webhooks across the full pipeline — each event triggers the next stage.
            </ExperienceItem>

            <ExperienceItem period="Feb 2023 – Apr 2025" role="Lead Front-End Engineer" company="Hustlewing"
              tags={["Next.js", "React", "OpenAI", "LangChain", "Supabase", "Jest"]}
              glowTags={["OpenAI", "LangChain"]}>
              Migrated platform from Webflow to Next.js — 300% user base growth in six months. Embedded OpenAI and LangChain for resume extraction and agentic UX agents, lifting engagement 20%. Directed design overhauls and managed cross-team delivery.
            </ExperienceItem>

            <ExperienceItem period="Jun – Nov 2022" role="Full-Stack Developer" company="Outliant"
              tags={["React", "Next.js", "Node.js", "Express"]} glowTags={[]}>
              Designed end-to-end features for a social platform — React/Next.js frontend and RESTful APIs. Accelerated delayed sprints to on-time delivery.
            </ExperienceItem>

            <ExperienceItem period="Jun 2021 – Mar 2022" role="Junior Software Engineer" company="Vibravid"
              tags={["AngularJS", "Web3.js", "Solidity", "Hardhat", "Node.js"]} glowTags={["Solidity", "Web3.js"]}>
              Built Web3 UIs for smart contract interactions. Deployed Solidity contracts on Ethereum via Hardhat. Integrated Tron, WAX, Syscoin blockchain APIs. Built a Telegram bot for community management and airdrop automation.
            </ExperienceItem>
          </div>
        </Section>

        {/* ── Projects ── */}
        <Section id="projects" label="Personal Projects">
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <ProjectItem title="Ugnay — AI Storefront Builder" url="https://ugnay.ph"
              tags={["Mastra", "AI SDK v6", "Next.js 16", "tRPC", "Supabase", "pgvector", "QStash"]}
              glowTags={["Mastra", "AI SDK v6"]}>
              Conversational AI that builds web pages for Filipino agents through chat. Replaced 5-step form onboarding with a 2-step conversation. AI modifies a typed JSON spec — not raw HTML. RAG chatbot grounded in agent's own content refuses to hallucinate.
            </ProjectItem>

            <ProjectItem title="KudosCourts — Sports Court Booking" url="https://kudoscourts.ph"
              tags={["Next.js", "TypeScript", "Supabase", "tRPC", "QStash", "Resend"]} glowTags={[]}>
              Court discovery and reservation for the PH market. Booking engine handling full lifecycle across walk-in, advance, membership, and recurring models. Event-driven notifications. Shipped solo.
            </ProjectItem>
          </div>
        </Section>

        {/* ── Services ── */}
        <Section id="services" label="Open to freelance">
          <div style={{ padding: 20, borderRadius: 10, border: `0.5px solid ${C.border}`, background: C.glow }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 24px", fontSize: 13.5, color: C.sub, lineHeight: 1.55 }} className="services-grid">
              <div><span style={{ color: C.text, fontWeight: 500 }}>AI for your SaaS</span><br/>Chat, agents, RAG, streaming — added to your existing app</div>
              <div><span style={{ color: C.text, fontWeight: 500 }}>Multi-agent systems</span><br/>Mastra workflows, tool calling, memory, observability</div>
              <div><span style={{ color: C.text, fontWeight: 500 }}>Full stack apps</span><br/>Next.js · Supabase · tRPC · Drizzle, end-to-end</div>
              <div><span style={{ color: C.text, fontWeight: 500 }}>Enterprise integrations</span><br/>Payment gateways, webhooks, mTLS, billing</div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
              <a href="mailto:raphaelmansueto@gmail.com" style={{ fontSize: 13, fontWeight: 500, padding: "8px 16px", borderRadius: 6, background: C.accent, color: C.bg, textDecoration: "none" }}>Send me an email</a>
              <a href="https://calendly.com/rethndr/15" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, padding: "8px 16px", borderRadius: 6, border: `0.5px solid ${C.border}`, color: C.sub, textDecoration: "none" }}>Book a 15-min call</a>
              <a href="https://linkedin.com/in/raphaelmansueto" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, padding: "8px 16px", borderRadius: 6, border: `0.5px solid ${C.border}`, color: C.sub, textDecoration: "none" }}>LinkedIn</a>
            </div>
          </div>
        </Section>

        {/* ── Footer ── */}
        <footer style={{ paddingBottom: 40, paddingTop: 16, borderTop: `0.5px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 12, color: C.dim }}>© 2026 Raphael Mansueto</span>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a href="https://rethndr.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, fontFamily: mono, color: C.dim, textDecoration: "none" }}>rethndr.com</a>
            <span style={{ fontSize: 12, fontFamily: mono, color: C.dim }}>Cebu, PH</span>
          </div>
        </footer>
      </main>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 64px; }
        body { background: ${C.bg}; }
        ::selection { background: ${C.accentDark}; color: #7dd3fc; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
        .social-icon:hover { color: ${C.text} !important; }
        @media (max-width: 600px) {
          h1 { font-size: 30px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
