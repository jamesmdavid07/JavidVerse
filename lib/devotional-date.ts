// Date helpers for MySQL DATE values, which should not be interpreted in the browser's timezone.
export function devotionalDateKey(date: string): string {
  return date.slice(0, 10);
}

export function devotionalDateParts(date: string): { year: number; month: number; day: number } {
  const [year, month, day] = devotionalDateKey(date).split("-").map(Number);
  return { year, month, day };
}

export function formatDevotionalDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Manila",
  }).format(new Date(`${devotionalDateKey(date)}T00:00:00+08:00`));
}

// ─── Weekly rhythm helpers (Mon/Wed/Fri) ──────────────────────────

export function getDevotionalDayOfWeek(date: string): string {
  const d = new Date(`${devotionalDateKey(date)}T00:00:00+08:00`);
  return new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "Asia/Manila" }).format(d);
}

export function getDevotionalDayShort(date: string): string {
  const d = new Date(`${devotionalDateKey(date)}T00:00:00+08:00`);
  return new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "Asia/Manila" }).format(d);
}

export function isMWFDate(date: string): boolean {
  const d = new Date(`${devotionalDateKey(date)}T00:00:00+08:00`);
  const wd = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "Asia/Manila" }).format(d);
  return wd === "Mon" || wd === "Wed" || wd === "Fri";
}

export function getMWFLabel(date: string): string {
  const wd = getDevotionalDayShort(date);
  if (wd === "Mon") return "Monday — Biblical Person";
  if (wd === "Wed") return "Wednesday — Midweek";
  if (wd === "Fri") return "Friday — Reflection";
  return wd;
}

function toManilaDateString(d: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
}

export function getNextMWFDate(fromDate?: string): string {
  const base = fromDate ? new Date(`${devotionalDateKey(fromDate)}T00:00:00+08:00`) : new Date();
  // Start from tomorrow if fromDate is provided, else today
  const start = new Date(base);
  if (fromDate) start.setDate(start.getDate() + 1);
  for (let i = 0; i < 14; i++) {
    const candidate = new Date(start);
    candidate.setDate(start.getDate() + i);
    const key = toManilaDateString(candidate);
    if (isMWFDate(key)) return key;
  }
  return toManilaDateString(start);
}

export function getNextMWFOptions(count = 6): { date: string; label: string; day: string }[] {
  const result: { date: string; label: string; day: string }[] = [];
  const cursor = new Date();
  // Find next MWF including today
  for (let i = 0; result.length < count && i < 30; i++) {
    const candidate = new Date();
    candidate.setDate(cursor.getDate() + i);
    const key = toManilaDateString(candidate);
    if (isMWFDate(key)) {
      result.push({ date: key, label: formatDevotionalDate(key), day: getDevotionalDayShort(key) });
    }
  }
  return result;
}
