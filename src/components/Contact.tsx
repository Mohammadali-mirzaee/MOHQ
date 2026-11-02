import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import GradientButton from "./GradientButton";
import { Italic } from "./SectionHeader";
import { useHlsVideo } from "../lib/useHlsVideo";
import { BRAND, EMAIL, NAME, socials } from "../lib/data";
import { EASE_OUT, HLS_SRC } from "../lib/utils";

const MARQUEE = Array.from({ length: 10 }, () => "MOHQ • BUILDING THE WEB • ");

export default function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useHlsVideo(videoRef, HLS_SRC);

  useEffect(() => {
    const tween = gsap.to(trackRef.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <footer id="contact" className="relative overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 -scale-y-100 object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute left-0 right-0 top-0 h-48 bg-gradient-to-b from-bg to-transparent" />

      <div className="relative z-10">
        <div className="overflow-hidden whitespace-nowrap py-6 md:py-10" aria-hidden>
          <div ref={trackRef} className="inline-flex">
            {MARQUEE.map((text, i) => (
              <span key={i} className="pr-6 font-display text-6xl italic text-text-primary/10 md:text-8xl lg:text-9xl">
                {text}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-16 text-center md:py-24"
        >
          <span className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">Get in touch</span>
          <h2 className="mb-6 text-4xl font-light tracking-tight text-text-primary md:text-6xl lg:text-7xl">
            Let's build something <Italic>together</Italic>
          </h2>
          <p className="mb-10 max-w-md text-sm text-muted md:text-base">
            Need a new website or a better one? Tell me about your business and I'll get back to you.
          </p>
          <GradientButton href={`mailto:${EMAIL}`}>
            {EMAIL} <span aria-hidden>↗</span>
          </GradientButton>
        </motion.div>

        <div className="mx-auto flex max-w-[1200px] flex-col-reverse items-center justify-between gap-6 border-t border-stroke px-6 pt-8 md:flex-row md:px-10 lg:px-16">
          <p className="text-xs text-muted">© {new Date().getFullYear()} {NAME} · {BRAND}</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="text-sm text-muted transition-colors hover:text-text-primary">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for projects
          </div>
        </div>
      </div>
    </footer>
  );
}
