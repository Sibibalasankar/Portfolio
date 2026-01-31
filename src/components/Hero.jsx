import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Hero.css";

import Lanyard from "./Lanyard";
import DotGrid from "@/components/DotGrid";
import RotatingText from "@/components/RotatingText";

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
      {/* DOT GRID BACKGROUND */}
      <div className="hero-dotgrid-bg">
        <DotGrid
          dotSize={7}
          gap={11}
          baseColor="#271E37"
          activeColor="#e7e7e7"
          proximity={190}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* OVERLAY */}
      <div className="hero-overlay" />

      {/* LEFT CONTENT */}
      <div className="hero-content hero-left">
        {/* SINGLE-LINE CENTERED ROTATING TITLE */}
        <div className="hero-rotating">
          <span className="hero-static">Developer in</span>

          <RotatingText
            texts={["Web3", "MERN", "AI"]}
            rotationInterval={2200}
            staggerFrom="last"
            staggerDuration={0.03}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-120%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            splitBy="characters"
            mainClassName="hero-rotating-text"
            splitLevelClassName="overflow-hidden"
            elementLevelClassName="inline-block text-white"
          />
        </div>

        <p className="hero-description">
          Building scalable web, blockchain, and AI-powered solutions with clean
          architecture and real-world impact.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="btn-primary">View Works</a>
          <a href="#contact" className="btn-secondary">Get In Touch</a>
        </div>
      </div>

      {/* RIGHT SIDE – ID CARD / CANVAS */}
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
