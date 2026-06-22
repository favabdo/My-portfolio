import HeroSection from "./sections/HeroSection";
import ExperienceSection from "./sections/ExperienceSection";
import MarqueeSection from "./sections/MarqueeSection";
import AboutSection from "./sections/AboutSection";
import EducationSection from "./sections/EducationSection";
import CertificatesSection from "./sections/CertificatesSection";
import ServicesSection from "./sections/ServicesSection";
import ProjectsSection from "./sections/ProjectsSection";
import FloatingContactButtons from "./components/FloatingContactButtons";

function App() {
  return (
    <div className="bg-[#0C0C0C]" style={{ overflowX: "clip" }}>
      <HeroSection />
      <ExperienceSection />
      <MarqueeSection />
      <AboutSection />
      <EducationSection />
      <CertificatesSection />
      <ServicesSection />
      <ProjectsSection />
      <FloatingContactButtons />
    </div>
  );
}

export default App;
