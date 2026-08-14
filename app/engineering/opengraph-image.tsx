import { ImageResponse } from "next/og";
import { PortfolioOgCard } from "@/components/brand/portfolio-og-card";

export const alt = "Engineering decisions, explained — Raphael Mansueto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <PortfolioOgCard
      eyebrow="Engineering notes"
      title="Engineering decisions, explained."
      description="Production AI, transactional systems, and realtime interfaces."
    />,
    size
  );
}
