import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { stats } from "../lib/data";
import { EASE_OUT } from "../lib/utils";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="bg-bg py-16 md:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-px overflow-hidden rounded-3xl border border-stroke bg-stroke px-0 md:grid-cols-3 md:mx-10 lg:mx-auto">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: EASE_OUT, delay: i * 0.1 }}
            className="flex flex-col items-center justify-center gap-3 bg-bg px-6 py-12 text-center md:py-16"
          >
            <span className="font-display text-6xl italic text-text-primary md:text-7xl lg:text-8xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-xs uppercase tracking-[0.3em] text-muted">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
