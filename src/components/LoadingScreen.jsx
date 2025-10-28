// src/components/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-number">{progress}%</div>
        <div className="loading-bar">
          <div 
            className="loading-progress" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loading-text">INITIALIZING PORTFOLIO</div>
        <div className="loading-subtext">SIBI B S</div>
      </div>
    </div>
  );
};

export default LoadingScreen;