"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className={`relative flex w-full items-center justify-center overflow-hidden bg-primary ${title ? "min-h-[55svh] py-16 sm:py-20" : "min-h-[calc(100svh-80px)] py-12"}`}>
      {/* Hero Image Background */}
      <Image
        src="/hero-image.jpg"
        alt="Hero background"
        fill
        className="object-cover object-center absolute inset-0 w-full h-full z-0"
        priority
      />
      <div className="border-t border-primary/20"></div>
      {/* Dark overlay */}
      <div className="absolute inset-0 overlay-primary z-10"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-20 flex flex-col items-center justify-center text-center px-6 py-12 max-w-5xl"
      >
        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative flex items-center justify-center">
            {/* Softer, more opaque blurred white background */}
            <span className="absolute inset-0 rounded-full bg-white opacity-90 blur-lg shadow-[0_0_16px_8px_rgba(255,255,255,0.4)]"></span>
            <Image
              src="/Short-logo.png"
              alt="JavidVerse"
              width={70}
              height={70}
              className="relative z-10"
            />
          </div>
        </motion.div>

        {/* Main Heading */}
        {title ? (
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mb-6 text-3xl font-bold leading-tight text-light sm:text-4xl md:text-5xl"
          >
            {title}
          </motion.h1>
        ) : (
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mb-6 text-4xl font-bold leading-tight text-light sm:text-6xl md:text-7xl"
          >
            JavidVerse
          </motion.h1>
        )}

        {/* Subheading */}
        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-lg md:text-xl text-light max-w-3xl mb-12 leading-relaxed font-normal"
          >
            {subtitle}
          </motion.p>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mb-8 text-2xl font-bold tracking-wide text-accent sm:text-3xl md:text-4xl"
          >
            For All Creative Solutions
          </motion.p>
        )}

        {/* Description */}
        {!title && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-lg md:text-xl text-light max-w-3xl mb-12 leading-relaxed font-normal"
          >
            At JavidVerse, we help individuals and businesses turn ideas into structured, professional creative work. From concept to completion, we provide focused creative services designed to present your vision clearly and effectively.
          </motion.p>
        )}

        {/* CTA Button */}
        {!title && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-base font-bold text-primary shadow-premium transition-all duration-300 hover:scale-105 hover:brightness-125 sm:px-12 sm:text-lg"
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
