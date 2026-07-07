"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import type { Photo } from "@/lib/photos";

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
      slides={photos.map((p) => ({
        src: p.src,
        width: p.width,
        height: p.height,
        alt: p.alt,
        description: p.caption,
      }))}
      plugins={[Zoom, Captions, Counter]}
      animation={{ fade: 240, swipe: 320 }}
      controller={{ closeOnBackdropClick: true }}
      zoom={{ maxZoomPixelRatio: 2 }}
      counter={{ container: { style: { top: "unset", bottom: 0, left: 0 } } }}
      captions={{ descriptionTextAlign: "center" }}
      styles={{
        container: { backgroundColor: "rgb(11 12 13 / 0.96)" },
        button: { filter: "none", color: "rgb(140 142 142)" },
      }}
    />
  );
}
