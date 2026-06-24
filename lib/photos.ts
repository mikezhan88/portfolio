import fs from "node:fs";
import path from "node:path";
import sizeOf from "image-size";
import { photoMeta, type PhotoMeta } from "@/data/photo-meta";

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  category?: string;
  featured?: boolean;
  order?: number;
};

const DIR = path.join(process.cwd(), "public", "photos");
const EXT = /\.(jpe?g|png|webp|avif)$/i;

/** Reads /public/photos at build time and merges optional metadata. */
export function getPhotos(): Photo[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(DIR).filter((f) => EXT.test(f));
  } catch {
    return [];
  }

  const photos: Photo[] = files.map((file) => {
    const meta: PhotoMeta = photoMeta[file] ?? {};
    let width = 1600;
    let height = 1200;
    try {
      const dim = sizeOf(fs.readFileSync(path.join(DIR, file)));
      if (dim.width && dim.height) {
        width = dim.width;
        height = dim.height;
      }
    } catch {
      // keep fallback dimensions
    }
    return {
      src: `/photos/${file}`,
      alt: meta.caption ?? file.replace(EXT, "").replace(/[-_]+/g, " "),
      width,
      height,
      caption: meta.caption,
      category: meta.category,
      featured: meta.featured,
      order: meta.order,
    };
  });

  return photos.sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999) || a.src.localeCompare(b.src)
  );
}

export function getCategories(photos: Photo[]): string[] {
  const set = new Set<string>();
  photos.forEach((p) => {
    if (p.category) set.add(p.category);
  });
  return set.size ? ["All", ...Array.from(set)] : [];
}
