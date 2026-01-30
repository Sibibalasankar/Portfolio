import { useState, useEffect } from 'react';

import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';

import './styles/globals.css';
import './styles/animations.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Loader timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // 🔥 GSAP ScrollTrigger refresh AFTER loader
  useEffect(() => {
    if (!isLoading) {
      // Give DOM a moment to fully paint
      setTimeout(() => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      }, 100);
    }
  }, [isLoading]);

  return (
    <div className="app">
      {/* Loading Screen (overlay, not blocking mount logic) */}
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}


      {/* Main App Content */}
      {!isLoading && (
        <>
          {/* Cursor should start ONLY after loading */}
          <CustomCursor />

          <Header />
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Achievements />
          <Contact />
          <ScrollToTop />
        </>
      )}
    </div>
  );
}

export default App;
