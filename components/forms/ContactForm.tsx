// Contact Form
"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";

const fieldClassName =
  "mt-2 block w-full rounded-2xl border border-primary/20 bg-light px-4 py-3 text-sm text-primary outline-none transition placeholder:text-primary/40 focus:border-accent focus:ring-2 focus:ring-accent/20";

// Contact form for project inquiries.
export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    setError("");

    if (isSubmitting) {
      return;
    }

    const form = new FormData(event.currentTarget);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          organization: form.get("organization"),
          projectType: form.get("projectType"),
          brief: form.get("brief"),
          website: form.get("website"),
        }),
      });
      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        setError(result.message || "Your message could not be sent. Please try again.");
        return;
      }

      setNotice(result.message || "Thank you. Your inquiry has been sent successfully.");
      formRef.current?.reset();
    } catch {
      setError("Your message could not be sent. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
      <p id="contact-form-help" className="text-sm leading-6 text-primary/65">
        Share the details of your project, ministry, book, website, or creative idea.
      </p>

      {/* Contact details */}
      <div className="grid gap-6 sm:grid-cols-2">
        <label htmlFor="website" className="hidden" aria-hidden="true">
          Website
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <label htmlFor="name" className="space-y-2 text-sm font-medium text-primary">
          Name
          <input id="name" name="name" type="text" autoComplete="name" required maxLength={100} disabled={isSubmitting} className={fieldClassName} />
        </label>
        <label htmlFor="email" className="space-y-2 text-sm font-medium text-primary">
          Email
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} disabled={isSubmitting} className={fieldClassName} />
        </label>
      </div>

      {/* Project details */}
      <div className="grid gap-6 sm:grid-cols-2">
        <label htmlFor="organization" className="space-y-2 text-sm font-medium text-primary">
          Organization / Ministry / Business
          <input id="organization" name="organization" type="text" autoComplete="organization" maxLength={120} disabled={isSubmitting} className={fieldClassName} />
        </label>
        <label htmlFor="project-type" className="space-y-2 text-sm font-medium text-primary">
          Project Type
          <select id="project-type" name="projectType" required defaultValue="" disabled={isSubmitting} className={fieldClassName}>
            <option value="" disabled>Select a service</option>
            <option>Book Design</option>
            <option>Graphic Design</option>
            <option>Video Editing</option>
            <option>Website Development</option>
            <option>Branding</option>
            <option>Speaking or Ministry</option>
            <option>Other</option>
          </select>
        </label>
      </div>

      {/* Inquiry message */}
      <label htmlFor="brief" className="space-y-2 text-sm font-medium text-primary">
        Project Brief
        <textarea id="brief" name="brief" required rows={6} maxLength={3000} disabled={isSubmitting} className={fieldClassName} />
      </label>

      <button type="submit" disabled={isSubmitting} className="btn-primary disabled:cursor-not-allowed disabled:opacity-70">
        {isSubmitting ? "Sending..." : "Send Inquiry"}
      </button>
      <p className="text-sm font-medium text-primary" aria-live="polite" role="status">
        {notice}
      </p>
      <p className="text-sm font-medium text-red-700" aria-live="polite" role="alert">
        {error}
      </p>
    </form>
  );
}
