/**
 * Code-native animated motifs, one per project / capability.
 * Pure SVG + CSS keyframes (see globals.css): deterministic markup so SSR and
 * client match, and the global reduced-motion rule freezes them into clean
 * static compositions. All colors come from the theme tokens.
 */

const ACCENT = "rgb(var(--accent))";
const MUTED = "rgb(var(--muted))";

/** FindGolfGames: course map. Dot grid with pinned locations pulsing. */
export function MotifDotMap() {
  const dots: { x: number; y: number }[] = [];
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 9; c++) dots.push({ x: 20 + c * 20, y: 16 + r * 17 });
  const pins = [
    { x: 60, y: 33, d: 0 },
    { x: 140, y: 67, d: 1 },
    { x: 100, y: 50, d: 2 },
  ];
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="1.2" fill={MUTED} opacity="0.35" />
      ))}
      <path
        d="M60 33 L100 50 L140 67"
        stroke={ACCENT}
        strokeWidth="1"
        strokeDasharray="3 4"
        fill="none"
        opacity="0.55"
      />
      {pins.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3" fill={ACCENT} />
          <circle
            className="motif-ping"
            style={{ animationDelay: `${p.d * 600}ms` }}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="none"
            stroke={ACCENT}
            strokeWidth="1"
          />
        </g>
      ))}
    </svg>
  );
}

/** AI Job Board: applicant ranking. Bars settle to ranked widths. */
export function MotifRankBars() {
  const rows = [
    { w: 128, top: true },
    { w: 104 },
    { w: 84 },
    { w: 64 },
    { w: 44 },
  ];
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden>
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="30" y={12 + i * 17} width="140" height="7" rx="3.5" fill={MUTED} opacity="0.14" />
          <rect
            className="motif-bar"
            style={{ animationDelay: `${i * 220}ms` }}
            x="30"
            y={12 + i * 17}
            width={r.w}
            height="7"
            rx="3.5"
            fill={ACCENT}
            opacity={r.top ? 0.95 : 0.4}
          />
          <circle cx="20" cy={15.5 + i * 17} r="2.5" fill={r.top ? ACCENT : MUTED} opacity={r.top ? 1 : 0.4} />
        </g>
      ))}
    </svg>
  );
}

/** LiftID: camera recognition. Viewfinder brackets with a scanning line. */
export function MotifScanFrame() {
  const b = 14; // bracket arm length
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden>
      {[
        `M30 ${10 + b} V10 h${b}`,
        `M${170 - b} 10 h${b} v${b}`,
        `M170 ${90 - b} V90 h-${b}`,
        `M${30 + b} 90 h-${b} v-${b}`,
      ].map((d, i) => (
        <path key={i} d={d} stroke={MUTED} strokeWidth="1.5" fill="none" opacity="0.6" />
      ))}
      <rect x="76" y="34" width="48" height="32" rx="3" stroke={ACCENT} strokeWidth="1" fill="none" opacity="0.5" />
      <line
        className="motif-scan"
        x1="34"
        y1="0"
        x2="166"
        y2="0"
        stroke={ACCENT}
        strokeWidth="1.5"
        opacity="0.85"
      />
      <circle className="motif-blink" cx="160" cy="18" r="2.5" fill={ACCENT} />
    </svg>
  );
}

/** Voluntr: community. Node graph, nodes pulsing in turn. */
export function MotifNodeGraph() {
  const nodes = [
    { x: 44, y: 30, d: 0 },
    { x: 100, y: 18, d: 1 },
    { x: 156, y: 34, d: 2 },
    { x: 64, y: 72, d: 3 },
    { x: 124, y: 66, d: 4 },
    { x: 100, y: 44, d: 5 },
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [0, 5],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
    [3, 4],
  ] as const;
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden>
      {edges.map(([a, z], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[z].x}
          y2={nodes[z].y}
          stroke={MUTED}
          strokeWidth="1"
          opacity="0.3"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          className="motif-node"
          style={{ animationDelay: `${n.d * 350}ms` }}
          cx={n.x}
          cy={n.y}
          r={i === 5 ? 4 : 3}
          fill={i === 5 ? ACCENT : MUTED}
        />
      ))}
    </svg>
  );
}

