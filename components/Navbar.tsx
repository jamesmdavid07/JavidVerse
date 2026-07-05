"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Website Services", href: "/web" },
  { label: "Book Services", href: "/book" },
  { label: "Graphic Design", href: "/graphic" },
  { label: "Videography", href: "/video" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-premium">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <Link href="/">
          <Image
            src="/Long-logo.png"
            alt="JavidVerse Logo"
            width={220}
            height={60}
            className="h-12 w-auto md:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
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
          <Link href="/contact" className="rounded-lg bg-accent px-5 py-3 text-sm font-bold text-primary transition hover:brightness-110">
            Contact Us
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-light text-light hover:bg-light hover:text-primary transition-all duration-300 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="border-t-2 border-accent/20 bg-primary/95 px-6 pb-6 lg:hidden"
        >
          <div className="space-y-3">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
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
            <Link href="/contact" onClick={() => setOpen(false)} className="block rounded-lg bg-accent px-4 py-3 text-sm font-bold text-primary">
              Contact Us
            </Link>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
