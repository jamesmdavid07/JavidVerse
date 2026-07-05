// CTA Section
import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
  href: string;
  action: string;
  theme?: "primary" | "light";
}

// Reusable closing call-to-action for service pages.
export default function CTASection({ title, description, href, action, theme = "primary" }: CTASectionProps) {
  const isPrimary = theme === "primary";

  return (
    <section className={isPrimary ? "bg-primary py-16 text-light sm:py-20" : "bg-light py-16 text-primary sm:py-20"}>
      <div className="mx-auto max-w-6xl px-6 text-center sm:px-8 lg:px-12">
        <p className={isPrimary ? "text-sm font-semibold uppercase tracking-[0.3em] text-accent" : "text-sm font-semibold uppercase tracking-[0.3em] text-accent"}>
          Start today
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className={isPrimary ? "mx-auto mt-4 max-w-2xl text-base leading-7 text-light/80" : "mx-auto mt-4 max-w-2xl text-base leading-7 text-primary/75"}>
          {description}
        </p>
        <Link href={href} className="btn-primary mt-8">
          {action}
        </Link>
      </div>
    </section>
  );
}
