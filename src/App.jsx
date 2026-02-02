import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

/* components */
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";

/* pages & sections */
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";

import Works from "./pages/Works";
import Gallery from "./pages/Gallery";
import Resume from "./pages/Resume";

import "./styles/globals.css";
import "./styles/animations.css";

const Home = () => (
  <>
    <Hero />
    <About />
    <Projects />
    <Experience />
    <Skills />
    <Achievements />
    <Contact />
  </>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      }, 100);
    }
  }, [isLoading]);

  return (
    <div className="app">
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}

      {!isLoading && (
        <>
          <CustomCursor />
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/works" element={<Works />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>

          <ScrollToTop />
        </>
      )}
    </div>
  );
}

export default App;
