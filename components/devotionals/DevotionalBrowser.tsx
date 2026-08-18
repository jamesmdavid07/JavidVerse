"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Calendar, User, ArrowLeft, BookOpen } from "lucide-react";
import DevotionalContent from "./DevotionalContent";
import DevotionalBibleRefs from "./DevotionalBibleRefs";
import DevotionalShare from "./DevotionalShare";
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

interface DevotionalBrowserProps {
  latest: DevotionalData | null;
  allPublished: DevotionalIndexEntry[];
}

export default function DevotionalBrowser({ latest, allPublished }: DevotionalBrowserProps) {
  const [active, setActive] = useState<DevotionalData | null>(latest);
  const [loading, setLoading] = useState(false);
  const [notAvailable, setNotAvailable] = useState<string | null>(null);
  const devotionalRef = useRef<HTMLDivElement>(null);

  const handleDateClick = useCallback(async (year: number, month: number, day: number) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    const label = `${monthNames[month - 1]} ${day}, ${year}`;

    setLoading(true);
    setNotAvailable(null);

    try {
      const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const res = await fetch(`/api/devotionals?date=${dateKey}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.id) {
          setActive(data);
          setNotAvailable(null);
        } else {
          setActive(null);
          setNotAvailable(label);
        }
      } else {
        setActive(null);
        setNotAvailable(label);
      }
    } catch {
      setActive(null);
      setNotAvailable(label);
    } finally {
      setLoading(false);
      devotionalRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleBackToToday = useCallback(() => {
    setActive(latest);
    setNotAvailable(null);
    devotionalRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [latest]);

  if (!latest) {
    return (
      <section className="px-6 py-16 text-center sm:px-8 sm:py-20 lg:px-12">
        <BookOpen className="mx-auto mb-4 h-10 w-10 text-accent" />
        <p className="text-lg font-semibold text-primary">No devotionals published yet.</p>
        <p className="mt-2 text-primary/60">Check back soon for daily encouragement from God&apos;s Word.</p>
      </section>
    );
  }

  return (
    <>
      {/* Devotional content area */}
      <div ref={devotionalRef}>
        {loading ? (
          <section className="px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
              <p className="text-sm text-primary/50">Loading devotional...</p>
            </div>
          </section>
        ) : notAvailable ? (
          <section className="px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/5">
                <Calendar className="h-6 w-6 text-primary/40" />
              </div>
              <p className="text-lg font-semibold text-primary">No devotional available for {notAvailable}</p>
              <p className="mt-2 text-primary/60">Check back soon for encouragement from God&apos;s Word.</p>
              <button
                onClick={handleBackToToday}
                className="btn-primary mt-6 inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Today&apos;s Devotional
              </button>
            </div>
          </section>
        ) : active ? (
          <DevotionalDisplay devotional={active} />
        ) : null}
      </div>

      {/* Full-width archive */}
      <DevotionalArchive
        allPublished={allPublished}
        onDateClick={handleDateClick}
      />
    </>
  );
}

// Renders the full devotional content.
function DevotionalDisplay({ devotional }: { devotional: DevotionalData }) {
  const dateStr = new Date(devotional.publicationDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="px-6 py-12 sm:px-8 sm:py-16 lg:px-12">
      <div className="mx-auto max-w-4xl">
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
        <h2 className="text-3xl font-bold leading-tight text-primary sm:text-4xl">
          {devotional.title}
        </h2>

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
          <DevotionalShare title={devotional.title} slug={devotional.slug} />
        </div>

        {/* Author card */}
        <div className="mt-10 flex flex-col items-center gap-5 rounded-2xl bg-primary/5 px-6 py-6 sm:flex-row sm:items-start sm:px-8">
          <Image
            src="/Devotionals/Jhen-Moreno.png"
            alt="Jhen Moreno"
            width={128}
            height={128}
            className="h-28 w-28 shrink-0 rounded-full object-cover object-[center_15%] ring-2 ring-accent/30"
          />
          <div className="text-center sm:text-left">
            <p className="text-lg font-bold text-primary">Jhen Moreno</p>
            <p className="mt-2 text-sm leading-relaxed text-primary/70">
              Jhen Moreno is a humble servant of God, committed in sharing God&apos;s messages to enhance the mission.
            </p>
            <p className="mt-2 text-xs text-primary/50">
              Published by JavidVerse with permission.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
