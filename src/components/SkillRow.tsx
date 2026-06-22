import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SkillRowProps {
  title: string;
  accent: string;
  skills: string[];
}

export default function SkillRow({ title, accent, skills }: SkillRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <h3
          className="uppercase tracking-widest font-semibold text-sm sm:text-base"
          style={{ color: accent }}
        >
          {title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-1)}
            disabled={!canScrollLeft}
            aria-label={`Scroll ${title} left`}
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-opacity duration-200 disabled:opacity-25"
            style={{ borderColor: `${accent}55`, color: accent }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            disabled={!canScrollRight}
            aria-label={`Scroll ${title} right`}
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-opacity duration-200 disabled:opacity-25"
            style={{ borderColor: `${accent}55`, color: accent }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-2.5 overflow-x-auto scroll-smooth pb-1"
      >
        {skills.map((skill) => (
          <span
            key={skill}
            className="flex-shrink-0 rounded-full px-5 py-2.5 text-sm sm:text-base whitespace-nowrap"
            style={{
              border: `1px solid ${accent}40`,
              background: `${accent}14`,
              color: "#D7E2EA",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
