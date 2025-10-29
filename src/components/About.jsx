// src/components/About.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef();
  const imageRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo('.about-title', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    ).fromTo('.about-text',
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      "-=0.5"
    ).fromTo('.about-image-container',
      { x: 50, opacity: 0, scale: 0.8 },
      { x: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
      "-=0.5"
    ).fromTo('.about-stats div',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
      "-=0.3"
    );

    // Floating animation for image
    gsap.to(imageRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <section id="about" ref={aboutRef} className="section about">
      {/* White Grid Background - Entire Section */}
      <div className="white-grid-bg"></div>
      
      <div className="container">
        <h2 className="section-title about-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-text" ref={textRef}>
            <p className="about-description">
              Full Stack Developer and Freelancer specializing in modern web technologies, 
              AI/ML, and blockchain. Currently pursuing AI & Data Science at KGISL Institute of Technology.
            </p>
            
            <p className="about-description">
              I build responsive applications and audit smart contracts, helping clients transform 
              ideas into cutting-edge digital solutions through clean code and innovative thinking.
            </p>

            <div className="freelance-badge">
              <span className="badge-icon">⚡</span>
              <span className="badge-text">Available for Freelance Projects</span>
            </div>

            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">2+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat">
                <div className="stat-number">15+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat">
                <div className="stat-number">10+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="about-image-container" ref={imageRef}>
              <div className="image-wrapper">
                <img 
                  src="/main.png" 
                  alt="Sibi B S - Full Stack Developer"
                  className="profile-image"
                />
                <div className="image-border"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;