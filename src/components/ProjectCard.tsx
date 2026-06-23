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
  /** Real screenshots. When present: gallery[0] & gallery[15] show in the two image
   * slots, and the third slot becomes a "Show More Photos" trigger for the full set. */
  gallery?: string[];
}

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
}

// heading height ≈ clamp(2rem,8vw,100px) + 2×0.75rem padding ≈ ~7rem on desktop
const HEADING_OFFSET = "var(--proj-heading-h, 7rem)";

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
  const primaryLeft = gallery[0];
  const primaryRight = gallery[15] ?? gallery[gallery.length - 1];
  const coverImage = gallery[7] ?? gallery[0];

  const stackOffset = `calc(${HEADING_OFFSET} + ${index * 1.75}rem)`;

  return (
    <div
      ref={cardRef}
      className="sticky h-[85vh] flex items-center"
      style={{ top: stackOffset }}
    >
      <motion.div
        style={{ scale }}
        className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        {/* Top row */}
        <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
          <span
            className="font-black text-[#D7E2EA] leading-none flex-shrink-0"
            style={{ fontSize: "clamp(2.5rem, 8vw, 100px)" }}
          >
            {project.number}
          </span>
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <span className="text-[#D7E2EA]/50 uppercase tracking-widest text-xs sm:text-sm">
              {project.type}
            </span>
            <h3 className="text-[#D7E2EA] font-medium uppercase text-lg sm:text-2xl md:text-3xl truncate">
              {project.name}
            </h3>
          </div>
          <LiveProjectButton href={project.liveUrl ?? "#"} className="flex-shrink-0 hidden sm:inline-block" />
        </div>

        <div className="sm:hidden mb-4">
          <LiveProjectButton href={project.liveUrl ?? "#"} />
        </div>

        {/* Bottom row: image grid */}
        <div className="flex gap-3 sm:gap-4">
          <div className="flex flex-col gap-3 sm:gap-4" style={{ width: "40%" }}>
            {hasGallery ? (
              <img
                src={primaryLeft}
                alt={`${project.name} screenshot 1`}
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                style={{ height: "clamp(130px, 16vw, 230px)" }}
              />
            ) : (
              <ProjectPlaceholder
                variant={project.visuals[0]}
                className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                style={{ height: "clamp(130px, 16vw, 230px)" }}
              />
            )}
            {hasGallery ? (
              <img
                src={primaryRight}
                alt={`${project.name} screenshot 16`}
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                style={{ height: "clamp(160px, 22vw, 340px)" }}
              />
            ) : (
              <ProjectPlaceholder
                variant={project.visuals[1]}
                className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                style={{ height: "clamp(160px, 22vw, 340px)" }}
              />
            )}
          </div>
          <div style={{ width: "60%" }}>
            {hasGallery ? (
              <ProjectGallery
                id={project.number}
                images={gallery}
                cover={coverImage}
                triggerClassName="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              />
            ) : (
              <ProjectPlaceholder
                variant={project.visuals[2]}
                className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
