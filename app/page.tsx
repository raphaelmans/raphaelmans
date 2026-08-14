import type { Metadata } from "next";
import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { ProofStrip } from "@/components/portfolio/proof-strip";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { FeaturedWorkSection } from "@/components/portfolio/projects-section";
import { RecognitionSection } from "@/components/portfolio/awards-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { Footer } from "@/components/portfolio/footer";
import { SkipLink } from "@/components/portfolio/skip-link";
import { latestPortfolioReviewDate } from "@/data/public-content";
import { personJsonLd, serializeJsonLd } from "@/lib/search";
import { absoluteUrl, siteConfig } from "@/lib/site";

const imageUrl = absoluteUrl("/opengraph-image");

export const metadata: Metadata = {
  title: { absolute: siteConfig.defaultTitle },
  description: siteConfig.defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    url: siteConfig.origin,
    type: "profile",
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Raphael Mansueto — Full-Stack AI Integration Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [imageUrl],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteConfig.origin}/#profile-page`,
  url: siteConfig.origin,
  name: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  dateModified: latestPortfolioReviewDate,
  mainEntity: {
    ...personJsonLd(),
    knowsAbout: [
      "Applied AI engineering",
      "Full-stack product engineering",
      "Agentic workflows",
      "TypeScript",
      "Go",
      "Next.js",
      "React Native",
      "PostgreSQL",
      "EVM",
      "Solana",
    ],
  },
};

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
        }}
      />
      <SkipLink />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-[740px] px-6 outline-none">
        <Hero />
        <ProofStrip />
        <ExperienceSection />
        <FeaturedWorkSection />
        <RecognitionSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
