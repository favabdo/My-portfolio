import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharProps {
  char: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function Char({ char, index, total, progress }: CharProps) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const displayChar = char === " " ? "\u00A0" : char;

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ visibility: "hidden" }}>{displayChar}</span>
      <motion.span
        style={{ opacity, position: "absolute", left: 0, top: 0 }}
      >
        {displayChar}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className = "", style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = Array.from(text);
  const total = chars.length;

  // Group chars into words (kept together for wrapping) separated by spaces
  const words: { chars: string[]; startIndex: number }[] = [];
  let current: string[] = [];
  let currentStart = 0;

  chars.forEach((char, i) => {
    if (char === " ") {
      if (current.length) {
        words.push({ chars: current, startIndex: currentStart });
        current = [];
      }
      words.push({ chars: [" "], startIndex: i });
      currentStart = i + 1;
    } else {
      if (current.length === 0) currentStart = i;
      current.push(char);
    }
  });
  if (current.length) words.push({ chars: current, startIndex: currentStart });

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block" }}>
          {word.chars.map((char, ci) => (
            <Char
              key={ci}
              char={char}
              index={word.startIndex + ci}
              total={total}
              progress={scrollYProgress}
            />
          ))}
        </span>
      ))}
    </p>
  );
}
