import FadeIn from "../components/FadeIn";
import CertificateCard, { type CertificateData } from "../components/CertificateCard";
import { GraduationCap } from "lucide-react";

const education: CertificateData = {
  title: "Bachelor of Electronic Engineering",
  issuer: "El Menoufia University",
  date: "2020 – 2025",
  color: "#5C9DD5",
};

export default function EducationSection() {
  return (
    <section id="education" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24">
      <FadeIn delay={0} y={30}>
        <h2
          className="hero-heading font-black uppercase tracking-tight text-center leading-none mb-14 sm:mb-16"
          style={{ fontSize: "clamp(2.5rem, 9vw, 110px)" }}
        >
          Education
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
        <FadeIn delay={0.1} x={-40} y={0} className="flex-1 max-w-md text-center md:text-left">
          <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
            <GraduationCap size={28} color="#5C9DD5" strokeWidth={1.5} />
            <span className="uppercase tracking-widest text-sm text-[#5C9DD5]">
              2020 – 2025
            </span>
          </div>
          <h3 className="text-[#D7E2EA] font-semibold text-2xl sm:text-3xl leading-snug mb-2">
            Bachelor of Electronic Engineering
          </h3>
          <p className="text-[#D7E2EA]/70 text-lg mb-1">El Menoufia University</p>
          <p className="text-[#D7E2EA]/40 text-sm uppercase tracking-wide">
            Menoufia, Egypt
          </p>
        </FadeIn>

        <FadeIn delay={0.25} x={40} y={0} className="flex-shrink-0">
          <CertificateCard cert={education} index={999} />
        </FadeIn>
      </div>
    </section>
  );
}
