"use client";

import Lightbox, { type Slide } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Video from "yet-another-react-lightbox/plugins/video";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import type { Photo } from "@/lib/photos";

function toSlide(p: Photo): Slide {
  if (p.kind === "video") {
    return {
      type: "video",
      width: p.width,
      height: p.height,
      poster: p.poster,
      description: p.caption,
      controls: true,
      playsInline: true,
      autoPlay: true,
      sources: [{ src: p.src, type: "video/mp4" }],
    };
  }
  return {
    src: p.src,
    width: p.width,
    height: p.height,
    alt: p.alt,
    description: p.caption,
  };
}

export default function PhotoLightbox({
  photos,
  index,
  onClose,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
}) {
  return (
    <Lightbox
      open={index >= 0}
      index={index}
      close={onClose}
      slides={photos.map(toSlide)}
      plugins={[Zoom, Video, Captions, Counter]}
      animation={{ fade: 240, swipe: 320 }}
      controller={{ closeOnBackdropClick: true }}
      zoom={{ maxZoomPixelRatio: 2 }}
      video={{ preload: "metadata" }}
      counter={{ container: { style: { top: "unset", bottom: 0, left: 0 } } }}
      captions={{ descriptionTextAlign: "center" }}
      styles={{
        container: { backgroundColor: "rgb(11 12 13 / 0.96)" },
        button: { filter: "none", color: "rgb(140 142 142)" },
      }}
    />
  );
}
