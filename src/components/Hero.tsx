import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import GradientButton from "./GradientButton";
import { useHlsVideo } from "../lib/useHlsVideo";
import { HLS_SRC, scrollToSection } from "../lib/utils";
import { BRAND } from "../lib/data";

const ROLES = ["Frontend Developer", "Web Designer", "Creative Developer", "Problem Solver"];

export default function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useHlsVideo(videoRef, HLS_SRC);

  useEffect(() => {
    const id = window.setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2000);
    return () => window.clearInterval(id);
  }, []);

  // Hold the content hidden until the loader is gone, then run the entrance.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".name-reveal", { opacity: 0, y: 50 });
      gsap.set(".blur-in", { opacity: 0, filter: "blur(10px)", y: 20 });
      if (!ready) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(".name-reveal", { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }, 0).to(
        ".blur-in",
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1, delay: 0.3, clearProps: "filter" },
        0,
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="home" ref={sectionRef} className="relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <span className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">{BRAND} — Portfolio '26</span>
        <h1 className="name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary md:text-8xl lg:text-9xl">
          Mohammadali <br className="sm:hidden" />
          Mirzaee
        </h1>
        <p className="blur-in mb-4 text-base text-text-primary/80 md:text-lg">
          A{" "}
          <span key={roleIndex} className="inline-block animate-role-fade-in font-display italic text-text-primary">
            {ROLES[roleIndex]}
          </span>{" "}
          building the web from Gothenburg.
        </p>
        <p className="blur-in mb-12 max-w-md text-sm text-muted md:text-base">
          I design and build fast, distinctive websites for businesses — from the first sketch to launch and beyond.
        </p>
        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          <GradientButton onClick={() => scrollToSection("work")}>See Works</GradientButton>
          <GradientButton variant="outline" onClick={() => scrollToSection("contact")}>
            Reach out...
          </GradientButton>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection("work")}
        className="blur-in absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-label="Scroll to work"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-stroke">
          <span className="absolute left-0 top-0 h-1/2 w-full animate-scroll-down bg-text-primary/80" />
        </span>
      </button>
    </section>
  );
}
