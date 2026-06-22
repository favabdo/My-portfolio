import FadeIn from "../components/FadeIn";
import CertificateCard, { type CertificateData } from "../components/CertificateCard";
import { GraduationCap } from "lucide-react";
import educationCertImage from "../assets/certificates/education-cert.jpg";

const education: CertificateData = {
  title: "Bachelor of Electronic Engineering",
  issuer: "El Menoufia University",
  date: "2020 – 2025",
  color: "#5C9DD5",
  image: educationCertImage,
};

export default function EducationSection() {
  return (
    <section
      id="education"
      className="min-h-screen flex flex-col justify-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20"
    >
      <FadeIn delay={0} y={30}>
        <h2
          className="hero-heading font-black uppercase tracking-tight text-center leading-none mb-16 sm:mb-20"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Education
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-14 md:gap-20 w-full">
        <FadeIn delay={0.1} x={-40} y={0} className="flex-1 max-w-lg text-center md:text-left">
          <div className="flex items-center gap-3 mb-5 justify-center md:justify-start">
            <GraduationCap size={34} color="#5C9DD5" strokeWidth={1.5} />
            <span className="uppercase tracking-widest text-base sm:text-lg text-[#5C9DD5]">
              2020 – 2025
            </span>
          </div>
          <h3 className="text-[#D7E2EA] font-semibold text-3xl sm:text-4xl md:text-5xl leading-snug mb-4">
            Bachelor of Electronic Engineering
          </h3>
          <p className="text-[#D7E2EA]/70 text-xl sm:text-2xl mb-2">El Menoufia University</p>
          <p className="text-[#D7E2EA]/40 text-base uppercase tracking-wide">
            Menoufia, Egypt
          </p>
        </FadeIn>

        <FadeIn delay={0.25} x={40} y={0} className="flex-shrink-0 scale-110 md:scale-125">
          <CertificateCard cert={education} index={999} />
        </FadeIn>
      </div>
    </section>
  );
}
