import FadeIn from "../components/FadeIn";
import ExperienceCard, { type ExperienceData } from "../components/ExperienceCard";

const experiences: ExperienceData[] = [
  {
    number: "01",
    role: "AI Engineer",
    company: "Nile Techno",
    location: "Tanta, Egypt",
    period: "Mar 2026 – Present",
    type: "Full-time",
    bullets: [
      "Developed AI-powered automation and analytics solutions for business operations",
      "Designed and optimized backend systems, SQL databases, and reporting pipelines",
      "Built real-time data processing services, dashboards, and AI-driven workflows",
    ],
  },
  {
    number: "02",
    role: "Data Science Instructor",
    company: "iSchool × Digital Egypt Cubs Initiative (MCIT)",
    location: "Remote",
    period: "Apr 2026 – Present",
    type: "Part-time",
    bullets: [
      "Delivering Data Science concepts to students",
      "Teaching fundamentals of data analysis, Python, and machine learning",
      "Mentoring students on practical projects",
    ],
  },
  {
    number: "03",
    role: "Application Support Engineer Intern",
    company: "Smart Code Company",
    location: "Tanta, Egypt",
    period: "Jul 2023 – Dec 2023",
    type: "Internship",
    bullets: [
      "Provided technical support and troubleshooting for enterprise applications",
      "Assisted in system monitoring and issue resolution",
      "Worked with databases and backend systems",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-40"
    >
      <FadeIn delay={0} y={30}>
        <h2
          className="hero-heading font-black uppercase tracking-tight text-center leading-none mb-16 sm:mb-20"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Experience
        </h2>
      </FadeIn>

      <div className="relative max-w-5xl mx-auto">
        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.number} experience={exp} index={i} totalCards={experiences.length} />
        ))}
      </div>
    </section>
  );
}
