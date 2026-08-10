import { useRef, useEffect } from "react";
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

const vioraGallery = sortedProjectImages
  .filter((img) => img.num >= 36 && img.num <= 46)
  .map((img) => img.src);

const nileChatGallery = sortedProjectImages
  .filter((img) => img.num >= 47 && img.num <= 54)
  .map((img) => img.src);

const projects: ProjectData[] = [
  {
    number: "01",
    category: "CRM / Support Platform",
    name: "Nile Chat All in One",
    type: "Client",
    liveUrl: "https://www.niletechno.com/nilechat",
    visuals: ["chart", "table", "flow"],
    gallery: nileChatGallery,
    description: "Designed and developed a complete customer support and CRM platform that centralizes multi-channel customer communications, contract management, task tracking, and automated reporting. The system enables support teams to manage customer interactions from a single interface, streamline workflows, improve response efficiency, and maintain comprehensive customer records, while providing a scalable foundation for AI-powered support automation and business operations management.",
  },
  {
    number: "02",
    category: "AI Automation",
    name: "Nile Techno Reports",
    type: "Client",
    liveUrl: "https://niletechno.com/chat",
    visuals: ["chart", "table", "flow"],
    gallery: nileTechnoGallery,
    description: "Designed and developed a complete customer support analytics platform consisting of a FastAPI backend service and a Django web dashboard. The backend automatically analyzes resolved customer conversations using AI and stores structured insights, while the Django dashboard visualizes the collected data through reports, performance metrics, customer analytics, and management tools, enabling data-driven decision-making for support teams.",
  },
  {
    number: "03",
    category: "AIoT",
    name: "Smart Intercom System",
    type: "Personal",
    visuals: ["camera", "code", "flow"],
    gallery: smartIntercomGallery,
    description: "Developed a full-stack IoT smart home security and access control platform that enables real-time monitoring, remote door control, garage management, RFID authentication, and live video streaming. The system integrates ESP32-CAM, Arduino, Flutter, Firebase, and a custom Python WebSocket Server to deliver secure, low-latency communication between hardware devices and mobile/web applications. It features role-based access control, real-time notifications, cloud storage, live camera feeds, device analytics, and scalable backend infrastructure designed for modern smart home automation.\nTech Stack: Flutter, Firebase Authentication, Realtime Database, Firestore, Cloud Functions, Cloud Storage, Python, WebSockets, ESP32-CAM, Arduino, RFID RC522, Next.js, Tailwind CSS, IoT.",
  },
  {
    number: "04",
    category: "Web Development",
    name: "Viora",
    type: "Personal",
    liveUrl: "https://viora.abdullahelsawy.online",
    visuals: ["code", "chart", "flow"],
    gallery: vioraGallery,
    description: "Viora is a collaborative productivity platform that helps individuals and teams organize projects, manage tasks, save important resources, and track progress in one place. With real-time collaboration, project sharing, activity history, and smart link management, Viora ensures that ideas, tasks, and valuable resources never get lost.",
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
      style={{ top: `calc(var(--proj-heading-h, 7rem) + ${index * 1.75}rem)`, zIndex: 10 + index }}
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
      // The Projects heading sticks at --exp-heading-h offset, so cards start after both headings
      const expHeadingH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--exp-heading-h") || "0");
      sectionRef.current.style.setProperty("--proj-heading-h", `${expHeadingH + h}px`);
    };

    // Run immediately, then re-run whenever the window resizes
    // Also poll briefly on mount because --exp-heading-h may not be set yet
    measure();
    let attempts = 0;
    const poll = setInterval(() => {
      measure();
      attempts++;
      if (attempts >= 10) clearInterval(poll);
    }, 80);

    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      clearInterval(poll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-40"
    >
      {/* HEADING LAYER — sticky, sits below the Experience heading */}
      <div
        className="sticky z-30 bg-[#0C0C0C]"
        style={{ top: "var(--exp-heading-h, 0px)", marginLeft: "auto", marginRight: "auto", maxWidth: "64rem" }}
      >
        <h2
          ref={headingRef}
          className="hero-heading font-black uppercase tracking-tight text-center leading-none py-3"
          style={{ fontSize: "clamp(2rem, 8vw, 100px)" }}
        >
          Projects
        </h2>
      </div>

      {/* CARDS LAYER — below the heading */}
      <div className="relative max-w-5xl mx-auto" style={{ zIndex: 10 }}>
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
