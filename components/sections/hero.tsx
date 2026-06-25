import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { profile } from "@/data/site";
import { SplitReveal } from "@/components/split-reveal";
import { Magnetic } from "@/components/magnetic";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center px-6 pt-24">
      <div className="mx-auto w-full max-w-7xl">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-label text-accent">
          {profile.roles.join("  ·  ")}
        </p>

        <SplitReveal className="max-w-[15ch] font-display text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-[1.1] tracking-tight pb-[0.12em]">
          {profile.headline[0]}{" "}
          <em className="italic text-accent">{profile.headline[1]}</em>
        </SplitReveal>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-muted">
          {profile.blurb}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Magnetic>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-mono text-sm font-medium text-accent-fg"
            >
              View work <ArrowRight size={16} />
            </Link>
          </Magnetic>
          <Link
            href="/#contact"
            className="rounded-xl border border-line/20 px-5 py-3 font-mono text-sm text-fg transition-colors hover:border-line/40"
          >
            Get in touch
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6 font-mono text-[11px] text-muted">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {profile.available}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin size={13} /> {profile.location}
          </span>
          <span className="inline-flex items-center gap-2">
            Currently @ {profile.currentCompany}
          </span>
        </div>
      </div>
    </section>
  );
}
