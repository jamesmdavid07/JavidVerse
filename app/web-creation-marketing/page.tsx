import { CheckCircle2, ExternalLink } from "lucide-react";
import Hero from "@/components/Hero";
import SectionWrapper from "@/components/SectionWrapper";
import CTASection from "@/components/CTASection";

const services = ["Personal portfolio websites", "Ministry websites", "Landing pages", "Business websites", "Author websites", "School and organization websites", "Front-end development", "Website redesign", "Website content structure", "Digital presence setup"];
const projects = [
  { title: "James M. David Personal Website", href: "https://jamesmdavid.vercel.app/", text: "Personal portfolio combining theology, technology, and media ministry." },
  { title: "Javid Verse", href: "https://javid-verse.vercel.app/", text: "Creative studio website and digital brand identity." },
  { title: "Aligned4LifeProject", href: "https://aligned4lifeproject.gr-site.com/", text: "Ministry website, brand support, and digital presence." }
];
const creativePortfolio = [
  { title: "Aligned4LifeProject", role: "Brand management · Website management · Digital marketing", text: "Supporting a ministry-focused initiative through a coordinated brand and digital presence." },
  { title: "Lifetime Lifestyle", role: "Website development · Brand organization", text: "Creating a structured digital home and helping organize the visual presentation of the brand." },
  { title: "Larry Bachman", role: "WordPress development · Hostinger", text: "Website development and hosting setup for a professional personal brand." },
  { title: "Green Cottage", role: "Website development · Design", text: "A clean, accessible website experience shaped around the organization’s needs." },
  { title: "Javid Verse", role: "Creative direction · Development", text: "A creative studio and digital identity connecting design, media, books, and web services." }
];
export const metadata = { title: "Website Services — Javid Verse", description: "Modern, responsive, purpose-driven websites for ministries, individuals, and organizations." };
export default function WebPage() { return <>
  <Hero title="Website Services" subtitle="Modern, responsive, and purpose-driven websites built to help good work reach more people." />
  <SectionWrapper title="A clear home for your mission online" subtitle="Websites for ministries, individuals, organizations, schools, authors, and small businesses.">
    <p className="max-w-4xl text-lg leading-8 text-primary/75">James M. David is a front-end developer with experience in HTML, CSS, Tailwind CSS, React and Next.js-style projects, WordPress, Hostinger, GoDaddy, GetResponse, and Vercel deployments.</p>
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map(s => <div key={s} className="flex gap-3 rounded-2xl border border-primary/15 bg-white p-5 shadow-sm"><CheckCircle2 className="h-5 w-5 shrink-0 text-accent"/><span className="font-semibold text-primary">{s}</span></div>)}</div>
  </SectionWrapper>
  <SectionWrapper title="Selected website projects" subtitle="A growing portfolio of purpose-driven digital spaces." className="bg-slate-50">
    <div className="grid gap-7 md:grid-cols-3">{projects.map(p => <a key={p.title} href={p.href} target="_blank" rel="noreferrer" className="group rounded-[2rem] border border-primary/15 bg-white p-8 shadow-premium transition hover:-translate-y-1"><div className="flex h-36 items-center justify-center rounded-2xl bg-primary text-accent">{/* TODO: Replace with a real website screenshot. */}<span className="text-center text-xs font-bold uppercase tracking-widest">Website Screenshot<br/>Placeholder</span></div><div className="mt-6 flex items-start justify-between gap-3"><h3 className="text-xl font-bold text-primary">{p.title}</h3><ExternalLink className="h-5 w-5 shrink-0 text-accent"/></div><p className="mt-3 text-sm leading-7 text-primary/70">{p.text}</p></a>)}</div>
  </SectionWrapper>
  <SectionWrapper title="Creative & digital portfolio" subtitle="Website, brand, and digital projects developed for ministries, professionals, organizations, and businesses.">
    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{creativePortfolio.map(project => <article key={project.title} className="overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-premium">
      {/* TODO: Upload and replace with the matching project image from James's portfolio. */}
      <div className="flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-primary to-blue-800 p-6 text-center"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Portfolio image placeholder</p><h3 className="mt-3 text-xl font-bold text-light">{project.title}</h3></div></div>
      <div className="p-7"><p className="text-xs font-bold uppercase tracking-wider text-accent">{project.role}</p><p className="mt-4 text-sm leading-7 text-primary/70">{project.text}</p></div>
    </article>)}</div>
    <p className="mt-8 rounded-2xl border border-accent/40 bg-accent/10 p-5 text-sm leading-7 text-primary">More website screenshots, brand work, and digital projects will be added as the full portfolio is uploaded.</p>
  </SectionWrapper>
  <CTASection title="Ready to build your online presence?" description="Let’s create a thoughtful website that makes your message easy to understand and act on." href="/contact" action="Start a Website Project" />
  </> }
