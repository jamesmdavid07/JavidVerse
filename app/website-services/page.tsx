// Website Services Page
import {
  Blocks,
  Building2,
  CloudCog,
  Code2,
  ExternalLink,
  Gauge,
  LifeBuoy,
  Megaphone,
  MousePointerClick,
  PanelsTopLeft,
  School,
  ServerCog,
  UserRound,
  Workflow,
} from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import Hero from "@/components/sections/Hero";
import SectionWrapper from "@/components/sections/SectionWrapper";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

export const metadata = {
  title: "Website Services — JavidVerse",
  description: "Professional website creation, digital marketing integration, hosting, deployment, and ongoing technical support from JavidVerse.",
};

// Website types offered by JavidVerse.
const websiteTypes = [
  {
    title: "School & Organization Websites",
    description: "Structured, accessible websites that clearly present programs, services, leadership, and important information.",
    icon: School,
  },
  {
    title: "Business & Ministry Websites",
    description: "Professional digital spaces designed to build trust, communicate a mission, and support meaningful growth.",
    icon: Building2,
  },
  {
    title: "Personal Portfolio Websites",
    description: "Focused personal websites for authors, speakers, creatives, professionals, and growing personal brands.",
    icon: UserRound,
  },
  {
    title: "All Types of Landing Pages",
    description: "Clear, conversion-focused pages for campaigns, events, lead generation, products, and special initiatives.",
    icon: PanelsTopLeft,
  },
];

// Website delivery options and verified portfolio links.
const websiteOptions = [
  {
    label: "Option A",
    title: "Drag-and-Drop Websites",
    description: "Simple, fast, and affordable websites built using platforms such as GetResponse, WordPress builders, and other no-code solutions. These websites are ideal for clients who need a professional online presence without extensive custom development.",
    bestFor: ["Ministries", "Authors", "Small Businesses", "Campaigns", "Landing Pages", "Organizations"],
    icon: MousePointerClick,
    projects: [
      {
        title: "Lifetime Lifestyle",
        description: "A professional online home for a lifestyle-focused brand.",
        href: "https://lifetimelifestyle.org/",
      },
      {
        title: "Aligned4LifeProject",
        description: "A focused digital presence supporting a ministry initiative and its audience.",
        href: "https://aligned4lifeproject.gr-site.com/",
      },
    ],
  },
  {
    label: "Option B",
    title: "Custom-Coded Websites",
    description: "Fully customized websites built with modern front-end technologies for greater flexibility, performance, scalability, and distinctive user experiences. Designed for clients who require advanced functionality and complete design freedom.",
    bestFor: ["Schools", "Organizations", "Growing Brands", "Businesses", "Advanced Landing Pages", "Custom Web Applications"],
    icon: Code2,
    projects: [
      {
        title: "Larry Bachman",
        description: "A professional author and speaker website with a clear, audience-focused structure.",
        href: "https://larrybachman.org/",
      },
      {
        title: "Grace Senior Living Cottage",
        description: "A welcoming website presenting senior-living services and essential information.",
        href: "https://greencottage-five.vercel.app/",
      },
    ],
  },
];

// Technical capability groups.
const capabilities = [
  {
    title: "Website Development",
    description: "Build responsive, modern websites using current front-end technologies.",
    technologies: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Vite"],
    icon: Code2,
  },
  {
    title: "WordPress & No-Code Platforms",
    description: "Create professional websites that clients can manage with confidence.",
    technologies: ["WordPress", "GetResponse Website Builder", "Landing Pages", "CMS Configuration"],
    icon: Blocks,
  },
  {
    title: "Digital Marketing Integration",
    description: "Connect websites with tools that generate leads and automate communication.",
    technologies: ["GetResponse", "HubSpot", "Email Signup Forms", "Lead Capture", "Contact Forms", "Marketing Automation"],
    icon: Megaphone,
  },
  {
    title: "Hosting & Deployment",
    description: "Deploy websites professionally so they remain accessible, secure, and reliable.",
    technologies: ["Vercel", "Hostinger", "GoDaddy", "Domain Connection", "DNS Configuration", "SSL Setup"],
    icon: CloudCog,
  },
  {
    title: "Website Optimization",
    description: "Improve performance, responsiveness, accessibility, and search visibility.",
    technologies: ["Mobile Optimization", "Performance Optimization", "Basic SEO", "Accessibility", "Cross-Browser Compatibility"],
    icon: Gauge,
  },
  {
    title: "Maintenance & Support",
    description: "Provide dependable assistance after a website has launched.",
    technologies: ["Website Updates", "Content Changes", "Bug Fixes", "Security Checks", "Backup Guidance", "Technical Support"],
    icon: LifeBuoy,
  },
];

