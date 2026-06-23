import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/site";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <section className="px-6 pb-28 pt-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-label text-muted">Work</p>
        <h1 className="font-display text-4xl font-medium sm:text-5xl">Selected projects</h1>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {projects.map((p, i) => {
            const href = p.demo ?? p.live ?? p.repo ?? "#";
            return (
              <Reveal key={p.slug} delay={i * 0.05}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl border border-line/10 bg-surface/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover opacity-90 transition-transform duration-700 ease-editorial group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <h2 className="font-display text-xl font-medium">{p.title}</h2>
                      <span className="flex items-center gap-2 font-mono text-xs text-muted">
                        {p.year}
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10.5px] text-muted/80">
                      {p.stack.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
