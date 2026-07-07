import { capabilities } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { capabilityMotifs } from "@/components/motifs";

export function Capabilities() {
  return (
    <section className="border-t border-line/10 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-label text-muted">
            What I do
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-medium leading-snug sm:text-4xl">
            Three sides of the same job.
          </h2>
        </Reveal>

        {/* Sticky stack: each card sticks a little lower, so they pile up on scroll. */}
        <div className="mt-14 flex flex-col gap-6">
          {capabilities.map((c, i) => {
            const Motif = capabilityMotifs[i];
            return (
              <div key={c.tag} className="sticky" style={{ top: `${88 + i * 26}px` }}>
                <div className="grid min-h-[44vh] content-between gap-10 rounded-3xl border border-line/10 bg-surface p-9 shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.6)] sm:p-12 md:grid-cols-[1.3fr_1fr]">
                  <div className="flex flex-col justify-between gap-10">
                    <span className="font-mono text-[11px] uppercase tracking-label text-accent">
                      {c.tag}
                    </span>
                    <div>
                      <h3 className="font-display text-3xl font-medium sm:text-5xl">{c.title}</h3>
                      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                        {c.body}
                      </p>
                      <div className="mt-7 flex flex-wrap gap-2">
                        {c.items.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-line/15 px-3 py-1 font-mono text-[11px] text-muted"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden items-center md:flex">
                    <div className="h-44 w-full lg:h-52">{Motif && <Motif />}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
