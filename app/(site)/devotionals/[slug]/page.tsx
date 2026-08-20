import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, User, ArrowLeft, BookOpen } from "lucide-react";
import { getDevotionalBySlug, getPublishedDevotionals } from "@/lib/devotionals";
import { getCommentsByDevotionalId } from "@/lib/comments";
import { getSiteUrl } from "@/lib/site-url";
import DevotionalContent from "@/components/devotionals/DevotionalContent";
import DevotionalShare from "@/components/devotionals/DevotionalShare";
import DevotionalComments from "@/components/devotionals/DevotionalComments";
import DevotionalBanner from "@/components/devotionals/DevotionalBanner";
import DevotionalArchive from "@/components/devotionals/DevotionalArchive";
import CTASection from "@/components/sections/CTASection";
import { devotionalDateKey, formatDevotionalDate } from "@/lib/devotional-date";

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
      images: [],
    },
    twitter: {
      card: "summary" as const,
      title: devotional.title,
      description,
      images: [],
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

  const allPublished = await getPublishedDevotionals();
  const dateSlugMap: Record<string, string> = {};
  for (const entry of allPublished) {
    dateSlugMap[devotionalDateKey(entry.publicationDate)] = entry.slug;
  }

  let comments: Awaited<ReturnType<typeof getCommentsByDevotionalId>> = [];
  try {
    comments = await getCommentsByDevotionalId(devotional.id);
  } catch {
    // Comments are non-critical — continue without them.
  }

  const dateStr = formatDevotionalDate(devotional.publicationDate);

  return (
    <>
      <DevotionalBanner />
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
            <Calendar className="h-4 w-4 text-accent" />
            {dateStr}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4 text-accent" />
            {devotional.author}
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
            {devotional.reflection}
          </p>
          <div className="my-5 h-px bg-accent/30" />
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Prayer</p>
          <p className="mt-3 text-base leading-relaxed italic text-primary/80 sm:text-lg">
            {devotional.prayer}
          </p>
        </div>

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

        {/* Comments */}
        <DevotionalComments
          devotionalSlug={devotional.slug}
          initialComments={comments}
        />

        {/* Submit your devotional CTA */}
        <div className="mt-10 rounded-2xl bg-primary/5 px-6 py-8 text-center sm:px-8">
          <p className="text-lg font-bold text-primary">
            Would you like us to publish your devotional thoughts?
          </p>
          <p className="mt-3 text-sm leading-relaxed text-primary/70">
            Please reach us through{" "}
            <a
              href="mailto:javidverse@gmail.com"
              className="font-semibold text-accent underline transition hover:text-primary"
            >
              javidverse@gmail.com
            </a>{" "}
            or click the{" "}
            <Link
              href="/contact"
              className="font-semibold text-accent underline transition hover:text-primary"
            >
              Contact Us
            </Link>{" "}
            button.
          </p>
        </div>

        <div className="mt-12 border-t border-primary/10 pt-8" />

        <div className="mt-10 rounded-2xl bg-accent/10 px-6 py-8 text-center sm:px-8">
          <p className="text-lg font-bold text-primary">Read today&apos;s devotional</p>
          <p className="mt-2 text-sm text-primary/60">
            Start your day with the latest encouragement from God&apos;s Word.
          </p>
          <Link
            href="/devotionals"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-primary transition hover:shadow-md"
          >
            Go to Today&apos;s Devotional
          </Link>
        </div>
        </div>
      </section>
      <DevotionalArchive allPublished={allPublished} dateSlugMap={dateSlugMap} />
      <CTASection
        title="Need a Creative Partner?"
        description="From book design to websites, JavidVerse helps bring your ideas to life with clarity and purpose."
        href="/contact"
        action="Get in Touch"
        theme="light"
      />
    </>
  );
}
