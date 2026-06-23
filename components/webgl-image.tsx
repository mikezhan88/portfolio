"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const VERT = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
uniform sampler2D tMap;
uniform vec2 uMouse;
uniform float uHover;
uniform float uTime;
uniform vec2 uCover;
varying vec2 vUv;
void main() {
  vec2 uv = (vUv - 0.5) * uCover + 0.5;
  vec2 dir = uv - uMouse;
  float d = length(dir);
  float s = uHover * smoothstep(0.55, 0.0, d);
  vec2 off = normalize(dir + 0.0001) * s * 0.06;
  off += vec2(sin(uv.y * 18.0 + uTime * 1.3), cos(uv.x * 18.0 + uTime * 1.3)) * 0.004 * uHover;
  float r = texture2D(tMap, uv - off * 1.0).r;
  float g = texture2D(tMap, uv - off * 1.6).g;
  float b = texture2D(tMap, uv - off * 2.4).b;
  gl_FragColor = vec4(r, g, b, 1.0);
}`;

export function WebglImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) {
      setFallback(true);
      return;
    }

    let cancelled = false;
    let dispose = () => {};

    (async () => {
      try {
        const OGL: any = await import("ogl");
        if (cancelled) return;
        const { Renderer, Geometry, Program, Mesh, Texture } = OGL;

        const renderer = new Renderer({
          canvas,
          alpha: true,
          dpr: Math.min(window.devicePixelRatio || 1, 2),
        });
        const gl = renderer.gl;

        const geometry = new Geometry(gl, {
          position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
          uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
        });

        const texture = new Texture(gl, {
          generateMipmaps: false,
          wrapS: gl.CLAMP_TO_EDGE,
          wrapT: gl.CLAMP_TO_EDGE,
        });

        const program = new Program(gl, {
          vertex: VERT,
          fragment: FRAG,
          uniforms: {
            tMap: { value: texture },
            uMouse: { value: [0.5, 0.5] },
            uHover: { value: 0 },
            uTime: { value: 0 },
            uCover: { value: [1, 1] },
          },
        });
        const mesh = new Mesh(gl, { geometry, program });

        const img = new window.Image();
        img.crossOrigin = "anonymous";

        const resize = () => {
          const r = wrap.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          renderer.setSize(r.width, r.height);
          const planeAspect = r.width / r.height;
          const imgAspect = (img.naturalWidth || 16) / (img.naturalHeight || 10);
          if (imgAspect > planeAspect) {
            program.uniforms.uCover.value = [planeAspect / imgAspect, 1];
          } else {
            program.uniforms.uCover.value = [1, imgAspect / planeAspect];
          }
        };

        img.onload = () => {
          texture.image = img;
          texture.needsUpdate = true;
          resize();
        };
        img.src = src;
        resize();

        let target = 0;
        const onMove = (e: PointerEvent) => {
          const r = canvas.getBoundingClientRect();
          program.uniforms.uMouse.value = [
            (e.clientX - r.left) / r.width,
            1 - (e.clientY - r.top) / r.height,
          ];
        };
        const onEnter = () => (target = 1);
        const onLeave = () => (target = 0);
        canvas.addEventListener("pointermove", onMove);
        canvas.addEventListener("pointerenter", onEnter);
        canvas.addEventListener("pointerleave", onLeave);

        let visible = true;
        const io = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            if (visible) resize();
          },
          { threshold: 0 }
        );
        io.observe(wrap);

        const ro = new ResizeObserver(resize);
        ro.observe(wrap);
        window.addEventListener("resize", resize);

        let raf = 0;
        const loop = (t: number) => {
          raf = requestAnimationFrame(loop);
          if (!visible || document.hidden) return;
          program.uniforms.uTime.value = t * 0.001;
          const h = program.uniforms.uHover.value;
          program.uniforms.uHover.value = h + (target - h) * 0.08;
          renderer.render({ scene: mesh });
        };
        raf = requestAnimationFrame(loop);
        requestAnimationFrame(() => requestAnimationFrame(resize));

        dispose = () => {
          cancelAnimationFrame(raf);
          io.disconnect();
          ro.disconnect();
          window.removeEventListener("resize", resize);
          canvas.removeEventListener("pointermove", onMove);
          canvas.removeEventListener("pointerenter", onEnter);
          canvas.removeEventListener("pointerleave", onLeave);
          gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
      } catch {
        if (!cancelled) setFallback(true);
      }
    })();

    return () => {
      cancelled = true;
      dispose();
    };
  }, [src]);

  return (
    <div ref={wrapRef} className={className} style={{ position: "relative" }}>
      {fallback ? (
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      ) : (
        <canvas
          ref={canvasRef}
          aria-label={alt}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      )}
    </div>
  );
}
