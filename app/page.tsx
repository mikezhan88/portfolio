import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { InFocus } from "@/components/sections/in-focus";
import { About } from "@/components/sections/about";
import { GalleryTeaser } from "@/components/sections/gallery-teaser";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <InFocus />
      <About />
      <GalleryTeaser />
      <Contact />
    </>
  );
}
