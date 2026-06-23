interface StickyLabelProps {
  label: string;
}

export default function StickyLabel({ label }: StickyLabelProps) {
  return (
    <div className="sticky top-4 sm:top-5 z-30 flex justify-center pointer-events-none mb-4 sm:mb-6">
      <span className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/20 bg-[#0C0C0C]/85 backdrop-blur-sm px-4 sm:px-5 py-1.5 sm:py-2 text-[#D7E2EA]/70 uppercase tracking-widest text-[0.65rem] sm:text-xs font-medium shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        {label}
      </span>
    </div>
  );
}
