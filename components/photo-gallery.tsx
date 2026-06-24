"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/lib/photos";

export function PhotoGallery({
  photos,
  categories,
}: {
  photos: Photo[];
  categories: string[];
}) {
  const [filter, setFilter] = useState("All");
  const [index, setIndex] = useState<number | null>(null);

  const shown = filter === "All" ? photos : photos.filter((p) => p.category === filter);

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % shown.length)),
    [shown.length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + shown.length) % shown.length)),
    [shown.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, next, prev]);

  const current = index === null ? null : shown[index];

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] transition-colors ${
                filter === c
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-line/15 text-muted hover:text-fg"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {shown.map((p, i) => (
          <button
            key={p.src}
            onClick={() => setIndex(i)}
            className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl border border-line/10 text-left"
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]"
            />
            {p.caption && (
              <span className="block px-3 py-2 font-mono text-[11px] text-muted">
                {p.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            <button onClick={close} aria-label="Close" className="absolute right-5 top-5 text-muted transition-colors hover:text-fg">
              <X size={22} />
            </button>
            {shown.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  aria-label="Previous"
                  className="absolute left-3 text-muted transition-colors hover:text-fg sm:left-5"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  aria-label="Next"
                  className="absolute right-3 text-muted transition-colors hover:text-fg sm:right-5"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
            <motion.div
              key={current.src}
              className="relative"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="90vw"
                className="max-h-[85vh] w-auto rounded-lg object-contain"
              />
              {current.caption && (
                <p className="mt-3 text-center font-mono text-xs text-muted">{current.caption}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
