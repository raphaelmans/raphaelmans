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

const siteUrl = "https://raphaelmansueto.com";
const title = "Senior Full-Stack Engineer · AI Integrations | Raphael Mansueto";
const description =
  "Raphael Mansueto is a Senior Full-Stack Engineer specializing in AI integrations and reliable web and mobile systems. Currently a Senior Full Stack Developer at VISEO.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: siteUrl,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteUrl}/#profile-page`,
  url: siteUrl,
  name: title,
  description,
  dateModified: "2026-08-11",
  mainEntity: {
    "@type": "Person",
    "@id": `${siteUrl}/#raphael-mansueto`,
    name: "Raphael Mansueto",
    jobTitle: "Senior Full Stack Developer",
    url: siteUrl,
    email: "mailto:raphaelmansueto@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cebu City",
      addressCountry: "PH",
    },
    worksFor: {
      "@type": "Organization",
      name: "VISEO",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Cebu Institute of Technology - University",
    },
    sameAs: [
      "https://github.com/raphaelmans",
      "https://linkedin.com/in/raphaelmansueto",
      "https://x.com/raphaeljamesm",
    ],
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
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
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
