// Graphic Design Page
import Image from "next/image";
import { BriefcaseBusiness, CalendarDays, Palette, PanelsTopLeft } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import Hero from "@/components/sections/Hero";
import SectionWrapper from "@/components/sections/SectionWrapper";

export const metadata = {
  title: "Graphic Design — Javid Verse",
  description: "Clear, consistent visual identities and graphic design for ministries and organizations.",
};

// Graphic design and visual-brand services.
const services = [
  { title: "Logo Design", icon: Palette },
  { title: "Flyers and Posters", icon: PanelsTopLeft },
  { title: "Event Designs", icon: CalendarDays },
  { title: "Brand Management", icon: BriefcaseBusiness },
] as const;

// Approved logo samples from the public graphic assets folder.
const logoSamples = [
  { title: "Royal Christian Academy", image: "/graphic/logo-1.webp", alt: "Royal Christian Academy logo design" },
  { title: "JavidVerse", image: "/graphic/logo-2.webp", alt: "JavidVerse logo design" },
  { title: "Aligned4LifeProject", image: "/graphic/logo-3.webp", alt: "Aligned4LifeProject logo design" },
  { title: "H.E.A.L Lifestyle Academy", image: "/graphic/logo-4.webp", alt: "H.E.A.L Lifestyle Academy logo design" },
] as const;

// Approved event-flyer samples from the public graphic assets folder.
const eventFlyerSamples = [
  { title: "What Is Eternity in Mind?", image: "/graphic/flyer 1.webp", alt: "What Is Eternity in Mind event flyer" },
  { title: "Featured Titles", image: "/graphic/flyer 2.webp", alt: "Aligned4LifeProject featured titles flyer" },
  { title: "Witnessing in the Old Testament", image: "/graphic/flyer 3.webp", alt: "Witnessing in the Old Testament event flyer" },
] as const;

export default function GraphicPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero eyebrow="Design With Purpose" title="Graphic Design" subtitle="We design visual identities for ministries, churches, organizations, and individuals, ranging from logos, flyers, social media posters, and event materials." />

      {/* Services Section */}
      <SectionWrapper title="Visuals That Communicate With Purpose" subtitle="Thoughtful designs created around your message, audience, and mission, helping your brand or event look clear, professional, and memorable.">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
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

      {/* Portfolio Placeholder Section */}
      <SectionWrapper
        title="Design Samples"
        subtitle="Clean sample spaces prepared for approved logo and event-flyer work."
        className="bg-primary"
        titleClass="text-white"
        subtitleClass="text-white/75"
      >
        <div>
          <h3 className="text-2xl font-bold text-white">Logo Samples</h3>
          <div className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {logoSamples.map((sample) => (
              <article key={sample.title} className="overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-premium">
                <div className="relative aspect-square bg-white">
                  <Image
                    src={sample.image}
                    alt={sample.alt}
                    fill
                    className="object-contain object-center p-4 sm:p-5"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <h4 className="border-t border-primary/10 px-5 py-4 text-center text-sm font-semibold text-primary">{sample.title}</h4>
              </article>
            ))}
          </div>

          <h3 className="mt-12 text-2xl font-bold text-white">Event Flyer Samples</h3>
          <div className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {eventFlyerSamples.map((sample) => (
              <article key={sample.title} className="overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-premium">
                <div className="relative aspect-[3/4] bg-white">
                  <Image
                    src={sample.image}
                    alt={sample.alt}
                    fill
                    className="object-contain object-center"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <h4 className="border-t border-primary/10 px-5 py-4 text-center text-sm font-semibold text-primary">{sample.title}</h4>
              </article>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Contact CTA */}
      <CTASection title="Need a design that communicates clearly?" description="Let’s create visuals that represent your message with clarity, beauty, and purpose." href="/contact" action="Start a Design Project" theme="light" />
    </>
  );
}
