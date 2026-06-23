import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { WhatsAppIcon, GmailIcon } from "./BrandIcons";

const PHONE = "201061163091";
const EMAIL = "abdallah666mo@gmail.com";

export default function FloatingContactButtons() {
  const [phase, setPhase] = useState<"hero" | "transitioning" | "fixed">("hero");

  // Position state for the flying animation
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [endPos] = useState(() => {
    if (typeof window === "undefined") return { x: 0, y: 0 };
    return {
      x: window.innerWidth - 24 - 48,   // right-6 = 24px, button ~48px wide
      y: window.innerHeight - 32 - 48,  // bottom-8 = 32px, button ~48px tall
    };
  });

  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    heroRef.current = document.getElementById("hero-contact");

    const getHeroPos = () => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setStartPos({ x: rect.left, y: rect.top });
    };

    getHeroPos();
    window.addEventListener("resize", getHeroPos);
    return () => window.removeEventListener("resize", getHeroPos);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const vh = window.innerHeight;

      if (scrolled < vh * 0.55) {
        setPhase("hero");
      } else if (scrolled < vh * 1.0) {
        setPhase("transitioning");
        // Keep updating hero pos while it's scrolling out of view
        if (heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect();
          setStartPos({ x: rect.left, y: rect.top });
        }
      } else {
        setPhase("fixed");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Progress: 0 = at hero, 1 = at fixed destination
  const progress =
    phase === "hero" ? 0 : phase === "fixed" ? 1 : undefined;

  const currentX = phase === "fixed" ? endPos.x : startPos.x;
  const currentY = phase === "fixed" ? endPos.y : startPos.y;

  if (phase === "hero") return null;

  return (
    <motion.div
      style={{ position: "fixed", top: 0, left: 0, zIndex: 40 }}
      animate={{
        x: currentX,
        y: currentY,
        opacity: 1,
      }}
      initial={{
        x: startPos.x,
        y: startPos.y,
        opacity: phase === "transitioning" ? 0 : 1,
      }}
      transition={
        phase === "fixed"
          ? { type: "spring", stiffness: 100, damping: 20 }
          : { duration: 0 }
      }
      className="flex flex-col gap-3"
    >
      <a
        href={`https://wa.me/${PHONE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message on WhatsApp"
        className="flex items-center justify-center rounded-full p-3 sm:p-3.5 text-white outline outline-2 -outline-offset-[3px] outline-white transition-transform duration-200 hover:scale-[1.08] active:scale-[0.97]"
        style={{
          background:
            "linear-gradient(135deg, #0C0C0C 10%, #0E3B23 40%, #128C4A 72%, #25D366 100%)",
          boxShadow:
            "0px 4px 4px rgba(37, 211, 102, 0.25), 4px 4px 12px rgba(18, 140, 74, 0.6) inset",
        }}
      >
        <WhatsAppIcon size={18} className="sm:w-5 sm:h-5" />
      </a>

      <a
        href={`mailto:${EMAIL}`}
        aria-label="Send an email"
        className="flex items-center justify-center rounded-full p-3 sm:p-3.5 outline outline-2 -outline-offset-[3px] outline-white transition-transform duration-200 hover:scale-[1.08] active:scale-[0.97]"
        style={{ background: "#0C0C0C" }}
      >
        <GmailIcon size={18} className="sm:w-5 sm:h-5" />
      </a>
    </motion.div>
  );
}
