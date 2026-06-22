interface DecorIconProps {
  type: "neural" | "lens" | "chip" | "orbit";
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
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#646973"
              strokeWidth="2"
            />
          );
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

  // orbit
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      <ellipse cx="100" cy="100" rx="90" ry="40" stroke="#646973" strokeWidth="2.5" opacity="0.7" />
      <ellipse
        cx="100"
        cy="100"
        rx="40"
        ry="90"
        stroke="#8E9BA6"
        strokeWidth="2.5"
        opacity="0.6"
        transform="rotate(35 100 100)"
      />
      <circle cx="100" cy="100" r="22" fill="#D7E2EA" />
      <circle cx="190" cy="100" r="7" fill="#BBCCD7" />
      <circle cx="46" cy="158" r="6" fill="#D7E2EA" opacity="0.8" />
    </svg>
  );
}
