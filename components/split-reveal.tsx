"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export function SplitReveal({
  children,
  className,
  delay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(el, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
      });

      gsap.from(split.lines, {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        delay,
      });

      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <h1 ref={ref} className={className}>
      {children}
    </h1>
  );
}
