import FadeIn from "../components/FadeIn";
import SkillRow from "../components/SkillRow";

interface SkillCategory {
  title: string;
  accent: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    title: "Programming Languages",
    accent: "#5C9DD5",
    skills: ["Python", "SQL", "C++"],
  },
  {
    title: "Machine Learning",
    accent: "#9B7BD9",
    skills: [
      "Supervised & Unsupervised Learning",
      "Data Analysis (Pandas, NumPy, Matplotlib, scikit-learn)",
      "OpenCV",
      "Computer Vision",
      "Deep Learning",
      "NLP",
      "RAG Systems",
      "AI Agents",
    ],
  },
  {
    title: "Backend",
    accent: "#3FA86A",
    skills: ["FastAPI", "Flask", "Django"],
  },
  {
    title: "Tools",
    accent: "#D9A23F",
    skills: [
      "Google Colab",
      "Firebase",
      "Git",
      "GitHub",
      "Docker",
      "Render",
      "Fly.io",
      "SQL Server",
      "Claude Code",
      "ChatGPT",
    ],
  },
  {
    title: "Programming Concepts",
    accent: "#D75AA0",
    skills: [
      "Object-Oriented Programming (OOP)",
      "Data Structures",
      "Algorithms",
      "Backend Development",
      "Software Development",
    ],
  },
  {
    title: "IoT & Embedded Systems",
    accent: "#4FB3BF",
    skills: ["ESP32", "Sensors Integration"],
  },
  {
    title: "Data Science",
    accent: "#D96B5A",
    skills: ["Data Preprocessing", "EDA", "Feature Engineering"],
  },
  {
    title: "Soft Skills",
    accent: "#C9C9C9",
    skills: ["Problem Solving", "Analytical Thinking"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-24 sm:pt-32 md:pt-36 pb-16 sm:pb-20">
      <FadeIn delay={0} y={20}>
        <h2
          className="hero-heading font-black uppercase tracking-tight text-center leading-none mb-12 sm:mb-16"
          style={{ fontSize: "clamp(2.5rem, 9vw, 110px)" }}
        >
          Skills
        </h2>
      </FadeIn>

      <div className="max-w-4xl mx-auto flex flex-col gap-8 sm:gap-10 w-full">
        {categories.map((cat, i) => (
          <FadeIn key={cat.title} delay={i * 0.08} y={16}>
            <SkillRow title={cat.title} accent={cat.accent} skills={cat.skills} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
