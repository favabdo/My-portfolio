import FadeIn from "../components/FadeIn";
import CertificateCard, { type CertificateData } from "../components/CertificateCard";
import ntiMlCert from "../assets/certificates/nti-ml-cert.png";
import maharaTechCert from "../assets/certificates/mahara-tech-cert.png";
import ciscoAiCert from "../assets/certificates/cisco-ai-cert.png";
import ischoolCert from "../assets/certificates/ischool-datascience-cert.png";

const certificates: CertificateData[] = [
  {
    title: "Machine Learning",
    issuer: "NTI Creativa Innovation Hubs",
    date: "Oct 2025 – Jan 2026",
    color: "#9B7BD9",
    image: ntiMlCert,
  },
  {
    title: "Practical Machine Learning for Data Scientists",
    issuer: "Mahara Tech (ITI)",
    date: "Jul 2025 – Sep 2025",
    color: "#5C9DD5",
    image: maharaTechCert,
  },
  {
    title: "Introduction to Modern AI",
    issuer: "Cisco Networking Academy",
    date: "2025",
    color: "#D9A23F",
    image: ciscoAiCert,
  },
  {
    title: "Data Science Level 3 – Semester 1",
    issuer: "iSchool",
    date: "Apr 2026",
    color: "#1F8FEA",
    image: ischoolCert,
  },
];

export default function CertificatesSection() {
  return (
    <section id="certificates" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24">
      <FadeIn delay={0} y={30}>
        <h2
          className="hero-heading font-black uppercase tracking-tight text-center leading-none mb-14 sm:mb-16"
          style={{ fontSize: "clamp(2.5rem, 9vw, 110px)" }}
        >
          Certificates
        </h2>
      </FadeIn>

      <div className="flex gap-6 justify-center flex-wrap max-w-5xl mx-auto">
        {certificates.map((cert, i) => (
          <FadeIn key={cert.title} delay={i * 0.1} y={20}>
            <CertificateCard cert={cert} index={i} />
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3}>
        <p className="text-center text-[#D7E2EA]/40 text-sm mt-10 uppercase tracking-widest">
          Tap a card for details
        </p>
      </FadeIn>
    </section>
  );
}
