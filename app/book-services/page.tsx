// Book Services Page
import Image from "next/image";
import { ExternalLink, FileCheck2, FileText, Palette, Quote, Rocket } from "lucide-react";
import CTASection from "@/components/sections/CTASection";
import Hero from "@/components/sections/Hero";
import SectionWrapper from "@/components/sections/SectionWrapper";

export const metadata = {
  title: "Book Services — JavidVerse Publishing",
  description: "A premium JavidVerse showcase of featured books, authors, and publishing work prepared with care and clarity.",
};

const sectionTitleClass = "text-2xl font-semibold tracking-tight sm:text-3xl";
const sectionSubtitleClass = "text-base leading-7 sm:text-lg";

interface PortfolioBook {
  title: string;
  author: string;
  image: string;
  alt: string;
}

// Book publishing and design services offered by JavidVerse.
const publishingServices = [
  { title: "Manuscript Formatting", icon: FileText },
  { title: "Cover Design", icon: Palette },
  { title: "Print-ready PDF Preparation", icon: FileCheck2 },
  { title: "Self-Publishing Support", icon: Rocket },
] as const;

// Portfolio books completed by JavidVerse.
const portfolioBooks: PortfolioBook[] = [
  {
    title: "DO MEN REALLY CHEAT?",
    author: "Judy M. Ireri",
    image: "/books/do-men-really-cheat.jpg",
    alt: "Book cover for Do Men Really Cheat? by Judy M. Ireri",
  },
  {
    title: "Personal Witnessing",
    author: "Dan Namanya, DMin",
    image: "/books/personal-witnessing.jpg",
    alt: "Book cover for Personal Witnessing by Dan Namanya, DMin",
  },
];

// Featured book highlight for the Books page.
const featuredBook = {
  title: "In the Arms of Faith",
  author: "James M. David",
  badge: "Featured Book",
  description:
    "When faith becomes more than belief, it becomes a journey. From a humble village in Kenya to mission fields around the world, James David shares a powerful story of faith, purpose, and God's leading. Each chapter includes reflection questions, practical application, and prayer to help readers grow in their own spiritual journey.",
  image: "/books/in the arms-of-faith.jpg",
  alt: "Book cover for In the Arms of Faith by James M. David",
  href: "https://www.amazon.com/Arms-Faith-James-Maangi-David/dp/B0FY5MRHF3",
  action: "Buy on Amazon",
} as const;

// Reader and client feedback. Only approved wording is used when available in the project.
const testimonials = [
  {
    name: "Diana Booker",
    role: "Reader of In the Arms of Faith",
    quote:
      "I have to hold it close because I've been reading. Very encouraging and enlightening.",
  },
  {
    name: "Patty Waldrop",
    role: "Reader feedback",
    quote:
      "Approved testimonial wording is not currently available in this project. This card is ready for the final verified quote when it is provided.",
  },
  {
    name: "Dan Namanya, DMin",
    role: "Author of Personal Witnessing",
    quote:
      "Approved feedback about JavidVerse publishing and creative services is not currently available in this project. This card is ready for the final verified quote when it is provided.",
  },
] as const;

export default function BooksPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        eyebrow="Prepare Your Book"
        title="Book Services"
        subtitle="At JavidVerse, we help authors transform manuscripts into professionally designed books with careful attention to clarity, structure, readability, and visual excellence."
      />

      {/* Publishing Services Section */}
      <SectionWrapper
        title="Services for Authors"
        subtitle="We provide complete publishing and design support for authors—from manuscript to final files."
        headerClassName="mb-10 max-w-3xl"
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {publishingServices.map((service) => {
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

      {/* Books Portfolio Section */}
      <SectionWrapper
        title="Books Designed by JavidVerse"
        subtitle="A portfolio of completed publishing and design work prepared for authors with excellence and care."
        className="bg-primary"
        titleClass={`${sectionTitleClass} text-white`}
        subtitleClass={`${sectionSubtitleClass} text-white/75`}
        headerClassName="mx-auto mb-10 max-w-3xl text-center"
      >
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {portfolioBooks.map((book) => (
            <article
              key={book.title}
              className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-white shadow-premium transition duration-300 hover:-translate-y-1"
            >
              {/* Book cover image */}
              <div className="relative aspect-square overflow-hidden bg-primary">
                <Image
                  src={book.image}
                  alt={book.alt}
                  fill
                  className="object-cover object-center transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>

              {/* Portfolio book details */}
              <div className="flex flex-1 flex-col items-center p-5 text-center">
                <h3 className="text-lg font-semibold text-primary sm:text-xl">{book.title}</h3>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm">
                  {book.author}
                </p>
              </div>
            </article>
          ))}
        </div>
      </SectionWrapper>

      {/* Featured Publication Section */}
      <SectionWrapper
        title="Featured Publication"
        subtitle="Discover James M. David's debut publication, In the Arms of Faith—a heartfelt journey of faith, hope, and God's leading that encourages readers to trust His purpose through every season of life."
        titleClass={sectionTitleClass}
        subtitleClass={sectionSubtitleClass}
        headerClassName="mx-auto mb-10 max-w-3xl text-center"
      >
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium lg:grid-cols-[0.68fr_1.32fr]">
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
            <span className="inline-flex rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {featuredBook.badge}
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-primary sm:text-3xl">{featuredBook.title}</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm">
              Author: {featuredBook.author}
            </p>
            <p className="mt-5 text-base leading-7 text-primary/75 sm:text-[1.02rem] sm:leading-8">{featuredBook.description}</p>
            <a href={featuredBook.href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-7">
              {featuredBook.action}
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Opens in a new tab</span>
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* Reader Testimonials Section */}
      <SectionWrapper
        title="Reader Testimonials"
        subtitle="Words of encouragement from readers and publishing collaborators."
        className="bg-primary"
        titleClass={`${sectionTitleClass} text-white`}
        subtitleClass={`${sectionSubtitleClass} text-white/75`}
        headerClassName="mx-auto mb-10 max-w-3xl text-center"
      >
        <div className="grid gap-7 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex h-full flex-col rounded-[2rem] border border-white/15 bg-white p-6 shadow-premium sm:p-7"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-accent">
                <Quote className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="mt-5 flex-1 text-[15px] leading-7 text-primary/75 sm:text-base">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="mt-6 border-t border-primary/10 pt-4">
                <h3 className="text-base font-semibold text-primary sm:text-lg">{testimonial.name}</h3>
                <p className="mt-2 text-xs font-semibold text-accent sm:text-sm">{testimonial.role}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionWrapper>

      {/* Publishing CTA Section */}
      <CTASection
        title="Ready to publish with clarity and care?"
        description="JavidVerse helps authors prepare thoughtful, beautiful books that are ready to serve readers well."
        href="/contact"
        action="Start a Publishing Project"
        theme="light"
      />
    </>
  );
}
