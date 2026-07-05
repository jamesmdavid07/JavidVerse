// Hero Section
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeroProps {
  title?: string;
  subtitle?: string;
  action?: string;
  actionHref?: string;
}

// Reusable hero for the homepage and inner service pages.
export default function Hero({ title, subtitle, action, actionHref }: HeroProps) {
  const isInnerPage = Boolean(title);

  return (
    <section
      className={`relative flex w-full items-center justify-center overflow-hidden bg-primary ${
        isInnerPage ? "px-6 py-12 sm:px-8 sm:py-14" : "min-h-[calc(100svh-80px)] py-12"
      }`}
    >
      {/* Homepage background image and overlay */}
      {!isInnerPage ? (
        <>
          <Image
            src="/site/hero-image.jpg"
            alt=""
            fill
            className="absolute inset-0 z-0 h-full w-full object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="overlay-primary absolute inset-0 z-10" aria-hidden="true" />
        </>
      ) : null}

      {/* Animated hero content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className={`relative z-20 flex max-w-5xl flex-col items-center justify-center text-center ${isInnerPage ? "py-0" : "px-6 py-12"}`}
      >
        {/* Homepage JavidVerse mark */}
        {!isInnerPage ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-6 flex justify-center"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-white opacity-90 shadow-[0_0_16px_8px_rgba(255,255,255,0.4)] blur-lg" aria-hidden="true" />
              <Image
                src="/brand/javidverse-mark.png"
                alt="JavidVerse"
                width={70}
                height={70}
                className="relative z-10"
              />
            </div>
          </motion.div>
        ) : null}

        {/* Page heading */}
        {isInnerPage ? (
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-3xl font-bold leading-tight text-light sm:text-4xl"
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

        {/* Hero supporting copy */}
        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className={isInnerPage ? "mt-4 max-w-3xl text-base font-normal leading-7 text-light/80 sm:text-lg" : "mb-12 max-w-3xl text-lg font-normal leading-relaxed text-light md:text-xl"}
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

        {/* Optional inner-page CTA */}
        {isInnerPage && action && actionHref ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <Link href={actionHref} className="btn-primary mt-6">
              {action}
            </Link>
          </motion.div>
        ) : null}

        {/* Homepage introduction */}
        {!isInnerPage && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mb-12 max-w-3xl text-lg font-normal leading-relaxed text-light md:text-xl"
          >
            JavidVerse helps ministries, authors, organizations, and individuals turn meaningful ideas into clear, professional creative work—from concept to completion.
          </motion.p>
        )}

        {/* Homepage contact button */}
        {!isInnerPage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
          >
            <Link
              href="/contact"
              className="btn-primary px-8 py-4 text-base font-bold shadow-premium sm:px-12 sm:text-lg"
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
