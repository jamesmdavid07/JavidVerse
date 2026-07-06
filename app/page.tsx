// Home Page
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Briefcase, Building2, Church, Clapperboard, Feather, Globe, Palette } from "lucide-react";
import Hero from "@/components/sections/Hero";
import SectionWrapper from "@/components/sections/SectionWrapper";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Javid Verse — Creative Solutions for Ministry & Mission",
  description: "Design, video, publishing preparation, branding, and web solutions for ministries, authors, organizations, and individuals.",
  keywords: ["ministry creative studio", "book design", "video production", "branding", "website development"],
};

// Primary services displayed on the homepage.
const services = [
  {
    title: "Book Services",
    description: "Professional formatting, cover design, print-ready preparation, and self-publishing support.",
    href: "/book-services",
    icon: BookOpen,
  },
  {
    title: "Website Services",
    description: "Purpose-driven website development and digital presence support.",
    href: "/website-services",
    icon: Globe,
  },
  {
    title: "Graphic Design",
    description: "Logo design, visual identity, digital graphics, and brand management.",
    href: "/graphic-design",
    icon: Palette,
  },
  {
    title: "Videography",
    description: "Podcast editing, social media reels, promotional videos, and content creation.",
    href: "/videography",
    icon: Clapperboard,
  },
] as const;

// Selected work already presented on the service pages.
const featuredWork = [
  {
    title: "Larry Bachman Website",
    category: "Website",
    image: "/website/larry-bachman.jpg",
    alt: "Larry Bachman website preview",
    href: "/website-services",
    action: "View Website Services",
    external: false,
    blue: false,
    imageClassName: "object-cover object-center",
  },
  {
    title: "Royal Christian Academy Logo",
    category: "Graphic Design",
    image: "/graphic/logo-1.png",
    alt: "Royal Christian Academy logo design",
    href: "/graphic-design",
    action: "View Graphic Design",
    external: false,
    blue: true,
    imageClassName: "object-cover object-center scale-110",
  },
  {
    title: "Aligned Advert Poster",
    category: "Graphic Design",
    image: "/graphic/Align365-Podcast.png",
    alt: "Align365 Podcast promotional poster",
    href: "/graphic-design",
    action: "View Graphic Design",
    external: false,
    blue: false,
    imageClassName: "object-cover object-center",
  },
] as const;

// Featured publication content reused from Book Services.
const featuredBook = {
  title: "In the Arms of Faith",
  author: "James M. David",
  description:
    "When faith becomes more than belief, it becomes a journey. From a humble village in Kenya to mission fields around the world, James David shares a powerful story of faith, purpose, and God's leading. Each chapter includes reflection questions, practical application, and prayer to help readers grow in their own spiritual journey.",
  image: "/books/in the arms-of-faith.jpg",
  alt: "Book cover for In the Arms of Faith by James M. David",
} as const;

// Embedded video projects reused from Videography.
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

