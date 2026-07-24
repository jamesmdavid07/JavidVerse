// Hero Section
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clapperboard, Globe, Palette } from "lucide-react";

interface HeroProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  action?: string;
  actionHref?: string;
}

// Homepage service shortcuts.
const serviceLinks = [
  {
    label: "Website Services",
    description: "Web design and development",
    href: "/website-services",
    icon: Globe,
    className: "lg:absolute lg:left-0 lg:top-16 xl:top-14",
    iconClassName: "bg-primary text-accent",
  },
  {
    label: "Book Services",
    description: "Design, formatting, and publishing",
    href: "/book-services",
    icon: BookOpen,
    className: "lg:absolute lg:right-0 lg:top-16 xl:top-14",
    iconClassName: "bg-primary text-accent",
  },
  {
    label: "Graphic Design",
    description: "Branding and visual communication",
    href: "/graphic-design",
    icon: Palette,
    className: "lg:absolute lg:bottom-16 lg:left-0 xl:bottom-14",
    iconClassName: "bg-primary text-accent",
  },
  {
    label: "Videography",
    description: "Editing, promotions, and motion graphics",
    href: "/videography",
    icon: Clapperboard,
    className: "lg:absolute lg:bottom-16 lg:right-0 xl:bottom-14",
    iconClassName: "bg-primary text-accent",
  },
] as const;

