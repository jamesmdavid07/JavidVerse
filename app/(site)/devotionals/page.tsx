// Devotionals page — banner + full devotional + calendar archive.
import { getLatestDevotional, getPublishedDevotionals } from "@/lib/devotionals";
import DevotionalBanner from "@/components/devotionals/DevotionalBanner";
import DevotionalBrowser from "@/components/devotionals/DevotionalBrowser";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "Daily Devotionals",
  description:
    "Spend time each day in God's Word through simple, encouraging, Christ-centered devotionals that inspire faith, hope, and a deeper walk with God.",
};

export default async function DevotionalsPage() {
  const latest = await getLatestDevotional();
  const allPublished = await getPublishedDevotionals();

  // Build a date → slug map for the archive calendar links.
  const dateSlugMap: Record<string, string> = {};
  for (const entry of allPublished) {
    const d = new Date(entry.publicationDate);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    dateSlugMap[key] = entry.slug;
  }

  return (
    <>
      <DevotionalBanner />
      <DevotionalBrowser latest={latest} allPublished={allPublished} dateSlugMap={dateSlugMap} />
      <CTASection
        title="Need a Creative Partner?"
        description="From book design to websites, JavidVerse helps bring your ideas to life with clarity and purpose."
        href="/contact"
        action="Get in Touch"
        theme="primary"
      />
    </>
  );
}
