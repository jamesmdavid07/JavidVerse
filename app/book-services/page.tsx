// Book Services Page
import Image from "next/image";
import CTASection from "@/components/sections/CTASection";
import Hero from "@/components/sections/Hero";
import SectionWrapper from "@/components/sections/SectionWrapper";
import FeatureGrid from "@/components/ui/FeatureGrid";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";

export const metadata = {
  title: "Book Services — Javid Verse",
  description: "Professional book formatting, cover design, editing support, and publishing preparation.",
};

// Book preparation services.
const services = [
  "Manuscript formatting",
  "Interior book layout",
  "Cover design",
  "Proofreading and editing support",
  "Print-ready PDF preparation",
  "eBook preparation",
  "Self-publishing support",
  "Author branding materials",
] as const;

// Completed book projects. Add cover paths as final artwork becomes available.
const books = [
  {
    title: "Do Men Really Cheat?",
    author: "Judy Makena Ireri",
    work: "Formatting, cover design, editing support, and publishing preparation",
  },
  {
    title: "In the Arms of Faith",
    author: "James M. David",
    work: "Writing, design, formatting, and publishing preparation",
    image: "/books/in-the-arms-of-faith-book-cover.png",
  },
  {
    title: "Personal Witnessing",
    author: "Namanya Dan — Author/Instructor",
    work: "Course-module formatting, layout design, and print preparation",
  },
];

export default function BookPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero title="Book Services" subtitle="Helping authors turn manuscripts into clear, beautiful, professional books." />

      {/* Services Section */}
      <SectionWrapper title="Support from manuscript to final files" subtitle="Thoughtful preparation for print, digital sharing, and self-publishing platforms.">
        <p className="mb-10 max-w-4xl text-lg leading-8 text-primary/75">JavidVerse helps authors turn manuscripts into well-designed, professional books with careful attention to clarity, structure, beauty, and readability.</p>
        <FeatureGrid items={services} />
      </SectionWrapper>

      {/* Completed Projects Section */}
      <SectionWrapper
        title="Completed book projects"
        subtitle="Selected projects supported through design, formatting, and preparation."
        className="bg-primary"
        titleClass="text-white"
        subtitleClass="text-white/75"
      >
        <div className="grid gap-7 md:grid-cols-3">
          {books.map((book) => (
            <article key={book.title} className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium">
              {/* Book cover or labeled placeholder */}
              {book.image ? (
                <div className="relative aspect-[4/5] overflow-hidden bg-primary">
                  <Image src={book.image} alt={`${book.title} by ${book.author}`} fill className="object-cover object-center" sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
              ) : (
                <MediaPlaceholder label="Book cover placeholder" title={book.title} className="aspect-[4/5] rounded-none" />
              )}
              <div className="flex-1 p-7">
                <h3 className="text-xl font-bold text-primary">{book.title}</h3>
                <p className="mt-2 text-sm font-semibold text-accent">{book.author}</p>
                <p className="mt-4 text-sm leading-6 text-primary/70">{book.work}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 rounded-2xl border-l-4 border-accent bg-white p-6 text-sm leading-7 text-primary/75">JavidVerse supports authors through design, formatting, and publishing preparation, but does not claim to be an official publishing house.</p>
      </SectionWrapper>

      {/* Contact CTA */}
      <CTASection title="Ready to shape your manuscript?" description="Let’s prepare a thoughtful, readable book that serves your readers well." href="/contact" action="Start a Book Project" theme="light" />
    </>
  );
}
