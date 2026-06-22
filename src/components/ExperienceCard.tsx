import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase } from "lucide-react";

export interface ExperienceLogo {
  src: string;
  alt: string;
}

export interface ExperienceData {
  number: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: "Full-time" | "Part-time" | "Internship";
  bullets: string[];
  logos?: ExperienceLogo[];
}

interface ExperienceCardProps {
  experience: ExperienceData;
  index: number;
  totalCards: number;
}

export default function ExperienceCard({ experience, index, totalCards }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky top-24 md:top-32 h-[85vh] flex items-center"
      style={{ top: `${6 + index * 1.75}rem` }}
    >
      <motion.div
        style={{ scale }}
        className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8 md:p-10"
      >
        {/* Top row */}
        <div className="flex items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
          <span
            className="font-black text-[#D7E2EA] leading-none flex-shrink-0"
            style={{ fontSize: "clamp(2.5rem, 8vw, 100px)" }}
          >
            {experience.number}
          </span>
          <div className="flex flex-col gap-1 flex-1 min-w-0 pt-1 sm:pt-3">
            <span className="text-[#D7E2EA]/50 uppercase tracking-widest text-xs sm:text-sm">
              {experience.period} · {experience.type}
            </span>
            <h3 className="text-[#D7E2EA] font-medium uppercase text-lg sm:text-2xl md:text-3xl">
              {experience.role}
            </h3>
            <p className="text-[#D7E2EA]/60 text-sm sm:text-base">
              {experience.company} — {experience.location}
            </p>
            {experience.logos && experience.logos.length > 0 && (
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {experience.logos.map((logo) => (
                  <span
                    key={logo.src}
                    className="bg-white rounded-lg px-2 py-1 flex items-center"
                    style={{ height: "30px" }}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-full w-auto object-contain"
                    />
                  </span>
                ))}
              </div>
            )}
          </div>
          <Briefcase
            size={28}
            className="hidden sm:block flex-shrink-0 mt-2"
            color="#D7E2EA"
            strokeWidth={1.5}
            opacity={0.5}
          />
        </div>

        {/* Bullets */}
        <ul className="flex flex-col gap-3 sm:gap-4">
          {experience.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[#D7E2EA]/80 text-sm sm:text-base md:text-lg leading-relaxed"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#D7E2EA]/50 flex-shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
