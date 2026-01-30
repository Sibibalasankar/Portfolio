import React from "react";
import "./About.css";

import ScrollReveal from "./ScrollReveal";
import ScrollFloat from './ScrollFloat';

const About = () => {
  return (
    <section id="about" className="section about">
      <div className="white-grid-bg" />

      <div className="container">
        <h2 className="section-title about-title"> <ScrollFloat
          animationDuration={0.1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.05}
        >
          About Me
        </ScrollFloat></h2>

        <div className="about-content no-image">
          <div className="about-text">

            <ScrollReveal
              baseOpacity={0.1}
              enableBlur
              baseRotation={1}
              blurStrength={4}
            >
              Full Stack Developer and Freelancer specializing in modern web
              technologies, AI/ML, and blockchain. Currently pursuing AI & Data
              Science at KGISL Institute of Technology.
            </ScrollReveal>

            <ScrollReveal
              baseOpacity={0.1}
              enableBlur
              baseRotation={1}
              blurStrength={4}
            >
              I build responsive applications and audit smart contracts, helping
              clients transform ideas into cutting-edge digital solutions through
              clean code and innovative thinking.
            </ScrollReveal>

            <div className="freelance-badge">
              <span className="badge-icon">⚡</span>
              <span className="badge-text">
                Available for Freelance Projects
              </span>
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
        </div>
      </div>
    </section>
  );
};

export default About;
