import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { AboutSection } from "@/components/portfolio/about-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { AwardsSection } from "@/components/portfolio/awards-section";
import { ServicesSection } from "@/components/portfolio/services-section";
import { Footer } from "@/components/portfolio/footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Raphael Mansueto",
  jobTitle: "Full Stack AI Engineer",
  url: "https://raphaelmansueto.com",
  email: "raphaelmansueto@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cebu City",
    addressCountry: "PH",
  },
  sameAs: [
    "https://github.com/raphaelmans",
    "https://linkedin.com/in/raphaelmansueto",
    "https://x.com/raphaeljamesm",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Cebu Institute of Technology University",
  },
  knowsAbout: [
    "AI Engineering",
    "Multi-agent Systems",
    "LLM Orchestration",
    "RAG Systems",
    "Blockchain",
    "TypeScript",
    "Next.js",
    "React",
  ],
};

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="max-w-[740px] mx-auto px-6">
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <AwardsSection />
        <ServicesSection />
        <Footer />
      </main>
    </div>
  );
}
