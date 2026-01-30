import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Hero.css";
import Lanyard from "./Lanyard";
import RotatingText from "./RotatingText";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      ".hero-rotating",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        ".hero-description",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        ".hero-buttons a",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
        "-=0.3"
      );
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      {/* LEFT CONTENT */}
      <div className="hero-content hero-left">

        {/* ROTATING TEXT */}
        <div className="hero-rotating">
          <span className="hero-static">Developer in</span>

          <RotatingText
            texts={["Blockchain", "MERN", "AI"]}
            rotationInterval={2200}
            className="hero-rotating-text"
          />

        </div>

        {/* SMALL DESCRIPTION */}
        <p className="hero-description">
          Building scalable web, blockchain, and AI-powered solutions with clean
          architecture and real-world impact.
        </p>

        {/* BUTTONS */}
        <div className="hero-buttons">
          <a href="#projects" className="btn-primary">View Works</a>
          <a href="#contact" className="btn-secondary">Get In Touch</a>
        </div>
      </div>

      {/* RIGHT – FOREGROUND LANYARD */}
      <div className="hero-lanyard-overlay">
        <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
      </div>

      {/* SCROLL */}
      <div className="hero-scroll">
        <div className="scroll-indicator"></div>
      </div>
    </section>
  );
};

export default Hero;
