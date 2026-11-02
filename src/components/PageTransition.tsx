import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CURTAIN_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/**
 * Wraps a route. On leave, a curtain rises from the bottom to cover the page;
 * on enter, it lifts off the top while the new page fades up underneath.
 * Content only animates opacity/y, ending at transform: none so GSAP pins
 * inside the page still position against the viewport.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="accent-gradient pointer-events-none fixed inset-0 z-[60] origin-bottom"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: CURTAIN_EASE }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[61] origin-top bg-surface"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: CURTAIN_EASE, delay: 0.1 }}
      />
      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        transition={{ duration: 0.8, ease: CURTAIN_EASE, delay: 0.2 }}
        onAnimationComplete={() => ScrollTrigger.refresh()}
      >
        {children}
      </motion.main>
    </>
  );
}
