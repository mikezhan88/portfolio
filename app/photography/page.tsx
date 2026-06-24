import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { getPhotos, getCategories } from "@/lib/photos";
import { galleryIntro } from "@/data/photo-meta";
import { PhotoGallery } from "@/components/photo-gallery";
import { WebglImage } from "@/components/webgl-image";

export const metadata: Metadata = { title: "Gallery" };

export default function PhotographyPage() {
  const photos = getPhotos();
  const categories = getCategories(photos);
  const featured = photos.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="px-6 pb-28 pt-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-label text-accent">
          Off the clock — photo &amp; video
        </p>
        <h1 className="font-display text-4xl font-medium sm:text-6xl">
          Through the <em className="italic text-accent">lens</em>.
        </h1>
        <p className="mt-5 max-w-xl text-muted">{galleryIntro}</p>

        {photos.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {featured.length > 0 && (
              <div className="mt-12 flex gap-4 overflow-x-auto pb-3">
                {featured.map((p) => (
                  <div
                    key={p.src}
                    className="relative aspect-[4/3] w-[min(82vw,520px)] shrink-0 overflow-hidden rounded-2xl border border-line/10"
                  >
                    <WebglImage src={p.src} alt={p.alt} className="h-full w-full" />
                    {p.caption && (
                      <span className="absolute bottom-0 left-0 rounded-tr-lg bg-bg/55 px-3 py-1.5 font-mono text-[11px] text-fg backdrop-blur-sm">
                        {p.caption}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-12">
              <PhotoGallery photos={photos} categories={categories} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function EmptyState() {
  const heights = ["h-56", "h-72", "h-64", "h-80", "h-52", "h-72"];
  return (
    <>
      <div className="mt-12 columns-2 gap-4 sm:columns-3">
        {heights.map((h, i) => (
          <div
            key={i}
            className={`${h} mb-4 flex items-center justify-center break-inside-avoid rounded-xl border border-line/10 bg-surface/40 text-muted/30`}
          >
            <Camera size={18} />
          </div>
        ))}
      </div>
      <p className="mt-4 font-mono text-[11px] text-muted/50">
        Gallery coming soon — drop JPEGs into <code>/public/photos</code>.
      </p>
    </>
  );
}