// Reusable hero for the homepage and inner service pages.
export default function Hero({ eyebrow, title, subtitle, action, actionHref }: HeroProps) {
  const isInnerPage = Boolean(title);

  return (
    <section
      className={`relative flex w-full items-center justify-center overflow-hidden bg-primary ${
        isInnerPage ? "px-6 py-12 sm:px-8 sm:py-14" : "min-h-[calc(100svh-80px)] px-5 py-12 sm:px-8 lg:min-h-[min(820px,calc(100svh-80px))] lg:px-10 xl:px-12"
      }`}
    >
      {/* Homepage background image and overlay */}
      {!isInnerPage ? (
        <>
          <Image
            src="/site/hero-image.webp"
            alt=""
            fill
            className="absolute inset-0 z-0 h-full w-full object-cover object-center opacity-70"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 z-10 bg-[linear-gradient(105deg,rgba(4,45,109,0.97)_0%,rgba(4,45,109,0.92)_42%,rgba(4,45,109,0.78)_72%,rgba(4,45,109,0.88)_100%)]" aria-hidden="true" />
          <div className="absolute -left-24 bottom-[-12rem] z-10 h-96 w-96 rounded-full border border-white/10 bg-white/5 blur-sm sm:h-[30rem] sm:w-[30rem]" aria-hidden="true" />
          <div className="absolute -right-20 top-[-12rem] z-10 h-[28rem] w-[28rem] rounded-full border border-white/10" aria-hidden="true" />
        </>
      ) : null}

      {/* Animated hero content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className={`relative z-20 w-full ${isInnerPage ? "flex max-w-5xl flex-col items-center justify-center py-0 text-center" : "mx-auto max-w-7xl"}`}
      >
        {!isInnerPage ? (
          <div className="grid items-center gap-1 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 xl:gap-14">
            {/* Homepage message */}
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-0 text-xs font-bold uppercase tracking-[0.34em] text-light sm:text-sm lg:mb-4"
              >
                Welcome to
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.75, delay: 0.13 }}
                className="pointer-events-none relative z-10 mx-auto -mt-8 -mb-12 flex h-64 w-64 items-center justify-center sm:-mt-10 sm:-mb-14 sm:h-[23rem] sm:w-[23rem] md:-mt-14 md:-mb-20 md:h-[30rem] md:w-[30rem] lg:hidden"
              >
                <span className="absolute -inset-8 rounded-full bg-white/28 blur-3xl sm:-inset-10" aria-hidden="true" />
                <Image
                  src="/brand/logo-with-shadow.webp"
                  alt="JavidVerse"
                  width={464}
                  height={464}
                  className="relative z-10 h-full w-full object-contain"
                />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-5xl font-bold leading-none tracking-[-0.045em] sm:text-6xl md:text-7xl xl:text-8xl"
              >
                <span className="text-light">Javid</span><span className="text-accent">Verse</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-5 max-w-2xl text-xl font-bold leading-8 text-accent sm:text-2xl md:text-3xl"
              >
                For All Creative Solutions
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mt-7 max-w-2xl text-base leading-8 text-light/85 sm:text-lg sm:leading-9"
              >
                A creative agency helping ministries, authors, organizations, businesses, and individuals bring their ideas to life with clarity, creativity, and purpose.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-5 max-w-2xl text-base leading-8 text-light/85 sm:text-lg sm:leading-9"
              >
                From book design and publishing support to branding, video production, and website development, we provide dependable creative solutions from concept to completion.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="mt-10 hidden flex-col items-center justify-center gap-4 sm:flex-row lg:flex lg:items-start lg:justify-start"
              >
                <Link href="/contact" className="btn-primary min-w-48 px-7 py-4 text-base font-bold shadow-premium sm:text-[1.02rem]">
                  Start Your Project <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/about-us" className="btn-outline-light min-w-36 border-light/40 bg-white/5 px-7 py-4 text-base font-bold backdrop-blur-sm hover:border-light sm:text-[1.02rem]">
                  About Us
                </Link>
              </motion.div>
            </div>

            {/* Homepage logo and service cards */}
            <motion.div
              initial={{ opacity: 0, x: 34 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
              className="relative mx-auto w-full max-w-3xl lg:min-h-[36rem] xl:max-w-[48rem]"
            >
              <div className="pointer-events-none relative z-10 mx-auto mb-0 hidden h-72 w-72 items-center justify-center sm:h-[23rem] sm:w-[23rem] md:h-[30rem] md:w-[30rem] lg:absolute lg:left-1/2 lg:top-1/2 lg:mb-0 lg:flex lg:h-[32rem] lg:w-[32rem] lg:-translate-x-1/2 lg:-translate-y-1/2 xl:h-[36rem] xl:w-[36rem]">
                <span className="absolute -inset-8 rounded-full bg-white/28 blur-3xl sm:-inset-10 sm:bg-white/28" aria-hidden="true" />
                <Image
                  src="/brand/logo-with-shadow.webp"
                  alt="JavidVerse"
                  width={464}
                  height={464}
                  className="relative z-10 h-full w-full object-contain"
                />
              </div>
              <div className="relative z-30 grid grid-cols-2 gap-3 sm:gap-4 lg:min-h-[36rem] lg:block">
                {serviceLinks.map((service, index) => {
                  const Icon = service.icon;

                  return (
                    <motion.div
                      key={service.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.75, delay: 0.5 + index * 0.08 }}
                      className={service.className}
                    >
                      <Link
                        href={service.href}
                        className="group relative flex min-h-32 flex-col items-start gap-2 rounded-2xl border border-accent/30 bg-accent p-3 text-left text-primary shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_24px_70px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:min-h-24 sm:flex-row sm:items-center sm:gap-3 sm:rounded-[1.35rem] sm:p-4 lg:w-60 xl:w-72"
                      >
                        <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${service.iconClassName}`} aria-hidden="true">
                          <Icon className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[0.78rem] font-bold leading-4 sm:text-[0.95rem] sm:leading-5">{service.label}</span>
                          <span className="mt-1.5 block text-[0.64rem] font-semibold leading-3 text-primary/75 sm:text-xs sm:leading-4">{service.description}</span>
                        </span>
                        <ArrowRight className="absolute right-3 top-3 h-3.5 w-3.5 shrink-0 text-primary transition duration-300 group-hover:translate-x-1 sm:static sm:h-4 sm:w-4" aria-hidden="true" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75 }}
                className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row lg:hidden"
              >
                <Link href="/contact" className="btn-primary w-full max-w-xs px-7 py-4 text-base font-bold shadow-premium sm:w-auto sm:min-w-48 sm:text-[1.02rem]">
                  Start Your Project <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/about-us" className="btn-outline-light w-full max-w-xs border-light/40 bg-white/5 px-7 py-4 text-base font-bold backdrop-blur-sm hover:border-light sm:w-auto sm:min-w-36 sm:text-[1.02rem]">
                  About Us
                </Link>
              </motion.div>
            </motion.div>
          </div>
        ) : null}

        {/* Inner-page eyebrow */}
        {isInnerPage && eyebrow ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-accent sm:text-sm"
          >
            {eyebrow}
          </motion.p>
        ) : null}

        {/* Page heading */}
        {isInnerPage ? (
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-4xl font-semibold leading-tight text-light sm:text-5xl md:text-6xl"
          >
            {title}
          </motion.h1>
        ) : null}

        {/* Hero supporting copy */}
        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className={isInnerPage ? "mt-5 max-w-4xl text-lg font-normal leading-8 text-light/80 sm:text-xl sm:leading-9" : "mb-12 max-w-3xl text-lg font-normal leading-relaxed text-light md:text-xl"}
          >
            {subtitle}
          </motion.p>
        ) : null}

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

      </motion.div>
    </section>
  );
}
