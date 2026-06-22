import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MarqueeTile from "./MarqueeTile";

interface SkillItem {
  label: string;
  symbol: string;
}

interface CategoryRowProps {
  title: string;
  accent: string;
  skills: SkillItem[];
}

export default function CategoryRow({ title, accent, skills }: CategoryRowProps) {
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

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <h3
          className="uppercase tracking-widest font-bold text-base sm:text-lg md:text-xl"
          style={{ color: accent }}
        >
          {title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            aria-label={`Scroll ${title} left`}
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-opacity duration-200 disabled:opacity-20"
            style={{ borderColor: `${accent}66`, color: accent }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            aria-label={`Scroll ${title} right`}
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-opacity duration-200 disabled:opacity-20"
            style={{ borderColor: `${accent}66`, color: accent }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth"
      >
        {skills.map((skill) => (
          <MarqueeTile key={skill.label} label={skill.label} symbol={skill.symbol} accent={accent} />
        ))}
      </div>
    </div>
  );
}
