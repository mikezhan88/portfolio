import Link from "next/link";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ZoomGallery } from "@/components/zoom-gallery";
import { getPhotos } from "@/lib/photos";

const placeholders = ["aspect-[3/4]", "aspect-square", "aspect-[3/4]", "aspect-square", "aspect-[3/4]"];

export function GalleryTeaser() {
  // stills only here: next/image and the zoom composition can't render video
  const photos = getPhotos().filter((p) => p.kind === "image");
  const featured = photos.filter((p) => p.featured);
  const picks = (featured.length ? featured : photos).slice(0, 5);

  // Once there are enough photos, the teaser becomes a scroll-driven zoom
  // composition. Until then, it falls back to the grid / placeholder below.
  if (photos.length >= 5) {
    return (
      <section id="gallery" className="border-t border-line/10">
        <div className="mx-auto flex max-w-7xl items-end justify-between px-6 pt-24 sm:pt-32">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-label text-muted">
              Off the clock
            </p>
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              Through the <em className="italic text-accent">lens</em>
            </h2>
          </div>
          <Link href="/photography" className="font-mono text-xs text-accent hover:underline">
            View gallery →
          </Link>
        </div>
        <ZoomGallery photos={featured.length >= 5 ? featured : photos} />
      </section>
    );
  }

  return (
    <section id="gallery" className="border-t border-line/10 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
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
            <Link href="/photography" className="font-mono text-xs text-accent hover:underline">
              View gallery →
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          {picks.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {picks.map((p) => (
                <Link
                  key={p.src}
                  href="/photography"
                  className="group relative aspect-square overflow-hidden rounded-xl border border-line/10"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {placeholders.map((a, i) => (
                <div
                  key={i}
                  className={`${a} flex items-center justify-center rounded-xl border border-line/10 bg-surface/50 text-muted/40`}
                >
                  <Camera size={18} />
                </div>
              ))}
            </div>
          )}
        </Reveal>

        {picks.length === 0 && (
          <p className="mt-4 font-mono text-[11px] text-muted/60">
            Photo &amp; video. Gallery coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
