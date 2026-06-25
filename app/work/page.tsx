import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import { projects, caseStudies } from "@/data/site";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <section className="px-6 pb-28 pt-32">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-label text-muted">Work</p>
        <h1 className="font-display text-4xl font-medium sm:text-5xl">Selected projects</h1>

        <div className="mt-14">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-label text-muted">
            Case studies
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {caseStudies.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.05}>
                <Link
                  href={`/work/${c.slug}`}
                  className="group flex h-full flex-col justify-between gap-8 rounded-2xl border border-line/10 bg-surface/40 p-6 transition-colors hover:border-line/25"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-label text-accent">
                        <Lock size={11} />
                        {c.tag}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-medium leading-snug">
                      {c.title} <span className="italic text-accent">{c.accent}</span>
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{c.summary}</p>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10.5px] text-muted/80">
                    {c.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <p className="mb-5 mt-16 font-mono text-[11px] uppercase tracking-label text-muted">
          Projects
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
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
