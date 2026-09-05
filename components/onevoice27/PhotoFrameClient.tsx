"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Download, ImagePlus, Loader2, Move, RotateCcw, Share2, X, ZoomIn, ZoomOut } from "lucide-react";

// Hole center measured from frame-one.png at 1080px (see inspection). Used for auto face centering.
const HOLE_CENTER_X = 534;
const HOLE_CENTER_Y = 485;

export default function PhotoFrameClient({ frameSrc }: { frameSrc: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const exportCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Images
  const [frameImg, setFrameImg] = useState<HTMLImageElement | null>(null);
  const [processedFrame, setProcessedFrame] = useState<HTMLCanvasElement | null>(null);
  const [photoImg, setPhotoImg] = useState<HTMLImageElement | null>(null);
  const [photoLoaded, setPhotoLoaded] = useState(false);

  // Transform (canvas 1080 space)
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [baseScale, setBaseScale] = useState(1);
  const [defaultTransform, setDefaultTransform] = useState<{ x: number; y: number; scale: number } | null>(null);

  const [isPreparing, setIsPreparing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showAdjust, setShowAdjust] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // Drag refs
  const dragStartRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const pinchRef = useRef<{ dist: number; scale: number } | null>(null);

  // Share URL (current page) — initialize lazily to avoid setState in effect
  const getShareUrl = useCallback(() => shareUrl || (typeof window !== "undefined" ? window.location.href : ""), [shareUrl]);

  // Load frame as-is — do not alter design (transparent hole already in asset)
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = frameSrc;
    img.onload = () => {
      setFrameImg(img);
      const c = document.createElement("canvas");
      c.width = 1080;
      c.height = 1080;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 1080, 1080);
      setProcessedFrame(c);
    };
    img.onerror = () => setError("Failed to load frame. Please refresh.");
  }, [frameSrc]);

  // Draw preview (and keep export canvas in sync)
  const draw = useCallback(() => {
    const canvas = previewCanvasRef.current;
    const exportCanvas = exportCanvasRef.current;
    if (!canvas || !exportCanvas) return;
    const ctx = canvas.getContext("2d");
    const ectx = exportCanvas.getContext("2d");
    if (!ctx || !ectx) return;
    for (const c of [ctx, ectx]) {
      c.clearRect(0, 0, 1080, 1080);
      // Photo behind
      if (photoImg) {
        // Keep aspect ratio: drawImage with scale
        c.drawImage(photoImg, offset.x, offset.y, photoImg.width * scale, photoImg.height * scale);
      } else {
        // Before upload, show white (frame's hole already white, but show placeholder)
        c.fillStyle = "#ffffff";
        c.fillRect(0, 0, 1080, 1080);
      }
      // Frame on top (processed transparent hole)
      if (processedFrame) {
        c.drawImage(processedFrame, 0, 0, 1080, 1080);
      } else if (frameImg) {
        // Fallback while processing
        c.drawImage(frameImg, 0, 0, 1080, 1080);
      }
    }
  }, [photoImg, offset, scale, processedFrame, frameImg]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Handle photo file
  const handleFile = useCallback(async (file: File) => {
    setError(null);
    if (!file) return;
    const valid = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const isHeic = file.type === "image/heic" || file.type === "image/heif" || file.name.toLowerCase().endsWith(".heic") || file.name.toLowerCase().endsWith(".heif");
    if (isHeic) {
      setError("HEIC may not be supported in this browser. Please export your photo as JPG first (Share → Save as JPG) and try again.");
      return;
    }
    if (!valid.includes(file.type) && !file.type.startsWith("image/")) {
      setError("Please upload a JPG or PNG photo.");
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = async () => {
      setPhotoImg(img);
      setPhotoLoaded(true);
      setShowAdjust(true);
      // Compute cover scale
      const cover = Math.max(1080 / img.width, 1080 / img.height);
      // Start centered
      const initialScale = cover;
      const initialX = (1080 - img.width * initialScale) / 2;
      const initialY = (1080 - img.height * initialScale) / 2;
      setBaseScale(cover);
      setScale(initialScale);
      setOffset({ x: initialX, y: initialY });
      setDefaultTransform({ x: initialX, y: initialY, scale: initialScale });

      // Face detection
      setIsPreparing(true);
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - FaceDetector is experimental, not in TS lib
        if (typeof window !== "undefined" && "FaceDetector" in window) {
          // Create a temporary canvas for detection (downscaled for speed)
          const tmp = document.createElement("canvas");
          const maxSide = 800;
          const ratio = Math.min(1, maxSide / Math.max(img.width, img.height));
          tmp.width = Math.round(img.width * ratio);
          tmp.height = Math.round(img.height * ratio);
          const tctx = tmp.getContext("2d");
          if (tctx) {
            tctx.drawImage(img, 0, 0, tmp.width, tmp.height);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - FaceDetector not typed
            const detector = new (window as unknown as { FaceDetector: new (opts: unknown) => { detect: (c: HTMLCanvasElement) => Promise<{ boundingBox: DOMRect }[]> } }).FaceDetector({ fastMode: true, maxDetectedFaces: 5 });
            const faces = await detector.detect(tmp);
            if (faces && faces.length > 0) {
              // Pick largest
              let best = faces[0];
              let bestArea = 0;
              for (const f of faces) {
                const box = f.boundingBox;
                const area = box.width * box.height;
                if (area > bestArea) {
                  bestArea = area;
                  best = f;
                }
              }
              const box = best.boundingBox;
              // Face center in tmp coords -> map to original img coords
              const faceCenterTmpX = box.x + box.width / 2;
              const faceCenterTmpY = box.y + box.height / 2;
              const faceCenterImgX = faceCenterTmpX / ratio;
              const faceCenterImgY = faceCenterTmpY / ratio;
              // Position so face center lands at hole center, slightly upward (40% from top is eyes)
              // Nudge up 4% of hole radius for natural framing
              const targetY = HOLE_CENTER_Y - 18;
              const targetX = HOLE_CENTER_X;
              // Slightly zoom in if face is small
              const faceWidthRatio = box.width / ratio / img.width;
              let adjustedScale = initialScale;
              // If face is very small relative to image, zoom in ~20%
              if (faceWidthRatio < 0.25) adjustedScale = initialScale * 1.18;
              // Compute offset
              const nx = targetX - faceCenterImgX * adjustedScale;
              const ny = targetY - faceCenterImgY * adjustedScale;
              setScale(adjustedScale);
              setOffset({ x: nx, y: ny });
              setDefaultTransform({ x: nx, y: ny, scale: adjustedScale });
            }
          }
        }
      } catch (e) {
        // Silently fallback to centered
        console.warn("Face detection failed", e);
      } finally {
        setIsPreparing(false);
      }
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      setError("Could not load that image. Please try a different JPG or PNG.");
      setIsPreparing(false);
      URL.revokeObjectURL(url);
    };
    // For HEIC etc., img.src may fail — error handled above
    img.src = url;
  }, []);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
    // reset so same file can be re-selected
    e.target.value = "";
  };

  // Drag & pinch
  const getPreviewScale = () => {
    const el = containerRef.current;
    if (!el) return 1;
    const rect = el.getBoundingClientRect();
    return 1080 / rect.width;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!photoImg || isPreparing) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    dragStartRef.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
    setIsDragging(true);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStartRef.current || !photoImg) return;
    const ps = getPreviewScale();
    const dx = (e.clientX - dragStartRef.current.x) * ps;
    const dy = (e.clientY - dragStartRef.current.y) * ps;
    setOffset({ x: dragStartRef.current.ox + dx, y: dragStartRef.current.oy + dy });
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    dragStartRef.current = null;
    setIsDragging(false);
    try { (e.target as Element).releasePointerCapture(e.pointerId); } catch {}
  };

  // Touch pinch
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      pinchRef.current = { dist, scale };
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault();
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const factor = dist / pinchRef.current.dist;
      const newScale = Math.min(Math.max(pinchRef.current.scale * factor, baseScale * 0.95), baseScale * 3.5);
      setScale(newScale);
    }
  };
  const handleTouchEnd = () => { pinchRef.current = null; };

  const zoomIn = () => setScale((s) => Math.min(s * 1.15, baseScale * 3.5));
  const zoomOut = () => setScale((s) => Math.max(s / 1.15, baseScale * 0.95));
  const reset = () => {
    if (defaultTransform) {
      setOffset({ x: defaultTransform.x, y: defaultTransform.y });
      setScale(defaultTransform.scale);
    }
  };

  const download = useCallback(() => {
    const canvas = exportCanvasRef.current;
    if (!canvas || !photoImg) return;
    // Ensure latest draw
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // High quality PNG
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "onevoice27-photo.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      },
      "image/png",
      1
    );
  }, [photoImg]);

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
    } catch {
      setError("Could not copy link. Please copy it manually.");
    }
  }, [getShareUrl, shareUrl]);

  const hasPhoto = !!photoImg && photoLoaded;

  return (
    <div className="mx-auto max-w-5xl">
      {/* Hidden export canvas (1080 exact) */}
      <canvas ref={exportCanvasRef} width={1080} height={1080} className="hidden" aria-hidden="true" />

      {/* Preview Card */}
      <div className="mx-auto max-w-[560px] rounded-[2rem] border border-primary/10 bg-white p-4 shadow-premium sm:p-6">
        <div
          ref={containerRef}
          className={`relative aspect-square w-full overflow-hidden rounded-[1.5rem] border border-primary/10 bg-light ${hasPhoto ? "cursor-grab active:cursor-grabbing" : ""} ${isDragging ? "select-none" : ""}`}
          style={{ touchAction: hasPhoto ? "none" : "auto" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <canvas
            ref={previewCanvasRef}
            width={1080}
            height={1080}
            className="h-full w-full object-contain"
            aria-label="OneVoice27 photo preview"
          />
          {isPreparing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/75 backdrop-blur-sm">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-semibold text-primary">Preparing your photo...</p>
            </div>
          )}
          {!hasPhoto && !isPreparing && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6 text-center">
              <p className="max-w-[20ch] text-sm font-medium leading-6 text-primary/60">
                Your photo will appear inside the frame. Upload to begin.
              </p>
            </div>
          )}
          {hasPhoto && showAdjust && (
            <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-primary/90 px-3 py-1.5 text-xs font-semibold text-white shadow">
              <span className="inline-flex items-center gap-1.5"><Move className="h-3.5 w-3.5" /> Drag to reposition</span>
            </div>
          )}
        </div>

        {/* Upload / controls */}
        <div className="mt-6 space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif"
            className="hidden"
            onChange={onInputChange}
          />

          {!hasPhoto ? (
            <div className="text-center">
              <p className="text-sm font-semibold text-primary">Upload your photo</p>
              <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-primary/60">JPG or PNG</p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-primary mt-4 inline-flex items-center gap-2 px-8 py-3.5 text-[0.95rem] font-bold"
              >
                <ImagePlus className="h-5 w-5" /> Upload Photo
              </button>
              {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-xl border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary shadow-sm hover:border-accent/50"
                >
                  <ImagePlus className="h-4 w-4" /> Change Photo
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdjust((v) => !v)}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold shadow-sm ${showAdjust ? "bg-primary text-white" : "border border-primary/15 bg-white text-primary"}`}
                >
                  <Move className="h-4 w-4" /> {showAdjust ? "Done Adjusting" : "Adjust Photo"}
                </button>
              </div>

              {showAdjust && (
                <div className="rounded-2xl border border-primary/10 bg-light p-4">
                  <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary/60">Adjust Photo — Drag + Zoom</p>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button type="button" onClick={zoomOut} aria-label="Zoom out" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-white text-primary shadow-sm hover:border-accent/50">
                      <ZoomOut className="h-5 w-5" />
                    </button>
                    <div className="flex-1 text-center">
                      <div className="text-sm font-semibold text-primary">Zoom</div>
                      <div className="text-xs text-primary/60">{Math.round((scale / baseScale) * 100)}%</div>
                    </div>
                    <button type="button" onClick={zoomIn} aria-label="Zoom in" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-white text-primary shadow-sm hover:border-accent/50">
                      <ZoomIn className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-3 flex justify-center">
                    <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-sm ring-1 ring-primary/10 hover:bg-primary hover:text-white">
                      <RotateCcw className="h-4 w-4" /> Reset
                    </button>
                  </div>
                  <p className="mt-3 text-center text-xs leading-5 text-primary/60">Pinch to zoom on mobile. Drag the photo behind the fixed frame.</p>
                </div>
              )}

              <button
                type="button"
                onClick={download}
                disabled={isPreparing}
                className="btn-primary flex w-full items-center justify-center gap-2 py-4 text-base font-bold disabled:opacity-60"
              >
                <Download className="h-5 w-5" /> Download My OneVoice27 Photo
              </button>

              <button
                type="button"
                onClick={() => setShowShare((v) => !v)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/15 bg-white py-3.5 text-sm font-bold text-primary shadow-sm hover:border-accent/50 hover:bg-light"
              >
                <Share2 className="h-4 w-4" /> Share
              </button>

              {showShare && (
                <div className="rounded-2xl border border-primary/10 bg-light p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-primary">Share this frame</p>
                    <button
                      type="button"
                      onClick={() => setShowShare(false)}
                      aria-label="Close share panel"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-primary/60 hover:bg-white hover:text-primary"
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

              <p className="text-center text-xs leading-5 text-primary/60">Final image: 1080 × 1080 PNG — only the framed photo, no buttons or UI.</p>
              {error && <p className="text-center text-sm font-medium text-red-600">{error}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
