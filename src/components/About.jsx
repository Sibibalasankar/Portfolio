// src/components/About.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef();
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
    ).fromTo('.about-content',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.5"
    ).fromTo('.about-stats div',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
      "-=0.3"
    );
  }, []);

  return (
    <section id="about" ref={aboutRef} className="section about">
      <div className="container">
        <h2 className="section-title about-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-text" ref={textRef}>
            <p className="about-description">
              I am an enthusiastic developer with expertise in web development, AI/ML, 
              and blockchain technologies. Currently pursuing my Bachelor of Technology 
              in AI & Data Science at KGISL Institute of Technology.
            </p>
            
            <p className="about-description">
              With a strong foundation in full-stack development and blockchain engineering, 
              I specialize in creating responsive applications and conducting smart contract 
              auditing. My passion lies in delivering practical solutions through strong 
              problem-solving and teamwork abilities.
            </p>

            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">2+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat">
                <div className="stat-number">10+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat">
                <div className="stat-number">5+</div>
                <div className="stat-label">Awards Won</div>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="image-placeholder glass">
              <span>Your Image Here</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;