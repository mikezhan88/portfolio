import { Hero } from "@/components/sections/hero";
import { Statement } from "@/components/sections/statement";
import { SelectedWork } from "@/components/sections/selected-work";
import { InFocus } from "@/components/sections/in-focus";
import { Capabilities } from "@/components/sections/capabilities";
import { About } from "@/components/sections/about";
import { GalleryTeaser } from "@/components/sections/gallery-teaser";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <SelectedWork />
      <InFocus />
      <Capabilities />
      <About />
      <GalleryTeaser />
      <Contact />
    </>
  );
}
