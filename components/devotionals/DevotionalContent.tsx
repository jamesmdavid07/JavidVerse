"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { processDevotionalContent } from "@/lib/format-devotional-content";

interface DevotionalContentProps {
  html: string;
}

interface PopoverState {
  visible: boolean;
  x: number;
  y: number;
  text: string;
  reference: string;
  loading: boolean;
}

const verseCache = new Map<string, { text: string; reference: string }>();

export default function DevotionalContent({ html }: DevotionalContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [popover, setPopover] = useState<PopoverState>({
    visible: false, x: 0, y: 0, text: "", reference: "", loading: false,
  });

  const showPopover = useCallback((el: Element) => {
    const rect = el.getBoundingClientRect();
    const ref = el.getAttribute("data-ref");
    if (!ref) return;

    // Position above the element, centered
    const x = rect.left + rect.width / 2;
    const y = rect.top - 8;

    const cached = verseCache.get(ref);
    if (cached) {
      setPopover({ visible: true, x, y, text: cached.text, reference: cached.reference, loading: false });
    } else {
      setPopover({ visible: true, x, y, text: "", reference: ref, loading: true });
      fetch(`/api/bible?ref=${encodeURIComponent(ref)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.text) {
            verseCache.set(ref, { text: data.text, reference: data.reference });
            setPopover((prev) => (prev.visible && prev.reference === ref
              ? { ...prev, text: data.text, reference: data.reference, loading: false }
              : prev));
          } else {
            setPopover((prev) => (prev.reference === ref ? { ...prev, loading: false } : prev));
          }
        })
        .catch(() => {
          setPopover((prev) => (prev.reference === ref ? { ...prev, loading: false } : prev));
        });
    }
  }, []);

  const hidePopover = useCallback(() => {
    hideTimer.current = setTimeout(() => {
      setPopover((prev) => ({ ...prev, visible: false }));
    }, 200);
  }, []);

  const cancelHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const links = container.querySelectorAll(".bible-ref-link");

    function onMouseEnter(this: Element) {
      cancelHide();
      showPopover(this);
    }
    function onMouseLeave() {
      hidePopover();
    }

    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnter);
      link.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnter);
        link.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, [html, showPopover, hidePopover, cancelHide]);

  const processed = processDevotionalContent(html);

  return (
    <>
      <div
        ref={containerRef}
        className="prose-devotional space-y-5 text-base leading-relaxed text-primary/85 sm:text-lg sm:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: processed }}
      />

      {/* Bible verse popover */}
      {popover.visible && (
        <div
          className="fixed z-[9999] max-w-sm -translate-x-1/2"
          style={{ left: popover.x, top: popover.y, transform: "translate(-50%, -100%)" }}
          onMouseEnter={cancelHide}
          onMouseLeave={hidePopover}
        >
          <div className="rounded-xl border border-primary/10 bg-white px-5 py-4 shadow-xl shadow-primary/10">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-accent">
              {popover.reference} — NIV
            </p>
            {popover.loading ? (
              <p className="text-sm text-primary/50 italic">Loading verse...</p>
            ) : popover.text ? (
              <>
                <p className="text-sm leading-relaxed text-primary/80 italic">
                  &ldquo;{popover.text}&rdquo;
                </p>
                <a
                  href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(popover.reference)}&version=NIV`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-xs font-semibold text-accent/70 underline transition hover:text-primary"
                >
                  from BibleGateway
                </a>
              </>
            ) : (
              <a
                href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(popover.reference)}&version=NIV`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-accent underline transition hover:text-primary"
              >
                Read on BibleGateway
              </a>
            )}
            {/* Arrow */}
            <div className="absolute left-1/2 top-full -translate-x-1/2">
              <div className="h-0 w-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
