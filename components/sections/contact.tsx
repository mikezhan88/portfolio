import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/magnetic";

export function Contact() {
  return (
    <section id="contact" className="border-t border-line/10 px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-label text-muted">
            Contact
          </p>
          <h2 className="max-w-3xl font-display text-4xl font-medium leading-tight sm:text-6xl">
            Let&apos;s build something <em className="italic text-accent">together</em>.
          </h2>
          <p className="mt-6 max-w-lg text-base text-muted">
            Open to full-time roles and freelance projects. The fastest way to reach me is email.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-mono text-sm font-medium text-accent-fg"
              >
                {profile.email} <ArrowUpRight size={16} />
              </a>
            </Magnetic>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-line/20 px-5 py-3 font-mono text-sm text-fg transition-colors hover:border-line/40"
            >
              Download résumé
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
