import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientButton from "./GradientButton";
import { ArrowRight, Italic } from "./SectionHeader";
import { explorations } from "../lib/data";
import { cn, scrollToSection } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Item = (typeof explorations)[number];

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Item | null>(null);

  const left = explorations.filter((_, i) => i % 2 === 0);
  const right = explorations.filter((_, i) => i % 2 === 1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      const scrub = { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(leftRef.current, { y: "10vh" }, { y: "-30vh", ease: "none", scrollTrigger: scrub });
      gsap.fromTo(rightRef.current, { y: "40vh" }, { y: "-60vh", ease: "none", scrollTrigger: { ...scrub } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const column = (items: Item[], ref: React.RefObject<HTMLDivElement | null>, className?: string) => (
    <div ref={ref} className={cn("flex flex-col items-center gap-[35vh] will-change-transform", className)}>
      {items.map((item) => (
        <button
          key={item.title}
          type="button"
          onClick={() => setActive(item)}
          style={{ rotate: `${item.rotate}deg` }}
          className="group pointer-events-auto relative block aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-stroke bg-surface shadow-2xl shadow-black/50 transition-transform duration-500 hover:!rotate-0 hover:scale-105"
          aria-label={`Open ${item.title}`}
        >
          <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover object-top" />
          <span className="absolute inset-x-3 bottom-3 rounded-full bg-black/50 px-3 py-1.5 text-left text-xs text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
            {item.title}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <section id="explorations" ref={sectionRef} className="relative min-h-[300vh] bg-bg">
      <div ref={contentRef} className="relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">Details</span>
          <span className="h-px w-8 bg-stroke" />
        </div>
        <h2 className="text-5xl font-light tracking-tight text-text-primary md:text-7xl lg:text-8xl">
          Visual <Italic>playground</Italic>
        </h2>
        <p className="mb-8 mt-5 max-w-sm text-sm text-muted md:text-base">
          Close-ups, mobile views and sections from recent builds. Tap any card to look closer.
        </p>
        <GradientButton variant="ghost" size="sm" onClick={() => scrollToSection("work")}>
          See live projects <ArrowRight />
        </GradientButton>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-12 px-6 pt-[70vh] md:gap-40 md:px-10">
          {column(left, leftRef)}
          {column(right, rightRef)}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.figure
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative max-w-[min(90vw,720px)]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={active.image} alt={active.title} className="max-h-[80vh] w-full rounded-3xl border border-stroke object-cover" />
              <figcaption className="mt-4 flex items-center justify-between text-sm text-muted">
                <span className="font-display text-xl italic text-text-primary">{active.title}</span>
                <button type="button" onClick={() => setActive(null)} className="rounded-full border border-stroke px-4 py-1.5 text-xs uppercase tracking-[0.2em] hover:text-text-primary">
                  Close
                </button>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
