// src/components/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete, progress: assetProgress = 0 }) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  // Sync display progress with asset progress with smooth easing
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setDisplayProgress(prev => {
        const diff = assetProgress - prev;
        if (Math.abs(diff) < 0.1) return assetProgress;
        return prev + diff * 0.04; 
      });
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [assetProgress]);

  const startTimeRef = React.useRef(Date.now());

  useEffect(() => {
    const minTime = 3000; // Let's keep it to 3s minimal loading

    const checkCompletion = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      
      // When truly complete
      if (assetProgress === 100 && displayProgress > 99.5 && elapsed > minTime) {
        clearInterval(checkCompletion);
        
        // 1. Fade out the text indicators, leaving ONLY the spinning logo
        gsap.to(".main-indicator, .minimal-progress-container", {
           opacity: 0,
           duration: 0.4,
           onComplete: () => {
              // 2. Erase the loading screen so the AnimatedIntro takes over perfectly
              onLoadingComplete();
           }
        });
      }
    }, 100);

    return () => clearInterval(checkCompletion);
  }, [assetProgress, displayProgress, onLoadingComplete]);

  const currentProgress = Math.floor(displayProgress);

  return (
    <div className="loading-screen">
      <div className="loading-content-simple">
        {/* Spinning User Logo */}
        <div className="logo-spinner-container">
          <img src="/title.png" alt="Logo" className="logo-spinner" />
          <div className="logo-glow"></div>
        </div>

        {/* Minimalist Progress Indicator */}
        <div className="main-indicator">
          <div className="loading-label">INITIALIZING SIBI_SYSTEMS_ {currentProgress}%</div>
        </div>

        {/* Elegant Progress Line */}
        <div className="minimal-progress-container">
          <div 
            className="minimal-bar-fill" 
            style={{ width: `${currentProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;