// Additional website support services.
const supportServices = [
  {
    title: "Digital Marketing & Automation",
    description: "JavidVerse helps clients connect websites with marketing platforms and lead-generation systems that support communication, follow-up, and audience growth.",
    items: ["GetResponse Landing Pages", "Email Marketing", "HubSpot CRM Support", "Email Signup Forms", "Contact Forms", "Lead Capture Systems", "Marketing Automation"],
    icon: Workflow,
  },
  {
    title: "Hosting, Domain & Deployment Support",
    description: "We help clients connect domains, configure hosting, install WordPress, deploy websites to Vercel, configure DNS settings, and launch every website securely and professionally.",
    items: ["Domain Connection", "Hosting Setup", "WordPress Installation", "Vercel Deployment", "DNS Configuration", "SSL Support", "Website Launch Assistance"],
    icon: ServerCog,
  },
];

export default function WebsiteServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Website Services"
        subtitle="We build websites that help your mission, brand, or business look professional, communicate clearly, and reach the right people online."
        action="Start a Website Project"
        actionHref="/contact"
      />

      {/* What We Build Section */}
      <SectionWrapper
        title="What We Build"
        subtitle="Clean, responsive, purpose-driven websites for ministries, schools, authors, small businesses, organizations, and personal brands."
      >
        <p className="mb-10 max-w-4xl text-lg leading-8 text-primary/75">Every website is designed to communicate clearly, build trust, and help clients establish a professional online presence.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {websiteTypes.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="group h-full rounded-[2rem] border border-primary/15 bg-white p-7 shadow-premium transition duration-300 hover:-translate-y-1 hover:border-accent/60">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-accent transition group-hover:bg-accent group-hover:text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-primary">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-primary/70">{service.description}</p>
              </article>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Website Options Section */}
      <SectionWrapper title="Website Options" subtitle="Choose the website approach that best fits your goals, timeline, budget, and technical needs." className="bg-slate-50">
        <div className="grid gap-8 lg:grid-cols-2">
          {websiteOptions.map((option) => {
            const Icon = option.icon;
            return (
              <article key={option.title} className="flex h-full flex-col rounded-[2rem] border border-primary/15 bg-white p-6 shadow-premium sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-accent">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{option.label}</p>
                    <h3 className="mt-2 text-2xl font-bold text-primary">{option.title}</h3>
                  </div>
                </div>
                <p className="mt-6 leading-8 text-primary/70">{option.description}</p>

                <div className="mt-7">
                  <p className="text-sm font-bold uppercase tracking-widest text-primary">Best For</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {option.bestFor.map((item) => (
                      <li key={item} className="rounded-full bg-accent/15 px-3 py-1.5 text-xs font-semibold text-primary">{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Portfolio project cards */}
                <div className="mt-8 grid flex-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {option.projects.map((project) => (
                    <article key={project.title} className="flex h-full flex-col rounded-2xl border border-primary/10 bg-slate-50 p-4">
                      <MediaPlaceholder label="Website image placeholder" />
                      <h4 className="mt-5 text-lg font-bold text-primary">{project.title}</h4>
                      <p className="mt-3 flex-1 text-sm leading-6 text-primary/70">{project.description}</p>
                      <a href={project.href} target="_blank" rel="noreferrer" className="btn-secondary mt-5 w-full px-4 text-sm">
                        Visit Website <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">Opens in a new tab</span>
                      </a>
                    </article>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Technical Expertise Section */}
      <SectionWrapper title="Technical Expertise" subtitle="Professional capabilities organized around every stage of website creation, launch, and support.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <article key={capability.title} className="group h-full rounded-[2rem] border border-primary/15 bg-white p-7 shadow-premium transition duration-300 hover:-translate-y-1 hover:border-accent/60">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-accent">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-primary">{capability.title}</h3>
                <p className="mt-3 text-sm leading-7 text-primary/70">{capability.description}</p>
                <ul className="mt-5 space-y-2 border-t border-primary/10 pt-5">
                  {capability.technologies.map((technology) => (
                    <li key={technology} className="flex items-center gap-3 text-sm font-medium text-primary/75">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                      {technology}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Additional Services Section */}
      <SectionWrapper title="Other Website Services" subtitle="Practical support that connects your website with the tools and infrastructure it needs." className="bg-slate-50">
        <div className="grid gap-7 md:grid-cols-2">
          {supportServices.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="h-full rounded-[2rem] border border-primary/15 bg-white p-7 shadow-premium sm:p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-accent">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-primary">{service.title}</h3>
                <p className="mt-4 leading-8 text-primary/70">{service.description}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.items.map((item) => (
                    <li key={item} className="rounded-xl bg-primary/5 px-4 py-3 text-sm font-semibold text-primary">{item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Final CTA Section */}
      <CTASection
        title="Ready to build your website?"
        description="Whether you need a simple landing page, a WordPress website, or a fully custom-coded solution, JavidVerse can help you create a professional online presence that reflects your mission, brand, or business."
        href="/contact"
        action="Start a Website Project"
      />
    </>
  );
}
