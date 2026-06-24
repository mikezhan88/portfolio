import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Lock } from "lucide-react";
import { caseStudies } from "@/data/site";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return { title: "Case study" };
  return {
    title: `${study.title} ${study.accent}`.trim(),
    description: study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();

  return (
    <article className="px-6 pb-28 pt-32">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#about"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <Reveal className="mt-10">
          <p className="font-mono text-[11px] uppercase tracking-label text-accent">
            {study.tag}
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.08] sm:text-6xl">
            {study.title}{" "}
            <span className="italic text-accent">{study.accent}</span>
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted">
            <span>{study.role}</span>
            <span aria-hidden>·</span>
            <span>{study.company}</span>
            <span aria-hidden>·</span>
            <span>{study.period}</span>
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            {study.summary}
          </p>
        </Reveal>

        {study.nda && (
          <Reveal className="mt-10">
            <div className="flex items-start gap-3 rounded-xl border border-line/10 bg-surface/40 p-5">
              <Lock size={15} className="mt-0.5 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-muted">
                This work is under NDA. Client names, proprietary detail, and
                product screenshots are left out on purpose. Happy to talk
                through more in a conversation.
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-16 flex flex-col gap-12">
          {study.sections.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="grid gap-2 border-t border-line/10 pt-6 sm:grid-cols-[auto_1fr] sm:gap-8">
                <span className="font-mono text-xs text-muted">{s.n}</span>
                <div>
                  <h2 className="font-display text-2xl font-medium">{s.title}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="border-t border-line/10 pt-6">
            <p className="font-mono text-[11px] uppercase tracking-label text-muted">
              What I owned
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {study.contributions.map((c) => (
                <li key={c} className="flex gap-3 leading-relaxed text-muted">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="border-t border-line/10 pt-6">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-label text-muted">
              Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line/15 px-3 py-1 font-mono text-[11px] text-muted"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <div className="flex flex-wrap items-center gap-6 border-t border-line/10 pt-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-fg"
            >
              <ArrowLeft size={14} />
              All work
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:underline"
            >
              Get in touch
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
