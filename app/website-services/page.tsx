// Website Services Page
import Image from "next/image";
import { Building2, CloudCog, Code2, ExternalLink, LifeBuoy, Megaphone, MousePointerClick, PanelsTopLeft, School, UserRound, Workflow } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import Hero from "@/components/sections/Hero";
import SectionWrapper from "@/components/sections/SectionWrapper";

export const metadata = {
  title: "Website Services — JavidVerse",
  description: "Professional website creation, digital marketing integration, hosting, deployment, and ongoing technical support from JavidVerse.",
};

// Website types offered by JavidVerse.
const websiteTypes = [
  {
    title: "School & Organization Websites",
    icon: School,
  },
  {
    title: "Business & Ministry Websites",
    icon: Building2,
  },
  {
    title: "Personal Portfolio Websites",
    icon: UserRound,
  },
  {
    title: "All Types of Landing Pages",
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
        image: "/website/lifetime-website.webp",
        alt: "Homepage preview of the Lifetime Lifestyle website",
      },
      {
        title: "Aligned4LifeProject",
        description: "A focused digital presence supporting a ministry initiative and its audience.",
        href: "https://aligned4lifeproject.gr-site.com/",
        image: "/website/aligned-4-life.webp",
        alt: "Homepage preview of the Aligned4LifeProject website",
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
        image: "/website/larry-bachman.webp",
        alt: "Homepage preview of the Larry Bachman website",
      },
      {
        title: "Royal Christian Academy",
        category: "School Website",
        description: "A modern, responsive website designed for school, academic programs, admissions process, faculty, and Christ-centered educational mission.",
        image: "/website/royal-christian-academy.webp",
        alt: "Homepage preview of the Royal Christian Academy website",
      },
    ],
  },
];

// Client-focused digital and technical support services.
const clientServices = [
  {
    title: "Digital Marketing Integration",
    description: "Connect websites with tools that help collect leads, grow email lists, and manage client communication.",
    items: ["GetResponse", "HubSpot", "Email Signup Forms", "Contact Forms", "Lead Capture Systems"],
    icon: Workflow,
  },
  {
    title: "Hosting & Deployment",
    description: "Help clients launch their websites properly with hosting, domain setup, and deployment support.",
    items: ["Web Hosting", "WordPress Hosting", "Domain Connection", "DNS Setup", "SSL Support"],
    icon: CloudCog,
  },
  {
    title: "Digital Marketing",
    description: "Support clients with simple marketing systems that help their website reach and serve the right audience.",
    items: ["Landing Pages", "Email Marketing", "Campaign Pages", "Newsletter Setup", "Basic Marketing Funnels"],
    icon: Megaphone,
  },
  {
    title: "Maintenance & Support",
    description: "Provide continued technical help after launch so the website stays updated and functional.",
    items: ["Website Updates", "Content Changes", "Bug Fixes", "Technical Support", "Basic Security Checks"],
    icon: LifeBuoy,
  },
];

export default function WebsiteServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        eyebrow="Build Your Website"
        title="Website Services"
        subtitle="We build websites that help your mission, brand, or business look professional, communicate clearly, and reach the right people online."
      />

      {/* What We Build Section */}
      <SectionWrapper title="What We Build" subtitle="Professional website solutions shaped around your goals, audience, and mission.">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {websiteTypes.map((service) => {
            const Icon = service.icon;
            return (
              <li key={service.title} className="group flex h-full items-center gap-4 rounded-2xl border border-primary/15 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/60">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-accent transition duration-300 group-hover:bg-accent group-hover:text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="font-semibold leading-6 text-primary">{service.title}</span>
              </li>
            );
          })}
        </ul>
      </SectionWrapper>

      {/* Website Options Section */}
      <SectionWrapper
        title="Website Options"
        subtitle="Choose the website approach that best fits your goals, timeline, budget, and technical needs."
        className="bg-primary"
        titleClass="text-white"
        subtitleClass="text-white/75"
      >
        <div className="grid gap-10">
          {websiteOptions.map((option) => {
            const Icon = option.icon;
            return (
              <article key={option.title} className="overflow-hidden rounded-[2rem] border border-primary/15 bg-white p-6 shadow-premium sm:p-8 lg:p-10">
                <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-accent">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-accent">{option.label}</p>
                  <h3 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">{option.title}</h3>
                  <p className="mt-4 max-w-3xl leading-8 text-primary/70">{option.description}</p>

                  <div className="mt-7">
                    <p className="text-sm font-bold uppercase tracking-widest text-primary">Best For</p>
                    <ul className="mt-4 flex flex-wrap justify-center gap-2">
                    {option.bestFor.map((item) => (
                      <li key={item} className="rounded-full bg-accent/15 px-3 py-1.5 text-xs font-semibold text-primary">{item}</li>
                    ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 border-t border-primary/10 pt-8">
                  <p className="mb-5 text-sm font-bold uppercase tracking-widest text-primary">Portfolio Examples</p>

                  {/* Portfolio project cards */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    {option.projects.map((project) => (
                      <article key={project.title} className="flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
                        <div className="relative aspect-[16/10] overflow-hidden bg-primary">
                          <Image
                            src={project.image}
                            alt={project.alt}
                            fill
                            className="object-cover object-center transition duration-500 hover:scale-105"
                            sizes="(min-width: 640px) 50vw, 100vw"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <h4 className="text-lg font-bold text-primary">{project.title}</h4>
                          {"category" in project ? <p className="mt-2 text-xs font-bold uppercase tracking-wider text-accent">{project.category}</p> : null}
                          <p className="mt-3 flex-1 text-sm leading-6 text-primary/70">{project.description}</p>
                          {"href" in project ? (
                            <a href={project.href} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-5 w-full px-4 text-sm">
                              Visit Website <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                              <span className="sr-only">Opens in a new tab</span>
                            </a>
                          ) : (
                            <p className="mt-5 rounded-full bg-primary/5 px-4 py-3 text-center text-sm font-semibold text-primary/70">Preview available</p>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Client Services Section */}
      <SectionWrapper title="Website Growth & Support" subtitle="Focused services that help clients launch, connect, promote, and maintain a professional website.">
        <div className="grid gap-7 md:grid-cols-2">
          {clientServices.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="group h-full rounded-[2rem] border border-primary/15 bg-white p-7 shadow-premium transition duration-300 hover:-translate-y-1 hover:border-accent/60 sm:p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-accent transition group-hover:bg-accent group-hover:text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-primary">{service.title}</h3>
                <p className="mt-4 leading-8 text-primary/70">{service.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2 border-t border-primary/10 pt-6">
                  {service.items.map((item) => (
                    <li key={item} className="rounded-full bg-primary/5 px-3 py-2 text-xs font-semibold text-primary">{item}</li>
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
