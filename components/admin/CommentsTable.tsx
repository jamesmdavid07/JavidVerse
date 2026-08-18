// Dashboard — table of all comments with actions.
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, ExternalLink } from "lucide-react";

interface CommentEntry {
  id: number;
  devotionalId: number;
  parentId: number | null;
  name: string;
  comment: string;
  createdAt: string;
  devotionalTitle: string;
  devotionalSlug: string;
}

export default function CommentsTable() {
  const router = useRouter();
  const [comments, setComments] = useState<CommentEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function loadComments() {
    try {
      const res = await fetch("/api/admin/comments");
      const data = await res.json();
      if (Array.isArray(data)) {
        setComments(data);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadComments();
  }, [router]);

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this comment?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/comments/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c.id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Manila",
    });
  }

  function truncate(text: string, max: number) {
    return text.length > max ? text.slice(0, max) + "..." : text;
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
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">All Comments</h2>
        <p className="mt-1 text-sm text-white/50">
          {comments.length} comment{comments.length !== 1 ? "s" : ""} across all
          devotionals
        </p>
      </div>

      {comments.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-white/20 bg-white/10 py-12 text-center backdrop-blur-sm">
          <p className="text-white/50">No comments yet.</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-white shadow-lg md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#031f4d]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-white/80">
                    Name
                  </th>
                  <th className="px-4 py-3 font-semibold text-white/80">
                    Comment
                  </th>
                  <th className="px-4 py-3 font-semibold text-white/80">
                    Devotional
                  </th>
                  <th className="px-4 py-3 font-semibold text-white/80">
                    Date
                  </th>
                  <th className="px-4 py-3 font-semibold text-white/80">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comments.map((c) => (
                  <tr key={c.id} className="transition hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-[#042D6D]">
                      {c.name}
                      {c.parentId && (
                        <span className="ml-1 text-xs text-gray-400">
                          (reply)
                        </span>
                      )}
                    </td>
                    <td className="max-w-xs px-4 py-3 text-gray-600">
                      {truncate(c.comment, 80)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <a
                        href={`/devotionals/${c.devotionalSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-[#042D6D] transition hover:text-[#FCB005]"
                      >
                        {truncate(c.devotionalTitle, 30)}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-400">
                      {formatDate(c.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <button
                        onClick={() => handleDelete(c.id)}
                        disabled={deletingId === c.id}
                        className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {deletingId === c.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {comments.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-white/10 bg-white p-4 shadow-lg"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold leading-snug text-[#042D6D]">
                    {c.name}
                    {c.parentId && (
                      <span className="ml-1 text-xs font-normal text-gray-400">
                        (reply)
                      </span>
                    )}
                  </h3>
                  <span className="shrink-0 text-xs text-gray-400">
                    {formatDate(c.createdAt)}
                  </span>
                </div>
                <p className="mb-2 text-sm text-gray-600">
                  &ldquo;{c.comment}&rdquo;
                </p>
                <p className="mb-3 text-xs text-gray-400">
                  On:{" "}
                  <a
                    href={`/devotionals/${c.devotionalSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#042D6D] underline transition hover:text-[#FCB005]"
                  >
                    {c.devotionalTitle}
                  </a>
                </p>
                <div className="border-t border-gray-100 pt-2">
                  <button
                    onClick={() => handleDelete(c.id)}
                    disabled={deletingId === c.id}
                    className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                  >
                    <Trash2 className="h-3 w-3" />
                    {deletingId === c.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
