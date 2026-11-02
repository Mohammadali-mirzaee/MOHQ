import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
