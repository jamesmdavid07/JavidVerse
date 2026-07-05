import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import SectionWrapper from "@/components/SectionWrapper";
import ServiceCard from "@/components/ServiceCard";

export const metadata = {
  title: "Javid Verse — Creative Solutions for Ministry & Mission",
  description: "Design, video, publishing preparation, branding, and web solutions for ministries, authors, organizations, and individuals.",
  keywords: ["ministry creative studio", "book design", "video production", "branding", "website development"]
};

const services = [
  {
    title: "Website Services",
    description: "Website development and digital marketing.",
    href: "/web",
    icon: "Globe" as const
  },
  {
    title: "Book Services",
    description: "Professional formatting, cover design, and publishing support.",
    href: "/book",
    icon: "BookOpen" as const,
    image: "/Book-services.png"
  },
  {
    title: "Graphic Design",
    description: "Logo design, brand identity creation, digital posters, and visual brand management.",
    href: "/graphic",
    icon: "LayoutGrid" as const,
    image: "/Graphic-services.png"
  },
  {
    title: "Videography",
    description: "Engaging ads, promos, and motion graphics.",
    href: "/video",
    icon: "Film" as const
  }
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <SectionWrapper title="Services" subtitle="A tailored set of creative services designed for clarity and growth.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} title={service.title} description={service.description} href={service.href} icon={service.icon} image={service.image} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper title="The story behind Javid Verse" subtitle="Theology, technology, and creativity brought together in service of people and mission." className="bg-slate-50">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative min-h-80 overflow-hidden rounded-[2rem] bg-primary shadow-premium"><Image src="/james.jpg" alt="James M. David, founder of Javid Verse" fill className="object-cover object-center" sizes="(min-width: 1024px) 50vw, 100vw" /></div>
          <div><p className="text-lg leading-8 text-primary/75">Javid Verse grew from James M. David’s journey from Yongela village in Kenya to ministry and theological training in the Philippines. His story brings together evangelism, youth leadership, media production, design, publishing, and web development.</p><p className="mt-5 text-lg leading-8 text-primary/75">The studio is an extension of that calling: using creative skills to help worthy messages become clearer, stronger, and easier to share.</p><Link href="/about" className="btn-primary mt-8">Read James’s Ministry Story</Link></div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        title="Books shaped with care"
        subtitle="Formatting, cover design, editing support, and publishing preparation for meaningful manuscripts."
      >
        <div className="grid gap-7 md:grid-cols-3">{["Do Men Really Cheat?", "In the Arms of Faith", "Personal Witnessing"].map(title => <article key={title} className="overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium">{/* TODO: Replace with the real book cover. */}<div className="flex aspect-[4/3] items-center justify-center bg-primary p-7 text-center"><div><p className="text-xs font-bold uppercase tracking-widest text-accent">Book cover placeholder</p><h3 className="mt-3 text-xl font-bold text-light">{title}</h3></div></div></article>)}</div>
        <Link href="/book" className="btn-primary mt-8">Explore Book Services</Link>
      </SectionWrapper>

      <SectionWrapper title="Purposeful digital spaces" subtitle="Websites that give ministries, professionals, organizations, and businesses a clear online home." className="bg-primary" titleClass="text-white" subtitleClass="text-white/75">
        <div className="grid gap-7 md:grid-cols-3">{["James M. David Portfolio", "Aligned4LifeProject", "Javid Verse"].map(title => <article key={title} className="rounded-[2rem] border border-white/15 bg-white/10 p-5">{/* TODO: Replace with the real website screenshot. */}<div className="flex aspect-video items-center justify-center rounded-2xl bg-white/10 text-center text-xs font-bold uppercase tracking-widest text-accent">Website screenshot placeholder</div><h3 className="mt-5 text-lg font-bold text-light">{title}</h3></article>)}</div>
        <Link href="/web" className="btn-primary mt-8">View Website Work</Link>
      </SectionWrapper>
    </>
  );
}
