import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";

export function Contact() {
  return (
    <section id="contact" className="border-t border-line/10 px-6 py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-label text-muted">
            Contact
          </p>
          <h2 className="max-w-md font-display text-4xl font-medium leading-tight sm:text-5xl">
            Let&apos;s build something <em className="italic text-accent">together</em>.
          </h2>
          <p className="mt-6 max-w-md text-base text-muted">
            Open to full-time roles and freelance projects. Tell me what you&apos;re working on and I&apos;ll get back to you.
          </p>
          <div className="mt-8 flex flex-col gap-3 font-mono text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
            >
              <ArrowUpRight size={15} className="text-accent" /> {profile.email}
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg"
            >
              <ArrowUpRight size={15} className="text-accent" /> Resume
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
