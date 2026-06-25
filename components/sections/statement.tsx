"use client";

import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";

const STATEMENT =
  "Engineering gets a product working. Go-to-market gets it used. I work across both, from first commit to first customer.";
const WORDS = STATEMENT.split(" ");
// Accent the closing clause: "from first commit to first customer."
const ACCENT_FROM = WORDS.length - 6;

export function Statement() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (!root.current) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".statement-word",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.4,
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className={`border-t border-line/10 ${reduce ? "" : "md:h-[220vh]"}`}
    >
      <div className="flex min-h-[60vh] items-center px-6 py-24 md:sticky md:top-0 md:h-screen md:min-h-0 md:py-0">
        <p className="mx-auto max-w-7xl font-display text-3xl font-medium leading-[1.3] tracking-tight sm:text-5xl sm:leading-[1.25]">
          {WORDS.map((w, i) => (
            <span
              key={i}
              className={`statement-word mr-[0.28em] inline-block ${
                i >= ACCENT_FROM ? "italic text-accent" : ""
              }`}
            >
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
