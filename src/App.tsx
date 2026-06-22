import HeroSection from "./sections/HeroSection";
import SkillsSection from "./sections/SkillsSection";
import AboutSection from "./sections/AboutSection";
import CertificatesSection from "./sections/CertificatesSection";
import ServicesSection from "./sections/ServicesSection";
import ProjectsSection from "./sections/ProjectsSection";

function App() {
  return (
    <div className="bg-[#0C0C0C]" style={{ overflowX: "clip" }}>
      <HeroSection />
      <SkillsSection />
      <AboutSection />
      <CertificatesSection />
      <ServicesSection />
      <ProjectsSection />
    </div>
  );
}

export default App;