/** Neuron: brainwaves. EEG trace drawing itself on loop. */
export function MotifWaveLine() {
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden>
      <line x1="10" y1="50" x2="190" y2="50" stroke={MUTED} strokeWidth="1" opacity="0.18" />
      <path
        className="motif-draw"
        d="M10 50 h24 l6 -14 l8 28 l7 -34 l8 40 l7 -26 l6 6 h22 l6 -10 l8 22 l7 -30 l8 34 l7 -20 l6 4 h30"
        stroke={ACCENT}
        strokeWidth="1.5"
        fill="none"
        pathLength={100}
      />
    </svg>
  );
}

/** Engineering: code taking shape. Indented lines with a blinking caret. */
export function MotifCodeLines() {
  const rows = [
    { x: 20, w: 60, a: true },
    { x: 34, w: 96 },
    { x: 34, w: 72 },
    { x: 48, w: 88, a: true },
    { x: 34, w: 56 },
    { x: 20, w: 36 },
  ];
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden>
      {rows.map((r, i) => (
        <rect
          key={i}
          className="motif-type"
          style={{ animationDelay: `${i * 260}ms` }}
          x={r.x}
          y={10 + i * 14}
          width={r.w}
          height="6"
          rx="3"
          fill={r.a ? ACCENT : MUTED}
          opacity={r.a ? 0.85 : 0.35}
        />
      ))}
      <rect className="motif-blink" x="60" y="94" width="10" height="3" rx="1.5" fill={ACCENT} />
    </svg>
  );
}

/** GTM: growth. Stepped line climbing with milestone dots. */
export function MotifGrowthLine() {
  const pts = [
    { x: 26, y: 82 },
    { x: 66, y: 66 },
    { x: 106, y: 52 },
    { x: 146, y: 30 },
    { x: 178, y: 16 },
  ];
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden>
      {[26, 66, 106, 146].map((x) => (
        <line key={x} x1={x} y1="10" x2={x} y2="88" stroke={MUTED} strokeWidth="1" opacity="0.1" />
      ))}
      <path
        className="motif-draw"
        d={`M${pts.map((p) => `${p.x} ${p.y}`).join(" L")}`}
        stroke={ACCENT}
        strokeWidth="1.5"
        fill="none"
        pathLength={100}
      />
      {pts.map((p, i) => (
        <circle
          key={i}
          className="motif-node"
          style={{ animationDelay: `${i * 350}ms` }}
          cx={p.x}
          cy={p.y}
          r="3"
          fill={i === pts.length - 1 ? ACCENT : MUTED}
        />
      ))}
    </svg>
  );
}

/** Design & content: aperture. Rotating dashed ring inside a lens. */
export function MotifAperture() {
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden>
      <circle cx="100" cy="50" r="38" stroke={MUTED} strokeWidth="1" fill="none" opacity="0.3" />
      <g className="motif-spin" style={{ transformOrigin: "100px 50px" }}>
        <circle
          cx="100"
          cy="50"
          r="27"
          stroke={ACCENT}
          strokeWidth="1.5"
          strokeDasharray="10 8"
          fill="none"
          opacity="0.8"
        />
      </g>
      <circle className="motif-ping" cx="100" cy="50" r="8" stroke={ACCENT} strokeWidth="1" fill="none" />
      <circle cx="100" cy="50" r="5" fill={ACCENT} />
      <path d="M148 18 h14 M155 11 v14" stroke={MUTED} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

/** Motif lookup for project cards. */
export const projectMotifs: Record<string, () => React.JSX.Element> = {
  findgolfgames: MotifDotMap,
  "ai-job-board": MotifRankBars,
  liftid: MotifScanFrame,
  voluntr: MotifNodeGraph,
  neuron: MotifWaveLine,
};

/** Motif lookup for capability cards, by index. */
export const capabilityMotifs = [MotifCodeLines, MotifGrowthLine, MotifAperture];
