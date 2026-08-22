// Full-width drill-down archive: Year → Month → Calendar Day.
"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight, CalendarDays } from "lucide-react";
import { devotionalDateParts } from "@/lib/devotional-date";

interface DevotionalIndexEntry {
  id: number;
  slug: string;
  title: string;
  author: string;
  publicationDate: string;
  status: "published" | "scheduled";
}

interface DevotionalArchiveProps {
  allPublished: DevotionalIndexEntry[];
  dateSlugMap: Record<string, string>;
}

const ALL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// 2026 starts from August (today's launch month).
const ARCHIVE_YEARS = [
  { year: 2026, startMonth: 8 },
  { year: 2027, startMonth: 1 },
  { year: 2028, startMonth: 1 },
];

// Build available dates map: year → month → set of days.
function buildAvailableDates(
  entries: DevotionalIndexEntry[]
): Record<number, Record<number, Set<number>>> {
  const map: Record<number, Record<number, Set<number>>> = {};
  for (const e of entries) {
    const { year, month, day } = devotionalDateParts(e.publicationDate);
    if (!map[year]) map[year] = {};
    if (!map[year][month]) map[year][month] = new Set();
    map[year][month].add(day);
  }
  return map;
}

// Get the calendar grid for a given month.
function getCalendarGrid(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month - 1, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month, 0).getDate();

  // Convert Sunday=0 to Monday=0 (Mon=0, Tue=1, ..., Sun=6)
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const grid: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) grid.push(null);
  for (let d = 1; d <= daysInMonth; d++) grid.push(d);
  return grid;
}

export default function DevotionalArchive({ allPublished, dateSlugMap }: DevotionalArchiveProps) {
  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  const [expandedMonth, setExpandedMonth] = useState<{ year: number; month: number } | null>(null);
  const available = buildAvailableDates(allPublished);

  function handleYearClick(year: number) {
    setExpandedYear(expandedYear === year ? null : year);
    setExpandedMonth(null);
  }

  function handleMonthClick(year: number, month: number) {
    if (expandedMonth?.year === year && expandedMonth?.month === month) {
      setExpandedMonth(null);
    } else {
      setExpandedMonth({ year, month });
    }
  }

  return (
    <section className="w-full bg-primary px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-light sm:text-4xl">
            Devotional Archive
          </h2>
          <p className="mt-3 text-lg text-light/70">
            Browse previous devotionals by date.
          </p>
        </div>

        {/* Year cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ARCHIVE_YEARS.map(({ year, startMonth }) => {
            const isExpanded = expandedYear === year;
            const hasAnyDevotional = Object.keys(available[year] || {}).length > 0;

            return (
              <div key={year}>
                {/* Year button */}
                <button
                  onClick={() => handleYearClick(year)}
                  className={`group flex w-full items-center justify-between rounded-xl border-2 px-6 py-5 text-left transition-all duration-200 ${
                    isExpanded
                      ? "border-accent bg-accent/15 shadow-sm"
                      : hasAnyDevotional
                        ? "border-white/15 bg-white/10 hover:border-accent/40 hover:shadow-sm"
                        : "border-white/10 bg-white/5"
                  }`}
                >
                  <span className="text-xl font-bold text-light">{year}</span>
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-accent" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-white/30 group-hover:text-accent" />
                  )}
                </button>

                {/* Expanded months + calendar */}
                {isExpanded && (
                  <div className="mt-4 space-y-4 rounded-xl border border-white/10 bg-white/10 p-5">
                    {/* Month grid */}
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                      {ALL_MONTHS.map((monthName, idx) => {
                        const monthNum = idx + 1;
                        if (monthNum < startMonth) return null;

                        const hasDevotional = Boolean(available[year]?.[monthNum]?.size);
                        const isMonthExpanded =
                          expandedMonth?.year === year && expandedMonth?.month === monthNum;

                        return (
                          <button
                            key={monthNum}
                            onClick={() => handleMonthClick(year, monthNum)}
                            className={`flex flex-col items-center gap-1 rounded-lg border-2 px-3 py-3 text-center text-sm font-semibold transition-all duration-200 ${
                              isMonthExpanded
                                ? "border-accent bg-accent/15 text-light"
                                : hasDevotional
                                  ? "border-accent/30 bg-white/10 text-light hover:-translate-y-0.5 hover:border-accent hover:shadow-sm"
                                  : "border-white/10 bg-white/5 text-white/35 hover:border-white/20 hover:text-white/50"
                            }`}
                          >
                            <CalendarDays
                              className={`h-4 w-4 ${isMonthExpanded ? "text-accent" : hasDevotional ? "text-accent/70" : "text-white/20"}`}
                            />
                            <span className="text-xs">{monthName.slice(0, 3)}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Calendar for expanded month */}
                    {expandedMonth?.year === year && (
                      <CalendarView
                        year={expandedMonth.year}
                        month={expandedMonth.month}
                        availableDays={available[expandedMonth.year]?.[expandedMonth.month]}
                        dateSlugMap={dateSlugMap}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Calendar grid for a specific month.
function CalendarView({
  year,
  month,
  availableDays,
  dateSlugMap,
}: {
  year: number;
  month: number;
  availableDays?: Set<number>;
  dateSlugMap: Record<string, string>;
}) {
  const grid = getCalendarGrid(year, month);
  const monthName = ALL_MONTHS[month - 1];

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <p className="mb-3 text-sm font-bold text-light">{monthName} {year}</p>

      {/* Weekday headers */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="py-1 text-center text-xs font-semibold text-white/40">
            {wd}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {grid.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} />;
          }

          const hasDevotional = availableDays?.has(day) ?? false;
          const today = new Date();
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() + 1 === month &&
            today.getDate() === day;

          const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const slug = dateSlugMap[dateKey];

          if (hasDevotional && slug) {
            return (
              <Link
                key={day}
                href={`/devotionals/${slug}`}
                className={`relative flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-all duration-150 bg-accent/20 text-light hover:bg-accent hover:text-primary shadow-sm hover:-translate-y-0.5 hover:shadow-md ${isToday ? "ring-2 ring-accent ring-offset-1 ring-offset-primary" : ""}`}
              >
                {day}
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
              </Link>
            );
          }

          return (
            <Link
              key={day}
              href={`/devotionals?unavailable=${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`}
              className={`relative flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-all duration-150 text-white/30 hover:bg-white/5 hover:text-white/50 ${isToday ? "ring-2 ring-accent ring-offset-1 ring-offset-primary" : ""}`}
            >
              {day}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
