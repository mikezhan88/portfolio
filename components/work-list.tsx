"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/data/site";

export function WorkList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <ul className="border-t border-line/10">
      {projects.map((p, i) => {
        const href = p.demo ?? p.live ?? p.repo ?? "#";
        const meta = `${p.stack.slice(0, 3).join(" · ")} · ${p.year}`;
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
              className="group relative flex items-center justify-between gap-4 overflow-hidden py-7"
            >
              {/* Base row */}
              <div
                className="flex items-baseline gap-4 transition-opacity duration-300"
                style={{ opacity: active === null || active === i ? 1 : 0.3 }}
              >
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <span className="font-display text-2xl font-medium sm:text-[2.5rem] sm:leading-tight">
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

              {/* Marquee strip, slides up to cover the row on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 flex translate-y-full items-center bg-accent text-accent-fg transition-transform duration-500 ease-editorial group-hover:translate-y-0"
              >
                <div className="marquee-track flex shrink-0 items-center whitespace-nowrap">
                  {Array.from({ length: 2 }).map((_, g) => (
                    <span key={g} className="flex shrink-0 items-center">
                      {Array.from({ length: 4 }).map((_, k) => (
                        <span key={k} className="flex shrink-0 items-center gap-4 pr-10">
                          <span className="font-display text-2xl font-medium sm:text-[2.5rem] sm:leading-tight">
                            {p.title}
                          </span>
                          <span className="font-mono text-xs opacity-70">{meta}</span>
                          <ArrowUpRight size={18} />
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
