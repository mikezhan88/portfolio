"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Play } from "lucide-react";
import {
  RowsPhotoAlbum,
  type Photo as AlbumPhoto,
  type RenderImageContext,
  type RenderImageProps,
} from "react-photo-album";
import "react-photo-album/rows.css";
import type { Photo } from "@/lib/photos";

const PhotoLightbox = dynamic(() => import("@/components/photo-lightbox"));

type Tile = AlbumPhoto & { blurDataURL?: string; kind: "image" | "video"; duration?: number };

function formatDuration(s?: number) {
  if (!s) return "";
  const m = Math.floor(s / 60);
  const sec = `${s % 60}`.padStart(2, "0");
  return `${m}:${sec}`;
}

function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext<Tile>
) {
  return (
    <div
      className="group relative overflow-hidden"
      style={{ width: "100%", aspectRatio: `${width} / ${height}` }}
    >
      <Image
        fill
        src={photo.src}
        alt={alt}
        title={title}
        sizes={sizes}
        placeholder={photo.blurDataURL ? "blur" : undefined}
        blurDataURL={photo.blurDataURL}
        className="object-cover transition-[transform,opacity] duration-700 ease-editorial group-hover:scale-[1.03]"
      />
      {photo.kind === "video" && (
        <>
          <span className="absolute inset-0 bg-bg/10 transition-colors duration-300 group-hover:bg-bg/0" />
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-bg/60 px-2.5 py-1 font-mono text-[10.5px] text-fg backdrop-blur-sm">
            <Play size={10} className="fill-current" />
            {formatDuration(photo.duration)}
          </span>
        </>
      )}
    </div>
  );
}

export function PhotoGallery({
  photos,
  categories,
}: {
  photos: Photo[];
  categories: string[];
}) {
  const [filter, setFilter] = useState("All");
  const [index, setIndex] = useState(-1);

  const shown = useMemo(
    () => (filter === "All" ? photos : photos.filter((p) => p.category === filter)),
    [photos, filter]
  );

  const tiles: Tile[] = useMemo(
    () =>
      shown.map((p) => ({
        // the grid always lays out an image: the poster stands in for videos
        src: p.kind === "video" ? p.poster ?? p.src : p.src,
        width: p.width,
        height: p.height,
        alt: p.alt,
        blurDataURL: p.blurDataURL,
        kind: p.kind,
        duration: p.duration,
      })),
    [shown]
  );

  return (
    <div>
      {categories.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setFilter(c);
                setIndex(-1);
              }}
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

      <RowsPhotoAlbum
        photos={tiles}
        targetRowHeight={340}
        rowConstraints={{ singleRowMaxHeight: 480 }}
        spacing={6}
        defaultContainerWidth={1232}
        render={{ image: renderNextImage }}
        onClick={({ index: i }) => setIndex(i)}
        sizes={{
          size: "1232px",
          sizes: [{ viewport: "(max-width: 1280px)", size: "calc(100vw - 48px)" }],
        }}
      />

      {index >= 0 && <PhotoLightbox photos={shown} index={index} onClose={() => setIndex(-1)} />}
    </div>
  );
}
