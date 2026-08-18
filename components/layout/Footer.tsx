// Footer
import Link from "next/link";
import { Facebook, Instagram, Mail, Youtube } from "lucide-react";

// Footer links mirror the primary navigation and use only verified destinations.
const footerLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Websites", href: "/website-services" },
  { label: "Books", href: "/book-services" },
  { label: "Graphic Design", href: "/graphic-design" },
  { label: "Videography", href: "/videography" },
  { label: "Devotionals", href: "/devotionals" },
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
            <p className="text-sm font-bold uppercase tracking-widest text-accent">JavidVerse - For All Creative Solutions</p>
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
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/javidverse07/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="JavidVerse on Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 text-accent transition hover:bg-accent hover:text-primary"
                >
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.instagram.com/javid_verse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="JavidVerse on Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 text-accent transition hover:bg-accent hover:text-primary"
                >
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.youtube.com/@javid07/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="JavidVerse on YouTube"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 text-accent transition hover:bg-accent hover:text-primary"
                >
                  <Youtube className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-accent/20 pt-6 text-center">
          <p className="text-sm text-light/60">© 2026 JavidVerse - For All Creative Solutions</p>
        </div>
      </div>
    </footer>
  );
}
