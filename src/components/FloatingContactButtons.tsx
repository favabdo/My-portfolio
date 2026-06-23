import { useEffect, useState } from "react";
import { WhatsAppIcon, GmailIcon } from "./BrandIcons";

const PHONE = "201061163091";
const EMAIL = "abdallah666mo@gmail.com";

const AT_TOP_THRESHOLD = 80;

export default function FloatingContactButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > AT_TOP_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        right: "1.5rem",
        bottom: "2rem",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.8)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <a
        href={`https://wa.me/${PHONE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message on WhatsApp"
        className="flex items-center justify-center rounded-full p-3 text-white outline outline-2 -outline-offset-[3px] outline-white transition-transform duration-200 hover:scale-[1.08] active:scale-[0.97]"
        style={{
          background:
            "linear-gradient(135deg, #0C0C0C 10%, #0E3B23 40%, #128C4A 72%, #25D366 100%)",
          boxShadow:
            "0px 4px 4px rgba(37, 211, 102, 0.25), 4px 4px 12px rgba(18, 140, 74, 0.6) inset",
        }}
      >
        <WhatsAppIcon size={18} />
      </a>

      <a
        href={`mailto:${EMAIL}`}
        aria-label="Send an email"
        className="flex items-center justify-center rounded-full p-3 outline outline-2 -outline-offset-[3px] outline-white transition-transform duration-200 hover:scale-[1.08] active:scale-[0.97]"
        style={{ background: "#0C0C0C" }}
      >
        <GmailIcon size={18} />
      </a>
    </div>
  );
}