// Primary audiences served by JavidVerse.
const audiences = [
  { title: "Authors", icon: Feather },
  { title: "Ministries", icon: Church },
  { title: "Organizations", icon: Building2 },
  { title: "Businesses", icon: Briefcase },
] as const;

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Introduction Section */}
      <SectionWrapper
        title="About JavidVerse"
        subtitle="Faith, technology, and creativity brought together in service of people and mission."
      >
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Founder image */}
          <div className="relative min-h-80 overflow-hidden rounded-[2rem] bg-primary shadow-premium sm:min-h-[26rem]">
            <Image
              src="/about/james.jpg"
              alt="James M. David, founder of JavidVerse"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary via-primary/80 to-transparent p-7 pt-24 text-light">
              <h3 className="text-2xl font-bold">James M. David</h3>
              <p className="mt-2 text-sm text-light/80">Founder of JavidVerse · Theology Student · Digital Missionary · Author</p>
            </div>
          </div>
          <div>
            <p className="text-lg leading-8 text-primary/75">JavidVerse is a creative platform founded by James M. David to bring faith, technology, and media together in meaningful service.</p>
            <p className="mt-5 text-lg leading-8 text-primary/75">As a theology student, digital missionary, educator, author, designer, and creative communicator, James uses JavidVerse to help ministries, authors, organizations, and individuals communicate with clarity, purpose, and excellence.</p>
            <Link href="/about-us" className="btn-primary mt-8">Meet James</Link>
          </div>
        </div>
      </SectionWrapper>

      {/* Services Overview Section */}
      <SectionWrapper title="Services" subtitle="Purpose-driven creative support for clear communication and meaningful growth." className="bg-primary" titleClass="text-white" subtitleClass="text-white/75">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="group flex h-full flex-col rounded-[2rem] border border-white/15 bg-white p-6 shadow-premium transition duration-300 hover:-translate-y-1">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-accent">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-primary">{service.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-primary/70">{service.description}</p>
                <Link href={service.href} className="btn-secondary mt-6 w-full px-5 text-sm">Explore Service</Link>
              </article>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Featured Work Section */}
      <SectionWrapper title="Featured Work" subtitle="Selected website and graphic-design work from JavidVerse.">
        <div className="mx-auto grid max-w-6xl gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featuredWork.map((project) => (
            <article key={`${project.category}-${project.title}`} className={`group flex h-full flex-col overflow-hidden rounded-[2rem] border shadow-premium transition duration-300 hover:-translate-y-1 ${project.blue ? "border-white/15 bg-primary" : "border-primary/15 bg-white"}`}>
              <div className={`relative aspect-square overflow-hidden ${project.blue ? "bg-primary" : "bg-white"}`}>
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className={`${project.imageClassName} transition duration-500 ${project.blue ? "group-hover:scale-[1.15]" : "group-hover:scale-105"}`}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{project.category}</p>
                <h3 className={`mt-3 text-xl font-bold ${project.blue ? "text-white" : "text-primary"}`}>{project.title}</h3>
                <div className="mt-auto pt-6">
                  {project.external ? (
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className={`w-full px-5 text-sm ${project.blue ? "btn-outline-light" : "btn-secondary"}`}>{project.action}</a>
                  ) : (
                    <Link href={project.href} className={`w-full px-5 text-sm ${project.blue ? "btn-outline-light" : "btn-secondary"}`}>{project.action}</Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionWrapper>

      {/* Featured Publication Section */}
      <SectionWrapper
        title="Featured Publication"
        subtitle="Discover James M. David's debut publication, In the Arms of Faith—a heartfelt journey of faith, hope, and God's leading that encourages readers to trust His purpose through every season of life."
        className="bg-primary"
        titleClass="text-white"
        subtitleClass="text-white/75"
        headerClassName="mb-12 max-w-6xl"
      >
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-premium lg:grid-cols-[0.68fr_1.32fr]">
          <div className="relative min-h-[26rem] overflow-hidden bg-primary">
            <Image
              src={featuredBook.image}
              alt={featuredBook.alt}
              fill
              className="object-cover object-center transition duration-700 hover:scale-105"
              sizes="(min-width: 1024px) 35vw, 100vw"
            />
          </div>
          <div className="p-7 sm:p-9">
            <span className="inline-flex rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">Featured Book</span>
            <h3 className="mt-4 text-2xl font-semibold text-primary sm:text-3xl">{featuredBook.title}</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm">Author: {featuredBook.author}</p>
            <p className="mt-5 text-base leading-7 text-primary/75 sm:text-[1.02rem] sm:leading-8">{featuredBook.description}</p>
            <Link href="/book-services" className="btn-primary mt-7">Explore Book Services</Link>
          </div>
        </div>
      </SectionWrapper>

      {/* Video Projects Section */}
      <section className="bg-white px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Selected Work</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl">Video Projects</h2>
          </div>
          <div className="grid gap-7 lg:grid-cols-2">
            {videoProjects.map((project) => (
              <article key={project.embedUrl} className="overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium">
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
                  <h3 className="text-lg font-bold leading-7 text-primary">{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
          <Link href="/videography" className="btn-primary mt-8">Explore Videography</Link>
        </div>
      </section>

      {/* Audience Section */}
      <SectionWrapper title="Who JavidVerse Serves" subtitle="Creative support shaped for the people and organizations carrying meaningful messages." className="bg-primary" titleClass="text-white" subtitleClass="text-white/75">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <li key={audience.title} className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 text-light">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="font-semibold">{audience.title}</span>
              </li>
            );
          })}
        </ul>
      </SectionWrapper>

      {/* Final CTA Section */}
      <CTASection
        title="Ready to start your next project?"
        description="Let JavidVerse help you shape a clear, purposeful creative project that serves your audience well."
        href="/contact"
        action="Start a Project"
        theme="light"
      />
    </>
  );
}
