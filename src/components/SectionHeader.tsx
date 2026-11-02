import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "../lib/utils";

type Props = {
  eyebrow: string;
  title: ReactNode;
  subtext: string;
  action?: ReactNode;
};

export default function SectionHeader({ eyebrow, title, subtext, action }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: EASE_OUT }}
      className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">{eyebrow}</span>
        </div>
        <h2 className="text-4xl font-light tracking-tight text-text-primary md:text-5xl lg:text-6xl">
          {title}
        </h2>
        <p className="mt-4 max-w-md text-sm text-muted md:text-base">{subtext}</p>
      </div>
      {action && <div className="hidden md:inline-flex">{action}</div>}
    </motion.div>
  );
}

export function Italic({ children }: { children: ReactNode }) {
  return <span className="font-display italic">{children}</span>;
}

export function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
