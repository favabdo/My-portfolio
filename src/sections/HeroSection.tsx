import FadeIn from "../components/FadeIn";
import Magnet from "../components/Magnet";
import ContactButton from "../components/ContactButton";
import portraitImg from "../assets/images/portrait.png";

const navLinks = ["About", "Certificates", "Services", "Projects"];

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex flex-col" style={{ overflowX: "clip" }}>
      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav" immediate>
        <div className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
            >
              {link}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Hero Heading */}
      <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-5 w-full px-1">
        <FadeIn delay={0.15} y={40} immediate>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(1.9rem, 9.5vw, 13rem)" }}
          >
            Hi, i&apos;m abdallah
          </h1>
        </FadeIn>
      </div>

      {/* Portrait */}
      <Magnet
        padding={150}
        strength={3}
        activeTransition="transform 0.3s ease-out"
        inactiveTransition="transform 0.6s ease-in-out"
        className="absolute left-1/2 -translate-x-1/2 top-[42%] -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 z-0 w-[200px] sm:w-[360px] md:w-[440px] lg:w-[520px]"
      >
        <FadeIn delay={0.6} y={30} immediate>
          <img
            src={portraitImg}
            alt="Abdallah Elsawy portrait"
            className="w-full h-auto select-none pointer-events-none"
            draggable={false}
          />
        </FadeIn>
      </Magnet>

      {/* Bottom bar */}
      <div className="relative z-20 flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 mt-auto">
        <FadeIn delay={0.35} y={20} immediate>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[150px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: "clamp(0.7rem, 1.4vw, 1.5rem)" }}
          >
            an ai &amp; ml engineer driven by building intelligent systems that solve real problems
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20} immediate>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
