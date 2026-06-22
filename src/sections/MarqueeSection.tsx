import { useEffect, useRef, useState } from "react";
import MarqueeTile from "../components/MarqueeTile";

interface TechItem {
  label: string;
  accent: string;
  symbol: string;
}

const techStack: TechItem[] = [
  { label: "Python", accent: "#3776AB", symbol: "Py" },
  { label: "TensorFlow / Keras", accent: "#FF6F00", symbol: "TF" },
  { label: "OpenCV", accent: "#5C9DD5", symbol: "CV" },
  { label: "scikit-learn", accent: "#F89939", symbol: "sk" },
  { label: "Pandas & NumPy", accent: "#7FA8D9", symbol: "Pd" },
  { label: "FastAPI", accent: "#05998b", symbol: "API" },
  { label: "Django", accent: "#3FA86A", symbol: "Dj" },
  { label: "SQL Server", accent: "#C9472B", symbol: "DB" },
  { label: "Computer Vision", accent: "#9B7BD9", symbol: "👁" },
  { label: "NLP & RAG", accent: "#D9A23F", symbol: "NLP" },
  { label: "AI Agents", accent: "#D75AA0", symbol: "AI" },
  { label: "ESP32 & IoT", accent: "#4FB3BF", symbol: "IoT" },
  { label: "Firebase", accent: "#E8A33D", symbol: "Fb" },
  { label: "Docker", accent: "#3FA9D9", symbol: "Dk" },
  { label: "Git & GitHub", accent: "#C9C9C9", symbol: "Git" },
  { label: "Render & Fly.io", accent: "#5D6BD9", symbol: "Rn" },
  { label: "Flutter", accent: "#3FB6E8", symbol: "Fl" },
  { label: "Deep Learning", accent: "#D96B5A", symbol: "DL" },
  { label: "Transfer Learning", accent: "#7BC9A0", symbol: "TL" },
  { label: "C++", accent: "#6E9CD9", symbol: "C++" },
  { label: "Claude Code", accent: "#CC785C", symbol: "Cc" },
];

const row1 = [...techStack.slice(0, 11), ...techStack.slice(0, 11), ...techStack.slice(0, 11)];
const row2 = [...techStack.slice(11), ...techStack.slice(11), ...techStack.slice(11)];

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
