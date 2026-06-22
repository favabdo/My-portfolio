import FadeIn from "../components/FadeIn";
import ProjectCard, { type ProjectData } from "../components/ProjectCard";

const projects: ProjectData[] = [
  {
    number: "01",
    category: "AI Automation",
    name: "Nile Techno Reports",
    type: "Client",
    visuals: ["chart", "table", "flow"],
  },
  {
    number: "02",
    category: "AIoT",
    name: "Smart Intercom System",
    type: "Personal",
    visuals: ["camera", "code", "flow"],
  },
  {
    number: "03",
    category: "Coming Soon",
    name: "Next Project",
    type: "Personal",
    visuals: ["code", "table", "chart"],
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-40"
    >
      <FadeIn delay={0} y={30}>
        <h2
          className="hero-heading font-black uppercase tracking-tight text-center leading-none mb-16 sm:mb-20"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="relative max-w-5xl mx-auto">
        {projects.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} totalCards={projects.length} />
        ))}
      </div>
    </section>
  );
}
