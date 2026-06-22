interface ProjectPlaceholderProps {
  variant: "chart" | "table" | "code" | "camera" | "flow";
  className?: string;
  style?: React.CSSProperties;
}

export default function ProjectPlaceholder({ variant, className = "", style }: ProjectPlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      style={{
        background: "linear-gradient(160deg, #14151A 0%, #0C0C0C 80%)",
        ...style,
      }}
    >
      {variant === "chart" && (
        <svg viewBox="0 0 200 120" className="w-3/4 h-3/4" fill="none">
          <polyline
            points="10,90 40,70 70,80 100,40 130,55 160,20 190,35"
            stroke="#D7E2EA"
            strokeWidth="3"
            fill="none"
          />
          {[10, 40, 70, 100, 130, 160, 190].map((x, i) => (
            <circle key={i} cx={x} cy={[90, 70, 80, 40, 55, 20, 35][i]} r="3.5" fill="#BBCCD7" />
          ))}
          <line x1="10" y1="105" x2="190" y2="105" stroke="#646973" strokeWidth="1.5" opacity="0.5" />
        </svg>
      )}
      {variant === "table" && (
        <div className="w-3/4 h-3/4 flex flex-col gap-2 justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-2">
              <div className="h-2.5 rounded-full bg-[#D7E2EA]/70" style={{ width: "30%" }} />
              <div className="h-2.5 rounded-full bg-[#D7E2EA]/30" style={{ width: "45%" }} />
              <div className="h-2.5 rounded-full bg-[#D7E2EA]/15" style={{ width: "15%" }} />
            </div>
          ))}
        </div>
      )}
      {variant === "code" && (
        <div className="w-3/4 h-3/4 flex flex-col gap-2.5 justify-center font-mono">
          {[60, 80, 45, 90, 30, 70].map((w, i) => (
            <div
              key={i}
              className="h-2 rounded-full"
              style={{
                width: `${w}%`,
                background: i % 3 === 0 ? "#9B7BD9" : i % 3 === 1 ? "#D7E2EA" : "#646973",
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      )}
      {variant === "camera" && (
        <svg viewBox="0 0 200 160" className="w-3/4 h-3/4" fill="none">
          <rect x="20" y="40" width="160" height="100" rx="14" stroke="#D7E2EA" strokeWidth="2.5" />
          <rect x="70" y="20" width="60" height="24" rx="6" stroke="#D7E2EA" strokeWidth="2.5" />
          <circle cx="100" cy="90" r="32" stroke="#BBCCD7" strokeWidth="2.5" />
          <circle cx="100" cy="90" r="14" fill="#0C0C0C" stroke="#D7E2EA" strokeWidth="2" />
          <circle cx="155" cy="58" r="5" fill="#9B7BD9" />
        </svg>
      )}
      {variant === "flow" && (
        <svg viewBox="0 0 200 140" className="w-3/4 h-3/4" fill="none">
          <rect x="10" y="20" width="50" height="28" rx="6" stroke="#D7E2EA" strokeWidth="2" />
          <rect x="150" y="20" width="40" height="28" rx="6" stroke="#D7E2EA" strokeWidth="2" />
          <rect x="80" y="80" width="50" height="28" rx="6" stroke="#BBCCD7" strokeWidth="2" />
          <path d="M60 34 H150" stroke="#646973" strokeWidth="2" />
          <path d="M105 48 V80" stroke="#646973" strokeWidth="2" />
          <path d="M170 48 V80 H130" stroke="#646973" strokeWidth="2" />
        </svg>
      )}
    </div>
  );
}
