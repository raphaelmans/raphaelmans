import { caseStudies } from "@/data/case-studies";

const siteUrl = "https://raphaelmansueto.com";

export function buildLlmsText() {
  const caseStudyLinks = caseStudies
    .map((caseStudy) => `- ${caseStudy.shortTitle} case study: ${siteUrl}/work/${caseStudy.slug}`)
    .join("\n");
  const featuredWork = caseStudies
    .map((caseStudy) => {
      const evidence = caseStudy.evidence
        .map((model) => `${model.title}: ${model.summary}`)
        .join(" ");
      return `- ${caseStudy.shortTitle}: ${caseStudy.ogSummary} Evidence: ${evidence}`;
    })
    .join("\n");

  return `# Raphael Mansueto

Raphael Mansueto is a Senior Full-Stack Engineer specializing in AI integrations, based in Cebu, Philippines. His official current role is Senior Full Stack Developer at VISEO. Previously, he worked as a Full-Stack AI Integration Engineer at HustleWing, combining product delivery, Go services, asynchronous AI processing, and production automation in one employment chapter. He builds reliable TypeScript and Go systems across web and mobile.

## Primary pages

- Portfolio: ${siteUrl}/
${caseStudyLinks}
- Resume: ${siteUrl}/resume.pdf

## Verified areas of work

- Production AI workflows with structured output, human review, orchestration, and observability
- Full-stack systems with Next.js, React, Node.js, Go, PostgreSQL, and typed API contracts
- Web and mobile delivery with Next.js, Expo, and React Native
- Integration work across queues, webhooks, media providers, payments, EVM, and Solana
- Reliability patterns including state machines, idempotency, row locking, outbox delivery, and validation

## Featured work

${featuredWork}

## Professional profiles

- GitHub: https://github.com/raphaelmans
- LinkedIn: https://linkedin.com/in/raphaelmansueto
- Email: mailto:raphaelmansueto@gmail.com

Last reviewed: 2026-08-10
`;
}

export function GET() {
  return new Response(buildLlmsText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
