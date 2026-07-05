// Website Services Page
import { ExternalLink } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import Hero from "@/components/sections/Hero";
import SectionWrapper from "@/components/sections/SectionWrapper";
import FeatureGrid from "@/components/ui/FeatureGrid";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

export const metadata = {
  title: "Website Services — Javid Verse",
  description: "Modern, responsive, purpose-driven websites for ministries, individuals, and organizations.",
};

// Website and digital-presence services.
const services = [
  "Personal portfolio websites",
  "Ministry websites",
  "Landing pages",
  "Business websites",
  "Author websites",
  "School and organization websites",
  "Front-end development",
  "Website redesign",
  "Website content structure",
  "Digital presence setup",
] as const;

// Live website projects with verified links.
const projects = [
  { title: "James M. David Personal Website", href: "https://jamesmdavid.vercel.app/", text: "A personal portfolio combining theology, technology, and media ministry." },
  { title: "JavidVerse", href: "https://javid-verse.vercel.app/", text: "The creative studio website and its digital brand identity." },
  { title: "Aligned4LifeProject", href: "https://aligned4lifeproject.gr-site.com/", text: "A ministry website supported through branding and digital-presence work." },
];

// Broader creative and digital portfolio.
const creativePortfolio = [
  { title: "Aligned4LifeProject", role: "Brand management · Website management · Digital marketing", text: "Supporting a ministry-focused initiative through a coordinated brand and digital presence." },
  { title: "Lifetime Lifestyle", role: "Website development · Brand organization", text: "Creating a structured digital home and helping organize the visual presentation of the brand." },
  { title: "Larry Bachman", role: "WordPress development · Hostinger", text: "Website development and hosting setup for a professional personal brand." },
  { title: "Green Cottage", role: "Website development · Design", text: "A clean, accessible website experience shaped around the organization’s needs." },
  { title: "JavidVerse", role: "Creative direction · Development", text: "A creative studio and digital identity connecting design, media, books, and web services." },
];

export default function WebPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero title="Website Services" subtitle="Modern, responsive, and purpose-driven websites built to help good work reach more people." />

      {/* Services Section */}
      <SectionWrapper title="A clear home for your mission online" subtitle="Websites for ministries, individuals, organizations, schools, authors, and small businesses.">
        <p className="mb-10 max-w-4xl text-lg leading-8 text-primary/75">James M. David is a front-end developer with experience in HTML, CSS, Tailwind CSS, React, Next.js, WordPress, Hostinger, GoDaddy, GetResponse, and Vercel deployments.</p>
        <FeatureGrid items={services} columns="three" />
      </SectionWrapper>

      {/* Live Projects Section */}
      <SectionWrapper title="Selected website projects" subtitle="A growing portfolio of purpose-driven digital spaces." className="bg-slate-50">
        <div className="grid gap-7 md:grid-cols-3">
          {projects.map((project) => (
            <a key={project.title} href={project.href} target="_blank" rel="noreferrer" className="group flex h-full flex-col rounded-[2rem] border border-primary/15 bg-white p-6 shadow-premium transition hover:-translate-y-1 sm:p-8">
              {/* Replace with a verified website screenshot when available. */}
              <MediaPlaceholder label="Website screenshot placeholder" />
              <div className="mt-6 flex items-start justify-between gap-3">
                <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                <ExternalLink className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              </div>
              <p className="mt-3 flex-1 text-sm leading-7 text-primary/70">{project.text}</p>
              <span className="sr-only">Opens in a new tab</span>
            </a>
          ))}
        </div>
      </SectionWrapper>

      {/* Creative Portfolio Section */}
      <SectionWrapper title="Creative & digital portfolio" subtitle="Website, brand, and digital projects developed for ministries, professionals, organizations, and businesses.">
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {creativePortfolio.map((project) => (
            <article key={project.title} className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-premium">
              {/* Upload the matching project image here when approved. */}
              <MediaPlaceholder label="Portfolio image placeholder" title={project.title} className="aspect-[16/10] rounded-none" />
              <div className="flex-1 p-7">
                <p className="text-xs font-bold uppercase tracking-wider text-accent">{project.role}</p>
                <p className="mt-4 text-sm leading-7 text-primary/70">{project.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 rounded-2xl border border-accent/40 bg-accent/10 p-5 text-sm leading-7 text-primary">More website screenshots, brand work, and digital projects will be added as the full portfolio is uploaded.</p>
      </SectionWrapper>

      {/* Contact CTA */}
      <CTASection title="Ready to build your online presence?" description="Let’s create a thoughtful website that makes your message easy to understand and act on." href="/contact" action="Start a Website Project" />
    </>
  );
}
