import { useRef, useState, useEffect, useCallback } from "react";
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

const AUTO_SCROLL_SPEED = 0.6; // px per frame
const PAUSE_AFTER_INTERACTION = 4000; // ms to pause after user touches

export default function CategoryRow({ title, accent, skills }: CategoryRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const isUserScrollingRef = useRef(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  // Auto-scroll loop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const animate = () => {
      if (!isPaused && !isUserScrollingRef.current) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 1) {
          // reset to start smoothly
          el.scrollLeft = 0;
        } else {
          el.scrollLeft += AUTO_SCROLL_SPEED;
        }
        updateArrows();
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused, updateArrows]);

  const pauseTemporarily = useCallback(() => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, PAUSE_AFTER_INTERACTION);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScrollStart = () => {
      isUserScrollingRef.current = true;
      pauseTemporarily();
    };
    const onScrollEnd = () => {
      isUserScrollingRef.current = false;
    };

    el.addEventListener("scroll", updateArrows, { passive: true });
    el.addEventListener("mousedown", onScrollStart);
    el.addEventListener("touchstart", onScrollStart, { passive: true });
    el.addEventListener("touchend", onScrollEnd);
    el.addEventListener("mouseup", onScrollEnd);
    window.addEventListener("resize", updateArrows);

    updateArrows();

    return () => {
      el.removeEventListener("scroll", updateArrows);
      el.removeEventListener("mousedown", onScrollStart);
      el.removeEventListener("touchstart", onScrollStart);
      el.removeEventListener("touchend", onScrollEnd);
      el.removeEventListener("mouseup", onScrollEnd);
      window.removeEventListener("resize", updateArrows);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, [updateArrows, pauseTemporarily]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    pauseTemporarily();
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
        style={{ cursor: "grab" }}
        onMouseDown={() => pauseTemporarily()}
      >
        {skills.map((skill) => (
          <MarqueeTile key={skill.label} label={skill.label} symbol={skill.symbol} accent={accent} />
        ))}
      </div>
    </div>
  );
}
