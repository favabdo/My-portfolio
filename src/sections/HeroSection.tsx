import FadeIn from "../components/FadeIn";
import Magnet from "../components/Magnet";
import ContactButton from "../components/ContactButton";
import portraitImg from "../assets/images/portrait.png";
import portraitRealImg from "../assets/images/portrait-real.png";

const navLinks = ["About", "Experience", "Projects", "Education", "Certificates", "Skills", "Services"];

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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

      {/* Portrait — real photo by default, hover → 3D model */}
      <Magnet
        padding={150}
        strength={3}
        activeTransition="transform 0.3s ease-out"
        inactiveTransition="transform 0.6s ease-in-out"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[220px] sm:w-[360px] md:w-[440px] lg:w-[520px] group"
        style={{ maxHeight: "60vh" }}
      >
        <FadeIn delay={0.6} y={30} immediate>
          <div className="relative w-full" style={{ maxHeight: "60vh" }}>
            {/* Real photo — visible by default */}
            <img
              src={portraitRealImg}
              alt="Abdallah Elsawy portrait"
              className="w-full h-auto select-none pointer-events-none transition-opacity duration-500 group-hover:opacity-0"
              draggable={false}
              style={{ maxHeight: "60vh", objectFit: "contain" }}
            />
            {/* 3D model — appears on hover */}
            <img
              src={portraitImg}
              alt="Abdallah Elsawy 3D"
              className="absolute inset-0 w-full h-auto select-none pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              draggable={false}
              style={{ maxHeight: "60vh", objectFit: "contain" }}
            />
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
