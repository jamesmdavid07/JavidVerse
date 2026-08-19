"use client";

import { useState, useCallback } from "react";
import { MessageCircle, Send, ThumbsUp } from "lucide-react";

interface CommentData {
  id: number;
  devotionalId: number;
  parentId: number | null;
  name: string;
  comment: string;
  createdAt: string;
  reactionCount: number;
}

interface DevotionalCommentsProps {
  devotionalSlug: string;
  initialComments: CommentData[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Manila",
  });
}

function countWords(value: string) {
  return value.split(/\s+/).filter(Boolean).length;
}

function ReactionButton({
  comment,
  state,
  loading,
  onReact,
}: {
  comment: CommentData;
  state: { count: number; reacted: boolean };
  loading: boolean;
  onReact: (commentId: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onReact(comment.id)}
      disabled={loading}
      aria-label={state.reacted ? "Remove thumbs up" : "Give thumbs up"}
      className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold transition disabled:opacity-50 ${
        state.reacted ? "text-accent" : "text-primary/40 hover:text-accent"
      }`}
    >
      <ThumbsUp className={`h-3.5 w-3.5 ${state.reacted ? "fill-current" : ""}`} />
      {state.count > 0 ? state.count : "Like"}
    </button>
  );
}

export default function DevotionalComments({
  devotionalSlug,
  initialComments,
}: DevotionalCommentsProps) {
  const [comments, setComments] = useState<CommentData[]>(initialComments);
  const [reactionState, setReactionState] = useState<Record<number, { count: number; reacted: boolean }>>(
    () => Object.fromEntries(initialComments.map((comment) => [comment.id, { count: comment.reactionCount, reacted: false }]))
  );
  const [reactingTo, setReactingTo] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyName, setReplyName] = useState("");
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [replySubmitting, setReplySubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const topComments = comments.filter((c) => c.parentId === null);
  const getReplies = useCallback(
    (parentId: number) =>
      comments.filter((c) => c.parentId === parentId),
    [comments]
  );

  async function handleReaction(commentId: number) {
    if (reactingTo === commentId) return;
    setReactingTo(commentId);

    try {
      const res = await fetch(`/api/comments/${commentId}/reaction`, { method: "POST" });
      if (!res.ok) return;
      const data = await res.json();
      setReactionState((prev) => ({
        ...prev,
        [commentId]: { count: data.reactionCount, reacted: data.reacted },
      }));
    } finally {
      setReactingTo(null);
    }
  }

  function reactionFor(comment: CommentData) {
    return reactionState[comment.id] ?? { count: comment.reactionCount, reacted: false };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(`/api/devotionals/${devotionalSlug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, comment: commentText, website: "" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to post comment.");
        return;
      }

      setComments((prev) => [data, ...prev]);
      setReactionState((prev) => ({ ...prev, [data.id]: { count: 0, reacted: false } }));
      setName("");
      setCommentText("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReply(e: React.FormEvent, parentId: number) {
    e.preventDefault();
    setError("");
    setReplySubmitting(true);

    try {
      const res = await fetch(`/api/devotionals/${devotionalSlug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: replyName,
          comment: replyText,
          parentId,
          website: "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to post reply.");
        return;
      }

      setComments((prev) => [data, ...prev]);
      setReactionState((prev) => ({ ...prev, [data.id]: { count: 0, reacted: false } }));
      setReplyName("");
      setReplyText("");
      setReplyingTo(null);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setReplySubmitting(false);
    }
  }

  return (
    <div className="mt-10">
      {/* Section heading */}
      <div className="mb-6 flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-accent" />
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
          Leave a Comment
        </p>
      </div>

      <p className="mb-6 text-sm text-primary/60">
        Share your thoughts or how this devotional spoke to you.
      </p>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mb-8">
        {/* Honeypot — hidden from real users */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor="comment-website">Website</label>
          <input
            id="comment-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="comment-name"
              className="mb-1.5 block text-sm font-semibold text-primary"
            >
              Name
            </label>
            <input
              id="comment-name"
              type="text"
              required
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border border-primary/20 bg-white px-4 py-2.5 text-sm text-primary placeholder:text-primary/40 transition focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="comment-text"
                className="text-sm font-semibold text-primary"
              >
                Comment
              </label>
              <span
                className={`text-xs ${
                  countWords(commentText) > 50
                    ? "font-bold text-red-500"
                    : "text-primary/40"
                }`}
              >
                {countWords(commentText)} / 50 words
              </span>
            </div>
            <textarea
              id="comment-text"
              required
              rows={4}
              maxLength={2000}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
              className="w-full resize-none rounded-lg border border-primary/20 bg-white px-4 py-2.5 text-sm text-primary placeholder:text-primary/40 transition focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-lg bg-emerald-50 px-4 py-2.5 text-sm text-emerald-600">
              Comment posted successfully.
            </p>
          )}

          <button
            type="submit"
            disabled={
              submitting || countWords(commentText) > 50 || !name.trim() || !commentText.trim()
            }
            className="btn-primary gap-2 text-sm"
          >
            <Send className="h-4 w-4" />
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>

      {/* Comments list */}
      <div className="border-t border-primary/10 pt-8">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-accent">
          Comments
        </p>

        {topComments.length === 0 ? (
          <p className="py-8 text-center text-sm text-primary/40">
            Be the first to share your thoughts.
          </p>
        ) : (
          <div className="space-y-0">
            {topComments.map((c) => {
              const replies = getReplies(c.id);
              return (
                <div key={c.id}>
                  {/* Top-level comment */}
                  <div className="border-b border-primary/10 py-5">
                    <p className="text-sm font-bold text-primary">{c.name}</p>
                    <p className="mt-0.5 text-xs text-primary/50">
                      {formatDate(c.createdAt)}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-primary/80">
                      &ldquo;{c.comment}&rdquo;
                    </p>
                    <div className="mt-2 flex items-center gap-4">
                      <button
                        onClick={() =>
                          setReplyingTo(replyingTo === c.id ? null : c.id)
                        }
                        className="text-xs font-semibold text-accent transition hover:text-primary"
                      >
                        Reply
                      </button>
                      <ReactionButton
                        comment={c}
                        state={reactionFor(c)}
                        loading={reactingTo === c.id}
                        onReact={handleReaction}
                      />
                    </div>
                  </div>

                  {/* Replies */}
                  {replies.length > 0 && (
                    <div className="ml-6 border-l-2 border-accent/20">
                      {replies.map((r) => (
                        <div
                          key={r.id}
                          className="border-b border-primary/5 px-5 py-4"
                        >
                          <p className="text-sm font-bold text-primary">
                            {r.name}
                          </p>
                          <p className="mt-0.5 text-xs text-primary/50">
                            {formatDate(r.createdAt)}
                          </p>
                           <p className="mt-2 text-sm leading-relaxed text-primary/80">
                             &ldquo;{r.comment}&rdquo;
                           </p>
                           <ReactionButton
                             comment={r}
                             state={reactionFor(r)}
                             loading={reactingTo === r.id}
                             onReact={handleReaction}
                           />
                         </div>
                      ))}
                    </div>
                  )}

                  {/* Reply form */}
                  {replyingTo === c.id && (
                    <div className="ml-6 border-l-2 border-accent/20 bg-accent/5 px-5 py-4">
                      <form
                        onSubmit={(e) => handleReply(e, c.id)}
                        className="space-y-3"
                      >
                        <input
                          type="text"
                          required
                          maxLength={100}
                          value={replyName}
                          onChange={(e) => setReplyName(e.target.value)}
                          placeholder="Your name"
                          className="w-full rounded-lg border border-primary/20 bg-white px-4 py-2 text-sm text-primary placeholder:text-primary/40 transition focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none"
                        />
                        <div className="flex items-center justify-between">
                          <textarea
                            required
                            rows={3}
                            maxLength={2000}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply..."
                            className="w-full resize-none rounded-lg border border-primary/20 bg-white px-4 py-2 text-sm text-primary placeholder:text-primary/40 transition focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs ${
                              countWords(replyText) > 50
                                ? "font-bold text-red-500"
                                : "text-primary/40"
                            }`}
                          >
                            {countWords(replyText)} / 50 words
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="submit"
                            disabled={
                              replySubmitting ||
                              countWords(replyText) > 50 ||
                              !replyName.trim() ||
                              !replyText.trim()
                            }
                            className="btn-primary gap-2 px-5 py-2 text-xs"
                          >
                            <Send className="h-3.5 w-3.5" />
                            {replySubmitting ? "Posting..." : "Post Reply"}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyName("");
                              setReplyText("");
                            }}
                            className="text-xs font-semibold text-primary/50 transition hover:text-primary"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
