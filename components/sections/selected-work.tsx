import Link from "next/link";
import { projects } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { WorkList } from "@/components/work-list";

export function SelectedWork() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="work" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-label text-muted">
                Selected work
              </p>
              <h2 className="font-display text-3xl font-medium sm:text-4xl">
                Things I&apos;ve built
              </h2>
            </div>
            <Link
              href="/work"
              className="hidden font-mono text-xs text-accent hover:underline sm:inline"
            >
              All projects →
            </Link>
          </div>
        </Reveal>

        <WorkList projects={featured} />

        <p className="mt-4 hidden font-mono text-[11px] text-muted/50 md:block">
          Hover a project to preview.
        </p>
      </div>
    </section>
  );
}
