import { WhatsAppIcon, GmailIcon } from "./BrandIcons";

const PHONE = "201061163091";
const EMAIL = "abdallah666mo@gmail.com";

interface ContactButtonProps {
  className?: string;
}

export default function ContactButton({ className = "" }: ContactButtonProps) {
  return (
    <div className={`flex gap-3 ${className}`}>
      <a
        href={`https://wa.me/${PHONE}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message on WhatsApp"
        className="flex items-center justify-center rounded-full p-3 sm:p-3.5 md:p-4 text-white outline outline-2 -outline-offset-[3px] outline-white transition-transform duration-200 hover:scale-[1.06] active:scale-[0.97]"
        style={{
          background:
            "linear-gradient(135deg, #0C0C0C 10%, #0E3B23 40%, #128C4A 72%, #25D366 100%)",
          boxShadow:
            "0px 4px 4px rgba(37, 211, 102, 0.25), 4px 4px 12px rgba(18, 140, 74, 0.6) inset",
        }}
      >
        <WhatsAppIcon size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </a>

      <a
        href={`mailto:${EMAIL}`}
        aria-label="Send an email"
        className="flex items-center justify-center rounded-full p-3 sm:p-3.5 md:p-4 outline outline-2 -outline-offset-[3px] outline-white transition-transform duration-200 hover:scale-[1.06] active:scale-[0.97]"
        style={{
          background: "#0C0C0C",
        }}
      >
        <GmailIcon size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </a>
    </div>
  );
}
