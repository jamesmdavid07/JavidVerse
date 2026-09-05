// Graphic Design Page
import Image from "next/image";
import { BriefcaseBusiness, CalendarDays, Palette, PanelsTopLeft } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import Hero from "@/components/sections/Hero";
import SectionWrapper from "@/components/sections/SectionWrapper";
import PhotoFrameClient from "@/components/onevoice27/PhotoFrameClient";
import OneVoiceShare from "@/components/onevoice27/OneVoiceShare";

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
      <SectionWrapper
        title="Visuals That Communicate"
        subtitle="Thoughtful designs created around your message, audience, and mission, helping your brand or event look clear, professional, and memorable."
        headerClassName="mb-8 max-w-2xl"
      >
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

      {/* OneVoice27 Photo Frame Generator — left copy / right template */}
      <section className="relative overflow-hidden px-6 py-12 sm:px-8 sm:py-14 lg:px-12 bg-gradient-to-br from-violet-50 via-indigo-50/60 to-blue-50">
        {/* subtle OneVoice palette wash — does not affect template container */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-violet-200/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-24 h-[28rem] w-[28rem] rounded-full bg-blue-200/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-100/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.03fr_0.97fr] lg:items-start lg:gap-6">
          {/* Left — desktop flex column (tight Share→card), mobile contents for correct order */}
          <div className="contents lg:flex lg:flex-col lg:gap-4">
            {/* Header + tip + share — order 1 mobile, top of left column desktop */}
            <div className="order-1">
              <h2 className="max-w-xl text-[1.9rem] font-bold leading-[1.05] tracking-tight text-primary sm:text-4xl lg:text-[2.5rem]">Create Your OneVoice27 Photo</h2>
              <p className="mt-3 max-w-xl text-[1.02rem] leading-7 text-primary/70 sm:text-[1.06rem]">
                Upload your photo and automatically place yourself inside the OneVoice27 frame.
              </p>
              <p className="mt-3 max-w-xl rounded-xl border border-primary/10 bg-white/70 px-3.5 py-2 text-[0.9rem] leading-6 text-primary/70 backdrop-blur">
                <span className="font-bold text-primary">Tip:</span> Use a clear front-facing selfie. Drag and pinch to adjust, then download and share.
              </p>
              <OneVoiceShare />
            </div>
            {/* Movement card — order 3 mobile (below template), directly under Share on desktop */}
            <div className="order-3">
              <div className="max-w-xl rounded-2xl border border-primary/10 bg-white/80 p-4 shadow-sm backdrop-blur">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary/50">One global movement</p>
                <h3 className="mt-1.5 text-lg font-bold tracking-tight text-primary sm:text-xl lg:text-[1.35rem]">Together, one voice</h3>
                <p className="mt-2 text-[0.92rem] leading-6 text-primary/70">
                  Across nations, cultures, and communities, people are uniting around one message—one person and one group at a time.
                </p>
                <a
                  href="https://onevoice27.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-[0.85rem] font-semibold text-white shadow-sm transition hover:bg-primary/90"
                >
                  Visit onevoice27.org
                  <span aria-hidden="true">→</span>
                </a>
                <p className="mt-3 border-t border-primary/10 pt-3 text-[0.75rem] leading-5 text-primary/55">
                  <span className="font-bold text-primary/70">Disclaimer:</span> This is an independent personal project created to enhance the visibility and reach of OneVoice27. It is not funded,
                  sponsored, or officially operated by the Mission.
                </p>
              </div>
            </div>
          </div>
          {/* Right — template — order 2 mobile (between header and card) */}
          <div className="order-2 lg:order-none">
            <PhotoFrameClient frameSrc="/graphic/frame-one(1).png" />
          </div>
        </div>
      </section>

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
