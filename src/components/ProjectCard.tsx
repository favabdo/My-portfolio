import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LiveProjectButton from "./LiveProjectButton";
import ProjectPlaceholder from "./ProjectPlaceholder";
import ProjectGallery from "./ProjectGallery";

export interface ProjectData {
  number: string;
  category: string;
  name: string;
  type: "Client" | "Personal";
  liveUrl?: string;
  visuals: ["chart" | "table" | "code" | "camera" | "flow", "chart" | "table" | "code" | "camera" | "flow", "chart" | "table" | "code" | "camera" | "flow"];
  gallery?: string[];
  description?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
}

export default function ProjectCard({ project, index, totalCards }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const hasGallery = !!project.gallery && project.gallery.length > 0;
  const gallery = project.gallery ?? [];
  const coverImage = gallery[7] ?? gallery[0];

  const stickyTop = `calc(var(--proj-heading-h, 7rem) + ${index * 1.75}rem)`;

  return (
    <div
      ref={cardRef}
      className="sticky h-[85vh] flex items-center"
      style={{ top: stickyTop, zIndex: 10 + index }}
    >
      <motion.div
        style={{ scale }}
        className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        {/* Header row */}
        <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-5">
          <span className="font-black text-[#D7E2EA] leading-none flex-shrink-0" style={{ fontSize: "clamp(2rem, 6vw, 72px)" }}>
            {project.number}
          </span>
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <span className="text-[#D7E2EA]/50 uppercase tracking-widest text-xs">{project.type} · {project.category}</span>
            <h3 className="text-[#D7E2EA] font-medium uppercase text-base sm:text-xl md:text-2xl truncate">{project.name}</h3>
          </div>
          <LiveProjectButton href={project.liveUrl ?? "#"} className="flex-shrink-0" />
        </div>

: description + gallery — column on mobile, row on sm+ */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Description */}
          <div className="sm:w-[40%]">
            {project.description ? (
              <p className="text-[#D7E2EA]/70 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-6 sm:line-clamp-none">
                {project.description}
              </p>
            ) : (
              <ProjectPlaceholder variant={project.visuals[0]} className="w-full rounded-[30px] sm:rounded-[40px]" style={{ height: "clamp(100px, 14vw, 200px)" }} />
            )}
          </div>

          {/* Gallery */}
          <div className="sm:w-[60%]" style={{ minHeight: "clamp(120px, 22vw, 300px)" }}>
            {hasGallery ? (
              <ProjectGallery id={project.number} images={gallery} cover={coverImage} triggerClassName="w-full h-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px]" />
            ) : (
              <ProjectPlaceholder variant={project.visuals[2]} className="w-full h-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px]" />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
