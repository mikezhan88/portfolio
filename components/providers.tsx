"use client";

import { MotionConfig, useReducedMotion } from "motion/react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function Providers({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reduce) return;

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const lenis = lenisRef.current?.lenis;
    if (lenis) lenis.on("scroll", ScrollTrigger.update);

    // Recompute pinned/scroll positions once fonts + images settle, so the
    // pinned section doesn't break on the way back up.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    const t1 = window.setTimeout(refresh, 500);
    const t2 = window.setTimeout(refresh, 1500);

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
      window.removeEventListener("load", refresh);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduce]);

  return (
    <MotionConfig reducedMotion="user">
      {reduce ? (
        children
      ) : (
        <ReactLenis root options={{ lerp: 0.1, autoRaf: false }} ref={lenisRef}>
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}
