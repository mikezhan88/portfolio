export type PhotoMeta = {
  caption?: string;
  category?: string;
  featured?: boolean;
  order?: number;
};

// Optional per-photo overrides. Photos AND short videos (reels) are added with
//   npm run photos:add -- <folder> [category]
// which optimizes them into /public/photos/<category>/ and records size,
// blur placeholder, poster frame, and capture date in data/photo-manifest.json.
// Videos get a play badge in the grid and play natively in the lightbox;
// keep them short (under ~90s), long-form belongs on a streaming host.
// A photo needs NO entry here to appear; the folder name becomes its
// filter category and photos sort newest-first by capture date.
//
// Key = relative path ("travel/kyoto-01.jpg") or bare filename.
//   caption : shown in the lightbox, e.g. "Kyoto · 2025"
//   category: override the folder-derived category
//   featured: include in the big horizontal strip up top (keep to 5)
//   order   : pin to the front; lower numbers sort first
//
// Example:
//   "travel/kyoto-01.jpg": { caption: "Kyoto · 2025", featured: true },
export const photoMeta: Record<string, PhotoMeta> = {
  // featured order drives the gallery strip and the homepage zoom composition;
  // order 1 is the center tile the zoom pushes into
  "china/dsc03066.jpg": { featured: true, order: 1 },
  "china/dsc02086.jpg": { featured: true, order: 2 },
  "china/dsc01123.jpg": { featured: true, order: 3 },
  "banff/img-2539.jpg": { featured: true, order: 4 },
  "banff/img-2502.jpg": { featured: true, order: 5 },
  // 6-9 fill the four corner tiles of the homepage zoom composition
  "banff/img-2531.jpg": { featured: true, order: 6 },
  "banff/img-2530.jpg": { featured: true, order: 7 },
  "china/dsc01731.jpg": { featured: true, order: 8 },
  "china/dsc01853.jpg": { featured: true, order: 9 },
};

export const galleryIntro =
  "The same eye I bring to product and go-to-market, pointed at the world. Personal photo and video.";
