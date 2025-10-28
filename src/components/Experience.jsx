// src/components/Experience.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const experienceRef = useRef();

  const experiences = [
    {
      company: "SRI Valves",
      role: "Administrator",
      period: "2022",
      description: "Handled administrative tasks and supported day-to-day operations to ensure smooth functioning of the organization.",
      location: "Coimbatore, India"
    },
    {
      company: "Lakshmi Life Sciences",
      role: "App Development & Backend Engineering",
      period: "2022",
      description: "Developed applications and managed backend systems, implementing efficient solutions to support business processes.",
      location: "Coimbatore, India"
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
      { y: 0, opacity: 1, duration: 1 }
    ).fromTo('.experience-item',
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, stagger: 0.3 },
      "-=0.5"
    );
  }, []);

  return (
    <section id="experience" ref={experienceRef} className="section experience">
      <div className="container">
        <h2 className="section-title experience-title">Experience</h2>
        
        <div className="experience-list">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h3 className="experience-company">{exp.company}</h3>
                <span className="experience-period">{exp.period}</span>
              </div>
              
              <div className="experience-role">{exp.role}</div>
              <div className="experience-location">{exp.location}</div>
              
              <p className="experience-description">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;