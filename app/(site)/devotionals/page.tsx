// Devotionals page — banner + full devotional (today's) + calendar archive.
import { getLatestDevotional, getPublishedDevotionals } from "@/lib/devotionals";
import { getCommentsByDevotionalId } from "@/lib/comments";
import DevotionalBanner from "@/components/devotionals/DevotionalBanner";
import DevotionalBrowser from "@/components/devotionals/DevotionalBrowser";
import CTASection from "@/components/sections/CTASection";
import { BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Daily Devotionals",
  description:
    "Spend time each day in God's Word through simple, encouraging, Christ-centered devotionals that inspire faith, hope, and a deeper walk with God.",
};

export default async function DevotionalsPage() {
  let latest = null;
  let allPublished: { id: number; slug: string; title: string; author: string; publicationDate: string; status: "draft" | "published" | "scheduled" }[] = [];

  try {
    latest = await getLatestDevotional();
    allPublished = await getPublishedDevotionals();
  } catch (err) {
    console.error("Failed to load devotionals from database:", err);
  }

  // Build a date → slug map for the archive calendar links.
  const dateSlugMap: Record<string, string> = {};
  for (const entry of allPublished) {
    const d = new Date(entry.publicationDate);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    dateSlugMap[key] = entry.slug;
  }

  // Fetch comments and adjacent devotionals for the latest devotional.
  let comments: { id: number; devotionalId: number; parentId: number | null; name: string; comment: string; createdAt: string; reactionCount: number }[] = [];

  if (latest) {
    try {
      comments = await getCommentsByDevotionalId(latest.id);
    } catch {
      // Comments are non-critical.
    }
  }

  return (
    <>
      <DevotionalBanner />
      {latest ? (
        <DevotionalBrowser
          latest={latest}
          allPublished={allPublished}
          dateSlugMap={dateSlugMap}
          initialComments={comments}
        />
      ) : (
        <section className="px-6 py-16 text-center sm:px-8 sm:py-20 lg:px-12">
          <BookOpen className="mx-auto mb-4 h-10 w-10 text-accent" />
          <p className="text-lg font-semibold text-primary">Devotionals are temporarily unavailable.</p>
          <p className="mt-2 text-primary/60">Please try again shortly.</p>
        </section>
      )}
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
