import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon, GmailIcon } from "./BrandIcons";

const PHONE = "201061163091";
const EMAIL = "abdallah666mo@gmail.com";

export default function FloatingContactButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.95);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 sm:right-6 md:right-8 top-[65%] -translate-y-1/2 z-40 flex flex-col gap-3"
        >
          <a
            href={`https://wa.me/${PHONE}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message on WhatsApp"
            className="flex items-center justify-center rounded-full p-3 sm:p-3.5 text-white outline outline-2 -outline-offset-[3px] outline-white transition-transform duration-200 hover:scale-[1.08] active:scale-[0.97]"
            style={{
              background:
                "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
              boxShadow:
                "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
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
      )}
    </AnimatePresence>
  );
}
