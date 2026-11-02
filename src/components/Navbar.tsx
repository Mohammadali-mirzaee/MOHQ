import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn, scrollToSection } from "../lib/utils";

type Link = { label: string; section?: string; path?: string };
const LINKS: Link[] = [
  { label: "Home", section: "home" },
  { label: "Work", section: "work" },
  { label: "Resume", path: "/resume" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
      const work = document.getElementById("work");
      if (work) {
        const pastWork = work.getBoundingClientRect().top < window.innerHeight * 0.5;
        setActiveSection(pastWork ? "work" : "home");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const goTo = (section: string) => {
    if (location.pathname === "/") {
      scrollToSection(section);
      history.replaceState(null, "", section === "home" ? "/" : `/#${section}`);
    } else {
      navigate(section === "home" ? "/" : `/#${section}`);
    }
  };

  const isActive = (link: Link) =>
    link.path ? location.pathname === link.path : location.pathname === "/" && activeSection === link.section;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <nav
        className={cn(
          "inline-flex items-center rounded-full border border-white/10 bg-surface px-2 py-2 backdrop-blur-md transition-shadow duration-300",
          scrolled && "shadow-md shadow-black/10",
        )}
      >
        <button
          type="button"
          onClick={() => goTo("home")}
          aria-label="Home"
          className="group relative h-9 w-9 shrink-0 rounded-full transition-transform duration-300 hover:scale-110"
        >
          <span className="accent-gradient absolute inset-0 rounded-full transition-opacity duration-300 group-hover:opacity-0" />
          <span className="accent-gradient-reverse absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute inset-[1.5px] flex items-center justify-center rounded-full bg-bg font-display text-[13px] italic text-text-primary">
            MQ
          </span>
        </button>

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {LINKS.map((link) => (
          <button
            key={link.label}
            type="button"
            onClick={() => (link.path ? navigate(link.path) : goTo(link.section!))}
            aria-current={isActive(link) ? "page" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm",
              isActive(link)
                ? "bg-stroke/50 text-text-primary"
                : "text-muted hover:bg-stroke/50 hover:text-text-primary",
            )}
          >
            {link.label}
          </button>
        ))}

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        <button type="button" onClick={() => goTo("contact")} className="group relative ml-1 rounded-full sm:ml-0">
          <span
            aria-hidden
            className="accent-gradient absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ inset: "-2px" }}
          />
          <span className="relative inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-xs text-text-primary backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
            Say hi <span aria-hidden>↗</span>
          </span>
        </button>
      </nav>
    </header>
  );
}
