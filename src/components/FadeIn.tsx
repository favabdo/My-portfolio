import { motion } from "framer-motion";
import type { ReactNode, ElementType } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: ElementType;
  /** Use for above-the-fold content: animates on mount instead of on scroll-into-view. */
  immediate?: boolean;
}

const easing: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = "",
  as = "div",
  immediate = false,
}: FadeInProps) {
  const MotionTag = motion.create(as as ElementType);

  const viewportProps = immediate
    ? { animate: { opacity: 1, x: 0, y: 0 } }
    : {
        whileInView: { opacity: 1, x: 0, y: 0 },
        viewport: { once: true, margin: "50px", amount: 0 },
      };

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x, y }}
      {...viewportProps}
      transition={{ delay, duration, ease: easing }}
    >
      {children}
    </MotionTag>
  );
}
