"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { WebglImage } from "@/components/webgl-image";

const STEPS = [
  { n: "01", t: "The problem", d: "Hiring teams drown in unranked applicants and one-size-fits-all job posts." },
  { n: "02", t: "What I built", d: "An AI job board — semantic matching, automated applicant ranking, and a full employer toolkit (Next.js, Claude, Gemini, Drizzle, Clerk, Inngest)." },
  { n: "03", t: "The outcome", d: "Faster shortlisting, higher-signal matches, and a hiring funnel that runs itself." },
];

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
        const stepsEls = gsap.utils.toArray<HTMLElement>(".focus-step");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        tl.to(".focus-bar", { scaleX: 1, ease: "none" }, 0);
        tl.to(".focus-zoom", { scale: 1.12, ease: "none" }, 0);

        stepsEls.forEach((el, i) => {
          if (i === 0) return;
          const at = i / stepsEls.length;
          tl.to(stepsEls[i - 1], { autoAlpha: 0, y: -28 }, at);
          tl.fromTo(el, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0 }, at);
        });
      });
    },
    { scope: root }
  );

  return (
    <>
      {/* Desktop + motion: sticky scrollytelling */}
      <section
        ref={root}
        className={`relative h-[300vh] border-t border-line/10 ${reduce ? "hidden" : "hidden md:block"}`}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="mx-auto flex w-full max-w-6xl items-center gap-14 px-6">
            <div className="relative flex-1">
              <p className="mb-8 font-mono text-[11px] uppercase tracking-label text-accent">
                In focus — AI Job Board
              </p>
              <div className="relative h-44">
                {STEPS.map((s, i) => (
                  <div
                    key={s.n}
                    className="focus-step absolute inset-0"
                    style={{ visibility: i === 0 ? "visible" : "hidden", opacity: i === 0 ? 1 : 0 }}
                  >
                    <span className="font-mono text-xs text-muted">{s.n}</span>
                    <h3 className="mt-2 font-display text-3xl font-medium">{s.t}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-muted">{s.d}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 h-px w-full bg-line/15">
                <div
                  className="focus-bar h-px w-full origin-left bg-accent"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="focus-visual aspect-[4/3] overflow-hidden rounded-2xl border border-line/10">
                <WebglImage src="/a1.png" alt="AI Job Board" className="focus-zoom h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile, or reduced-motion: static */}
      <section className={`border-t border-line/10 px-6 py-20 ${reduce ? "block" : "md:hidden"}`}>
        <p className="mb-8 font-mono text-[11px] uppercase tracking-label text-accent">
          In focus — AI Job Board
        </p>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line/10">
          <Image src="/a1.png" alt="AI Job Board" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="mt-8 flex flex-col gap-6">
          {STEPS.map((s) => (
            <div key={s.n}>
              <span className="font-mono text-xs text-muted">{s.n}</span>
              <h3 className="mt-1 font-display text-2xl font-medium">{s.t}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
