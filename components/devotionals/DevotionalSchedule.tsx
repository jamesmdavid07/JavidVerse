// Full-width weekly devotional schedule — 3 cards with subtle zoom-out.
import { User, BookOpen, Sparkles } from "lucide-react";

const schedule = [
  {
    day: "Monday",
    title: "A Biblical Person",
    description: "A devotional focused on a biblical person/name — their story and one clear lesson for today.",
    icon: User,
    accent: true,
  },
  {
    day: "Wednesday",
    title: "Midweek Devotional",
    description:
      "A Bible passage, biblical principle, or encouragement for faith and practical Christian living.",
    icon: BookOpen,
    accent: false,
  },
  {
    day: "Friday",
    title: "Friday Reflection",
    description: "A reflective, practical devotional to close the week — examine your faith and walk with God.",
    icon: Sparkles,
    accent: false,
  },
] as const;

export default function DevotionalSchedule() {
  return (
    <section className="w-full bg-light px-6 py-10 sm:px-8 sm:py-12 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">Weekly Rhythm</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Devotionals are available weekly
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-primary/70 sm:text-lg sm:leading-8">
            Three intentional moments each week to encourage your walk with God — same format, clear rhythm.
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3 md:gap-7">
          {schedule.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.day}
                className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/10 bg-white p-6 shadow-premium transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(4,45,109,0.18)] sm:p-7"
              >
                {/* Top accent bar */}
                <div className="absolute inset-x-0 top-0 h-1 bg-accent opacity-90" aria-hidden="true" />

                {/* Icon with zoom-out: starts slightly enlarged, shrinks on hover */}
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-accent shadow-sm transition duration-500 group-hover:scale-95">
                  <Icon className="h-6 w-6 transition duration-500 group-hover:scale-95" aria-hidden="true" />
                </div>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-accent">{item.day}</p>
                <h3 className="mt-2 text-xl font-bold leading-tight text-primary">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-primary/70">{item.description}</p>

                {/* Subtle zoom-out media block — decorative, reinforces card motion */}
                <div className="relative mt-6 overflow-hidden rounded-xl bg-primary/5 p-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 opacity-60 transition duration-500 group-hover:scale-95" />
                  <p className="relative text-xs font-semibold uppercase tracking-[0.16em] text-primary/40">
                    Every {item.day}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
