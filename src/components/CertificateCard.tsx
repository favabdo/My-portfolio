import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X } from "lucide-react";

export interface CertificateData {
  title: string;
  issuer: string;
  date: string;
  color: string;
}

interface CertificateCardProps {
  cert: CertificateData;
  index: number;
}

export default function CertificateCard({ cert, index }: CertificateCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        layoutId={`cert-${index}`}
        onClick={() => setOpen(true)}
        className="relative flex-shrink-0 rounded-2xl text-left p-6 flex flex-col justify-between"
        style={{
          width: "260px",
          height: "340px",
          background: "linear-gradient(160deg, #15161A 0%, #0C0C0C 70%)",
          border: `1px solid ${cert.color}33`,
        }}
        whileHover={{ y: -14, rotate: -1.5 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Award size={36} color={cert.color} strokeWidth={1.5} />
        <div>
          <p
            className="uppercase tracking-widest text-xs mb-2"
            style={{ color: cert.color }}
          >
            {cert.date}
          </p>
          <p className="text-[#D7E2EA] font-medium leading-snug text-lg">
            {cert.title}
          </p>
          <p className="text-[#D7E2EA]/50 text-sm mt-1">{cert.issuer}</p>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              layoutId={`cert-${index}`}
              className="relative rounded-3xl p-10 flex flex-col items-center text-center"
              style={{
                width: "min(420px, 90vw)",
                background: "linear-gradient(160deg, #1a1b20 0%, #0C0C0C 75%)",
                border: `1px solid ${cert.color}55`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 text-[#D7E2EA]/70 hover:text-[#D7E2EA] transition-colors"
                aria-label="Close"
              >
                <X size={22} />
              </button>
              <Award size={56} color={cert.color} strokeWidth={1.3} />
              <p
                className="uppercase tracking-widest text-xs mt-6"
                style={{ color: cert.color }}
              >
                {cert.date}
              </p>
              <p className="text-[#D7E2EA] font-semibold text-2xl mt-3 leading-snug">
                {cert.title}
              </p>
              <p className="text-[#D7E2EA]/60 mt-2">{cert.issuer}</p>
              <p className="text-[#D7E2EA]/35 text-sm mt-6">
                Certificate image coming soon
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
