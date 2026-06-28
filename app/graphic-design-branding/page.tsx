import { Palette } from "lucide-react";
import Hero from "@/components/Hero";
import SectionWrapper from "@/components/SectionWrapper";
import CTASection from "@/components/CTASection";

const services = ["Logo design", "Brand identity", "Flyers and posters", "Social media graphics", "Event designs", "Church program graphics", "Presentation design", "Print materials", "Visual brand management"];
const projects = [
  ["Church Event Campaign", "A coordinated visual set for services, conferences, and ministry events."],
  ["Ministry Brand Identity", "A clear logo, color system, and visual direction for consistent communication."],
  ["Social Media Series", "Reusable, audience-friendly graphics for announcements and encouragement."],
  ["Author Launch Materials", "Promotional graphics that help authors introduce their work with confidence."]
];
export const metadata = { title: "Graphic Design & Branding — Javid Verse", description: "Clear, consistent visual identities and graphic design for ministries and organizations." };
export default function GraphicPage() { return <>
  <Hero title="Graphic Design & Branding" subtitle="Clear and consistent visual identities for ministries, churches, organizations, and individuals." />
  <SectionWrapper title="Design that communicates clearly" subtitle="Thoughtful visuals built around your message, audience, and mission.">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map(s => <div key={s} className="flex items-center gap-4 rounded-2xl border border-primary/15 bg-white p-5 shadow-sm"><span className="rounded-xl bg-accent/15 p-3 text-primary"><Palette className="h-5 w-5"/></span><span className="font-semibold text-primary">{s}</span></div>)}</div>
  </SectionWrapper>
  <SectionWrapper title="Portfolio placeholders" subtitle="Real work samples will be added here as the portfolio is prepared." className="bg-slate-50">
    <div className="grid gap-7 sm:grid-cols-2">{projects.map(([title, description]) => <article key={title} className="overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium">
      {/* TODO: Replace this placeholder with a real project image. */}
      <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-primary to-blue-800 p-8 text-center text-light"><div><span className="text-xs font-bold uppercase tracking-widest text-accent">Graphic Sample Placeholder</span><h3 className="mt-3 text-2xl font-bold">{title}</h3></div></div>
      <p className="p-7 text-sm leading-7 text-primary/70">{description}</p>
    </article>)}</div>
  </SectionWrapper>
  <CTASection title="Need a design that communicates clearly?" description="Let’s create visuals that carry your message with clarity and purpose." href="/contact" action="Start a Design Project" />
  </> }
