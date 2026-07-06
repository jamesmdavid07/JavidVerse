// Videography Page
import Image from "next/image";
import { Clapperboard, ExternalLink, Megaphone, Mic2, Podcast, Radio, Smartphone, Youtube } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import Hero from "@/components/sections/Hero";
import SectionWrapper from "@/components/sections/SectionWrapper";

export const metadata = {
  title: "Videography — Javid Verse",
  description: "Video editing and production support for ministries, podcasts, sermons, and campaigns.",
};

// Video editing and production services.
const services = [
  { title: "Podcast Video Editing", icon: Mic2 },
  { title: "Social Media Reels", icon: Smartphone },
  { title: "Promotional and Ad Videos", icon: Megaphone },
  { title: "Content Creation", icon: Clapperboard },
] as const;

// Ministry and media production experience.
const ministryExperience = [
  {
    title: "InVerse Philippines",
    description: "Video editing and production support for digital ministry content and faith-centered communication.",
    href: "https://www.youtube.com/@javid07.",
    action: "View Media Work",
    icon: Radio,
  },
  {
    title: "GluTeen Podcast",
    description: "Podcast video editing, visual production, and media preparation for youth-focused conversations.",
    href: "https://youtu.be/EsATdK_PQdg",
    action: "View Podcast Work",
    icon: Podcast,
  },
] as const;

// Embedded video projects with verified YouTube metadata.
const videoProjects = [
  {
    title: "My Testimony — A Story of God's Faithfulness",
    embedUrl: "https://www.youtube.com/embed/sqRe-DYy9ko",
  },
  {
    title: "GluTeen Video Intro | Realities of Life",
    embedUrl: "https://www.youtube.com/embed/EsATdK_PQdg",
  },
] as const;

// Personal YouTube channels.
const youtubeChannels = [
  { title: "Jay Travels", href: "https://www.youtube.com/@jaytravels4113" },
  { title: "JavidVerse", href: "https://www.youtube.com/@javid07." },
] as const;

export default function VideoPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero eyebrow="Bring Your Story to Life" title="Videography" subtitle="Media support for ministries, podcasts, sermons, interviews, social media, and promotional projects." />

      {/* Services Section */}
      <SectionWrapper title="Purposeful stories in motion" subtitle="From the first cut to final delivery, every edit is shaped around the message.">
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

      {/* Experience Section */}
      <SectionWrapper title="Experience & projects" subtitle="Ministry, podcast, livestream, and personal media experience." className="bg-primary" titleClass="text-white" subtitleClass="text-white/70">
        {/* MVC Media Ministry card reused from the About Us page. */}
        <article className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-premium md:grid-cols-[42%_58%]">
          <div className="relative min-h-64 overflow-hidden bg-primary sm:min-h-72 md:min-h-80">
            <Image
              src="/about/mvc-media-ministry.jpg"
              alt="James editing video content for MVC Media Ministry"
              fill
              className="object-cover object-center transition duration-700 hover:scale-105"
              sizes="(min-width: 768px) 420px, 100vw"
            />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-8">
            <h3 className="text-2xl font-bold text-primary">MVC Media Ministry</h3>
            <p className="mt-4 leading-8 text-primary/70">
              James serves with the Mountain View College Media Center, editing videos, producing content for InVerse Philippines and the GluTeen Podcast, and supporting church livestreams and other digital ministry initiatives.
            </p>
          </div>
        </article>

        {/* InVerse Philippines and GluTeen Podcast experience cards */}
        <div className="mx-auto mt-7 grid max-w-5xl gap-5 sm:grid-cols-2">
          {ministryExperience.map((experience) => {
            const Icon = experience.icon;
            return (
              <article key={experience.title} className="flex h-full flex-col rounded-2xl border border-white/15 bg-white p-6 text-primary shadow-premium">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h4 className="mt-5 text-xl font-bold">{experience.title}</h4>
                <p className="mt-3 flex-1 text-sm leading-7 text-primary/70">{experience.description}</p>
                <a href={experience.href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full px-5 text-sm">
                  {experience.action}
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Opens in a new tab</span>
                </a>
              </article>
            );
          })}
        </div>

        {/* Embedded YouTube projects */}
        <div className="mt-12">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Selected Work</p>
            <h3 className="mt-2 text-2xl font-bold text-light">Video Projects</h3>
          </div>
          <div className="grid gap-7 lg:grid-cols-2">
            {videoProjects.map((project) => (
              <article key={project.embedUrl} className="overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-premium">
                <div className="aspect-video bg-black">
                  <iframe
                    src={project.embedUrl}
                    title={project.title}
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold leading-7 text-primary">{project.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Personal YouTube Projects Section */}
      <SectionWrapper title="Personal YouTube Projects" subtitle="Explore personal travel, ministry, and creative video projects.">
        <div className="mx-auto grid max-w-2xl gap-5 sm:grid-cols-2">
          {youtubeChannels.map((channel) => (
            <article key={channel.href} className="group flex h-full flex-col rounded-2xl border border-primary/15 bg-white p-5 shadow-premium transition duration-300 hover:-translate-y-1 sm:p-6">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-accent">
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-primary">{channel.title}</h3>
              <a href={channel.href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 w-full">
                Visit
              </a>
            </article>
          ))}
        </div>
      </SectionWrapper>

      {/* Contact CTA */}
      <CTASection title="Have a story that needs to move?" description="Let’s create video content that serves your audience and strengthens your message." href="/contact" action="Start a Video Project" />
    </>
  );
}
