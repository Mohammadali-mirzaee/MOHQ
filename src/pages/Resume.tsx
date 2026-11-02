import { motion } from "framer-motion";
import GradientButton from "../components/GradientButton";
import { ArrowRight, Italic } from "../components/SectionHeader";
import { BRAND, EMAIL, LINKEDIN, NAME, experience, projects } from "../lib/data";
import { EASE_OUT } from "../lib/utils";

const TOOLKIT = ["TypeScript", "React", "Next.js", "Vite", "Tailwind CSS", "Node.js", "Java", "Puppeteer", "Responsive design", "SEO"];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1, ease: EASE_OUT, delay },
});

export default function Resume() {
  return (
    <div className="min-h-screen bg-bg pb-24 pt-36 md:pt-44">
      <div className="mx-auto max-w-[900px] px-6 md:px-10">
        <motion.div {...fadeUp()}>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Resume · {BRAND}</span>
          </div>
          <h1 className="font-display text-6xl italic leading-[0.95] tracking-tight text-text-primary md:text-8xl">
            {NAME}
          </h1>
          <p className="mt-6 max-w-lg text-sm text-muted md:text-base">
            Frontend developer in Gothenburg, building travel products at Etraveli Group since 2022. Through {BRAND} I
            design and build websites for businesses — from wholesale webshops to brand sites for automotive and
            construction companies.
          </p>
        </motion.div>

        <section className="mt-20">
          <motion.h2 {...fadeUp()} className="mb-8 text-2xl font-light text-text-primary md:text-3xl">
            Experience
          </motion.h2>
          <ol className="divide-y divide-stroke border-y border-stroke">
            {experience.map((job, i) => (
              <motion.li key={job.company} {...fadeUp(i * 0.05)} className="grid gap-2 py-8 md:grid-cols-[220px_1fr]">
                <span className="text-xs uppercase tracking-[0.2em] text-muted">{job.years}</span>
                <div>
                  <h3 className="text-lg text-text-primary">
                    {job.role} — <Italic>{job.company}</Italic>
                  </h3>
                  <p className="mt-1 text-sm text-muted">{job.type}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <li key={skill} className="rounded-full border border-stroke px-3 py-1 text-xs text-text-primary/80">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </section>

        <section className="mt-20">
          <motion.h2 {...fadeUp()} className="mb-8 text-2xl font-light text-text-primary md:text-3xl">
            Client work · {BRAND}
          </motion.h2>
          <ol className="divide-y divide-stroke border-y border-stroke">
            {projects.map((project, i) => (
              <motion.li key={project.title} {...fadeUp(i * 0.05)}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid gap-2 py-8 md:grid-cols-[220px_1fr_auto] md:items-center md:gap-6"
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">{project.category}</span>
                  <div>
                    <h3 className="text-lg text-text-primary">
                      <Italic>{project.title}</Italic>
                    </h3>
                    <p className="mt-2 text-sm text-muted">{project.description}</p>
                  </div>
                  <span className="hidden text-muted transition-transform duration-300 group-hover:-rotate-45 group-hover:text-text-primary md:block">
                    <ArrowRight />
                  </span>
                </a>
              </motion.li>
            ))}
          </ol>
        </section>

        <section className="mt-20">
          <motion.h2 {...fadeUp()} className="mb-8 text-2xl font-light text-text-primary md:text-3xl">
            Toolkit
          </motion.h2>
          <motion.ul {...fadeUp(0.1)} className="flex flex-wrap gap-3">
            {TOOLKIT.map((skill) => (
              <li key={skill} className="rounded-full border border-stroke bg-surface/40 px-4 py-2 text-sm text-text-primary/90">
                {skill}
              </li>
            ))}
          </motion.ul>
        </section>

        <motion.section {...fadeUp()} className="mt-20 rounded-3xl border border-stroke bg-surface/40 p-8 md:p-10">
          <h2 className="text-2xl font-light text-text-primary md:text-3xl">
            Let's <Italic>connect</Italic>
          </h2>
          <p className="mt-3 max-w-md text-sm text-muted">Education, skills and recommendations are on my LinkedIn.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <GradientButton href={LINKEDIN} external>
              View LinkedIn <ArrowRight />
            </GradientButton>
            <GradientButton variant="outline" href={`mailto:${EMAIL}`}>
              Get in touch
            </GradientButton>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
