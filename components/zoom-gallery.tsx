"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import type { Photo } from "@/lib/photos";

// Position + size of each tile in the zoom composition (Olivier Larose style).
const TILES = [
  { top: "0vh", left: "0vw", w: "25vw", h: "25vh" },
  { top: "-30vh", left: "5vw", w: "35vw", h: "30vh" },
  { top: "-10vh", left: "-25vw", w: "20vw", h: "45vh" },
  { top: "0vh", left: "27.5vw", w: "25vw", h: "25vh" },
  { top: "27.5vh", left: "5vw", w: "20vw", h: "25vh" },
  { top: "27.5vh", left: "-22.5vw", w: "30vw", h: "25vh" },
  { top: "22.5vh", left: "25vw", w: "15vw", h: "15vh" },
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
              style={{ top: TILES[i].top, left: TILES[i].left, width: TILES[i].w, height: TILES[i].h }}
            >
              <Image src={p.src} alt={p.alt} fill sizes="40vw" className="rounded-lg object-cover" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
