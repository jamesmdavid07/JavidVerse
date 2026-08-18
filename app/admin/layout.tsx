"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen" style={{ background: "#042D6D" }}>
      <header style={{ background: "#042D6D" }} className="shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link
            href="/admin/devotionals"
            className="text-base font-bold tracking-wide text-white sm:text-lg"
          >
            JavidVerse{" "}
            <span className="text-[#FCB005]">Admin</span>
          </Link>
          <nav className="flex items-center gap-3 sm:gap-6">
            <button
              onClick={() => router.push("/admin/devotionals")}
              className="text-xs font-medium text-white/70 transition hover:text-[#FCB005] sm:text-sm"
            >
              Devotionals
            </button>
            <button
              onClick={() => router.push("/")}
              className="text-xs font-medium text-white/70 transition hover:text-[#FCB005] sm:text-sm"
            >
              View Site
            </button>
          </nav>
        </div>
        <div className="h-1 bg-gradient-to-r from-[#FCB005] via-[#FCB005]/60 to-transparent" />
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
