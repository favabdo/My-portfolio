import { useEffect, useRef, useState } from "react";
import MarqueeTile from "../components/MarqueeTile";

interface TechItem {
  label: string;
  accent: string;
  symbol: string;
}

// Programming Languages — blue
const programmingLanguages: TechItem[] = [
  { label: "Python", accent: "#5C9DD5", symbol: "Py" },
  { label: "SQL", accent: "#5C9DD5", symbol: "SQL" },
  { label: "C++", accent: "#5C9DD5", symbol: "C++" },
];

// Machine Learning — purple
const machineLearning: TechItem[] = [
  { label: "Supervised & Unsupervised Learning", accent: "#9B7BD9", symbol: "ML" },
  { label: "Pandas & NumPy", accent: "#9B7BD9", symbol: "Pd" },
  { label: "Matplotlib", accent: "#9B7BD9", symbol: "Mp" },
  { label: "scikit-learn", accent: "#9B7BD9", symbol: "sk" },
  { label: "OpenCV", accent: "#9B7BD9", symbol: "CV" },
  { label: "Computer Vision", accent: "#9B7BD9", symbol: "👁" },
  { label: "Deep Learning", accent: "#9B7BD9", symbol: "DL" },
  { label: "NLP", accent: "#9B7BD9", symbol: "NLP" },
  { label: "RAG Systems", accent: "#9B7BD9", symbol: "RAG" },
  { label: "AI Agents", accent: "#9B7BD9", symbol: "AI" },
];

// Backend — green
const backend: TechItem[] = [
  { label: "FastAPI", accent: "#3FA86A", symbol: "API" },
  { label: "Flask", accent: "#3FA86A", symbol: "Fl" },
  { label: "Django", accent: "#3FA86A", symbol: "Dj" },
];

// Tools — orange
const tools: TechItem[] = [
  { label: "Google Colab", accent: "#D9A23F", symbol: "Co" },
  { label: "Firebase", accent: "#D9A23F", symbol: "Fb" },
  { label: "Git", accent: "#D9A23F", symbol: "Git" },
  { label: "GitHub", accent: "#D9A23F", symbol: "Gh" },
  { label: "Docker", accent: "#D9A23F", symbol: "Dk" },
  { label: "Render", accent: "#D9A23F", symbol: "Rn" },
  { label: "Fly.io", accent: "#D9A23F", symbol: "Fly" },
  { label: "SQL Server", accent: "#D9A23F", symbol: "DB" },
  { label: "Claude Code", accent: "#D9A23F", symbol: "Cc" },
  { label: "ChatGPT", accent: "#D9A23F", symbol: "GPT" },
];

// Programming Concepts — pink
const programmingConcepts: TechItem[] = [
  { label: "OOP", accent: "#D75AA0", symbol: "OOP" },
  { label: "Data Structures", accent: "#D75AA0", symbol: "DS" },
  { label: "Algorithms", accent: "#D75AA0", symbol: "Al" },
  { label: "Backend Development", accent: "#D75AA0", symbol: "Be" },
  { label: "Software Development", accent: "#D75AA0", symbol: "Sw" },
];

// IoT & Embedded Systems — teal
const iot: TechItem[] = [
  { label: "ESP32", accent: "#4FB3BF", symbol: "ESP" },
  { label: "Sensors Integration", accent: "#4FB3BF", symbol: "Sn" },
];

// Data Science — red/orange
const dataScience: TechItem[] = [
  { label: "Data Preprocessing", accent: "#D96B5A", symbol: "Dp" },
  { label: "EDA", accent: "#D96B5A", symbol: "EDA" },
  { label: "Feature Engineering", accent: "#D96B5A", symbol: "Fe" },
];

// Soft Skills — grey
const softSkills: TechItem[] = [
  { label: "Problem Solving", accent: "#C9C9C9", symbol: "Ps" },
  { label: "Analytical Thinking", accent: "#C9C9C9", symbol: "At" },
];

const allSkills: TechItem[] = [
  ...programmingLanguages,
  ...machineLearning,
  ...backend,
  ...tools,
  ...programmingConcepts,
  ...iot,
  ...dataScience,
  ...softSkills,
];

const half = Math.ceil(allSkills.length / 2);
const firstHalf = allSkills.slice(0, half);
const secondHalf = allSkills.slice(half);

const row1 = [...firstHalf, ...firstHalf, ...firstHalf];
const row2 = [...secondHalf, ...secondHalf, ...secondHalf];

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const computed = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(computed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: "transform",
          }}
        >
          {row1.map((item, i) => (
            <MarqueeTile key={`r1-${i}`} {...item} />
          ))}
        </div>
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: "transform",
          }}
        >
          {row2.map((item, i) => (
            <MarqueeTile key={`r2-${i}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
