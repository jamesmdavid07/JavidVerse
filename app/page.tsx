// Home Page
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import SectionWrapper from "@/components/sections/SectionWrapper";
import MediaPlaceholder from "@/components/ui/MediaPlaceholder";
import ServiceCard from "@/components/ui/ServiceCard";

export const metadata = {
  title: "Javid Verse — Creative Solutions for Ministry & Mission",
  description: "Design, video, publishing preparation, branding, and web solutions for ministries, authors, organizations, and individuals.",
  keywords: ["ministry creative studio", "book design", "video production", "branding", "website development"],
};

// Primary services displayed on the homepage.
const services = [
  {
    title: "Website Services",
    description: "Purpose-driven website development and digital presence support.",
    href: "/website-services",
    icon: "Globe" as const,
  },
  {
    title: "Book Services",
    description: "Professional formatting, cover design, and publishing preparation.",
    href: "/book-services",
    icon: "BookOpen" as const,
    image: "/services/book-services-card.png",
  },
  {
    title: "Graphic Design",
    description: "Logo design, visual identity, digital graphics, and brand management.",
    href: "/graphic-design",
    icon: "LayoutGrid" as const,
    image: "/services/graphic-design-card.png",
  },
  {
    title: "Videography",
    description: "Video editing, promotional content, and motion graphics.",
    href: "/videography",
    icon: "Film" as const,
  },
];

// Book highlights. Add uploaded cover paths to the image field as they become available.
const books = [
  { title: "Do Men Really Cheat?" },
  { title: "In the Arms of Faith", image: "/books/in-the-arms-of-faith-book-cover.png" },
  { title: "Personal Witnessing" },
];

// Website highlights awaiting final portfolio screenshots.
const websites = ["James M. David Portfolio", "Aligned4LifeProject", "Javid Verse"];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <SectionWrapper title="Services" subtitle="Purpose-driven creative support for clear communication and meaningful growth.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              href={service.href}
              icon={service.icon}
              image={service.image}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* Founder Story Section */}
      <SectionWrapper
        title="The story behind Javid Verse"
        subtitle="Theology, technology, and creativity brought together in service of people and mission."
        className="bg-slate-50"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Founder image */}
          <div className="relative min-h-80 overflow-hidden rounded-[2rem] bg-primary shadow-premium">
            <Image
              src="/about/james.jpg"
              alt="James M. David, founder of JavidVerse"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div>
            <p className="text-lg leading-8 text-primary/75">JavidVerse grew from James M. David&apos;s journey from ministry to theological training in the Philippines. His story brings together evangelism, youth leadership, media production, design, publishing, and web development.</p>
            <p className="mt-5 text-lg leading-8 text-primary/75">The studio is an extension of that calling: using creative skills to help worthy messages become clearer, stronger, and easier to share.</p>
            <Link href="/about-us" className="btn-primary mt-8">Read James&apos;s Ministry Story</Link>
          </div>
        </div>
      </SectionWrapper>

      {/* Book Highlights Section */}
      <SectionWrapper title="Books shaped with care" subtitle="Formatting, cover design, editing support, and publishing preparation for meaningful manuscripts.">
        <div className="grid gap-7 md:grid-cols-3">
          {books.map((book) => (
            <article key={book.title} className="overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium">
              {book.image ? (
                <div className="relative aspect-[4/3] overflow-hidden bg-primary">
                  <Image src={book.image} alt={`${book.title} book cover`} fill className="object-cover object-center" sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
              ) : (
                <MediaPlaceholder label="Book cover placeholder" title={book.title} className="aspect-[4/3] rounded-none" />
              )}
            </article>
          ))}
        </div>
        <Link href="/book-services" className="btn-primary mt-8">Explore Book Services</Link>
      </SectionWrapper>

      {/* Website Highlights Section */}
      <SectionWrapper
        title="Purposeful digital spaces"
        subtitle="Websites that give ministries, professionals, organizations, and businesses a clear online home."
        className="bg-primary"
        titleClass="text-white"
        subtitleClass="text-white/75"
      >
        <div className="grid gap-7 md:grid-cols-3">
          {websites.map((title) => (
            <article key={title} className="rounded-[2rem] border border-white/15 bg-white/10 p-5">
              <MediaPlaceholder label="Website screenshot placeholder" dark />
              <h3 className="mt-5 text-lg font-bold text-light">{title}</h3>
            </article>
          ))}
        </div>
        <Link href="/website-services" className="btn-primary mt-8">View Website Work</Link>
      </SectionWrapper>
    </>
  );
}
