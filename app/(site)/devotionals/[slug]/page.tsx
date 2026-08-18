import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { getDevotionalBySlug, getAdjacentDevotionals } from "@/lib/devotionals";
import { getSiteUrl } from "@/lib/site-url";
import DevotionalContent from "@/components/devotionals/DevotionalContent";
import DevotionalBibleRefs from "@/components/devotionals/DevotionalBibleRefs";
import DevotionalShare from "@/components/devotionals/DevotionalShare";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let devotional;
  try {
    devotional = await getDevotionalBySlug(slug);
  } catch {
    return {};
  }
  if (!devotional) return {};

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/devotionals/${slug}`;
  const description =
    devotional.fullVerse.length > 160
      ? devotional.fullVerse.slice(0, 157) + "..."
      : devotional.fullVerse || `Read "${devotional.title}" on JavidVerse Daily Devotionals.`;

  return {
    title: `${devotional.title} | JavidVerse Daily Devotional`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: devotional.title,
      description,
      url,
      siteName: "JavidVerse",
      type: "article",
      publishedTime: devotional.createdAt,
      modifiedTime: devotional.updatedAt,
      authors: [devotional.author],
      images: [{ url: "/brand/javidverse-logo.png", width: 2189, height: 680, alt: devotional.title }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: devotional.title,
      description,
      images: ["/brand/javidverse-logo.png"],
    },
  };
}

export default async function DevotionalSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let devotional;
  try {
    devotional = await getDevotionalBySlug(slug);
  } catch (err) {
    console.error("Failed to load devotional:", err);
    return (
      <section className="px-6 py-16 text-center sm:px-8 sm:py-20 lg:px-12">
        <BookOpen className="mx-auto mb-4 h-10 w-10 text-accent" />
        <p className="text-lg font-semibold text-primary">Devotional temporarily unavailable.</p>
        <p className="mt-2 text-primary/60">Please try again shortly.</p>
        <Link href="/devotionals" className="btn-primary mt-6 inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Devotionals
        </Link>
      </section>
    );
  }
  if (!devotional) notFound();

  let prev = null;
  let next = null;
  try {
    const adjacent = await getAdjacentDevotionals(slug);
    prev = adjacent.prev;
    next = adjacent.next;
  } catch {
    // Adjacent nav is non-critical — continue without it.
  }

  const dateStr = new Date(devotional.publicationDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="px-6 py-12 sm:px-8 sm:py-16 lg:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Back to hub */}
        <Link
          href="/devotionals"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary/50 transition hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          All Devotionals
        </Link>

        {/* Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-primary/60">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4 text-accent" />
            {devotional.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-accent" />
            {dateStr}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold leading-tight text-primary sm:text-4xl">
          {devotional.title}
        </h1>

        {/* Bible text */}
        <div className="mt-6 rounded-xl bg-primary/10 px-6 py-6 sm:px-8 sm:py-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            {devotional.mainBibleRef}
          </p>
          <blockquote className="mt-3 text-xl font-bold italic leading-relaxed text-primary sm:text-2xl">
            &ldquo;{devotional.fullVerse}&rdquo;
          </blockquote>
          <p className="mt-2 text-xs font-semibold text-primary/50">{devotional.bibleTranslation}</p>
        </div>

        {/* Full devotional content */}
        <div className="mt-8">
          <DevotionalContent html={devotional.content} />
        </div>

        {/* Reflections box */}
        <div className="mt-10 rounded-xl border-l-4 border-accent bg-accent/10 px-6 py-6 sm:px-8 sm:py-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Reflections</p>
          <p className="mt-4 text-base leading-relaxed text-primary sm:text-lg">
            Today, whatever has changed in your life, bring it before God. You do not need perfect words. You do not need to have it all together. You just need to come. He is close. He is faithful. And He will carry you through.
          </p>
          <div className="my-5 h-px bg-accent/30" />
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Prayer</p>
          <p className="mt-3 text-base leading-relaxed italic text-primary/80 sm:text-lg">
            Lord, help me bring every change, every fear, and every uncertainty to You today. I trust that You are close, faithful, and able to carry me through. In Jesus&apos; name, Amen.
          </p>
        </div>

        {/* Read More Bible references */}
        <DevotionalBibleRefs refs={devotional.readMoreRefs} />

        {/* Share */}
        <div className="mt-10 border-t border-primary/10 pt-6">
          <DevotionalShare
            slug={devotional.slug}
            title={devotional.title}
            mainBibleRef={devotional.mainBibleRef}
            fullVerse={devotional.fullVerse}
            bibleTranslation={devotional.bibleTranslation}
          />
        </div>

        {/* Author card */}
        <div className="mt-10 flex flex-col items-center gap-5 rounded-2xl bg-primary/5 px-6 py-6 sm:flex-row sm:items-start sm:px-8">
          <Image
            src="/about/james.webp"
            alt="James M. David"
            width={128}
            height={128}
            className="h-28 w-28 shrink-0 rounded-full object-cover object-[center_15%] ring-2 ring-accent/30"
          />
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold text-primary">James M. David</p>
            <p className="mt-2 text-sm leading-relaxed text-primary/70">
              James M. David is a humble servant of God, committed in sharing God&apos;s messages to enhance the mission.
            </p>
            <p className="mt-2 text-xs text-primary/50">
              Published by JavidVerse with permission.
            </p>
          </div>
        </div>

        {/* Previous / Next navigation */}
        <nav className="mt-12 flex flex-col gap-4 border-t border-primary/10 pt-8 sm:flex-row sm:justify-between">
          {prev ? (
            <Link
              href={`/devotionals/${prev.slug}`}
              className="group flex flex-1 items-center gap-3 rounded-xl border border-primary/10 bg-primary/5 px-5 py-4 transition hover:border-accent/40 hover:shadow-sm"
            >
              <ArrowLeft className="h-5 w-5 shrink-0 text-primary/30 transition group-hover:-translate-x-0.5 group-hover:text-accent" />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary/40">Previous</p>
                <p className="mt-0.5 truncate text-sm font-semibold text-primary group-hover:text-accent">
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/devotionals/${next.slug}`}
              className="group flex flex-1 items-center justify-end gap-3 rounded-xl border border-primary/10 bg-primary/5 px-5 py-4 text-right transition hover:border-accent/40 hover:shadow-sm"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary/40">Next</p>
                <p className="mt-0.5 truncate text-sm font-semibold text-primary group-hover:text-accent">
                  {next.title}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-primary/30 transition group-hover:translate-x-0.5 group-hover:text-accent" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </section>
  );
}
