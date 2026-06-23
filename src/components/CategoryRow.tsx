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

const AUTO_SCROLL_SPEED = 0.35; // slower & smoother
const PAUSE_AFTER_INTERACTION = 4000;

export default function CategoryRow({ title, accent, skills }: CategoryRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const isUserScrollingRef = useRef(false);
  const posRef = useRef(0); // track fractional position

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    posRef.current = el.scrollLeft;

    const animate = () => {
      if (!isPaused && !isUserScrollingRef.current) {
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (maxScroll > 0) {
          posRef.current += AUTO_SCROLL_SPEED;
          if (posRef.current >= maxScroll) posRef.current = 0;
          el.scrollLeft = posRef.current;
          updateArrows();
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isPaused, updateArrows]);

  const pauseTemporarily = useCallback(() => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setIsPaused(false), PAUSE_AFTER_INTERACTION);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onStart = () => { isUserScrollingRef.current = true; pauseTemporarily(); };
    const onEnd = () => {
      isUserScrollingRef.current = false;
      posRef.current = el.scrollLeft;
    };

    el.addEventListener("scroll", updateArrows, { passive: true });
    el.addEventListener("mousedown", onStart);
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("mouseup", onEnd);
    window.addEventListener("resize", updateArrows);
    updateArrows();

    return () => {
      el.removeEventListener("scroll", updateArrows);
      el.removeEventListener("mousedown", onStart);
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("mouseup", onEnd);
      window.removeEventListener("resize", updateArrows);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, [updateArrows, pauseTemporarily]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    pauseTemporarily();
    const next = el.scrollLeft + dir * 200;
    posRef.current = Math.max(0, Math.min(next, el.scrollWidth - el.clientWidth));
    el.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between px-1 gap-2">
        <h3
          className="uppercase tracking-widest font-bold text-base sm:text-lg leading-tight"
          style={{
            color: accent,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2.5em",
          }}
        >
          {title}
        </h3>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            aria-label={`Scroll ${title} left`}
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-opacity duration-200 disabled:opacity-20"
            style={{ borderColor: `${accent}66`, color: accent }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            aria-label={`Scroll ${title} right`}
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-opacity duration-200 disabled:opacity-20"
            style={{ borderColor: `${accent}66`, color: accent }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar flex gap-3 overflow-x-auto"
        style={{ cursor: "grab" }}
      >
        {skills.map((skill) => (
          <MarqueeTile key={skill.label} label={skill.label} symbol={skill.symbol} accent={accent} />
        ))}
      </div>
    </div>
  );
}
