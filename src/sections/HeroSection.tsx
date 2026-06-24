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
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCursor({ x, y });
    });
  }, []);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  // The spotlight radius in px (relative to displayed image size)
  const spotlightR = 90;

  // clip-path in px relative to the wrapper div
  const clipPath = hovering
    ? `circle(${spotlightR}px at ${cursor.x}px ${cursor.y}px)`
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

      {/* Portrait in center */}
      <Magnet
        padding={150}
        strength={3}
        activeTransition="transform 0.3s ease-out"
        inactiveTransition="transform 0.6s ease-in-out"
        className="absolute left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ maxHeight: "60vh" }}
      >
        <FadeIn delay={0.6} y={30} immediate>
          {/*
            Wrapper div — mouse events live here, clip-path applied here.
            Both images are stacked; 3D is clipped by spotlight.
            3D image is scaled DOWN and offset to align face with real face.
          */}
          <div
            ref={wrapperRef}
            className="relative select-none"
            style={{
              width: "clamp(180px, 28vw, 440px)",
              aspectRatio: "1194 / 1317",
              cursor: hovering ? "none" : "default",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => { setHovering(false); }}
          >
            {/* Real photo — always visible, fills wrapper */}
            <img
              src={portraitRealImg}
              alt="Abdallah Elsawy portrait"
              className="absolute inset-0 w-full h-full pointer-events-none"
              draggable={false}
              style={{ objectFit: "contain" }}
            />

            {/*
              3D overlay — same wrapper size, but the 3D image itself is
              scaled to ~64% and nudged down ~7% so the face aligns.
              clip-path reveals only where cursor is.
            */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath,
                WebkitClipPath: clipPath,
                transition: hovering
                  ? "clip-path 0.06s ease-out"
                  : "clip-path 0.35s ease-in-out",
              }}
            >
              <img
                src={portraitImg}
                alt="Abdallah Elsawy 3D"
                draggable={false}
                style={{
                  position: "absolute",
                  // Scale 3D image to match face size of real photo
                  width: "64%",
                  // Center horizontally, push down ~7% to align faces
                  left: "18%",
                  top: "7%",
                  objectFit: "contain",
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
