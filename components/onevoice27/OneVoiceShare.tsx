"use client";

import { useCallback, useState } from "react";
import { Check, Copy, Share2, X } from "lucide-react";

export default function OneVoiceShare({ anchor }: { anchor?: string }) {
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const getShareUrl = useCallback(() => {
    if (shareUrl) return shareUrl;
    if (typeof window !== "undefined") {
      const base = `${window.location.origin}${window.location.pathname}`;
      return anchor ? `${base}#${anchor}` : window.location.href;
    }
    return "";
  }, [shareUrl, anchor]);

  const copyLink = useCallback(async () => {
    const url = getShareUrl();
    if (!url) return;
    if (!shareUrl) setShareUrl(url);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }, [getShareUrl, shareUrl]);

  return (
    <div className="mt-3 lg:mt-2.5">
      <button
        type="button"
        onClick={() => setShowShare((v) => !v)}
        className="inline-flex items-center gap-2 rounded-xl border border-primary/15 bg-white px-6 py-3 text-sm font-bold text-primary shadow-sm hover:border-accent/50 hover:bg-light"
      >
        <Share2 className="h-4 w-4" /> Share
      </button>

      {showShare && (
        <div className="mt-3 max-w-xl rounded-2xl border border-primary/10 bg-white p-4 shadow-sm sm:p-5 lg:mt-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-primary">Share this frame</p>
            <button
              type="button"
              onClick={() => setShowShare(false)}
              aria-label="Close share panel"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-primary/60 hover:bg-light hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1 text-xs leading-5 text-primary/60">Copy the link to share the OneVoice27 Photo Frame with others.</p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              readOnly
              value={getShareUrl()}
              onFocus={(e) => e.target.select()}
              placeholder="https://javidverse.com/graphic-design"
              className="min-w-0 flex-1 rounded-xl border border-primary/15 bg-white px-3 py-2.5 text-sm text-primary/80 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              aria-label="OneVoice27 page link"
            />
            <button
              type="button"
              onClick={copyLink}
              className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold shadow-sm transition ${copied ? "bg-green-600 text-white" : "bg-primary text-white hover:bg-primary/90"}`}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
