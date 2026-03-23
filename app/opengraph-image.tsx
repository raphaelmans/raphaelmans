import { ImageResponse } from "next/og";

export const alt = "Raphael Mansueto | Full Stack AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: "#38bdf8",
            fontFamily: "monospace",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            marginBottom: 20,
          }}
        >
          Full Stack AI Engineer
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            color: "#fafafa",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Raphael Mansueto
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#a1a1aa",
            lineHeight: 1.5,
            maxWidth: 700,
          }}
        >
          Multi-agent pipelines, LLM orchestration, and RAG systems that run in
          production, not demos.
        </div>
      </div>
    ),
    { ...size }
  );
}
