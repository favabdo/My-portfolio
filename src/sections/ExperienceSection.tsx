import ExperienceCard, { type ExperienceData } from "../components/ExperienceCard";
import niletechnoLogo from "../assets/logos/niletechno-logo.png";
import ischoolLogo from "../assets/logos/ischool-logo.png";
import mcitLogo from "../assets/logos/mcit-logo.png";

const experiences: ExperienceData[] = [
  {
    number: "01",
    role: "AI Engineer",
    company: "Nile Techno",
    location: "Tanta, Egypt",
    period: "Mar 2026 – Present",
    type: "Full-time",
    logos: [{ src: niletechnoLogo, alt: "Nile Techno" }],
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
    logos: [
      { src: ischoolLogo, alt: "iSchool" },
      { src: mcitLogo, alt: "Ministry of Communications and Information Technology" },
    ],
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
      {/*
        The heading and cards share ONE container so that sticky on the
        heading stops as soon as the container ends (when the last card
        scrolls away). If the heading lives outside this div it stays
        glued even after all cards are gone.
      */}
      <div className="relative max-w-5xl mx-auto">
        {/* Sticky heading — sticks inside this container only */}
        <h2
          className="hero-heading font-black uppercase tracking-tight text-center leading-none sticky top-0 z-20 py-3 bg-[#0C0C0C] mb-0"
          style={{ fontSize: "clamp(2rem, 8vw, 100px)" }}
        >
          Experience
        </h2>

        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.number} experience={exp} index={i} totalCards={experiences.length} />
        ))}
      </div>
    </section>
  );
}
