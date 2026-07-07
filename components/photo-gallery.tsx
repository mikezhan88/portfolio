"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  RowsPhotoAlbum,
  type Photo as AlbumPhoto,
  type RenderImageContext,
  type RenderImageProps,
} from "react-photo-album";
import "react-photo-album/rows.css";
import type { Photo } from "@/lib/photos";

const PhotoLightbox = dynamic(() => import("@/components/photo-lightbox"));

function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext
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
        placeholder={"blurDataURL" in photo && photo.blurDataURL ? "blur" : undefined}
        blurDataURL={"blurDataURL" in photo ? (photo.blurDataURL as string) : undefined}
        className="object-cover transition-[transform,opacity] duration-700 ease-editorial group-hover:scale-[1.03]"
      />
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

  const albumPhotos: AlbumPhoto[] = useMemo(
    () =>
      shown.map((p) => ({
        src: p.src,
        width: p.width,
        height: p.height,
        alt: p.alt,
        blurDataURL: p.blurDataURL,
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
        photos={albumPhotos}
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
