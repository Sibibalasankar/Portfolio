// src/components/LoadingScreen.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const canvasRef = useRef(null);
  const numberRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  // Optimized progress update with smooth easing
  useEffect(() => {
    let startTime = null;
    const duration = 2500; // 2.5 seconds total loading

    const animateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(Math.floor(newProgress));

      if (newProgress < 100) {
        animationRef.current = requestAnimationFrame(animateProgress);
      } else {
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onLoadingComplete, 600);
        }, 400);
      }
    };

    animationRef.current = requestAnimationFrame(animateProgress);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onLoadingComplete]);

  // Optimized particle animation with useCallback
  const initParticles = useCallback((ctx, canvas) => {
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.2 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.15 + 0.05;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Soft boundary checking
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

        if (isComplete) {
          this.opacity -= 0.008;
          if (this.opacity <= 0) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.opacity = Math.random() * 0.1 + 0.05;
          }
        }
      }

      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    return Array.from({ length: 20 }, () => new Particle());
  }, [isComplete]);

  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrame;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.scale(dpr, dpr);
    };
    
    resizeCanvas();
    
    const handleResize = () => {
      resizeCanvas();
      particlesRef.current = initParticles(ctx, {
        width: canvas.width / (window.devicePixelRatio || 1),
        height: canvas.height / (window.devicePixelRatio || 1)
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Initialize particles
    particlesRef.current = initParticles(ctx, {
      width: canvas.width / (window.devicePixelRatio || 1),
      height: canvas.height / (window.devicePixelRatio || 1)
    });

    const animate = () => {
      // Clear with trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections with progress-based intensity
      if (progress > 0) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.02 + (progress / 100) * 0.04})`;
        ctx.lineWidth = 0.2;

        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const p1 = particlesRef.current[i];
            const p2 = particlesRef.current[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 80) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, [progress, isComplete, initParticles]);

  // Smooth number animation
  useEffect(() => {
    if (numberRef.current && progress > 0) {
      numberRef.current.style.transform = 'translateX(3px) scale(1.03)';
      numberRef.current.style.opacity = '1';
      
      const timer = setTimeout(() => {
        if (numberRef.current) {
          numberRef.current.style.transform = 'translateX(0px) scale(1)';
        }
      }, 80);

      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className={`loading-screen ${isComplete ? 'complete' : ''}`}>
      <canvas 
        ref={canvasRef} 
        className="particle-canvas"
      />
      
      <div className="background-elements">
        <div className="scan-line"></div>
      </div>

      <div className="loading-content">
        {/* Progress Number */}
        <div className="progress-section">
          <div className="number-container">
            <div ref={numberRef} className="progress-number">
              {progress}
            </div>
            <div className="percentage-symbol">%</div>
          </div>

          {/* Progress Line */}
          <div className="advanced-progress-container">
            <div className="progress-track">
              <div 
                className="progress-wave" 
                style={{ width: `${progress}%` }}
              >
                <div className="wave-glow"></div>
              </div>
              
              <div className="progress-ticks">
                {Array.from({ length: 10 }, (_, i) => (
                  <div 
                    key={i}
                    className="progress-tick"
                    style={{ 
                      opacity: progress > i * 10 ? 0.6 : 0.2
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Progress Stats */}
            <div className="progress-stats">
              <div className="stat">
                <div className="stat-value">{progress}%</div>
                <div className="stat-label">COMPLETE</div>
              </div>
              <div className="stat">
                <div className="stat-value">{Math.floor(progress * 2.4)}</div>
                <div className="stat-label">ASSETS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Status */}
        <div className="loading-status">
          <div className="status-text">
            LOADING PORTFOLIO
            <span className="status-cursor">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;