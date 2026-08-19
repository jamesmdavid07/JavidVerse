"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DevotionalForm from "@/components/admin/DevotionalForm";

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
  status: "draft" | "published" | "scheduled";
}

export default function EditDevotionalPage() {
  const params = useParams();
  const router = useRouter();
  const [devotional, setDevotional] = useState<DevotionalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/devotionals/${params.slug}?admin=true`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then(setDevotional)
      .catch(() => router.push("/admin/devotionals"))
      .finally(() => setLoading(false));
  }, [params.slug, router]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  if (!devotional) return null;

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-[#FCB005]" />
        <h2 className="text-xl font-bold text-white">
          Edit: <span className="text-white/60">{devotional.title}</span>
        </h2>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white p-5 shadow-lg sm:p-6">
        <DevotionalForm mode="edit" initialData={devotional} />
      </div>
    </div>
  );
}
