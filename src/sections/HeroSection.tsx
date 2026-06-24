import { useRef, useState, useCallback, useEffect } from "react";
import FadeIn from "../components/FadeIn";
import Magnet from "../components/Magnet";
import ContactButton from "../components/ContactButton";
import portraitImg from "../assets/images/portrait.png";
import portraitRealImg from "../assets/images/portrait-real.png";

const navLinks = ["About", "Experience", "Projects", "Education", "Certificates", "Skills", "Services"];

export default function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef<number | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setCursor({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    });
  }, []);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  // Spotlight radius — feels like a "window" onto the 3D face
  const R = 85;
  const clipPath = hovering
    ? `circle(${R}px at ${cursor.x}px ${cursor.y}px)`
    : `circle(0px at ${cursor.x}px ${cursor.y}px)`;

  return (
    <section className="relative h-screen flex flex-col" style={{ overflowX: "clip" }}>

      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav" immediate className="relative z-30">
        <div className="no-scrollbar flex justify-between items-center gap-4 overflow-x-auto px-6 md:px-10 pt-6 md:pt-8 pb-4 md:pb-5 border-b border-[#D7E2EA]/10">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="relative flex-shrink-0 text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-sm md:text-lg lg:text-[1.3rem] transition-opacity duration-200 hover:opacity-70"
            >
              {link}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Hero Heading */}
      <div className="relative z-0 overflow-hidden mt-8 sm:mt-10 md:mt-8 w-full px-1 pointer-events-none">
        <FadeIn delay={0.15} y={40} immediate>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(1.9rem, 9.5vw, 13rem)" }}
          >
            Hi, i&apos;m abdallah
          </h1>
        </FadeIn>
      </div>

      {/* Portrait — centered, pushed right slightly, bottom-anchored above contact */}
      <Magnet
        padding={120}
        strength={3}
        activeTransition="transform 0.3s ease-out"
        inactiveTransition="transform 0.6s ease-in-out"
        className="absolute z-10"
        style={{
          // Position: horizontally centered-right, vertically fills gap between heading and bottom bar
          left: "55%",
          top: "50%",
          transform: "translate(-50%, -48%)",
          width: "clamp(200px, 30vw, 460px)",
        }}
      >
        <FadeIn delay={0.6} y={30} immediate>
          {/*
            Wrapper: sized to real portrait's aspect ratio.
            Mouse events here → clip-path on 3D overlay.
          */}
          <div
            ref={wrapperRef}
            className="relative w-full select-none"
            style={{
              aspectRatio: "1194 / 1317",  // real portrait ratio
              cursor: "crosshair",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {/* ── Layer 1: Real portrait, fills wrapper ── */}
            <img
              src={portraitRealImg}
              alt="Abdallah Elsawy portrait"
              className="absolute inset-0 w-full h-full pointer-events-none"
              draggable={false}
              style={{ objectFit: "contain", objectPosition: "top center" }}
            />

            {/*
              ── Layer 2: 3D avatar ──
              Sized and positioned so the FACE aligns with the real face.

              Math (verified):
              - Real image: 1194×1317, face center ≈ 27% from top, 50% horizontal
              - 3D image:   443×600,  face center ≈ 40% from top, 50% horizontal
              - 3D displayed width  = 52.4% of wrapper width
              - 3D displayed height = 3D_w / (443/600) = 3D_w * 1.354
              - Horizontal offset   = (100% - 52.4%) / 2 = 23.8% from left
              - Vertical offset     ≈ 1–2% from top (almost perfectly aligned)

              clip-path reveals only the spotlight circle under the cursor.
            */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath,
                WebkitClipPath: clipPath,
                transition: hovering
                  ? "clip-path 0.05s linear"
                  : "clip-path 0.4s ease-in-out",
              }}
            >
              <img
                src={portraitImg}
                alt="Abdallah Elsawy 3D"
                draggable={false}
                style={{
                  position: "absolute",
                  width: "52.5%",            // face-size matched
                  left: "23.75%",            // horizontally centered
                  top: "1%",                 // slight downward nudge to align faces
                  objectFit: "contain",
                  objectPosition: "top center",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </FadeIn>
      </Magnet>

      {/* Bottom bar */}
      <div className="relative z-20 flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 mt-auto">
        <FadeIn delay={0.35} y={20} immediate>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[190px] sm:max-w-[250px] md:max-w-[290px]"
            style={{ fontSize: "clamp(0.95rem, 3.8vw, 1.45rem)" }}
          >
            an ai &amp; ml engineer driven by building intelligent systems that solve real problems
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} immediate>
          <div id="hero-contact">
            <ContactButton />
          </div>
        </FadeIn>
      </div>

    </section>
  );
}
