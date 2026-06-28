import { CheckCircle2 } from "lucide-react";
import Hero from "@/components/Hero";
import SectionWrapper from "@/components/SectionWrapper";
import CTASection from "@/components/CTASection";

const services = ["Manuscript formatting", "Interior book layout", "Cover design", "Proofreading and editing support", "Print-ready PDF preparation", "eBook preparation", "Self-publishing support", "Author branding materials"];
const books = [
  { title: "Do Men Really Cheat?", author: "Judy Makena Ireri", work: "Formatting, cover design, editing support, publishing preparation" },
  { title: "In the Arms of Faith", author: "James M. David", work: "Writing, design, formatting, and publishing preparation" },
  { title: "Personal Witnessing", author: "Namanya Dan — Author/Instructor", work: "Course module formatting, layout design, and print preparation" }
];
export const metadata = { title: "Book Design & Publishing Preparation — Javid Verse", description: "Professional book formatting, cover design, editing support, and publishing preparation." };
export default function BookPage() { return <>
  <Hero title="Book Design & Publishing Preparation" subtitle="Helping authors turn manuscripts into clear, beautiful, professional books." />
  <SectionWrapper title="Support from manuscript to final files" subtitle="Ready for print, digital sharing, or self-publishing platforms.">
    <p className="max-w-4xl text-lg leading-8 text-primary/75">Javid Verse helps authors turn manuscripts into well-designed, professional books. The focus is on clarity, structure, beauty, and readability.</p>
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map(s => <div key={s} className="flex items-start gap-3 rounded-2xl border border-primary/15 bg-white p-5 shadow-sm"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent"/><span className="font-semibold text-primary">{s}</span></div>)}</div>
  </SectionWrapper>
  <SectionWrapper title="Completed book projects" subtitle="Selected projects supported through design, formatting, and preparation." className="bg-slate-50">
    <div className="grid gap-7 md:grid-cols-3">{books.map(book => <article key={book.title} className="overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium">
      {/* TODO: Replace this labeled placeholder with the real book cover. */}
      <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-primary to-blue-800 p-8 text-center text-lg font-bold text-light"><span><span className="block text-xs uppercase tracking-widest text-accent">Book Cover Placeholder</span><span className="mt-3 block">{book.title}</span></span></div>
      <div className="p-7"><h3 className="text-xl font-bold text-primary">{book.title}</h3><p className="mt-2 text-sm font-semibold text-accent">{book.author}</p><p className="mt-4 text-sm leading-6 text-primary/70">{book.work}</p></div>
    </article>)}</div>
    <p className="mt-10 rounded-2xl border-l-4 border-accent bg-white p-6 text-sm leading-7 text-primary/75">Javid Verse supports authors through design, formatting, and publishing preparation, but does not claim to be an official publishing house.</p>
  </SectionWrapper>
  <CTASection title="Ready to shape your manuscript?" description="Let’s prepare a thoughtful, readable book that serves your readers well." href="/contact" action="Start a Book Project" />
  </> }
