import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // ID card drop
    tl.fromTo(
      '.id-card-wrapper',
      { y: -500 },
      { y: 0, duration: 1.4, ease: 'bounce.out' }
    )

    // Swing on impact
    .fromTo(
      '.id-card',
      { rotation: -12 },
      { rotation: 12, duration: 1.2, yoyo: true, repeat: 3 },
      '-=0.6'
    )

    // Title animation AFTER card settles
    .fromTo(
      '.hero-title div',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
      '-=0.3'
    )

    .fromTo(
      '.hero-description',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.3'
    )

    .fromTo(
      '.hero-buttons',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.3'
    );

    // Idle infinite swing
    gsap.to('.id-card', {
      rotation: 4,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 0.3
    });

  }, []);

  return (
    <section ref={heroRef} className="hero">

      {/* ID CARD */}
      <div className="id-card-wrapper">
        <div className="id-string"></div>
        <div className="id-card">
          <img src="/images.jpg" alt="My ID Card" />
        </div>
      </div>

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
          <a href="#projects" className="btn-primary clickable">View Works</a>
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
