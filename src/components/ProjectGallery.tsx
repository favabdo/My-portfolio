import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react";

interface ProjectGalleryProps {
  id: string;
  images: string[];
  cover: string;
  accent?: string;
  triggerClassName?: string;
  triggerStyle?: React.CSSProperties;
}

const AUTO_SCROLL_SPEED = 0.6;
const PAUSE_AFTER_INTERACTION = 4000;

export default function ProjectGallery({
  id,
  images,
  cover,
  accent = "#D7E2EA",
  triggerClassName = "",
  triggerStyle,
}: ProjectGalleryProps) {
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const isUserScrollingRef = useRef(false);
  const posRef = useRef(0);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  // Auto-scroll loop — same mechanic as the Skills marquee rows
  useEffect(() => {
    if (!open) return;
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
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [open, isPaused, updateArrows]);

  const pauseTemporarily = useCallback(() => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setIsPaused(false), PAUSE_AFTER_INTERACTION);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !open) return;

    const onStart = () => {
      isUserScrollingRef.current = true;
      pauseTemporarily();
    };
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
  }, [open, updateArrows, pauseTemporarily]);

  const scrollByImage = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    pauseTemporarily();
    const amount = el.clientWidth * 0.85;
    const next = el.scrollLeft + dir * amount;
    posRef.current = Math.max(0, Math.min(next, el.scrollWidth - el.clientWidth));
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <>
      <motion.button
        layoutId={`gallery-${id}`}
        onClick={() => setOpen(true)}
        className={`relative overflow-hidden flex flex-col items-center justify-center text-center ${triggerClassName}`}
        style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          ...triggerStyle,
        }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex flex-col items-center gap-2 px-4">
          <Images size={28} color={accent} strokeWidth={1.6} />
          <span className="text-[#D7E2EA] font-medium uppercase tracking-widest text-xs sm:text-sm">
            Show More Photos
          </span>
          <span className="text-[#D7E2EA]/50 text-xs">+{images.length} photos</span>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 sm:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              layoutId={`gallery-${id}`}
              className="relative rounded-3xl p-4 sm:p-6 flex flex-col"
              style={{
                width: "min(900px, 94vw)",
                maxHeight: "88vh",
                background: "linear-gradient(160deg, #1a1b20 0%, #0C0C0C 75%)",
                border: `1px solid ${accent}40`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 text-[#D7E2EA]/70 hover:text-[#D7E2EA] transition-colors z-20"
                aria-label="Close"
              >
                <X size={22} />
              </button>

              <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
                <p className="text-[#D7E2EA] font-medium uppercase tracking-widest text-sm sm:text-base">
                  Project Gallery
                </p>
                <div className="hidden sm:flex gap-2">
                  <button
                    onClick={() => scrollByImage(-1)}
                    disabled={!canScrollLeft}
                    aria-label="Previous photo"
                    className="w-9 h-9 rounded-full flex items-center justify-center border transition-opacity duration-200 disabled:opacity-20"
                    style={{ borderColor: `${accent}66`, color: accent }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => scrollByImage(1)}
                    disabled={!canScrollRight}
                    aria-label="Next photo"
                    className="w-9 h-9 rounded-full flex items-center justify-center border transition-opacity duration-200 disabled:opacity-20"
                    style={{ borderColor: `${accent}66`, color: accent }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div
                ref={scrollRef}
                className="no-scrollbar flex gap-3 sm:gap-4 overflow-x-auto"
                style={{ cursor: "grab" }}
              >
                {images.map((src, i) => (
                  <img
                    key={src + i}
                    src={src}
                    alt={`Project screenshot ${i + 1}`}
                    className="flex-shrink-0 rounded-2xl object-contain"
                    style={{ height: "min(60vh, 520px)", maxWidth: "90%" }}
                    draggable={false}
                  />
                ))}
              </div>

              <p className="text-[#D7E2EA]/40 text-xs text-center mt-3 sm:mt-4">
                Swipe to browse — auto-scrolls when idle
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
