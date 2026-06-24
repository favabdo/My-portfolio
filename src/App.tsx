import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import EducationSection from "./sections/EducationSection";
import CertificatesSection from "./sections/CertificatesSection";
import MarqueeSection from "./sections/MarqueeSection";
import ServicesSection from "./sections/ServicesSection";
import FloatingContactButtons from "./components/FloatingContactButtons";

function App() {
  return (
    <div className="bg-[#0C0C0C]" style={{ overflowX: "clip" }}>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <CertificatesSection />
      <MarqueeSection />
      <ServicesSection />
      <FloatingContactButtons />

      {/* Footer */}
      <footer className="w-full py-6 flex items-center justify-center border-t border-[#D7E2EA]/10">
        <p className="text-[#D7E2EA]/50 text-sm tracking-widest uppercase font-light">
          Designed by Abdullah Elsawy
        </p>
      </footer>

    </div>
  );
}

export default App;
