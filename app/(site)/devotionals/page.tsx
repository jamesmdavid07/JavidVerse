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

  return (
    <>
      <DevotionalBanner />
      <DevotionalBrowser latest={latest} allPublished={allPublished} />
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
