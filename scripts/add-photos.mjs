#!/usr/bin/env node
/**
 * Photo ingest: optimize images into the site gallery in one command.
 *
 *   npm run photos:add -- <source folder or files...> [category]
 *
 * Examples:
 *   npm run photos:add -- ~/Desktop/kyoto-export travel
 *   npm run photos:add -- ~/Downloads/IMG_1234.jpg street
 *   npm run photos:add -- ~/Desktop/misc-shots            (no category)
 *
 * What it does, per image:
 *   - applies EXIF orientation, then STRIPS all metadata (including GPS)
 *   - resizes to a 2560px long edge (never upscales)
 *   - recompresses as progressive JPEG (mozjpeg, q82), typically 0.4-1.2MB
 *   - reads the capture date (for gallery ordering) before stripping
 *   - generates a tiny blur placeholder for the loading state
 *   - files it into public/photos/<category>/ (subfolder = filter pill)
 *   - records everything in data/photo-manifest.json
 *
 * Captions/featured flags stay in data/photo-meta.ts (optional, per file).
 * HEIC is not supported: export JPEG from Photos/Lightroom first.
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import exifr from "exifr";

const ROOT = process.cwd();
const PHOTOS_DIR = path.join(ROOT, "public", "photos");
const MANIFEST = path.join(ROOT, "data", "photo-manifest.json");
const EXT_OK = /\.(jpe?g|png|webp|tiff?|avif)$/i;
const LONG_EDGE = 2560;

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function collectFiles(args) {
  const files = [];
  for (const a of args) {
    const p = path.resolve(a.replace(/^~(?=\/)/, process.env.HOME ?? "~"));
    if (!fs.existsSync(p)) {
      console.error(`  ! skipping (not found): ${a}`);
      continue;
    }
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      for (const f of fs.readdirSync(p)) {
        if (EXT_OK.test(f)) files.push(path.join(p, f));
        else if (/\.heic$/i.test(f)) console.error(`  ! HEIC not supported, export as JPEG: ${f}`);
      }
    } else if (EXT_OK.test(p)) {
      files.push(p);
    } else if (/\.heic$/i.test(p)) {
      console.error(`  ! HEIC not supported, export as JPEG: ${a}`);
    } else {
      console.error(`  ! skipping (not an image): ${a}`);
    }
  }
  return files;
}

async function main() {
  const args = process.argv.slice(2).filter(Boolean);
  if (args.length === 0) {
    console.log("Usage: npm run photos:add -- <source folder or files...> [category]");
    process.exit(1);
  }

  // Last arg is a category if it isn't an existing path.
  let category = "";
  let sources = args;
  const last = args[args.length - 1];
  const lastAsPath = path.resolve(last.replace(/^~(?=\/)/, process.env.HOME ?? "~"));
  if (args.length > 1 && !fs.existsSync(lastAsPath)) {
    category = slugify(last);
    sources = args.slice(0, -1);
  }

  const files = collectFiles(sources);
  if (files.length === 0) {
    console.error("No images found.");
    process.exit(1);
  }

  const destDir = category ? path.join(PHOTOS_DIR, category) : PHOTOS_DIR;
  fs.mkdirSync(destDir, { recursive: true });

  const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};

  console.log(`Adding ${files.length} photo(s)${category ? ` to category "${category}"` : ""}...\n`);
  let totalBytes = 0;

  for (const file of files) {
    const base = slugify(path.basename(file, path.extname(file))) || "photo";
    let name = `${base}.jpg`;
    let n = 2;
    while (fs.existsSync(path.join(destDir, name))) name = `${base}-${n++}.jpg`;
    const dest = path.join(destDir, name);
    const rel = path.relative(PHOTOS_DIR, dest).split(path.sep).join("/");

    // capture date, read before metadata is stripped
    let takenAt = null;
    try {
      const exif = await exifr.parse(file, ["DateTimeOriginal", "CreateDate"]);
      const d = exif?.DateTimeOriginal ?? exif?.CreateDate;
      if (d instanceof Date && !Number.isNaN(d.valueOf())) takenAt = d.toISOString();
    } catch {
      // no EXIF is fine
    }

    // main image: orient, resize, strip metadata (sharp strips by default)
    const pipeline = sharp(file).rotate().resize(LONG_EDGE, LONG_EDGE, {
      fit: "inside",
      withoutEnlargement: true,
    });
    const buf = await pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true }).toBuffer();
    fs.writeFileSync(dest, buf);
    const { width, height } = await sharp(buf).metadata();

    // blur placeholder
    const blurBuf = await sharp(buf).resize(16, 16, { fit: "inside" }).webp({ quality: 40 }).toBuffer();
    const blur = `data:image/webp;base64,${blurBuf.toString("base64")}`;

    manifest[rel] = { width, height, blur, ...(takenAt ? { takenAt } : {}) };
    totalBytes += buf.length;
    console.log(`  + ${rel}  ${width}x${height}  ${(buf.length / 1024).toFixed(0)}KB${takenAt ? `  (${takenAt.slice(0, 10)})` : ""}`);
  }

  // prune manifest entries whose files were deleted
  for (const key of Object.keys(manifest)) {
    if (!fs.existsSync(path.join(PHOTOS_DIR, key))) {
      delete manifest[key];
      console.log(`  - pruned stale manifest entry: ${key}`);
    }
  }

  fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\nDone. ${files.length} photo(s), ${(totalBytes / 1024 / 1024).toFixed(1)}MB total. Manifest updated.`);
  console.log("Review with: npm run dev  ->  http://localhost:3000/photography");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
