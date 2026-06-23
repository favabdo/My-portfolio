import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { WhatsAppIcon, GmailIcon } from "./BrandIcons";

const PHONE = "201061163091";
const EMAIL = "abdallah666mo@gmail.com";

export default function FloatingContactButtons() {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    heroRef.current = document.getElementById("hero-contact");

    const handleScroll = () => {
      // Show as soon as user starts scrolling (after 50px)
      setVisible(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      style={{
        position: "fixed",
        right: "1.5rem",
        bottom: "2rem",
        zIndex: 40,
      }}
      className="flex flex-col gap-3"
    >
      <a
        href={`https://wa.me/${PHONE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message on WhatsApp"
        className="flex items-center justify-center rounded-full p-3 sm:p-3.5 text-white outline outline-2 -outline-offset-[3px] outline-white transition-transform duration-200 hover:scale-[1.08] active:scale-[0.97]"
        style={{
          background:
            "linear-gradient(135deg, #0C0C0C 10%, #0E3B23 40%, #128C4A 72%, #25D366 100%)",
          boxShadow:
            "0px 4px 4px rgba(37, 211, 102, 0.25), 4px 4px 12px rgba(18, 140, 74, 0.6) inset",
        }}
      >
        <WhatsAppIcon size={18} className="sm:w-5 sm:h-5" />
      </a>

      <a
        href={`mailto:${EMAIL}`}
        aria-label="Send an email"
        className="flex items-center justify-center rounded-full p-3 sm:p-3.5 outline outline-2 -outline-offset-[3px] outline-white transition-transform duration-200 hover:scale-[1.08] active:scale-[0.97]"
        style={{ background: "#0C0C0C" }}
      >
        <GmailIcon size={18} className="sm:w-5 sm:h-5" />
      </a>
    </motion.div>
  );
}
