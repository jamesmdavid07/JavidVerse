// Contact Page
import Link from "next/link";
import { Facebook, Instagram, Mail } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import Hero from "@/components/sections/Hero";
import SectionWrapper from "@/components/sections/SectionWrapper";

export const metadata = {
  title: "Contact — Javid Verse",
  description: "Tell JavidVerse about your ministry, book, website, or creative project.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero eyebrow="Start a Conversation" title="Let’s Work Together" subtitle="Tell me about your project, ministry, book, website, or creative idea." />

      {/* Contact Section */}
      <SectionWrapper title="Shape your idea into something purposeful" subtitle="Let’s make your message clear, thoughtful, and useful to the people you serve.">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          {/* Direct contact details */}
          <aside className="rounded-[2rem] bg-primary p-8 text-light shadow-premium sm:p-10">
            <h2 className="text-2xl font-bold">Direct contact</h2>
            <p className="mt-3 text-sm leading-6 text-light/75">Reach out by email or connect with JavidVerse on social media.</p>
            <div className="mt-8 space-y-7">
              <div className="flex gap-4">
                <Mail className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Email</p>
                  <Link href="mailto:javidverse@gmail.com" className="mt-1 block break-all text-sm text-light/75 transition hover:text-accent">javidverse@gmail.com</Link>
                </div>
              </div>
              <div className="flex gap-4">
                <Facebook className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Facebook</p>
                  <a href="https://www.facebook.com/javidverse07/" target="_blank" rel="noopener noreferrer" className="mt-1 block break-all text-sm text-light/75 transition hover:text-accent">facebook.com/javidverse07</a>
                </div>
              </div>
              <div className="flex gap-4">
                <Instagram className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Instagram</p>
                  <a href="https://www.instagram.com/javid_verse/" target="_blank" rel="noopener noreferrer" className="mt-1 block break-all text-sm text-light/75 transition hover:text-accent">instagram.com/javid_verse</a>
                </div>
              </div>
            </div>
          </aside>

          {/* Project inquiry form */}
          <div className="rounded-[2rem] border border-primary/15 bg-white p-6 shadow-premium sm:p-10">
            <ContactForm />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
