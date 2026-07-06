// Videography Page
import { Film, Play } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import Hero from "@/components/sections/Hero";
import SectionWrapper from "@/components/sections/SectionWrapper";
import FeatureGrid from "@/components/ui/FeatureGrid";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

export const metadata = {
  title: "Videography — Javid Verse",
  description: "Video editing and production support for ministries, podcasts, sermons, and campaigns.",
};

// Video editing and production services.
const services = [
  "Podcast video editing",
  "Short-form social media videos",
  "Promotional videos",
  "Interview editing",
  "Ministry campaign videos",
  "Motion graphics",
  "Livestream support",
  "YouTube content editing",
] as const;

// Relevant production experience.
const experience = [
  { title: "InVerse Philippines", href: "https://jamesmdavid.vercel.app/" },
  { title: "GluTeen Podcast", href: "https://jamesmdavid.vercel.app/" },
  { title: "Church livestream productions" },
  { title: "Personal YouTube projects" },
];

// Video samples awaiting final thumbnails or embeds.
const videoSamples = ["Ministry Story", "Podcast Edit", "Social Media Reel"];

export default function VideoPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero title="Videography" subtitle="Media support for ministries, podcasts, sermons, interviews, social media, and promotional projects." />

      {/* Services Section */}
      <SectionWrapper title="Purposeful stories in motion" subtitle="From the first cut to final delivery, every edit is shaped around the message.">
        <FeatureGrid items={services} icon={Film} />
      </SectionWrapper>

      {/* Experience Section */}
      <SectionWrapper title="Experience & projects" subtitle="Ministry, podcast, livestream, and personal media experience." className="bg-primary" titleClass="text-white" subtitleClass="text-white/70">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {experience.map((item) => (
            <article key={item.title} className="h-full rounded-2xl border border-white/15 bg-white/10 p-6 text-light">
              <h3 className="font-bold">{item.title}</h3>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-accent transition hover:text-light">
                  View experience <span aria-hidden="true">→</span>
                </a>
              ) : null}
            </article>
          ))}
        </div>

        {/* Verified YouTube channels */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a href="https://www.youtube.com/@javid07./videos" target="_blank" rel="noopener noreferrer" className="btn-primary">Personal YouTube</a>
          <a href="https://www.youtube.com/@jaytravels4113" target="_blank" rel="noopener noreferrer" className="btn-outline-light">Jay Travels</a>
        </div>
      </SectionWrapper>

      {/* Video Placeholder Section */}
      <SectionWrapper title="Video sample placeholders" subtitle="These cards are ready for final reels, project thumbnails, or video embeds.">
        <div className="grid gap-7 md:grid-cols-3">
          {videoSamples.map((title) => (
            <article key={title} className="h-full rounded-[2rem] border border-primary/15 bg-white p-5 shadow-premium">
              {/* Replace with a real thumbnail or embed when approved. */}
              <MediaPlaceholder label="Video thumbnail placeholder" icon={<Play className="h-12 w-12" />} />
              <h3 className="mt-5 text-lg font-bold text-primary">{title}</h3>
            </article>
          ))}
        </div>
      </SectionWrapper>

      {/* Contact CTA */}
      <CTASection title="Have a story that needs to move?" description="Let’s create video content that serves your audience and strengthens your message." href="/contact" action="Start a Video Project" />
    </>
  );
}
