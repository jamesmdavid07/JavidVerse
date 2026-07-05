// Reusable Services Grid
import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

interface FeatureGridProps {
  items: readonly string[];
  icon?: LucideIcon;
  columns?: "three" | "four";
}

// Reusable grid for service lists across the website.
export default function FeatureGrid({ items, icon: Icon = CheckCircle2, columns = "four" }: FeatureGridProps) {
  const columnClass = columns === "three" ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${columnClass}`}>
      {items.map((item) => (
        <li key={item} className="flex h-full items-start gap-3 rounded-2xl border border-primary/15 bg-white p-5 shadow-sm">
          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          <span className="font-semibold leading-6 text-primary">{item}</span>
        </li>
      ))}
    </ul>
  );
}
