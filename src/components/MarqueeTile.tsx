interface MarqueeTileProps {
  label: string;
  accent: string;
  symbol: string;
}

export default function MarqueeTile({ label, accent, symbol }: MarqueeTileProps) {
  return (
    <div
      className="relative flex-shrink-0 rounded-2xl overflow-hidden flex flex-col justify-between p-5"
      style={{
        width: "420px",
        height: "270px",
        background:
          "linear-gradient(155deg, #15161A 0%, #0C0C0C 60%, #0C0C0C 100%)",
        border: "1px solid rgba(215, 226, 234, 0.08)",
      }}
    >
      {/* top fake window controls */}
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#4a4a4a" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#4a4a4a" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: accent }} />
      </div>

      {/* symbol */}
      <div
        className="font-black leading-none select-none"
        style={{
          fontSize: "5rem",
          color: accent,
          opacity: 0.9,
          letterSpacing: "-0.02em",
        }}
      >
        {symbol}
      </div>

      {/* label */}
      <div
        className="uppercase tracking-widest font-medium"
        style={{ color: "#D7E2EA", fontSize: "1.1rem", opacity: 0.85 }}
      >
        {label}
      </div>
    </div>
  );
}
