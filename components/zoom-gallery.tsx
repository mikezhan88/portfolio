"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import type { Photo } from "@/lib/photos";

// Position + width of each tile in the zoom composition. Height comes from the
// photo's own aspect ratio, so nothing is cropped: a landscape stays landscape.
// Offsets are from the centered position; laid out for a ~16:9 viewport with
// 3:2 photos. Index 0 is the center tile the scroll zooms into.
const TILES = [
  { top: "0vh", left: "0vw", w: "24vw" },
  { top: "-31vh", left: "3vw", w: "28vw" },
  { top: "-4vh", left: "-28vw", w: "22vw" },
  { top: "2vh", left: "27vw", w: "24vw" },
  { top: "31vh", left: "0vw", w: "26vw" },
  { top: "28vh", left: "-24vw", w: "18vw" },
  { top: "26vh", left: "24vw", w: "16vw" },
];

export function ZoomGallery({ photos }: { photos: Photo[] }) {
  const container = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Fixed set of scale transforms (hooks must not run in a loop).
  const s4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const s5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const s6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const s8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const s9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const scales = [s4, s5, s6, s5, s6, s8, s9];

  const pics = photos.slice(0, TILES.length);

  if (reduce) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.slice(0, 6).map((p) => (
          <div key={p.src} className="relative aspect-square overflow-hidden rounded-xl border border-line/10">
            <Image src={p.src} alt={p.alt} fill sizes="33vw" className="object-cover" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={container} className="relative h-[300vh]">
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
              <Image src={p.src} alt={p.alt} fill sizes="40vw" className="rounded-lg object-cover" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
