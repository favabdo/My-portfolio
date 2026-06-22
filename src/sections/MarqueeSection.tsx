import FadeIn from "../components/FadeIn";
import CategoryRow from "../components/CategoryRow";

interface SkillItem {
  label: string;
  symbol: string;
}

interface Category {
  title: string;
  accent: string;
  skills: SkillItem[];
}

const categories: Category[] = [
  {
    title: "Programming Languages",
    accent: "#5C9DD5",
    skills: [
      { label: "Python", symbol: "Py" },
      { label: "SQL", symbol: "SQL" },
      { label: "C++", symbol: "C++" },
    ],
  },
  {
    title: "Machine Learning",
    accent: "#9B7BD9",
    skills: [
      { label: "Supervised & Unsupervised Learning", symbol: "ML" },
      { label: "Pandas & NumPy", symbol: "Pd" },
      { label: "Matplotlib", symbol: "Mp" },
      { label: "scikit-learn", symbol: "sk" },
      { label: "OpenCV", symbol: "CV" },
      { label: "Computer Vision", symbol: "👁" },
      { label: "Deep Learning", symbol: "DL" },
      { label: "NLP", symbol: "NLP" },
      { label: "RAG Systems", symbol: "RAG" },
      { label: "AI Agents", symbol: "AI" },
    ],
  },
  {
    title: "Backend",
    accent: "#3FA86A",
    skills: [
      { label: "FastAPI", symbol: "API" },
      { label: "Flask", symbol: "Fl" },
      { label: "Django", symbol: "Dj" },
    ],
  },
  {
    title: "Tools",
    accent: "#D9A23F",
    skills: [
      { label: "Google Colab", symbol: "Co" },
      { label: "Firebase", symbol: "Fb" },
      { label: "Git", symbol: "Git" },
      { label: "GitHub", symbol: "Gh" },
      { label: "Docker", symbol: "Dk" },
      { label: "Render", symbol: "Rn" },
      { label: "Fly.io", symbol: "Fly" },
      { label: "SQL Server", symbol: "DB" },
      { label: "Claude Code", symbol: "Cc" },
      { label: "ChatGPT", symbol: "GPT" },
    ],
  },
  {
    title: "Programming Concepts",
    accent: "#D75AA0",
    skills: [
      { label: "OOP", symbol: "OOP" },
      { label: "Data Structures", symbol: "DS" },
      { label: "Algorithms", symbol: "Al" },
      { label: "Backend Development", symbol: "Be" },
      { label: "Software Development", symbol: "Sw" },
    ],
  },
  {
    title: "Data Science",
    accent: "#D96B5A",
    skills: [
      { label: "Data Preprocessing", symbol: "Dp" },
      { label: "EDA", symbol: "EDA" },
      { label: "Feature Engineering", symbol: "Fe" },
    ],
  },
  {
    title: "IoT & Embedded Systems",
    accent: "#4FB3BF",
    skills: [
      { label: "ESP32", symbol: "ESP" },
      { label: "Sensors Integration", symbol: "Sn" },
    ],
  },
  {
    title: "Soft Skills",
    accent: "#C9C9C9",
    skills: [
      { label: "Problem Solving", symbol: "Ps" },
      { label: "Analytical Thinking", symbol: "At" },
    ],
  },
];

// Pair small categories side by side to fill space
// Groups: solo or [A, B] pairs
type RowGroup = Category | [Category, Category];

const layout: RowGroup[] = [
  [categories[0], categories[2]],   // Programming Languages + Backend (both small)
  categories[1],                     // Machine Learning (big — solo)
  categories[3],                     // Tools (big — solo)
  categories[4],                     // Programming Concepts (medium — solo)
  [categories[5], categories[6]],   // Data Science + IoT (both small)
  categories[7],                     // Soft Skills
];

export default function MarqueeSection() {
  return (
    <section id="skills" className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-16 px-5 sm:px-8 md:px-10">
      <FadeIn delay={0} y={20}>
        <h2
          className="hero-heading font-black uppercase tracking-tight text-center leading-none mb-12 sm:mb-16"
          style={{ fontSize: "clamp(2.5rem, 9vw, 110px)" }}
        >
          Skills
        </h2>
      </FadeIn>

      <div className="flex flex-col gap-10 sm:gap-12 max-w-4xl mx-auto">
        {layout.map((group, i) => {
          if (Array.isArray(group)) {
            const [a, b] = group;
            return (
              <FadeIn key={a.title + b.title} delay={i * 0.08} y={20}>
                <div className="grid grid-cols-2 gap-6 sm:gap-8">
                  <div className="min-w-0">
                    <CategoryRow title={a.title} accent={a.accent} skills={a.skills} />
                  </div>
                  <div className="min-w-0">
                    <CategoryRow title={b.title} accent={b.accent} skills={b.skills} />
                  </div>
                </div>
              </FadeIn>
            );
          }
          return (
            <FadeIn key={group.title} delay={i * 0.08} y={20}>
              <CategoryRow title={group.title} accent={group.accent} skills={group.skills} />
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
