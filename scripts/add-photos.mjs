#!/usr/bin/env node
/**
 * Media ingest: optimize photos AND short videos into the gallery in one command.
 *
 *   npm run photos:add -- <source folder or files...> [category]
 *
 * Examples:
 *   npm run photos:add -- ~/Desktop/kyoto-export travel
 *   npm run photos:add -- ~/Downloads/reel.mp4 street
 *
 * Photos (jpg/png/webp/tiff/avif), per image:
 *   - applies EXIF orientation, then STRIPS all metadata (including GPS)
 *   - resizes to a 2560px long edge (never upscales)
 *   - recompresses as progressive JPEG (mozjpeg, q82), typically 0.4-1.2MB
 *   - reads the capture date (for gallery ordering) before stripping
 *   - generates a tiny blur placeholder for the loading state
 *
 * Videos (mp4/mov/m4v/webm), per clip:
 *   - transcodes to web-safe H.264 MP4 (faststart, keeps original fps)
 *   - caps the long edge at 1920px, strips all metadata (including GPS)
 *   - extracts a poster frame (+ blur placeholder) for the grid tile
 *   - records duration; warns if a clip is long/heavy (trim, or use a
 *     streaming host like Mux for long-form)
 *
 * Everything lands in public/photos/<category>/ (subfolder = filter pill)
 * and is recorded in data/photo-manifest.json. Captions/featured flags stay
 * in data/photo-meta.ts (optional). HEIC is not supported: export JPEG first.
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import sharp from "sharp";
import exifr from "exifr";
import ffmpegPath from "ffmpeg-static";

const ROOT = process.cwd();
const PHOTOS_DIR = path.join(ROOT, "public", "photos");
const MANIFEST = path.join(ROOT, "data", "photo-manifest.json");
const IMG_OK = /\.(jpe?g|png|webp|tiff?|avif)$/i;
const VID_OK = /\.(mp4|mov|m4v|webm)$/i;
const LONG_EDGE = 2560;
const VIDEO_LONG_EDGE = 1920;
const VIDEO_WARN_SECONDS = 90;
const VIDEO_WARN_MB = 45;

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
        if (IMG_OK.test(f) || VID_OK.test(f)) files.push(path.join(p, f));
        else if (/\.heic$/i.test(f)) console.error(`  ! HEIC not supported, export as JPEG: ${f}`);
      }
    } else if (IMG_OK.test(p) || VID_OK.test(p)) {
      files.push(p);
    } else if (/\.heic$/i.test(p)) {
      console.error(`  ! HEIC not supported, export as JPEG: ${a}`);
    } else {
      console.error(`  ! skipping (not a supported photo/video): ${a}`);
    }
  }
  return files;
}

/** Probe a video with ffmpeg's stderr banner: dimensions, duration, creation date. */
function probeVideo(file) {
  let out = "";
  try {
    execFileSync(ffmpegPath, ["-hide_banner", "-i", file], { stdio: "pipe" });
  } catch (e) {
    out = e.stderr?.toString() ?? "";
  }
  const dim = out.match(/, (\d{2,5})x(\d{2,5})[\s,]/);
  const dur = out.match(/Duration: (\d+):(\d+):([\d.]+)/);
  const rot = out.match(/rotation of (-?\d+)/) ?? out.match(/displaymatrix:.*rotation of (-?\d+)/);
  const created = out.match(/creation_time\s*:\s*([\d-]+T[\d:.]+Z?)/);
  let width = dim ? parseInt(dim[1], 10) : 0;
  let height = dim ? parseInt(dim[2], 10) : 0;
  // a 90/270-degree display rotation swaps the rendered dimensions
  if (rot && Math.abs(parseInt(rot[1], 10)) % 180 === 90) [width, height] = [height, width];
  const duration = dur ? parseInt(dur[1], 10) * 3600 + parseInt(dur[2], 10) * 60 + parseFloat(dur[3]) : 0;
  return { width, height, duration, takenAt: created ? new Date(created[1]).toISOString() : null };
}

