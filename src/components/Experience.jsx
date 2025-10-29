// src/components/Experience.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const experienceRef = useRef();
  const itemsRef = useRef([]);

  const experiences = [
    {
      company: "Ascentz Technology",
      role: "Internship",
      period: "2023",
      description: "Gained hands-on experience in modern web development technologies and participated in real-world projects, enhancing technical skills and industry knowledge.",
      location: "Coimbatore, India",
      type: "internship",
      tech: ["React", "Node.js", "MongoDB", "JavaScript"]
    },
    {
      company: "Lakshmi Life Sciences",
      role: "App Development & Backend Engineering",
      period: "2022",
      description: "Developed applications and managed backend systems, implementing efficient solutions to support business processes and optimize operational workflows.",
      location: "Coimbatore, India",
      type: "job",
      tech: ["Backend", "APIs", "System Design", "Database"]
    },
    {
      company: "SRI Valves",
      role: "Administrator",
      period: "2022",
      description: "Handled administrative tasks and supported day-to-day operations to ensure smooth functioning of the organization and maintain operational efficiency.",
      location: "Coimbatore, India",
      type: "job",
      tech: ["Management", "Operations", "Coordination", "Support"]
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: experienceRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo('.experience-title',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    ).fromTo('.experience-item',
      { 
        x: -100, 
        opacity: 0, 
        scale: 0.9 
      },
      { 
        x: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        stagger: 0.2,
        ease: "back.out(1.7)" 
      },
      "-=0.5"
    );

    // Add hover animations
    itemsRef.current.forEach((item, index) => {
      if (item) {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            y: -8,
            duration: 0.4,
            ease: "power2.out"
          });
          gsap.to(item.querySelector('.glass-effect'), {
            opacity: 1,
            duration: 0.3
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            y: 0,
            duration: 0.4,
            ease: "power2.out"
          });
          gsap.to(item.querySelector('.glass-effect'), {
            opacity: 0,
            duration: 0.3
          });
        });
      }
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <section id="experience" ref={experienceRef} className="section experience">
      {/* Animated Background */}
      <div className="experience-bg-pattern"></div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className="container">
        <h2 className="section-title experience-title">
          <span className="title-text">Experience</span>
          <span className="title-underline"></span>
        </h2>
        
        <div className="experience-list">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              ref={addToRefs}
              className={`experience-item ${exp.type}`}
            >
              {/* Glass morphic effect */}
              <div className="glass-effect"></div>
              
              {/* Timeline connector */}
              <div className="timeline-dot"></div>
              <div className="timeline-line"></div>
              
              <div className="experience-content">
                <div className="experience-header">
                  <div className="company-info">
                    <h3 className="experience-company">{exp.company}</h3>
                    <div className="experience-badge">
                      <span className={`badge ${exp.type}`}>
                        {exp.type === 'internship' ? 'Internship' : 'Full-time'}
                      </span>
                      <span className="experience-period">{exp.period}</span>
                    </div>
                  </div>
                </div>
                
                <div className="experience-role">{exp.role}</div>
                <div className="experience-location">📍 {exp.location}</div>
                
                <p className="experience-description">{exp.description}</p>
                
                {/* Tech Stack */}
                <div className="tech-stack">
                  {exp.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Career Progress Bar */}
        <div className="career-progress">
          <div className="glass-card">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <div className="progress-labels">
              <span>2022</span>
              <span>2023</span>
              <span>Present</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;