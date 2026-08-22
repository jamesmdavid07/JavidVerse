// Dashboard — table of all devotionals with actions.
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, EyeOff } from "lucide-react";
import type { DevotionalStatus } from "@/lib/devotionals";

interface DevotionalEntry {
  id: number;
  slug: string;
  title: string;
  author: string;
  publicationDate: string;
  status: DevotionalStatus;
}

export default function DevotionalTable() {
  const router = useRouter();
  const [devotionals, setDevotionals] = useState<DevotionalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingSlug, setUpdatingSlug] = useState<string | null>(null);

  async function loadDevotionals() {
    try {
      setError("");
      const res = await fetch("/api/devotionals?all=true");
      const text = await res.text();
      let data: DevotionalEntry[] | { error?: string } = [];
      try {
        data = text ? JSON.parse(text) : [];
      } catch {
        throw new Error(`The server returned an invalid response (${res.status}).`);
      }
      if (!res.ok || !Array.isArray(data)) {
        throw new Error((data as { error?: string }).error || `Unable to load devotionals (${res.status}).`);
      }
      setDevotionals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load devotionals.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDevotionals();
  }, [router]);

  async function setStatus(slug: string, status: DevotionalStatus, unpublish = false) {
    setUpdatingSlug(slug);
    try {
      await fetch(`/api/devotionals/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, unpublish }),
      });
      await loadDevotionals();
    } finally {
      setUpdatingSlug(null);
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Manila",
    });
  }

  function statusBadge(status: string) {
    const styles =
      status === "published"
        ? "bg-emerald-100 text-emerald-700"
        : status === "scheduled"
        ? "bg-[#FCB005]/20 text-[#042D6D]"
        : "bg-[#042D6D]/10 text-[#042D6D]/60";
    return (
      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles}`}>
        {status === "scheduled" ? "Schedule" : "Published"}
      </span>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-white">All Devotionals</h2>
        <button
          onClick={() => router.push("/admin/devotionals/new")}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#FCB005] px-5 py-2.5 text-sm font-semibold text-[#042D6D] shadow-sm transition hover:bg-[#e5a804] hover:shadow-md"
        >
          <Plus className="h-4 w-4" />
          New Devotional
        </button>
      </div>

      {devotionals.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-white/20 bg-white/10 py-12 text-center backdrop-blur-sm">
          <p className="text-white/50">No devotionals yet.</p>
          <button
            onClick={() => router.push("/admin/devotionals/new")}
            className="mt-3 text-sm font-semibold text-[#FCB005] hover:underline"
          >
            Create your first devotional
          </button>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-white shadow-lg md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#031f4d]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-white/80">Date</th>
                  <th className="px-4 py-3 font-semibold text-white/80">Title</th>
                  <th className="px-4 py-3 font-semibold text-white/80">Status</th>
                  <th className="px-4 py-3 font-semibold text-white/80">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {devotionals.map((d) => (
                  <tr key={d.id} className="transition hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-3 text-gray-400">
                      {formatDate(d.publicationDate)}
                    </td>
                    <td className="px-4 py-3 font-medium text-[#042D6D]">
                      {d.title}
                    </td>
                    <td className="px-4 py-3">{statusBadge(d.status)}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => router.push(`/admin/devotionals/${d.slug}/edit`)}
                          className="inline-flex items-center gap-1 rounded-lg bg-[#042D6D]/5 px-3 py-1.5 text-xs font-semibold text-[#042D6D] transition hover:bg-[#042D6D]/10"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        {d.status === "published" && (
                          <button
                            onClick={() => setStatus(d.slug, "scheduled", true)}
                            disabled={updatingSlug === d.slug}
                            className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500 transition hover:bg-gray-200 disabled:opacity-50"
                          >
                            <EyeOff className="h-3.5 w-3.5" />
                            Unpublish
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {devotionals.map((d) => (
              <div
                key={d.id}
                className="rounded-2xl border border-white/10 bg-white p-4 shadow-lg"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold leading-snug text-[#042D6D]">
                    {d.title}
                  </h3>
                  {statusBadge(d.status)}
                </div>
                <p className="mb-3 text-xs text-gray-400">
                  {formatDate(d.publicationDate)}
                </p>
                <div className="flex items-center gap-2 border-t border-gray-100 pt-2">
                   <button
                    onClick={() => router.push(`/admin/devotionals/${d.slug}/edit`)}
                    className="flex items-center gap-1 rounded-lg bg-[#042D6D]/5 px-3 py-1.5 text-xs font-semibold text-[#042D6D] transition hover:bg-[#042D6D]/10"
                  >
                    <Pencil className="h-3 w-3" />
                    Edit
                  </button>
                  {d.status === "published" && (
                    <button
                       onClick={() => setStatus(d.slug, "scheduled", true)}
                      disabled={updatingSlug === d.slug}
                      className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500 transition hover:bg-gray-200 disabled:opacity-50"
                    >
                      <EyeOff className="h-3 w-3" />
                      Unpublish
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
