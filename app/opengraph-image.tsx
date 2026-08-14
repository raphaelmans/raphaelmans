import { ImageResponse } from "next/og";
import { PortfolioOgCard } from "@/components/brand/portfolio-og-card";

export const alt = "Raphael Mansueto — Full-Stack AI Integration Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <PortfolioOgCard
      eyebrow="Senior Full-Stack Engineer · AI Integrations"
      title="From product requirements to production systems."
      description="AI integrations, transactional systems, and reliable full-stack products across web and mobile."
    />,
    size
  );
}
