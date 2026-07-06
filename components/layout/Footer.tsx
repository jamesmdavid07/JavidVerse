// Footer
import Link from "next/link";
import { Mail, Youtube } from "lucide-react";

// Footer links mirror the primary navigation and use only verified destinations.
const footerLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Website Services", href: "/website-services" },
  { label: "Book Services", href: "/book-services" },
  { label: "Graphic Design", href: "/graphic-design" },
  { label: "Videography", href: "/videography" },
  { label: "Contact", href: "/contact" },
];

// Site-wide footer with verified navigation and contact links.
export default function Footer() {
  return (
    <footer className="border-t-2 border-accent/20 bg-primary py-12 text-light">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Brand, navigation, and contact information */}
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-accent">JavidVerse</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-light/80">Creative solutions for ministry, mission, authors, organizations, and individuals—built with clarity, purpose, and care.</p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-sm font-bold uppercase tracking-widest text-accent">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-light/80 transition hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-accent">Connect</p>
            <div className="mt-4 space-y-4">
              <Link href="mailto:javidverse@gmail.com" className="flex items-center gap-3 text-sm font-semibold text-light transition hover:text-accent">
                <Mail className="h-5 w-5 shrink-0 text-accent" />
                javidverse@gmail.com
              </Link>
              <a
                href="https://www.youtube.com/@javid07./videos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-semibold text-light transition hover:text-accent"
              >
                <Youtube className="h-5 w-5 shrink-0 text-accent" />
                JavidVerse on YouTube
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 flex flex-col gap-6 border-t border-accent/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-light/60">© 2026 JavidVerse. Creative solutions for ministry and mission.</p>
          <p className="text-sm text-light/60">Designed and developed with purpose.</p>
        </div>
      </div>
    </footer>
  );
}
