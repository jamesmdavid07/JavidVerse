import { Film, Play } from "lucide-react";
import Hero from "@/components/Hero";
import SectionWrapper from "@/components/SectionWrapper";
import CTASection from "@/components/CTASection";

const services = ["Podcast video editing", "Short-form social media videos", "Promotional videos", "Interview editing", "Ministry campaign videos", "Motion graphics", "Livestream support", "YouTube content editing"];
const experience = ["InVerse Philippines", "GluTeen Podcast", "Church livestream productions", "Personal YouTube projects"];
export const metadata = { title: "Videography — Javid Verse", description: "Video editing and production support for ministries, podcasts, sermons, and campaigns." };
export default function VideoPage() { return <>
  <Hero title="Videography" subtitle="Media support for ministries, podcasts, sermons, interviews, social media, and promotional projects." />
  <SectionWrapper title="Purposeful stories in motion" subtitle="From the first cut to final delivery, every edit is shaped around the message.">
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{services.map(s => <div key={s} className="rounded-2xl border border-primary/15 bg-white p-6 shadow-sm"><Film className="h-6 w-6 text-accent"/><p className="mt-4 font-semibold text-primary">{s}</p></div>)}</div>
  </SectionWrapper>
  <SectionWrapper title="Experience & projects" subtitle="Ministry, podcast, livestream, and personal media experience." className="bg-primary" titleClass="text-white" subtitleClass="text-white/70">
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{experience.map(x => <div key={x} className="rounded-2xl border border-white/15 bg-white/10 p-6 text-light"><p className="font-bold">{x}</p>{(x === "InVerse Philippines" || x === "GluTeen Podcast") && <a href="https://jamesmdavid.vercel.app/" target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-accent">View experience →</a>}</div>)}</div>
    <div className="mt-8 flex flex-wrap gap-4"><a href="https://www.youtube.com/@javid07./videos" target="_blank" rel="noreferrer" className="btn-primary">Personal YouTube</a><a href="https://www.youtube.com/@jaytravels4113" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-primary">Jay Travels</a></div>
  </SectionWrapper>
  <SectionWrapper title="Video sample placeholders" subtitle="Replace these cards with embedded reels or project thumbnails when ready.">
    <div className="grid gap-7 md:grid-cols-3">{["Ministry Story", "Podcast Edit", "Social Media Reel"].map(x => <article key={x} className="rounded-[2rem] border border-primary/15 bg-white p-5 shadow-premium">{/* TODO: Replace with a real video thumbnail or embed. */}<div className="flex aspect-video items-center justify-center rounded-2xl bg-primary"><Play className="h-12 w-12 text-accent"/></div><h3 className="mt-5 text-lg font-bold text-primary">{x} Placeholder</h3></article>)}</div>
  </SectionWrapper>
  <CTASection title="Have a story that needs to move?" description="Let’s create video content that serves your audience and strengthens your message." href="/contact" action="Start a Video Project" />
  </> }
