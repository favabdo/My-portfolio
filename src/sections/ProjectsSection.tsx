import { useRef, useEffect, useState } from "react";
import ProjectCard, { type ProjectData } from "../components/ProjectCard";
import { motion, useScroll, useTransform } from "framer-motion";

const projectImageModules = import.meta.glob(
  "../assets/projects/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}",
  { eager: true, import: "default" },
) as Record<string, string>;

const sortedProjectImages = Object.entries(projectImageModules)
  .map(([path, src]) => ({
    num: parseInt(path.match(/(\d+)\.\w+$/)?.[1] ?? "0", 10),
    src,
  }))
  .sort((a, b) => a.num - b.num);

const nileTechnoGallery = sortedProjectImages
  .filter((img) => img.num >= 1 && img.num <= 23)
  .map((img) => img.src);

const smartIntercomGallery = sortedProjectImages
  .filter((img) => img.num >= 24 && img.num <= 35)
  .map((img) => img.src);

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
    gallery: smartIntercomGallery,
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
      style={{ top: `calc(var(--proj-heading-h, 7rem) + ${index * 1.75}rem)` }}
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
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const total = projects.length + 1;

  useEffect(() => {
    const measure = () => {
      if (!headingRef.current || !cardsRef.current || !sectionRef.current) return;
      const h = headingRef.current.getBoundingClientRect().height;
      cardsRef.current.style.paddingTop = `${h}px`;
      sectionRef.current.style.setProperty("--proj-heading-h", `${h}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-40"
      /*
        overflow: clip keeps the sticky heading from escaping this section
        into the next section's cards. Does NOT create a scroll container.
      */
      style={{ overflow: "clip" }}
    >
      <div className="relative max-w-5xl mx-auto">
        <h2
          ref={headingRef}
          className="hero-heading font-black uppercase tracking-tight text-center leading-none sticky top-0 z-20 py-3 bg-[#0C0C0C]"
          style={{ fontSize: "clamp(2rem, 8vw, 100px)" }}
        >
          Projects
        </h2>

        <div ref={cardsRef}>
          {projects.map((project, i) => (
            <ProjectCard key={project.number} project={project} index={i} totalCards={total} />
          ))}
          <NextProjectCard index={projects.length} totalCards={total} />
        </div>
      </div>
    </section>
  );
}
