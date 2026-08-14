import { caseStudies } from "@/data/case-studies";
import { engineeringNotes } from "@/data/engineering-notes";
import { latestPortfolioReviewDate } from "@/data/public-content";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function buildLlmsText() {
  const caseStudyLinks = caseStudies
    .map((caseStudy) => `- ${caseStudy.shortTitle} case study: ${absoluteUrl(`/work/${caseStudy.slug}`)}`)
    .join("\n");
  const engineeringLinks = engineeringNotes
    .map((note) => `- ${note.title}: ${absoluteUrl(`/engineering/${note.slug}`)}`)
    .join("\n");
  const engineeringSummaries = engineeringNotes
    .map((note) => `- ${note.title}: ${note.directAnswer}`)
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

- Portfolio: ${siteConfig.origin}/
${caseStudyLinks}
- Engineering notes: ${absoluteUrl("/engineering")}
${engineeringLinks}
- Resume: ${absoluteUrl("/resume.pdf")}

## Verified areas of work

- Production AI workflows with structured output, human review, orchestration, and observability
- Full-stack systems with Next.js, React, Node.js, Go, PostgreSQL, and typed API contracts
- Web and mobile delivery with Next.js, Expo, and React Native
- Integration work across queues, webhooks, media providers, payments, EVM, and Solana
- Reliability patterns including state machines, idempotency, row locking, outbox delivery, and validation

## Featured work

${featuredWork}

## Engineering notes

${engineeringSummaries}

## Professional profiles

- GitHub: ${siteConfig.profiles.github}
- LinkedIn: ${siteConfig.profiles.linkedin}
- Email: ${siteConfig.person.email}

Last reviewed: ${latestPortfolioReviewDate}
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
