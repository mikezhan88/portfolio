"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Project } from "@/data/site";

export function WorkList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  function onMove(e: React.PointerEvent) {
    x.set(e.clientX - 132);
    y.set(e.clientY - 92);
  }

  const show = active !== null && !reduce;

  return (
    <div onPointerMove={onMove} className="relative">
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

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[184px] w-[264px] overflow-hidden rounded-xl border border-line/15 md:block"
        style={{ x: sx, y: sy }}
        animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.85 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {projects.map((p, i) => (
          <Image
            key={p.slug}
            src={p.image}
            alt=""
            fill
            sizes="264px"
            className="object-cover transition-opacity duration-200"
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}
      </motion.div>
    </div>
  );
}
