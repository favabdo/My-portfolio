import { useRef } from "react";
import FadeIn from "../components/FadeIn";
import ProjectCard, { type ProjectData } from "../components/ProjectCard";
import { motion, useScroll, useTransform } from "framer-motion";

const projectImageModules = import.meta.glob("../assets/projects/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const nileTechnoGallery = Object.entries(projectImageModules)
  .sort(([a], [b]) => {
    const numA = parseInt(a.match(/(\d+)\.png$/)?.[1] ?? "0", 10);
    const numB = parseInt(b.match(/(\d+)\.png$/)?.[1] ?? "0", 10);
    return numA - numB;
  })
  .map(([, src]) => src);

const projects: ProjectData[] = [
  {
    number: "01",
    category: "AI Automation",
    name: "Nile Techno Reports",
    type: "Client",
    liveUrl: "https://niletechnoreports.fly.dev/users/login/",
    visuals: ["chart", "table", "flow"],
    gallery: nileTechnoGallery,
  },
  {
    number: "02",
    category: "AIoT",
    name: "Smart Intercom System",
    type: "Personal",
    visuals: ["camera", "code", "flow"],
  },
];

function NextProjectCard({ index, totalCards }: { index: number; totalCards: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const scrollToContact = () => {
    const el = document.querySelector("a[href^='mailto'], a[href^='https://wa.me']") as HTMLAnchorElement | null;
    if (el) el.click();
  };

  return (
    <div
      ref={cardRef}
      className="sticky h-[85vh] flex items-center"
      style={{ top: `${6 + index * 1.75}rem` }}
    >
      <motion.div
        style={{ scale, minHeight: "340px" }}
        className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-dashed border-[#D7E2EA]/30 bg-[#0C0C0C] flex flex-col items-center justify-center gap-6 sm:gap-8 p-8 sm:p-12"
      >
        <span
          className="font-black text-[#D7E2EA]/20 leading-none"
          style={{ fontSize: "clamp(2.5rem, 8vw, 100px)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex flex-col items-center gap-3 text-center">
          <p
            className="text-[#D7E2EA]/50 uppercase tracking-[0.3em] font-medium"
            style={{ fontSize: "clamp(0.7rem, 1.5vw, 1rem)" }}
          >
            Next Project
          </p>
          <h3
            className="text-[#D7E2EA] font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 5vw, 60px)" }}
          >
            Should Be Yours
          </h3>
        </div>

        <button
          onClick={scrollToContact}
          className="mt-2 px-8 py-3 rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA] uppercase tracking-widest text-sm font-semibold transition-all duration-300 hover:bg-[#D7E2EA] hover:text-[#0C0C0C] hover:border-transparent"
        >
          Contact Me
        </button>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const total = projects.length + 1; // +1 for next project card

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
          Projects
        </h2>
      </FadeIn>

      <div className="relative max-w-5xl mx-auto">
        {projects.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} totalCards={total} />
        ))}
        <NextProjectCard index={projects.length} totalCards={total} />
      </div>
    </section>
  );
}
