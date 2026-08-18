"use client";

import DevotionalForm from "@/components/admin/DevotionalForm";

export default function NewDevotionalPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-[#FCB005]" />
        <h2 className="text-xl font-bold text-white">New Devotional</h2>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white p-5 shadow-lg sm:p-6">
        <DevotionalForm mode="create" />
      </div>
    </div>
  );
}
