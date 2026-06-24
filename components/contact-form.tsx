"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Status = "idle" | "sending" | "ok" | "error";

const fieldClass =
  "w-full rounded-xl border border-line/15 bg-surface/40 px-4 py-3 text-sm text-fg placeholder:text-muted/60 focus:border-accent/50 focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot — bots fill hidden fields
    if (((data.get("_gotcha") as string) || "").length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-line/15 bg-surface/40 p-6">
        <p className="font-display text-xl font-medium">Thanks for reaching out.</p>
        <p className="mt-2 text-sm text-muted">I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" required placeholder="Name" className={fieldClass} />
        <input name="email" type="email" required placeholder="Email" className={fieldClass} />
      </div>
      <textarea name="message" required rows={4} placeholder="What are you working on?" className={`${fieldClass} resize-none`} />
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-mono text-sm font-medium text-accent-fg transition-opacity disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send message"}
          <ArrowUpRight size={16} />
        </button>
        {status === "error" && (
          <span className="font-mono text-xs text-muted">Didn&apos;t send. Email me directly below.</span>
        )}
      </div>
    </form>
  );
}
