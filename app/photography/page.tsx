import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Gallery" };

const heights = ["h-56", "h-72", "h-64", "h-80", "h-52", "h-72", "h-64", "h-56", "h-80"];

export default function PhotographyPage() {
  return (
    <section className="px-6 pb-28 pt-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-label text-accent">
          Off the clock — photo &amp; video
        </p>
        <h1 className="font-display text-4xl font-medium sm:text-6xl">
          Through the <em className="italic text-accent">lens</em>.
        </h1>
        <p className="mt-5 max-w-xl text-muted">
          The same eye I bring to product and go-to-market, pointed at the world. Gallery coming
          soon — send your photos and I&apos;ll wire up the masonry grid, lightbox, and reels.
        </p>

        <div className="mt-12 columns-2 gap-4 sm:columns-3">
          {heights.map((h, i) => (
            <Reveal key={i} className="mb-4 break-inside-avoid">
              <div
                className={`${h} flex items-center justify-center rounded-xl border border-line/10 bg-surface/50 text-muted/40`}
              >
                <Camera size={18} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
