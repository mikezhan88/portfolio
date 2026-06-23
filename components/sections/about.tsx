import { experience, skills, education } from "@/data/site";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="about" className="border-t border-line/10 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-label text-muted">
            About
          </p>
          <h2 className="max-w-3xl font-display text-3xl font-medium leading-snug sm:text-4xl">
            An engineer who ships across the stack — and knows how to take it to market.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-label text-muted">
              Experience
            </p>
            <div className="flex flex-col">
              {experience.map((job, i) => (
                <Reveal key={job.company + job.period} delay={i * 0.05}>
                  <div className="grid grid-cols-[1fr_auto] gap-4 border-t border-line/10 py-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg font-medium">{job.role}</h3>
                        {job.current && (
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        )}
                      </div>
                      <p className="font-mono text-xs text-accent">
                        {job.company}
                        {job.location ? ` · ${job.location}` : ""}
                      </p>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                        {job.blurb}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10.5px] text-muted/70">
                        {job.stack.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <span className="whitespace-nowrap font-mono text-[11px] text-muted">
                      {job.period}
                    </span>
                  </div>
                </Reveal>
              ))}
              <div className="grid grid-cols-[1fr_auto] gap-4 border-t border-line/10 py-6">
                <div>
                  <h3 className="font-display text-lg font-medium">{education.degree}</h3>
                  <p className="font-mono text-xs text-accent">{education.school}</p>
                  <p className="mt-2 text-sm text-muted">{education.detail}</p>
                </div>
                <span className="whitespace-nowrap font-mono text-[11px] text-muted">
                  {education.period}
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-label text-muted">
              Skills
            </p>
            <div className="flex flex-col gap-6">
              {skills.map((group) => (
                <Reveal key={group.group}>
                  <div>
                    <h4 className="mb-2 font-mono text-xs text-fg">{group.group}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((s) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
