// src/components/Hero.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-title div', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
    ).fromTo('.hero-subtitle',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    ).fromTo('.hero-description',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    ).fromTo('.hero-buttons',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <div>FULL STACK</div>
          <div>DEVELOPER &</div>
          <div>BLOCKCHAIN ENGINEER</div>
        </h1>
        <p className="hero-description">
          Creating digital experiences that merge cutting-edge technology with elegant design. 
          Specialized in AI, Blockchain, and Full Stack Development.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn-primary clickable">View Projects</a>
          <a href="#contact" className="btn-secondary clickable">Get In Touch</a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-indicator"></div>
      </div>
    </section>
  );
};

export default Hero;