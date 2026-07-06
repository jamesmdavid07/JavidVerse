// Navigation
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Primary site navigation shared by desktop and mobile layouts.
const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Website Services", href: "/website-services" },
  { label: "Book Services", href: "/books" },
  { label: "Graphic Design", href: "/graphic-design" },
  { label: "Videography", href: "/videography" }
];

// Sticky site header with desktop and mobile navigation.
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu after navigating to another route.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-primary shadow-premium">
      <a
        href="#main-content"
        className="sr-only left-4 top-4 z-[60] rounded-lg bg-accent px-4 py-2 font-semibold text-primary focus:not-sr-only focus:fixed"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        {/* Brand logo */}
        <Link href="/" aria-label="JavidVerse home">
          <Image
            src="/brand/javidverse-logo.png"
            alt="JavidVerse"
            width={220}
            height={60}
            className="h-12 w-auto md:h-14"
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex xl:gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`whitespace-nowrap text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-accent"
                    : "text-light hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/contact" className="btn-primary px-5 text-sm font-bold">
            Contact Us
          </Link>
        </nav>

        {/* Mobile navigation toggle */}
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border-2 border-light text-light transition-all duration-300 hover:bg-light hover:text-primary lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <motion.div
          id="mobile-navigation"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="border-t-2 border-accent/20 bg-primary/95 px-6 pb-6 lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="space-y-3 pt-3">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-primary"
                      : "text-light hover:bg-accent/10 hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/contact" onClick={() => setOpen(false)} className="block rounded-lg bg-accent px-4 py-3 text-center text-sm font-bold text-primary">
              Contact Us
            </Link>
          </nav>
        </motion.div>
      ) : null}
    </header>
  );
}
