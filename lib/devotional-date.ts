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
