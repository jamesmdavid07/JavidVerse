// Read More Bible references — links to BibleGateway.com.
interface DevotionalBibleRefsProps {
  refs: string[];
}

export default function DevotionalBibleRefs({ refs }: DevotionalBibleRefsProps) {
  if (refs.length === 0) return null;

  return (
    <div className="mt-10 rounded-xl border border-primary/10 bg-primary/5 px-6 py-6">
      <h3 className="text-lg font-bold text-primary">Read More</h3>
      <p className="mt-1 mb-4 text-sm text-primary/60">Explore these additional Bible texts.</p>
      <ul className="space-y-2">
        {refs.map((ref) => {
          const encoded = encodeURIComponent(ref);
          return (
            <li key={ref}>
              <a
                href={`https://www.biblegateway.com/passage/?search=${encoded}&version=NIV`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-primary"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition group-hover:bg-primary" />
                {ref}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
