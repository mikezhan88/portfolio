"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import type { Photo } from "@/lib/photos";

// A tight 3x3 collage that the scroll zooms into (Olivier Larose style).
// Each tile gets a position and width; height follows the photo's own aspect
// ratio so nothing is cropped. Offsets are from the centered position, tuned
// for a ~16:9 viewport with 3:2 photos, ~2vh/1.5vw gaps, everything on screen
// at rest. Index 0 is the center tile the scroll pushes into.
const TILES = [
  { top: "0vh", left: "0vw", w: "26vw" }, // center
  { top: "-33vh", left: "0vw", w: "26vw" }, // above
  { top: "0vh", left: "-27.5vw", w: "26vw" }, // left
  { top: "0vh", left: "27.5vw", w: "26vw" }, // right
  { top: "33vh", left: "0vw", w: "26vw" }, // below
  { top: "-29vh", left: "-27.5vw", w: "20vw" }, // top-left
  { top: "29vh", left: "27.5vw", w: "20vw" }, // bottom-right
  { top: "-29vh", left: "27.5vw", w: "20vw" }, // top-right
  { top: "29vh", left: "-27.5vw", w: "20vw" }, // bottom-left
];

function StaticGrid({ photos, className = "" }: { photos: Photo[]; className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-3 px-6 sm:grid-cols-3 ${className}`}>
      {photos.slice(0, 6).map((p) => (
        <div key={p.src} className="relative aspect-square overflow-hidden rounded-xl border border-line/10">
          <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

export function ZoomGallery({ photos }: { photos: Photo[] }) {
  const container = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Fixed set of scale transforms (hooks must not run in a loop). The center
  // grows least so the eye lands on it; outer tiles fly past the edges.
  const s4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const s5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const s6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const s8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const s9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const scales = [s4, s5, s5, s6, s6, s8, s8, s9, s9];

  const pics = photos.slice(0, TILES.length);

  if (reduce) return <StaticGrid photos={photos} />;

  return (
    <>
      {/* Phones: vw/vh tiles collapse, so show a simple grid instead. */}
      <StaticGrid photos={photos} className="md:hidden" />

      <div ref={container} className="relative hidden h-[300vh] md:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          {pics.map((p, i) => (
            <motion.div
              key={p.src}
              style={{ scale: scales[i] }}
              className="absolute top-0 flex h-full w-full items-center justify-center"
            >
              <div
                className="relative"
                style={{
                  top: TILES[i].top,
                  left: TILES[i].left,
                  width: TILES[i].w,
                  aspectRatio: `${p.width} / ${p.height}`,
                }}
              >
                <Image src={p.src} alt={p.alt} fill sizes="30vw" className="rounded-lg object-cover" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
