// Graphic Design Page
import { Palette } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import Hero from "@/components/sections/Hero";
import SectionWrapper from "@/components/sections/SectionWrapper";
import FeatureGrid from "@/components/ui/FeatureGrid";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

export const metadata = {
  title: "Graphic Design — Javid Verse",
  description: "Clear, consistent visual identities and graphic design for ministries and organizations.",
};

// Graphic design and visual-brand services.
const services = [
  "Logo design",
  "Brand identity",
  "Flyers and posters",
  "Social media graphics",
  "Event designs",
  "Church program graphics",
  "Presentation design",
  "Print materials",
  "Visual brand management",
] as const;

// Portfolio categories awaiting final client-approved artwork.
const projects = [
  { title: "Church Event Campaign", description: "A coordinated visual set for services, conferences, and ministry events." },
  { title: "Ministry Brand Identity", description: "A clear logo, color system, and visual direction for consistent communication." },
  { title: "Social Media Series", description: "Reusable, audience-friendly graphics for announcements and encouragement." },
  { title: "Author Launch Materials", description: "Promotional graphics that help authors introduce their work with confidence." },
];

export default function GraphicPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero title="Graphic Design" subtitle="Clear and consistent visual identities for ministries, churches, organizations, and individuals." />

      {/* Services Section */}
      <SectionWrapper title="Design that communicates clearly" subtitle="Thoughtful visuals built around your message, audience, and mission.">
        <FeatureGrid items={services} icon={Palette} columns="three" />
      </SectionWrapper>

      {/* Portfolio Placeholder Section */}
      <SectionWrapper
        title="Portfolio placeholders"
        subtitle="Real work samples will be added here as the portfolio is prepared."
        className="bg-primary"
        titleClass="text-white"
        subtitleClass="text-white/75"
      >
        <div className="grid gap-7 sm:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium">
              {/* Replace with the matching approved project image when available. */}
              <MediaPlaceholder label="Graphic sample placeholder" title={project.title} className="aspect-[16/9] rounded-none" />
              <p className="flex-1 p-7 text-sm leading-7 text-primary/70">{project.description}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      {/* Contact CTA */}
      <CTASection title="Need a design that communicates clearly?" description="Let’s create visuals that carry your message with clarity and purpose." href="/contact" action="Start a Design Project" theme="light" />
    </>
  );
}
