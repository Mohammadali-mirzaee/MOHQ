import { motion } from "framer-motion";
import SectionHeader, { ArrowRight, Italic } from "./SectionHeader";
import GradientButton from "./GradientButton";
import { services } from "../lib/data";
import { EASE_OUT, scrollToSection } from "../lib/utils";

export default function Services() {
  return (
    <section id="services" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="What I do"
          title={<>How I can <Italic>help</Italic></>}
          subtext="One person from design to deploy — so nothing gets lost between the idea and the live site."
          action={
            <GradientButton variant="ghost" size="sm" onClick={() => scrollToSection("contact")}>
              Start a project <ArrowRight />
            </GradientButton>
          }
        />

        <ul className="flex flex-col gap-4">
          {services.map((service, i) => (
            <motion.li
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: i * 0.08 }}
            >
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="group flex w-full items-center gap-6 rounded-[40px] border border-stroke bg-surface/30 p-4 text-left transition-colors duration-300 hover:bg-surface sm:rounded-full"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-stroke font-display text-2xl italic text-text-primary md:h-20 md:w-20 md:text-3xl">
                  0{i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base text-text-primary md:text-xl">{service.title}</h3>
                  <p className="mt-1 text-xs text-muted sm:hidden">{service.detail}</p>
                </div>
                <span className="hidden text-sm text-muted sm:block">{service.detail}</span>
                <span className="mr-2 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stroke text-muted transition-all duration-300 group-hover:-rotate-45 group-hover:border-transparent group-hover:bg-text-primary group-hover:text-bg sm:flex">
                  <ArrowRight />
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
