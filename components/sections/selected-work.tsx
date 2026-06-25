"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/data/site";
import { Reveal } from "@/components/reveal";

const featured = projects.filter((p) => p.featured);

function Panel({
  p,
  i,
  className = "",
}: {
  p: (typeof featured)[number];
  i: number;
  className?: string;
}) {
  const href = p.demo ?? p.live ?? p.repo ?? "#";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex shrink-0 flex-col justify-between rounded-2xl border border-line/10 bg-surface/40 p-8 transition-colors hover:border-line/25 sm:p-10 ${className}`}
    >
      <div className="flex items-center justify-between font-mono text-xs">
        <span className="text-accent">0{i + 1}</span>
        <span className="flex items-center gap-2 text-muted">
          {p.year}
          <ArrowUpRight
            size={15}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
      <div className="mt-10">
        <h3 className="font-display text-3xl font-medium leading-tight sm:text-4xl">{p.title}</h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{p.summary}</p>
        <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10.5px] text-muted/80">
          {p.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </a>
  );
}

function Header() {
  return (
    <div className="mx-auto mb-8 flex w-full max-w-7xl items-end justify-between px-6">
      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-label text-muted">
          Selected work
        </p>
        <h2 className="font-display text-3xl font-medium sm:text-4xl">Things I&apos;ve built</h2>
      </div>
      <a href="/work" className="hidden font-mono text-xs text-accent hover:underline sm:inline">
        All projects →
      </a>
    </div>
  );
}

export function SelectedWork() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (!root.current) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current!.querySelector<HTMLElement>(".work-track");
        if (!track) return;
        // Pan the track horizontally across the section's scroll range.
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 24),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <div id="work">
      {/* Desktop + motion: pinned horizontal scroll */}
      <section
        ref={root}
        className={`relative border-t border-line/10 md:h-[320vh] ${
          reduce ? "hidden" : "hidden md:block"
        }`}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-20">
          <Header />
          <div className="work-track flex gap-6 pl-6 pr-[20vw]">
            {featured.map((p, i) => (
              <Panel key={p.slug} p={p} i={i} className="h-[58vh] w-[42vw] lg:w-[34vw]" />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile, or reduced-motion: stacked cards */}
      <section className={`border-t border-line/10 px-6 py-24 ${reduce ? "block" : "md:hidden"}`}>
        <Header />
        <div className="flex flex-col gap-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
              <Panel p={p} i={i} className="w-full" />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
