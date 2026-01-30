import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Hero.css";
import Lanyard from "./Lanyard";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      ".hero-title div",
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.12 }
    )
      .fromTo(
        ".hero-description",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        ".hero-buttons a",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
        "-=0.4"
      );
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      {/* TEXT CONTENT */}
      <div className="hero-content">
        <h1 className="hero-title">
          <div>FULL STACK</div>
          <div>DEVELOPER &</div>
          <div>BLOCKCHAIN ENGINEER</div>
        </h1>

        <p className="hero-description">
          Creating digital experiences that merge cutting-edge technology with
          elegant design. Specialized in AI, Blockchain, and Full Stack
          Development.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="btn-primary">View Works</a>
          <a href="#contact" className="btn-secondary">Get In Touch</a>
        </div>
      </div>

      {/* 🔥 FOREGROUND LANYARD (NO SPACE TAKEN) */}
      <div className="hero-lanyard-overlay">
        <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
      </div>

      {/* SCROLL INDICATOR */}
      <div className="hero-scroll">
        <div className="scroll-indicator"></div>
      </div>
    </section>
  );
};

export default Hero;
