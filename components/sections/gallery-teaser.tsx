import Link from "next/link";
import { Camera } from "lucide-react";
import { Reveal } from "@/components/reveal";

const tiles = ["aspect-[3/4]", "aspect-square", "aspect-[3/4]", "aspect-square", "aspect-[3/4]"];

export function GalleryTeaser() {
  return (
    <section id="gallery" className="border-t border-line/10 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-label text-muted">
                Off the clock
              </p>
              <h2 className="font-display text-3xl font-medium sm:text-4xl">
                Through the <em className="italic text-accent">lens</em>
              </h2>
            </div>
            <Link
              href="/photography"
              className="font-mono text-xs text-accent hover:underline"
            >
              View gallery →
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {tiles.map((a, i) => (
              <div
                key={i}
                className={`${a} flex items-center justify-center rounded-xl border border-line/10 bg-surface/50 text-muted/40`}
              >
                <Camera size={18} />
              </div>
            ))}
          </div>
        </Reveal>
        <p className="mt-4 font-mono text-[11px] text-muted/60">
          Photo &amp; video — gallery coming soon.
        </p>
      </div>
    </section>
  );
}
