// src/components/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete, progress: assetProgress = 0 }) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Sync display progress with asset progress with smooth easing
  // We've slowed down the lerping slightly for better visual feedback
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setDisplayProgress(prev => {
        const diff = assetProgress - prev;
        if (Math.abs(diff) < 0.1) return assetProgress;
        // Slow down the progression even more to ensure the user can see the logo
        return prev + diff * 0.04; 
      });
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [assetProgress]);

  // Ensure minimum viewing time even if assets load instantly
  const startTimeRef = React.useRef(Date.now());

  useEffect(() => {
    const minTime = 4000; // 4 seconds minimum

    const checkCompletion = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      
      // Complete only if assets are loaded, display caught up, AND min time passed
      if (assetProgress === 100 && displayProgress > 99.5 && elapsed > minTime) {
        setIsComplete(true);
        clearInterval(checkCompletion);
        
        // Final reveal delay
        setTimeout(onLoadingComplete, 1200);
      }
    }, 100);

    return () => clearInterval(checkCompletion);
  }, [assetProgress, displayProgress, onLoadingComplete]);

  const currentProgress = Math.floor(displayProgress);

  return (
    <div className={`loading-screen ${isComplete ? 'complete' : ''}`}>
      <div className="loading-content-simple">
        {/* Spinning User Logo (Z-Axis) */}
        <div className="logo-spinner-container">
          <img src="/title.png" alt="Logo" className="logo-spinner" />
          <div className="logo-glow"></div>
        </div>

        {/* Minimalist Progress Indicator (Centered Label) */}
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

      {/* Elegant Reveal Transition */}
      <div className="reveal-curtain"></div>
    </div>
  );
};

export default LoadingScreen;