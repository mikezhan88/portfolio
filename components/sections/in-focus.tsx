"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { caseStudies } from "@/data/site";

// Feature the current-role case study (falls back to the first).
const study = caseStudies.find((c) => /current/i.test(c.tag)) ?? caseStudies[0];
const STEPS = study.sections;

// Deterministic bar heights (no random, so SSR and client match) give the
// waveform a natural shape even when reduced-motion freezes the animation.
const WAVE_BARS = Array.from({ length: 56 }, (_, i) =>
  Math.round(24 + Math.abs(Math.sin(i * 0.55)) * 68)
);

function NdaPanel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl border border-line/10 bg-surface/50 p-7 sm:p-8 ${className}`}
    >
      <div
        className="focus-zoom absolute inset-0 origin-center"
        style={{
          background:
            "radial-gradient(120% 80% at 80% -10%, rgb(var(--accent) / 0.18), transparent 60%)",
        }}
      />
      <div className="relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-accent">
        <Lock size={12} />
        Under NDA
      </div>

      <div className="relative flex h-24 items-center justify-center gap-[3px] sm:h-28">
        {WAVE_BARS.map((h, i) => (
          <span
            key={i}
            className="wave-bar w-[3px] rounded-full bg-accent/80"
            style={{ height: `${h}%`, animationDelay: `${(i % 16) * 70}ms` }}
          />
        ))}
      </div>

      <div className="relative">
        <p className="font-mono text-xs text-muted">{study.company}</p>
        <h4 className="mt-1 font-display text-2xl font-medium">{study.role}</h4>
      </div>
    </div>
  );
}

export function InFocus() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (!root.current) return;
      const mm = gsap.matchMedia();

      // Native CSS `position: sticky` does the pinning (robust on reverse scroll);
      // GSAP only scrubs the inner animation against the tall section's progress.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const steps = gsap.utils.toArray<HTMLElement>(".focus-step");
        const linesOf = (el: HTMLElement) =>
          el.querySelectorAll<HTMLElement>(".focus-line");

        // Start with only the first step's lines in view; the rest sit below
        // their masks, fully clipped (no overlap, nothing to read through).
        steps.forEach((s, i) => gsap.set(linesOf(s), { yPercent: i === 0 ? 0 : 110 }));
        let current = 0;

        // Scrubbed waveform zoom runs continuously with scroll.
        gsap.to(".focus-zoom", {
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        // Discrete step changes: as each threshold is crossed, the old step's
        // lines wipe out and the new step's lines wipe in (clip mask, staggered).
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              steps.length - 1,
              Math.floor(self.progress * steps.length)
            );
            if (idx === current) return;
            const down = idx > current;
            gsap.to(linesOf(steps[current]), {
              yPercent: down ? -110 : 110,
              duration: 0.5,
              stagger: 0.05,
              ease: "power3.in",
              overwrite: true,
            });
            gsap.fromTo(
              linesOf(steps[idx]),
              { yPercent: down ? 110 : -110 },
              {
                yPercent: 0,
                duration: 0.6,
                stagger: 0.07,
                ease: "power3.out",
                overwrite: true,
              }
            );
            current = idx;
          },
        });
      });
    },
    { scope: root }
  );

  const eyebrow = `Case study · ${study.company}`;
  const cta = (
    <Link
      href={`/work/${study.slug}`}
      className="mt-10 inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-opacity hover:opacity-70"
    >
      Read the case study
      <ArrowUpRight size={14} />
    </Link>
  );

  return (
    <>
      {/* Desktop + motion: sticky scrollytelling */}
      <section
        ref={root}
        className={`relative h-[300vh] border-t border-line/10 ${reduce ? "hidden" : "hidden md:block"}`}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-14 px-6">
            <div className="relative flex-1">
              <p className="mb-8 font-mono text-[11px] uppercase tracking-label text-accent">
                {eyebrow}
              </p>
              <div className="relative min-h-[15rem]">
                {STEPS.map((s) => (
                  <div key={s.n} className="focus-step absolute inset-0">
                    <div className="overflow-hidden">
                      <span className="focus-line block font-mono text-xs text-muted">
                        {s.n}
                      </span>
                    </div>
                    <div className="mt-2 overflow-hidden">
                      <h3 className="focus-line font-display text-3xl font-medium leading-[1.15] pb-[0.12em]">
                        {s.title}
                      </h3>
                    </div>
                    <div className="mt-3 overflow-hidden">
                      <p className="focus-line max-w-md leading-relaxed text-muted">
                        {s.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {cta}
            </div>
            <div className="flex-1">
              <NdaPanel />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile, or reduced-motion: static */}
      <section className={`border-t border-line/10 px-6 py-20 ${reduce ? "block" : "md:hidden"}`}>
        <p className="mb-8 font-mono text-[11px] uppercase tracking-label text-accent">{eyebrow}</p>
        <NdaPanel />
        <div className="mt-8 flex flex-col gap-6">
          {STEPS.map((s) => (
            <div key={s.n}>
              <span className="font-mono text-xs text-muted">{s.n}</span>
              <h3 className="mt-1 font-display text-2xl font-medium">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
        {cta}
      </section>
    </>
  );
}
