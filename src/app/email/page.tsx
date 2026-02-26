"use client";

import { useState, FormEvent } from "react";

export default function EmailPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(
        "https://buttondown.com/api/emails/embed-subscribe/armin",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p>Success: a confirmation email has been sent to your email address.</p>
    );
  }

  return (
    <article>
      <h1 className="mb-2 text-2xl font-bold">
        New essays delivered straight to your inbox
      </h1>
      <p className="mb-6 text-muted">
        I don&apos;t write that much, so expect a handful of emails a year
      </p>

      {status === "error" && (
        <p className="mb-4 text-red-600">
          There was an error submitting the form. Please try again.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Name:
          </label>
          <input
            type="text"
            name="metadata__name"
            id="name"
            className="w-full rounded border border-border px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="bd-email" className="mb-1 block text-sm font-medium">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="bd-email"
            required
            className="w-full rounded border border-border px-3 py-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="metadata__drafts"
            id="drafts"
          />
          <label htmlFor="drafts" className="text-sm">
            I want to receive drafts too
          </label>
        </div>
        <button
          type="submit"
          className="rounded bg-foreground px-4 py-2 text-sm text-background hover:opacity-90"
        >
          Subscribe
        </button>
      </form>
    </article>
  );
}
