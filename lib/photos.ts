import fs from "node:fs";
import path from "node:path";
import sizeOf from "image-size";
import { photoMeta, type PhotoMeta } from "@/data/photo-meta";

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: "image" | "video";
  /** grid/lightbox poster for videos, e.g. "/photos/travel/reel.poster.jpg" */
  poster?: string;
  /** seconds, videos only */
  duration?: number;
  blurDataURL?: string;
  takenAt?: string;
  caption?: string;
  category?: string;
  featured?: boolean;
  order?: number;
};

const DIR = path.join(process.cwd(), "public", "photos");
const MANIFEST = path.join(process.cwd(), "data", "photo-manifest.json");
const IMG_EXT = /\.(jpe?g|png|webp|avif)$/i;
const VID_EXT = /\.(mp4|webm|m4v)$/i;
const POSTER = /\.poster\.jpg$/i;

type ManifestEntry = {
  width: number;
  height: number;
  blur?: string;
  takenAt?: string;
  type?: "video";
  duration?: number;
  poster?: string;
};

function readManifest(): Record<string, ManifestEntry> {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  } catch {
    return {};
  }
}

function titleCase(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Reads /public/photos at build time. Photos and short videos are added with
 * `npm run photos:add -- <folder> [category]`; a subfolder = a filter
 * category. data/photo-meta.ts can override captions/featured/order,
 * keyed by relative path ("travel/kyoto.jpg") or bare filename.
 */
export function getPhotos(): Photo[] {
  const rels: string[] = [];
  const keep = (f: string) => (IMG_EXT.test(f) || VID_EXT.test(f)) && !POSTER.test(f);
  try {
    for (const entry of fs.readdirSync(DIR, { withFileTypes: true })) {
      if (entry.isFile() && keep(entry.name)) {
        rels.push(entry.name);
      } else if (entry.isDirectory()) {
        for (const f of fs.readdirSync(path.join(DIR, entry.name))) {
          if (keep(f)) rels.push(`${entry.name}/${f}`);
        }
      }
    }
  } catch {
    return [];
  }

  const manifest = readManifest();

  const photos: Photo[] = rels.map((rel) => {
    const file = path.basename(rel);
    const folder = rel.includes("/") ? rel.split("/")[0] : "";
    const meta: PhotoMeta = photoMeta[rel] ?? photoMeta[file] ?? {};
    const m = manifest[rel];
    const isVideo = VID_EXT.test(rel);

    let width = m?.width ?? 0;
    let height = m?.height ?? 0;
    if ((!width || !height) && !isVideo) {
      width = 1600;
      height = 1200;
      try {
        const dim = sizeOf(fs.readFileSync(path.join(DIR, rel)));
        if (dim.width && dim.height) {
          width = dim.width;
          height = dim.height;
        }
      } catch {
        // keep fallback dimensions
      }
    }
    if ((!width || !height) && isVideo) {
      width = 1920;
      height = 1080;
    }

    return {
      src: `/photos/${rel}`,
      alt: meta.caption ?? file.replace(isVideo ? VID_EXT : IMG_EXT, "").replace(/[-_]+/g, " "),
      width,
      height,
      kind: isVideo ? ("video" as const) : ("image" as const),
      poster: m?.poster ? `/photos/${m.poster}` : undefined,
      duration: m?.duration,
      blurDataURL: m?.blur,
      takenAt: m?.takenAt,
      caption: meta.caption,
      category: meta.category ?? (folder ? titleCase(folder) : undefined),
      featured: meta.featured,
      order: meta.order,
    };
  });

  // explicit order first, then newest capture date, then filename
  return photos.sort((a, b) => {
    const ao = a.order ?? Number.POSITIVE_INFINITY;
    const bo = b.order ?? Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    if (a.takenAt && b.takenAt && a.takenAt !== b.takenAt) return b.takenAt.localeCompare(a.takenAt);
    if (a.takenAt && !b.takenAt) return -1;
    if (!a.takenAt && b.takenAt) return 1;
    return a.src.localeCompare(b.src);
  });
}

export function getCategories(photos: Photo[]): string[] {
  const set = new Set<string>();
  photos.forEach((p) => {
    if (p.category) set.add(p.category);
  });
  return set.size ? ["All", ...Array.from(set).sort()] : [];
}
