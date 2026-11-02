import { motion } from "framer-motion";
import SectionHeader, { Italic } from "./SectionHeader";
import { projects } from "../lib/data";
import { cn, EASE_OUT } from "../lib/utils";

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          title={<>Featured <Italic>projects</Italic></>}
          subtext="Live websites I've designed and built for businesses across Sweden."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} — ${project.description}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: (i % 2) * 0.1 }}
              className={cn(
                "group relative block aspect-[4/3] overflow-hidden rounded-3xl border border-stroke bg-surface md:aspect-auto md:h-[460px]",
                project.span,
              )}
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                  project.focus,
                )}
              />
              <div className="halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />

              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-6 transition-opacity duration-500 group-hover:opacity-0">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">{project.category}</p>
                  <h3 className="mt-1 text-lg text-white md:text-xl">{project.title}</h3>
                </div>
                <span className="text-xs text-white/60">0{i + 1}</span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-hover:opacity-100">
                <span className="relative rounded-full p-[2px]">
                  <span className="accent-gradient-animated absolute inset-0 rounded-full" />
                  <span className="relative inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm text-neutral-900">
                    Visit — <span className="font-display text-base italic">{project.title}</span>
                  </span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
