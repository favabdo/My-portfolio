import { LayoutGroup } from "framer-motion";
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
    // LayoutGroup enables the shared layout animation between
    // ContactButton (in HeroSection) and FloatingContactButtons.
    // When the hero buttons hide and floating buttons appear (same layoutId),
    // Framer Motion animates them smoothly between the two positions.
    <LayoutGroup>
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
      </div>
    </LayoutGroup>
  );
}

export default App;
