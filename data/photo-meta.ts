export type PhotoMeta = {
  caption?: string;
  category?: string;
  featured?: boolean;
  order?: number;
};

// Optional metadata for the images you drop into /public/photos.
// Key = the exact filename. Every field is optional — a photo with no entry
// here still shows up in the grid (its alt text is derived from the filename).
//
//   caption  — shown under the thumbnail + in the lightbox, e.g. "Kyoto · 2025"
//   category — adds it to the filter bar, e.g. "Travel" | "Street" | "Portrait"
//   featured — include it in the big horizontal strip at the top (keep to ~4)
//   order    — lower numbers sort first (default order is by filename)
//
// Example:
//   "kyoto-01.jpg": { caption: "Kyoto · 2025", category: "Travel", featured: true, order: 1 },
export const photoMeta: Record<string, PhotoMeta> = {};

export const galleryIntro =
  "The same eye I bring to product and go-to-market, pointed at the world. Personal photo and video.";
