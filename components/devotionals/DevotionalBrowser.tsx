"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Calendar, User, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import DevotionalContent from "./DevotionalContent";
import DevotionalShare from "./DevotionalShare";
import DevotionalComments from "./DevotionalComments";
import DevotionalArchive from "./DevotionalArchive";

interface DevotionalData {
  id: number;
  slug: string;
  title: string;
  author: string;
  publicationDate: string;
  mainBibleRef: string;
  bibleTranslation: string;
  fullVerse: string;
  content: string;
  reflection: string;
  prayer: string;
  readMoreRefs: string[];
}

interface DevotionalIndexEntry {
  id: number;
  slug: string;
  title: string;
  author: string;
  publicationDate: string;
  status: "draft" | "published" | "scheduled";
}

interface CommentData {
  id: number;
  devotionalId: number;
  parentId: number | null;
  name: string;
  comment: string;
  createdAt: string;
}

interface AdjacentEntry {
  id: number;
  slug: string;
  title: string;
}

interface DevotionalBrowserProps {
  latest: DevotionalData | null;
  allPublished: DevotionalIndexEntry[];
  dateSlugMap: Record<string, string>;
  initialComments: CommentData[];
  prev: AdjacentEntry | null;
  next: AdjacentEntry | null;
}

export default function DevotionalBrowser({
  latest,
  allPublished,
  dateSlugMap,
  initialComments,
  prev,
  next,
}: DevotionalBrowserProps) {
  const searchParams = useSearchParams();
  const unavailableDate = searchParams.get("unavailable");

  function formatUnavailableDate(dateStr: string) {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "Asia/Manila",
    });
  }

  if (!latest) {
    return (
      <section className="px-6 py-16 text-center sm:px-8 sm:py-20 lg:px-12">
        <BookOpen className="mx-auto mb-4 h-10 w-10 text-accent" />
        <p className="text-lg font-semibold text-primary">No devotionals published yet.</p>
        <p className="mt-2 text-primary/60">Check back soon for daily encouragement from God&apos;s Word.</p>
      </section>
    );
  }

  if (unavailableDate) {
    return (
      <>
        <section className="px-6 py-16 text-center sm:px-8 sm:py-20 lg:px-12">
          <BookOpen className="mx-auto mb-4 h-10 w-10 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Devotional Not Yet Available</h2>
          <p className="mt-3 text-primary/60">
            The devotional for <strong>{formatUnavailableDate(unavailableDate)}</strong> has not been published yet.
          </p>
          <p className="mt-2 text-primary/60">Check back soon for daily encouragement from God&apos;s Word.</p>
          <Link
            href="/devotionals"
            className="btn-primary mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-primary transition hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Go to Today&apos;s Devotional
          </Link>
        </section>

        <DevotionalArchive
          allPublished={allPublished}
          dateSlugMap={dateSlugMap}
        />
      </>
    );
  }

  return (
    <>
      {/* Devotional content area */}
      <DevotionalDisplay
        devotional={latest}
        comments={initialComments}
        prev={prev}
        next={next}
      />

      {/* Full-width archive */}
      <DevotionalArchive
        allPublished={allPublished}
        dateSlugMap={dateSlugMap}
      />
    </>
  );
}

// Renders the full devotional content — identical layout to the individual page.
function DevotionalDisplay({
  devotional,
  comments,
  prev,
  next,
}: {
  devotional: DevotionalData;
  comments: CommentData[];
  prev: AdjacentEntry | null;
  next: AdjacentEntry | null;
}) {
  const dateStr = new Date(devotional.publicationDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Manila",
  });

  return (
    <section className="px-6 py-12 sm:px-8 sm:py-16 lg:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-primary/60">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-accent" />
            {dateStr}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4 text-accent" />
            Written by James David
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

        {/* Comments — server-rendered, persistent */}
        <DevotionalComments
          devotionalId={devotional.id}
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

        {/* Go to today's devotional */}
        <div className="mt-10 rounded-2xl bg-accent/10 px-6 py-8 text-center sm:px-8">
          <p className="text-lg font-bold text-primary">
            Read today&apos;s devotional
          </p>
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
  );
}
