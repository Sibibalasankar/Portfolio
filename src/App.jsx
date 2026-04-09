import { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useProgress, useGLTF, useTexture } from "@react-three/drei";

/* components */
import LoadingScreen from "./components/LoadingScreen";
const CustomCursor = lazy(() => import("./components/CustomCursor"));
const Header = lazy(() => import("./components/Header"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop"));

import AnimatedIntro from "./components/AnimatedIntro";

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
  const location = useLocation();

  // Pre-mount the heavy 3D canvases underneath the loading screen 
  // as soon as raw assets hit 100%, avoiding main-thread freezes during the logo animation.
  const isAppMounted = progress >= 100 || !isLoading;

  // Preload Lanyard Assets
  useEffect(() => {
    useGLTF.preload(cardGLB);
    useTexture.preload(lanyardTexture);
  }, []);

  // Handle Scroll to Hash and Page Top
  useEffect(() => {
    const hash = window.location.hash;
    if (!isLoading) {
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 500);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [location, isLoading]);

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
      {/* Heavy 3D app content pre-mounts behind the loader */}
      {isAppMounted && (
        <Suspense fallback={<div style={{ position: 'fixed', inset: 0, backgroundColor: '#0b0b0b', zIndex: -1 }} />}>
          <CustomCursor />
          {!isLoading && <AnimatedIntro />}
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

      {/* Loading Screen overlays everything until it's finished */}
      {isLoading && (
        <LoadingScreen 
          progress={progress} 
          onLoadingComplete={() => setIsLoading(false)} 
        />
      )}
    </div>
  );
}

export default App;