async function ingestImage(file, destDir) {
  const base = slugify(path.basename(file, path.extname(file))) || "photo";
  let name = `${base}.jpg`;
  let n = 2;
  while (fs.existsSync(path.join(destDir, name))) name = `${base}-${n++}.jpg`;
  const dest = path.join(destDir, name);
  const rel = path.relative(PHOTOS_DIR, dest).split(path.sep).join("/");

  let takenAt = null;
  try {
    const exif = await exifr.parse(file, ["DateTimeOriginal", "CreateDate"]);
    const d = exif?.DateTimeOriginal ?? exif?.CreateDate;
    if (d instanceof Date && !Number.isNaN(d.valueOf())) takenAt = d.toISOString();
  } catch {
    // no EXIF is fine
  }

  const buf = await sharp(file)
    .rotate()
    .resize(LONG_EDGE, LONG_EDGE, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toBuffer();
  fs.writeFileSync(dest, buf);
  const { width, height } = await sharp(buf).metadata();
  const blurBuf = await sharp(buf).resize(16, 16, { fit: "inside" }).webp({ quality: 40 }).toBuffer();

  return {
    rel,
    bytes: buf.length,
    entry: {
      width,
      height,
      blur: `data:image/webp;base64,${blurBuf.toString("base64")}`,
      ...(takenAt ? { takenAt } : {}),
    },
    note: takenAt ? `(${takenAt.slice(0, 10)})` : "",
  };
}

async function ingestVideo(file, destDir) {
  const base = slugify(path.basename(file, path.extname(file))) || "video";
  let name = `${base}.mp4`;
  let n = 2;
  while (fs.existsSync(path.join(destDir, name))) name = `${base}-${n++}.mp4`;
  const dest = path.join(destDir, name);
  const rel = path.relative(PHOTOS_DIR, dest).split(path.sep).join("/");

  const probe = probeVideo(file);
  if (!probe.width || !probe.height) throw new Error(`could not read video dimensions: ${file}`);

  // compute even-numbered output size, long edge capped, never upscaled
  const scale = Math.min(1, VIDEO_LONG_EDGE / Math.max(probe.width, probe.height));
  const w = Math.round((probe.width * scale) / 2) * 2;
  const h = Math.round((probe.height * scale) / 2) * 2;

  execFileSync(
    ffmpegPath,
    [
      "-hide_banner", "-loglevel", "error", "-y",
      "-i", file,
      "-map_metadata", "-1",
      "-vf", `scale=${w}:${h}`,
      "-c:v", "libx264", "-crf", "23", "-preset", "medium",
      "-profile:v", "high", "-pix_fmt", "yuv420p",
      "-c:a", "aac", "-b:a", "128k",
      "-movflags", "+faststart",
      dest,
    ],
    { stdio: "inherit" }
  );
  const bytes = fs.statSync(dest).size;

  // poster frame (1s in, or 0 for very short clips) + blur, saved as .poster.jpg
  const posterName = name.replace(/\.mp4$/, ".poster.jpg");
  const posterDest = path.join(destDir, posterName);
  const frame = execFileSync(ffmpegPath, [
    "-hide_banner", "-loglevel", "error",
    "-ss", probe.duration > 2 ? "1" : "0",
    "-i", dest, "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-",
  ], { maxBuffer: 64 * 1024 * 1024 });
  const posterBuf = await sharp(frame).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  fs.writeFileSync(posterDest, posterBuf);
  const blurBuf = await sharp(posterBuf).resize(16, 16, { fit: "inside" }).webp({ quality: 40 }).toBuffer();

  const warnings = [];
  if (probe.duration > VIDEO_WARN_SECONDS)
    warnings.push(`${Math.round(probe.duration)}s is long for a self-hosted reel; consider trimming or a streaming host (Mux)`);
  if (bytes / 1024 / 1024 > VIDEO_WARN_MB)
    warnings.push(`${(bytes / 1024 / 1024).toFixed(0)}MB is heavy for the repo; consider trimming`);

  return {
    rel,
    bytes,
    entry: {
      type: "video",
      width: w,
      height: h,
      duration: Math.round(probe.duration),
      poster: `${path.relative(PHOTOS_DIR, posterDest).split(path.sep).join("/")}`,
      blur: `data:image/webp;base64,${blurBuf.toString("base64")}`,
      ...(probe.takenAt ? { takenAt: probe.takenAt } : {}),
    },
    note: `${Math.round(probe.duration)}s${probe.takenAt ? `  (${probe.takenAt.slice(0, 10)})` : ""}`,
    warnings,
  };
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
    console.error("No photos or videos found.");
    process.exit(1);
  }

  const destDir = category ? path.join(PHOTOS_DIR, category) : PHOTOS_DIR;
  fs.mkdirSync(destDir, { recursive: true });

  const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};

  console.log(`Adding ${files.length} item(s)${category ? ` to category "${category}"` : ""}...\n`);
  let totalBytes = 0;

  for (const file of files) {
    const isVideo = VID_OK.test(file);
    const r = isVideo ? await ingestVideo(file, destDir) : await ingestImage(file, destDir);
    manifest[r.rel] = r.entry;
    totalBytes += r.bytes;
    const size = isVideo && "width" in r.entry ? `${r.entry.width}x${r.entry.height}` : `${r.entry.width}x${r.entry.height}`;
    console.log(`  + ${r.rel}  ${size}  ${(r.bytes / 1024).toFixed(0)}KB  ${r.note}`);
    for (const w of r.warnings ?? []) console.log(`    ! ${w}`);
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
  console.log(`\nDone. ${files.length} item(s), ${(totalBytes / 1024 / 1024).toFixed(1)}MB total. Manifest updated.`);
  console.log("Review with: npm run dev  ->  http://localhost:3000/photography");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
