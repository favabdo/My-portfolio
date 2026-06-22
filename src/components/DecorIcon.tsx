interface DecorIconProps {
  type: "neural" | "lens" | "chip" | "orbit" | "graph" | "code" | "matrix" | "radar";
  className?: string;
}

export default function DecorIcon({ type, className = "" }: DecorIconProps) {
  if (type === "neural") {
    return (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        <circle cx="40" cy="60" r="7" fill="#D7E2EA" opacity="0.9" />
        <circle cx="40" cy="120" r="7" fill="#D7E2EA" opacity="0.9" />
        <circle cx="40" cy="160" r="7" fill="#D7E2EA" opacity="0.6" />
        <circle cx="110" cy="40" r="7" fill="#D7E2EA" opacity="0.7" />
        <circle cx="110" cy="100" r="7" fill="#D7E2EA" opacity="0.95" />
        <circle cx="110" cy="150" r="7" fill="#D7E2EA" opacity="0.6" />
        <circle cx="175" cy="75" r="9" fill="#BBCCD7" />
        <circle cx="175" cy="135" r="7" fill="#D7E2EA" opacity="0.7" />
        <g stroke="#D7E2EA" strokeOpacity="0.35" strokeWidth="1.5">
          <line x1="40" y1="60" x2="110" y2="40" />
          <line x1="40" y1="60" x2="110" y2="100" />
          <line x1="40" y1="120" x2="110" y2="40" />
          <line x1="40" y1="120" x2="110" y2="100" />
          <line x1="40" y1="120" x2="110" y2="150" />
          <line x1="40" y1="160" x2="110" y2="150" />
          <line x1="110" y1="40" x2="175" y2="75" />
          <line x1="110" y1="100" x2="175" y2="75" />
          <line x1="110" y1="100" x2="175" y2="135" />
          <line x1="110" y1="150" x2="175" y2="135" />
        </g>
      </svg>
    );
  }

  if (type === "lens") {
    return (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        <circle cx="100" cy="100" r="85" stroke="#646973" strokeWidth="3" />
        <circle cx="100" cy="100" r="62" stroke="#8E9BA6" strokeWidth="2" />
        <circle cx="100" cy="100" r="40" fill="#0C0C0C" stroke="#BBCCD7" strokeWidth="3" />
        <circle cx="100" cy="100" r="18" fill="#1a1a1a" stroke="#D7E2EA" strokeWidth="2" />
        <circle cx="84" cy="84" r="6" fill="#D7E2EA" opacity="0.8" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 8;
          const x1 = 100 + Math.cos(angle) * 85;
          const y1 = 100 + Math.sin(angle) * 85;
          const x2 = 100 + Math.cos(angle) * 95;
          const y2 = 100 + Math.sin(angle) * 95;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#646973" strokeWidth="2" />;
        })}
      </svg>
    );
  }

  if (type === "chip") {
    return (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        <rect x="55" y="55" width="90" height="90" rx="10" stroke="#BBCCD7" strokeWidth="3" fill="#101113" />
        <rect x="75" y="75" width="50" height="50" rx="6" stroke="#D7E2EA" strokeWidth="2" />
        <circle cx="100" cy="100" r="10" fill="#D7E2EA" opacity="0.8" />
        {[30, 60, 90, 120, 150].map((y) => (
          <g key={y}>
            <line x1="20" y1={y} x2="55" y2={y} stroke="#646973" strokeWidth="3" />
            <line x1="145" y1={y} x2="180" y2={y} stroke="#646973" strokeWidth="3" />
          </g>
        ))}
      </svg>
    );
  }

  if (type === "orbit") {
    return (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        <ellipse cx="100" cy="100" rx="90" ry="40" stroke="#646973" strokeWidth="2.5" opacity="0.7" />
        <ellipse cx="100" cy="100" rx="40" ry="90" stroke="#8E9BA6" strokeWidth="2.5" opacity="0.6" transform="rotate(35 100 100)" />
        <circle cx="100" cy="100" r="22" fill="#D7E2EA" />
        <circle cx="190" cy="100" r="7" fill="#BBCCD7" />
        <circle cx="46" cy="158" r="6" fill="#D7E2EA" opacity="0.8" />
      </svg>
    );
  }

  // graph — ML loss curve / data viz (top-left)
  if (type === "graph") {
    return (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        <line x1="20" y1="180" x2="20" y2="20" stroke="#D7E2EA" strokeWidth="2" strokeOpacity="0.4" />
        <line x1="20" y1="180" x2="190" y2="180" stroke="#D7E2EA" strokeWidth="2" strokeOpacity="0.4" />
        {[40, 80, 120, 160].map((x) => (
          <line key={x} x1={x} y1="175" x2={x} y2="185" stroke="#D7E2EA" strokeWidth="1.5" strokeOpacity="0.3" />
        ))}
        {[140, 100, 60].map((y) => (
          <line key={y} x1="15" y1={y} x2="25" y2={y} stroke="#D7E2EA" strokeWidth="1.5" strokeOpacity="0.3" />
        ))}
        <polyline
          points="20,160 50,130 80,95 110,72 140,55 170,45 190,42"
          stroke="#9B7BD9"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.9"
        />
        <polyline
          points="20,170 50,155 80,138 110,118 140,102 170,90 190,84"
          stroke="#5C9DD5"
          strokeWidth="2"
          strokeDasharray="4 3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.6"
        />
        <circle cx="190" cy="42" r="4" fill="#9B7BD9" />
        <circle cx="190" cy="84" r="3" fill="#5C9DD5" opacity="0.7" />
      </svg>
    );
  }

  // code — terminal / algorithm (bottom-left)
  if (type === "code") {
    return (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        <rect x="10" y="20" width="180" height="160" rx="12" stroke="#D7E2EA" strokeWidth="2" strokeOpacity="0.2" fill="#101113" />
        <circle cx="32" cy="42" r="5" fill="#D75AA0" opacity="0.7" />
        <circle cx="52" cy="42" r="5" fill="#D9A23F" opacity="0.7" />
        <circle cx="72" cy="42" r="5" fill="#3FA86A" opacity="0.7" />
        <line x1="10" y1="58" x2="190" y2="58" stroke="#D7E2EA" strokeWidth="1" strokeOpacity="0.1" />
        <text x="25" y="82" fill="#9B7BD9" fontSize="13" fontFamily="monospace" opacity="0.9">def</text>
        <text x="52" y="82" fill="#D7E2EA" fontSize="13" fontFamily="monospace" opacity="0.7">train</text>
        <text x="95" y="82" fill="#D7E2EA" fontSize="13" fontFamily="monospace" opacity="0.4">(X, y):</text>
        <text x="35" y="104" fill="#5C9DD5" fontSize="12" fontFamily="monospace" opacity="0.7">model</text>
        <text x="85" y="104" fill="#D7E2EA" fontSize="12" fontFamily="monospace" opacity="0.4">= fit()</text>
        <text x="35" y="124" fill="#5C9DD5" fontSize="12" fontFamily="monospace" opacity="0.6">return</text>
        <text x="85" y="124" fill="#3FA86A" fontSize="12" fontFamily="monospace" opacity="0.7">model</text>
        <line x1="25" y1="140" x2="120" y2="140" stroke="#D7E2EA" strokeWidth="1.5" strokeOpacity="0.15" />
        <line x1="25" y1="156" x2="90" y2="156" stroke="#D7E2EA" strokeWidth="1.5" strokeOpacity="0.1" />
      </svg>
    );
  }

  // matrix — data grid / heatmap (top-right)
  if (type === "matrix") {
    const rows = 5;
    const cols = 5;
    const opacities = [
      [0.9, 0.4, 0.7, 0.2, 0.6],
      [0.3, 0.85, 0.5, 0.8, 0.3],
      [0.6, 0.3, 0.95, 0.4, 0.7],
      [0.2, 0.7, 0.35, 0.8, 0.4],
      [0.5, 0.4, 0.6, 0.3, 0.9],
    ];
    return (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => (
            <rect
              key={`${r}-${c}`}
              x={20 + c * 34}
              y={20 + r * 34}
              width="28"
              height="28"
              rx="4"
              fill="#9B7BD9"
              opacity={opacities[r][c] * 0.7}
            />
          ))
        )}
        <rect x="20" y="20" width="160" height="160" rx="6" stroke="#D7E2EA" strokeWidth="1.5" strokeOpacity="0.15" />
      </svg>
    );
  }

  // radar — model evaluation / skill chart (bottom-right)
  if (type === "radar") {
    const cx = 100, cy = 100, r = 75;
    const axes = 6;
    const points = [0.9, 0.75, 0.85, 0.6, 0.95, 0.7];
    const toXY = (i: number, radius: number) => {
      const angle = (i * 2 * Math.PI) / axes - Math.PI / 2;
      return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
    };
    const radarPts = points.map((p, i) => toXY(i, r * p));
    const polyPts = radarPts.map((p) => `${p.x},${p.y}`).join(" ");
    return (
      <svg viewBox="0 0 200 200" className={className} fill="none">
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <polygon
            key={scale}
            points={Array.from({ length: axes }).map((_, i) => {
              const p = toXY(i, r * scale);
              return `${p.x},${p.y}`;
            }).join(" ")}
            stroke="#D7E2EA"
            strokeWidth="1"
            strokeOpacity="0.15"
            fill="none"
          />
        ))}
        {Array.from({ length: axes }).map((_, i) => {
          const p = toXY(i, r);
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#D7E2EA" strokeWidth="1" strokeOpacity="0.2" />;
        })}
        <polygon points={polyPts} fill="#5C9DD5" fillOpacity="0.2" stroke="#5C9DD5" strokeWidth="2" strokeOpacity="0.8" />
        {radarPts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#5C9DD5" opacity="0.9" />
        ))}
      </svg>
    );
  }

  return null;
}
