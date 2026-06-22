import HeroSection from "./sections/HeroSection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import EducationSection from "./sections/EducationSection";
import CertificatesSection from "./sections/CertificatesSection";
import MarqueeSection from "./sections/MarqueeSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import FloatingContactButtons from "./components/FloatingContactButtons";

function App() {
  return (
    <div className="bg-[#0C0C0C]" style={{ overflowX: "clip" }}>
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <CertificatesSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <FloatingContactButtons />
    </div>
  );
}

export default App;
