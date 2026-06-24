import { useRef, useState, useCallback, useEffect } from "react";
import FadeIn from "../components/FadeIn";
import ContactButton from "../components/ContactButton";
import portraitImg from "../assets/images/portrait.png";
import portraitRealImg from "../assets/images/portrait-real.png";

const navLinks = ["About", "Experience", "Projects", "Education", "Certificates", "Skills", "Services"];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clipPath, setClipPath] = useState("circle(0px at 50% 20%)");
  const [inFaceZone, setInFaceZone] = useState(false);
  const rafRef = useRef<number | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      const yPct = ((e.clientY - rect.top) / rect.height) * 100;

      // Face zone: horizontally 20%-80%, vertically top 0%-45%
      const inFace = xPct > 20 && xPct < 80 && yPct > 0 && yPct < 45;
      setInFaceZone(inFace);

      if (inFace) {
        setClipPath(`circle(110px at ${xPct}% ${yPct}%)`);
      } else {
        setClipPath("circle(0px at 50% 20%)");
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setInFaceZone(false);
    setClipPath("circle(0px at 50% 20%)");
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
      <div className="relative z-20 overflow-hidden mt-8 sm:mt-10 md:mt-8 w-full px-1 pointer-events-none">
        <FadeIn delay={0.15} y={40} immediate>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(1.9rem, 9.5vw, 13rem)" }}
          >
            Hi, i&apos;m abdallah
          </h1>
        </FadeIn>
      </div>

      {/* Portrait — full screen, fixed inside section */}
      <FadeIn delay={0.6} y={30} immediate className="absolute inset-0 z-10 pointer-events-none">
        <div
          ref={containerRef}
          className="absolute inset-0 pointer-events-auto"
          onMouseMove={handleMouseMove as unknown as React.MouseEventHandler}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: inFaceZone ? "none" : "default" }}
        >
          {/* Real photo — always visible, fills container */}
          <img
            src={portraitRealImg}
            alt="Abdallah Elsawy portrait"
            className="absolute inset-0 w-full h-full select-none pointer-events-none"
            draggable={false}
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />

          {/* 3D model — clipped spotlight reveal, only on face zone */}
          <img
            src={portraitImg}
            alt="Abdallah Elsawy 3D"
            className="absolute inset-0 w-full h-full select-none pointer-events-none"
            draggable={false}
            style={{
              objectFit: "cover",
              objectPosition: "center top",
              clipPath: clipPath,
              transition: inFaceZone
                ? "clip-path 0.05s ease-out"
                : "clip-path 0.4s ease-in-out",
              WebkitClipPath: clipPath,
            }}
          />
        </div>
      </FadeIn>

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
