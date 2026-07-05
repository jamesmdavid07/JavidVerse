// Reusable Image Placeholder
import type { ReactNode } from "react";

interface MediaPlaceholderProps {
  label: string;
  title?: string;
  icon?: ReactNode;
  className?: string;
  dark?: boolean;
}

// Reusable fallback for portfolio images and videos that have not been uploaded yet.
export default function MediaPlaceholder({
  label,
  title,
  icon,
  className = "aspect-video",
  dark = false,
}: MediaPlaceholderProps) {
  const background = dark
    ? "border border-white/15 bg-white/10 text-light"
    : "bg-gradient-to-br from-primary to-blue-800 text-light";

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-2xl p-6 text-center ${background} ${className}`}
      role="img"
      aria-label={`${label}${title ? ` for ${title}` : ""}`}
    >
      <div>
        {icon ? <div className="mb-4 flex justify-center text-accent">{icon}</div> : null}
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{label}</p>
        {title ? <p className="mt-3 text-xl font-bold text-light">{title}</p> : null}
      </div>
    </div>
  );
}
