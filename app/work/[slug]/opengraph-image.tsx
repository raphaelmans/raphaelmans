import { ImageResponse } from "next/og";
import { getPublishedCaseStudy } from "@/data/case-studies";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Raphael Mansueto engineering case study";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getPublishedCaseStudy(slug);

  if (!caseStudy) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 17,
            color: "#71717a",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span>Case study</span>
          <span style={{ color: "#38bdf8" }}>Raphael Mansueto</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 70,
              fontWeight: 600,
              letterSpacing: "-0.045em",
              lineHeight: 1.05,
              maxWidth: 940,
            }}
          >
            {caseStudy.shortTitle}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 820,
              fontSize: 26,
              lineHeight: 1.45,
              color: "#a1a1aa",
            }}
          >
            {caseStudy.ogSummary}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            fontFamily: "monospace",
            fontSize: 15,
            color: "#52525b",
          }}
        >
          {caseStudy.technologies.slice(0, 4).map((technology, index) => (
            <div key={technology} style={{ display: "flex", gap: 12 }}>
              {index > 0 && <span>·</span>}
              <span>{technology}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
