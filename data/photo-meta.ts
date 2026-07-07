export type PhotoMeta = {
  caption?: string;
  category?: string;
  featured?: boolean;
  order?: number;
};

// Optional per-photo overrides. Photos are added with
//   npm run photos:add -- <folder> [category]
// which optimizes them into /public/photos/<category>/ and records size,
// blur placeholder, and capture date in data/photo-manifest.json.
// A photo needs NO entry here to appear; the folder name becomes its
// filter category and photos sort newest-first by capture date.
//
// Key = relative path ("travel/kyoto-01.jpg") or bare filename.
//   caption : shown in the lightbox, e.g. "Kyoto · 2025"
//   category: override the folder-derived category
//   featured: include in the big horizontal strip up top (keep to ~4)
//   order   : pin to the front; lower numbers sort first
//
// Example:
//   "travel/kyoto-01.jpg": { caption: "Kyoto · 2025", featured: true },
export const photoMeta: Record<string, PhotoMeta> = {};

export const galleryIntro =
  "The same eye I bring to product and go-to-market, pointed at the world. Personal photo and video.";
