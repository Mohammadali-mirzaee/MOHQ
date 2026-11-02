import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import Hero from "../components/Hero";
import SelectedWorks from "../components/SelectedWorks";
import Services from "../components/Services";
import Explorations from "../components/Explorations";
import Stats from "../components/Stats";
import Contact from "../components/Contact";
import { scrollToSection } from "../lib/utils";

// The intro loader plays once per visit, not every time you route back home.
let hasLoaded = false;

export default function Index() {
  const [isLoading, setIsLoading] = useState(!hasLoaded);
  const { hash } = useLocation();

  useEffect(() => {
    if (isLoading || !hash) return;
    const id = window.setTimeout(() => scrollToSection(hash.slice(1)), 150);
    return () => window.clearTimeout(id);
  }, [isLoading, hash]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            onComplete={() => {
              hasLoaded = true;
              setIsLoading(false);
            }}
          />
        )}
      </AnimatePresence>
      <Hero ready={!isLoading} />
      <SelectedWorks />
      <Services />
      <Explorations />
      <Stats />
      <Contact />
    </>
  );
}
