import Link from "next/link";
import { Mail, Instagram, Linkedin, Twitter } from "lucide-react";

const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter }
];

export default function Footer() {
  return (
    <footer className="bg-primary py-12 border-t-2 border-accent/20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-accent">JavidVerse</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-light/80">A premium creative agency helping authors, founders, and teams launch polished visual work with clarity and strategy.</p>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 text-accent" />
            <Link href="mailto:javidverse@gmail.com" className="text-sm font-semibold text-light hover:text-accent transition-colors duration-300">javidverse@gmail.com</Link>
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-accent/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-light/60">© 2026 JavidVerse. Crafted for premium creative growth.</p>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <Link key={social.label} href={social.href} aria-label={social.label} className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-light text-light transition hover:bg-light hover:text-primary duration-300">
                <social.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
