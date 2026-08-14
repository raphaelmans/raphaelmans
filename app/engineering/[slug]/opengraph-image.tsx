import { ImageResponse } from "next/og";
import { PortfolioOgCard } from "@/components/brand/portfolio-og-card";
import { getPublishedEngineeringNote } from "@/data/engineering-notes";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Raphael Mansueto engineering note";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getPublishedEngineeringNote(slug);

  if (!note) return new Response("Not found", { status: 404 });

  return new ImageResponse(
    <PortfolioOgCard
      eyebrow="Engineering note"
      title={note.title}
      description={note.description}
    />,
    size
  );
}
