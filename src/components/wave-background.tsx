"use client";

import { useEffect, useRef } from "react";

const CONFIGS = [
  { cyFrac: 0.18, thick: 14, amp: 36, freq: 0.0022, speed: 0.00026, drift:  8, opacity: 0.55, phase: 0.3 },
  { cyFrac: 0.34, thick: 10, amp: 30, freq: 0.0028, speed: 0.00034, drift:  6, opacity: 0.50, phase: 1.7 },
  { cyFrac: 0.50, thick: 26, amp: 46, freq: 0.0018, speed: 0.00022, drift: 12, opacity: 0.75, phase: 0.8 },
  { cyFrac: 0.66, thick:  9, amp: 28, freq: 0.0026, speed: 0.00030, drift:  6, opacity: 0.45, phase: 4.1 },
  { cyFrac: 0.82, thick: 16, amp: 38, freq: 0.0024, speed: 0.00026, drift:  9, opacity: 0.60, phase: 2.2 },
];

function bandPath(
  t: number,
  c: typeof CONFIGS[0],
  W: number,
  waveTop: number,
  waveBottom: number
): string {
  const range = waveBottom - waveTop;
  const cy =
    waveTop +
    range * c.cyFrac +
    Math.sin(t * 0.00016 + c.phase) * c.drift;
  const N = 48;
  const top: [number, number][] = [];
  const bot: [number, number][] = [];
  for (let i = 0; i <= N; i++) {
    const x = (i / N) * W;
    const yMid =
      cy +
      c.amp * Math.sin(x * c.freq + t * c.speed + c.phase) +
      c.amp * 0.3 * Math.sin(x * c.freq * 2.2 + t * c.speed * 1.6 + c.phase);
    top.push([x, yMid - c.thick / 2]);
    bot.push([x, yMid + c.thick / 2]);
  }
  let d = `M ${top[0][0]} ${top[0][1]}`;
  for (let i = 1; i <= N; i++) d += ` L ${top[i][0]} ${top[i][1]}`;
  for (let i = N; i >= 0; i--) d += ` L ${bot[i][0]} ${bot[i][1]}`;
  return d + " Z";
}

interface WaveBackgroundProps {
  wordmarkId: string;
}

export function WaveBackground({ wordmarkId }: WaveBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<SVGPathElement[]>([]);
  const rafRef = useRef<number>(0);
  const boundsRef = useRef({ top: 0, bottom: 0, W: 0 });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Create path elements once
    const group = svg.querySelector<SVGGElement>("#wave-group")!;
    pathRefs.current = CONFIGS.map((c) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("opacity", String(c.opacity));
      path.setAttribute("fill", "url(#purple-grad)");
      group.appendChild(path);
      return path;
    });

    function measure() {
      const el = document.getElementById(wordmarkId);
      const W = window.innerWidth;
      const H = window.innerHeight;
      boundsRef.current.W = W;
      if (el) {
        const r = el.getBoundingClientRect();
        boundsRef.current.top    = r.top    - 40;
        boundsRef.current.bottom = r.bottom + 40;
      } else {
        boundsRef.current.top    = H * 0.30;
        boundsRef.current.bottom = H * 0.62;
      }
      if (!svg) return;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.setAttribute("width", String(W));
      svg.setAttribute("height", String(H));
    }

    measure();
    setTimeout(measure, 200);
    setTimeout(measure, 800);
    window.addEventListener("resize", measure);

    function tick(t: number) {
      const { top, bottom, W } = boundsRef.current;
      if (bottom > top) {
        pathRefs.current.forEach((path, i) => {
          path.setAttribute("d", bandPath(t, CONFIGS[i], W, top, bottom));
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", measure);
      pathRefs.current.forEach((p) => p.remove());
      pathRefs.current = [];
    };
  }, [wordmarkId]);

  return (
    <>
      {/* SVG defs shared across the page */}
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }} aria-hidden>
        <defs>
          <linearGradient id="purple-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0"   stopColor="#6C3F91" />
            <stop offset="0.5" stopColor="#8E5FB0" />
            <stop offset="1"   stopColor="#6C3F91" />
          </linearGradient>
        </defs>
      </svg>

      {/* Animated wave SVG */}
      <svg
        ref={svgRef}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          filter: "blur(3px)",
          overflow: "visible",
        }}
        preserveAspectRatio="none"
      >
        <g id="wave-group" />
      </svg>
    </>
  );
}
