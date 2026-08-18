// Devotional create/edit form with all fields.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DevotionalEditor from "./DevotionalEditor";
import { Plus, Trash2 } from "lucide-react";

interface DevotionalFormData {
  title: string;
  author: string;
  publicationDate: string;
  mainBibleRef: string;
  bibleTranslation: string;
  fullVerse: string;
  content: string;
  readMoreRefs: string[];
  status: "draft" | "published" | "scheduled";
}

interface Props {
  initialData?: DevotionalFormData & { id: number };
  mode: "create" | "edit";
}

const EMPTY: DevotionalFormData = {
  title: "",
  author: "Written by James M. David",
  publicationDate: new Date().toISOString().split("T")[0],
  mainBibleRef: "",
  bibleTranslation: "NIV",
  fullVerse: "",
  content: "",
  readMoreRefs: [""],
  status: "draft",
};

const inputClass =
  "mt-1 block w-full rounded-lg border border-[#042D6D]/15 bg-white px-3 py-2.5 text-sm text-[#042D6D] shadow-sm transition placeholder:text-[#042D6D]/30 focus:border-[#042D6D] focus:outline-none focus:ring-2 focus:ring-[#042D6D]/10";

export default function DevotionalForm({ initialData, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<DevotionalFormData>(initialData || EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof DevotionalFormData>(
    key: K,
    value: DevotionalFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addReadMoreRef() {
    setForm((prev) => ({ ...prev, readMoreRefs: [...prev.readMoreRefs, ""] }));
  }

  function removeReadMoreRef(index: number) {
    setForm((prev) => ({
      ...prev,
      readMoreRefs: prev.readMoreRefs.filter((_, i) => i !== index),
    }));
  }

  function updateReadMoreRef(index: number, value: string) {
    setForm((prev) => ({
      ...prev,
      readMoreRefs: prev.readMoreRefs.map((r, i) => (i === index ? value : r)),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      readMoreRefs: form.readMoreRefs.filter((r) => r.trim() !== ""),
    };

    try {
      const url =
        mode === "create"
          ? "/api/devotionals"
          : `/api/devotionals/${initialData!.id}`;
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

      {/* Author + Date row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-[#042D6D]">Author</label>
          <input
            type="text"
            value={form.author}
            onChange={(e) => updateField("author", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#042D6D]">Publication Date *</label>
          <input
            type="date"
            value={form.publicationDate}
            onChange={(e) => updateField("publicationDate", e.target.value)}
            className={inputClass}
            required
          />
        </div>
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

      {/* Read More Bible References */}
      <div>
        <label className="block text-sm font-semibold text-[#042D6D]">
          Read More Bible References
        </label>
        <p className="mt-0.5 text-xs text-[#042D6D]/40">
          Additional references displayed below the devotional.
        </p>
        <div className="mt-2 space-y-2">
          {form.readMoreRefs.map((ref, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={ref}
                onChange={(e) => updateReadMoreRef(i, e.target.value)}
                placeholder="e.g. Deuteronomy 31:6"
                className={inputClass}
                style={{ marginTop: 0 }}
              />
              {form.readMoreRefs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeReadMoreRef(i)}
                  className="shrink-0 rounded-lg p-2 text-[#042D6D]/30 transition hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addReadMoreRef}
            className="flex items-center gap-1 text-sm font-semibold text-[#FCB005] hover:underline"
          >
            <Plus className="h-3.5 w-3.5" />
            Add reference
          </button>
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-semibold text-[#042D6D]">Status</label>
        <select
          value={form.status}
          onChange={(e) =>
            updateField("status", e.target.value as "draft" | "published" | "scheduled")
          }
          className={inputClass}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
        </select>
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
