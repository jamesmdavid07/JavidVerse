"use client";

import { useState } from "react";

export default function ContactForm() {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    // TODO: Connect this form to email service, GetResponse, Formspree, or backend API.
    <form className="space-y-6" onSubmit={(event) => {
      event.preventDefault();
      setPending(true);
      setTimeout(() => {
        setPending(false);
        setSent(true);
      }, 800);
    }}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-primary">
          Name
          <input type="text" required className="w-full rounded-3xl border border-primary/20 bg-light px-4 py-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
        </label>
        <label className="space-y-2 text-sm font-medium text-primary">
          Email
          <input type="email" required className="w-full rounded-3xl border border-primary/20 bg-light px-4 py-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
        </label>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-primary">
          Organization / Ministry / Business
          <input type="text" className="w-full rounded-3xl border border-primary/20 bg-light px-4 py-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
        </label>
        <label className="space-y-2 text-sm font-medium text-primary">
          Project Type
          <select required defaultValue="" className="w-full rounded-3xl border border-primary/20 bg-light px-4 py-3 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20">
            <option value="" disabled>Select a service</option>
            <option>Book Design</option><option>Graphic Design</option><option>Video Editing</option>
            <option>Website Development</option><option>Branding</option><option>Other</option>
          </select>
        </label>
      </div>
      <label className="space-y-2 text-sm font-medium text-primary">
        Project Brief
        <textarea required rows={5} className="w-full rounded-[1.5rem] border border-primary/20 bg-light px-4 py-4 text-sm text-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
      </label>
      <button type="submit" disabled={pending} className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-light transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/50">
        {pending ? "Sending..." : sent ? "Inquiry ready" : "Send Inquiry"}
      </button>
      {sent ? <p className="text-sm font-medium text-primary">Thank you. This demo form is not connected yet; please email us directly while setup is completed.</p> : null}
    </form>
  );
}
