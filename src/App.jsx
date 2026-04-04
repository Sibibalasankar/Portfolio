import { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useProgress, useGLTF, useTexture } from "@react-three/drei";

/* components */
import LoadingScreen from "./components/LoadingScreen";
const CustomCursor = lazy(() => import("./components/CustomCursor"));
const Header = lazy(() => import("./components/Header"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));

/* pages & sections */
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Skills = lazy(() => import("./components/Skills"));
const Achievements = lazy(() => import("./components/Achievements"));
const Contact = lazy(() => import("./components/Contact"));

const Works = lazy(() => import("./pages/Works"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Resume = lazy(() => import("./pages/Resume"));

import "./styles/globals.css";
import "./styles/animations.css";

// Assets for Lanyard (Preload)
import cardGLB from './assets/lanyard/card.glb';
import lanyardTexture from './assets/lanyard/lanyard.png';

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
  const { progress } = useProgress();
  const [isLoading, setIsLoading] = useState(true);

  // Preload Lanyard Assets
  useEffect(() => {
    useGLTF.preload(cardGLB);
    useTexture.preload(lanyardTexture);
  }, []);

  // Handle GSAP refresh when loading is done
  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      }, 500);
    }
  }, [isLoading]);



  return (
    <div className="app">
      {isLoading && (
        <LoadingScreen 
          progress={progress} 
          onLoadingComplete={() => setIsLoading(false)} 
        />
      )}

      {!isLoading && (
        <Suspense fallback={null}>
          <CustomCursor />
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/works" element={<Works />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>

          <ScrollToTop />
        </Suspense>
      )}
    </div>
  );
}

export default App;

