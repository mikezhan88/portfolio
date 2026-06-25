"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Project } from "@/data/site";

export function WorkList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  // The preview always shows something (defaults to the first project), and
  // swaps as you hover a row. Steady position, no cursor-following.
  const current = active ?? 0;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.5fr_0.85fr]">
      <ul className="border-t border-line/10">
        {projects.map((p, i) => {
          const href = p.demo ?? p.live ?? p.repo ?? "#";
          return (
            <li key={p.slug} className="border-b border-line/10">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onPointerEnter={() => setActive(i)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group flex items-center justify-between gap-4 py-7"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  <span
                    className="font-display text-2xl font-medium transition-opacity duration-300 sm:text-[2.5rem] sm:leading-tight"
                    style={{ opacity: active === null || active === i ? 1 : 0.32 }}
                  >
                    {p.title}
                  </span>
                </div>
                <span className="flex items-center gap-4 font-mono text-xs text-muted">
                  <span className="hidden md:inline">{p.stack.slice(0, 2).join(" · ")}</span>
                  <span>{p.year}</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Steady preview panel, desktop only. */}
      <div aria-hidden className="hidden lg:block">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-xl border border-line/10 bg-surface/40">
          {projects.map((p, i) => (
            <Image
              key={p.slug}
              src={p.image}
              alt=""
              fill
              sizes="400px"
              className={`object-cover ${reduce ? "" : "transition-opacity duration-500 ease-editorial"}`}
              style={{ opacity: current === i ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
