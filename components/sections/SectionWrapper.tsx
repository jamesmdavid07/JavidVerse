// Reusable Section Wrapper
import type { ReactNode } from "react";

interface SectionWrapperProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
  titleClass?: string;
  subtitleClass?: string;
}

// Reusable page section with consistent spacing and heading widths.
export default function SectionWrapper({
  title,
  subtitle,
  children,
  className = "",
  titleClass = "text-primary",
  subtitleClass = "text-primary/70",
}: SectionWrapperProps) {
  return (
    <section className={`px-6 py-16 sm:px-8 sm:py-20 lg:px-12 ${className || "bg-light"}`}>
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 max-w-3xl">
          <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl ${titleClass}`}>{title}</h2>
          <p className={`mt-4 text-lg leading-8 ${subtitleClass}`}>{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
