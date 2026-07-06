// Contact Form
"use client";

import type { FormEvent } from "react";
import { useState } from "react";

const fieldClassName =
  "mt-2 block w-full rounded-2xl border border-primary/20 bg-light px-4 py-3 text-sm text-primary outline-none transition placeholder:text-primary/40 focus:border-accent focus:ring-2 focus:ring-accent/20";

// Contact form that prepares a complete inquiry in the visitor's email app.
export default function ContactForm() {
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const organization = String(form.get("organization") ?? "Not provided");
    const projectType = String(form.get("projectType") ?? "General inquiry");
    const brief = String(form.get("brief") ?? "");
    const subject = encodeURIComponent(`${projectType} inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\nProject type: ${projectType}\n\nProject brief:\n${brief}`,
    );

    window.location.href = `mailto:javidverse@gmail.com?subject=${subject}&body=${body}`;
    setNotice("Your email app should open with the inquiry prepared. Review it, then press Send.");
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <p id="contact-form-help" className="text-sm leading-6 text-primary/65">
        Complete the form to prepare an email to JavidVerse in your default email app.
      </p>

      {/* Contact details */}
      <div className="grid gap-6 sm:grid-cols-2">
        <label htmlFor="name" className="space-y-2 text-sm font-medium text-primary">
          Name
          <input id="name" name="name" type="text" autoComplete="name" required className={fieldClassName} />
        </label>
        <label htmlFor="email" className="space-y-2 text-sm font-medium text-primary">
          Email
          <input id="email" name="email" type="email" autoComplete="email" required className={fieldClassName} />
        </label>
      </div>

      {/* Project details */}
      <div className="grid gap-6 sm:grid-cols-2">
        <label htmlFor="organization" className="space-y-2 text-sm font-medium text-primary">
          Organization / Ministry / Business
          <input id="organization" name="organization" type="text" autoComplete="organization" className={fieldClassName} />
        </label>
        <label htmlFor="project-type" className="space-y-2 text-sm font-medium text-primary">
          Project Type
          <select id="project-type" name="projectType" required defaultValue="" className={fieldClassName}>
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
        <textarea id="brief" name="brief" required rows={6} className={fieldClassName} />
      </label>

      <button type="submit" className="btn-primary">
        Prepare Email
      </button>
      <p className="text-sm font-medium text-primary" aria-live="polite">
        {notice}
      </p>
    </form>
  );
}
