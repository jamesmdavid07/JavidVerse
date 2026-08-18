// Renders the full devotional content HTML with auto-bolded Bible references.
import { processDevotionalContent } from "@/lib/format-devotional-content";

interface DevotionalContentProps {
  html: string;
}

export default function DevotionalContent({ html }: DevotionalContentProps) {
  const processed = processDevotionalContent(html);

  return (
    <div
      className="prose-devotional space-y-5 text-base leading-relaxed text-primary/85 sm:text-lg sm:leading-relaxed"
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
}
