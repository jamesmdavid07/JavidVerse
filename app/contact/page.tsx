import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Hero from "@/components/Hero";
import SectionWrapper from "@/components/SectionWrapper";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact — Javid Verse", description: "Tell Javid Verse about your ministry, book, website, or creative project." };
export default function ContactPage() { return <>
  <Hero title="Let’s Work Together" subtitle="Tell me about your project, ministry, book, website, or creative idea." />
  <SectionWrapper title="Shape your idea into something purposeful" subtitle="I would be happy to help you make it clear, beautiful, and useful.">
    <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
      <aside className="rounded-[2rem] bg-primary p-8 text-light shadow-premium sm:p-10">
        <h3 className="text-2xl font-bold">Direct contact</h3>
        <div className="mt-8 space-y-7">
          <div className="flex gap-4"><Mail className="h-5 w-5 shrink-0 text-accent"/><div><p className="font-semibold">Email</p><Link href="mailto:javidverse@gmail.com" className="mt-1 block text-sm text-light/75">javidverse@gmail.com</Link></div></div>
          <div className="flex gap-4"><Phone className="h-5 w-5 shrink-0 text-accent"/><div><p className="font-semibold">Phone / WhatsApp</p><p className="mt-1 text-sm text-light/75">Phone number coming soon</p></div></div>
          <div className="flex gap-4"><MapPin className="h-5 w-5 shrink-0 text-accent"/><div><p className="font-semibold">Location</p><p className="mt-1 text-sm text-light/75">Philippines / Serving clients internationally</p></div></div>
        </div>
      </aside>
      <div className="rounded-[2rem] border border-primary/15 bg-white p-8 shadow-premium sm:p-10"><ContactForm /></div>
    </div>
  </SectionWrapper>
  </> }
