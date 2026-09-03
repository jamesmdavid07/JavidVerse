// Devotional create/edit form with all fields.
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import DevotionalEditor from "./DevotionalEditor";
import type { DevotionalStatus } from "@/lib/devotionals";
import { isMWFDate, getDevotionalDayShort, getMWFLabel, getNextMWFOptions, getNextMWFDate } from "@/lib/devotional-date";

interface DevotionalFormData {
  title: string;
  author: string;
  publicationDate: string;
  mainBibleRef: string;
  bibleTranslation: string;
  fullVerse: string;
  content: string;
  reflection: string;
  prayer: string;
  status: DevotionalStatus;
}

interface Props {
  initialData?: DevotionalFormData & { id: number; slug: string };
  mode: "create" | "edit";
}

const EMPTY: DevotionalFormData = {
  title: "",
  author: "Written by James David",
  publicationDate: new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Manila" }),
  mainBibleRef: "",
  bibleTranslation: "NIV",
  fullVerse: "",
  content: "",
  reflection: "",
  prayer: "",
  status: "scheduled",
};

const inputClass =
  "mt-1 block w-full rounded-lg border border-[#042D6D]/15 bg-white px-3 py-2.5 text-sm text-[#042D6D] shadow-sm transition placeholder:text-[#042D6D]/30 focus:border-[#042D6D] focus:outline-none focus:ring-2 focus:ring-[#042D6D]/10";

export default function DevotionalForm({ initialData, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<DevotionalFormData>(initialData || EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const nextOptions = useMemo(() => getNextMWFOptions(6), []);
  const isSelectedMWF = useMemo(() => (form.publicationDate ? isMWFDate(form.publicationDate) : false), [form.publicationDate]);
  const selectedDay = useMemo(() => (form.publicationDate ? getDevotionalDayShort(form.publicationDate) : ""), [form.publicationDate]);

  function updateField<K extends keyof DevotionalFormData>(
    key: K,
    value: DevotionalFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
    };

    try {
      const url =
        mode === "create"
          ? "/api/devotionals"
          : `/api/devotionals/${initialData!.slug}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      router.push("/admin/devotionals");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-[#042D6D]">Title *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          className={inputClass}
          required
        />
      </div>

      {/* Publication Date — M/W/F rhythm */}
      <div>
        <label className="block text-sm font-semibold text-[#042D6D]">Publication Date *</label>
        <input
          type="date"
          value={form.publicationDate}
          onChange={(e) => updateField("publicationDate", e.target.value)}
          className={inputClass}
          required
        />
        {/* M/W/F hint + validation */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${isSelectedMWF ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-800"}`}>
            {form.publicationDate ? `${selectedDay} — ${getMWFLabel(form.publicationDate)}` : "Pick a date"}
          </span>
          {!isSelectedMWF && form.publicationDate && (
            <span className="text-xs text-amber-700">Not a Mon/Wed/Fri — publishing will be off rhythm. Next MWF: {getNextMWFDate(form.publicationDate)}</span>
          )}
        </div>
        <p className="mt-2 text-xs leading-5 text-[#042D6D]/60">
          Weekly rhythm: <span className="font-semibold">Mon</span> — Biblical Person · <span className="font-semibold">Wed</span> — Midweek · <span className="font-semibold">Fri</span> — Reflection. Choose only Mon/Wed/Fri to stay on schedule.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {nextOptions.map((opt) => (
            <button
              key={opt.date}
              type="button"
              onClick={() => updateField("publicationDate", opt.date)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${form.publicationDate === opt.date ? "border-[#042D6D] bg-[#042D6D] text-white" : "border-[#042D6D]/15 bg-white text-[#042D6D] hover:bg-[#042D6D]/5"}`}
            >
              {opt.day} {opt.date.slice(5)}
            </button>
          ))}
        </div>
      </div>

      {/* Author */}
      <div>
        <label className="block text-sm font-semibold text-[#042D6D]">Author</label>
        <input
          type="text"
          value={form.author}
          onChange={(e) => updateField("author", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Bible reference + Translation row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-[#042D6D]">Main Bible Reference *</label>
          <input
            type="text"
            value={form.mainBibleRef}
            onChange={(e) => updateField("mainBibleRef", e.target.value)}
            placeholder="e.g. Psalm 34:18"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#042D6D]">Bible Translation</label>
          <input
            type="text"
            value={form.bibleTranslation}
            onChange={(e) => updateField("bibleTranslation", e.target.value)}
            placeholder="e.g. NIV"
            className={inputClass}
          />
        </div>
      </div>

      {/* Full verse */}
      <div>
        <label className="block text-sm font-semibold text-[#042D6D]">Full Bible Verse</label>
        <textarea
          value={form.fullVerse}
          onChange={(e) => updateField("fullVerse", e.target.value)}
          rows={2}
          className={inputClass}
        />
      </div>

      {/* Content editor */}
      <div>
        <label className="block text-sm font-semibold text-[#042D6D]">Devotional Content *</label>
        <div className="mt-1">
          <DevotionalEditor
            content={form.content}
            onChange={(html) => updateField("content", html)}
          />
        </div>
      </div>

      {/* Reflection */}
      <div>
        <label className="block text-sm font-semibold text-[#042D6D]">Reflections</label>
        <textarea
          value={form.reflection}
          onChange={(e) => updateField("reflection", e.target.value)}
          rows={3}
          placeholder="A reflection to encourage the reader..."
          className={inputClass}
        />
      </div>

      {/* Prayer */}
      <div>
        <label className="block text-sm font-semibold text-[#042D6D]">Prayer</label>
        <textarea
          value={form.prayer}
          onChange={(e) => updateField("prayer", e.target.value)}
          rows={3}
          placeholder="A closing prayer..."
          className={inputClass}
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-semibold text-[#042D6D]">Status</label>
        <select
          value={form.status}
          onChange={(e) =>
            updateField("status", e.target.value as DevotionalStatus)
          }
          className={inputClass}
        >
          <option value="scheduled">Schedule</option>
          <option value="published">Published</option>
        </select>
        <p className="mt-1 text-xs text-[#042D6D]/50">
          Scheduled devotionals go live automatically on the publication date.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 border-t border-[#042D6D]/10 pt-5 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-lg bg-[#042D6D] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#031f4d] hover:shadow-md disabled:opacity-50 sm:w-auto"
        >
          {saving
            ? "Saving..."
            : mode === "create"
            ? "Create Devotional"
            : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/devotionals")}
          className="w-full rounded-lg border border-[#042D6D]/15 px-6 py-2.5 text-sm font-medium text-[#042D6D]/60 transition hover:bg-[#042D6D]/5 sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
