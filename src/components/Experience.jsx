// src/components/Experience.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Experience.css";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);

  const experiences = [
    {
      year: "2022",
      company: "SRI Valves",
      role: "Administration",
      description:
        "Built strong operational and organizational foundations by managing administrative tasks and supporting daily business activities.",
      tech: ["Operations", "Coordination", "Management"]
    },
    {
      year: "2022",
      company: "Lakshmi Life Sciences",
      role: "App Development & Backend Engineering",
      description:
        "Developed business applications and backend systems, gaining hands-on exposure to real-world software workflows.",
      tech: ["Node.js", "React.js", "Express.js", "MS SQL"]
    },
    {
      year: "2023",
      company: "Ascentz Technology",
      role: "Python Internship",
      description:
        "Entered the tech industry through Python development, strengthening programming logic and backend fundamentals.",
      tech: ["Python", "APIs", "JavaScript"]
    },
    {
      year: "2025",
      company: "Rinex Education",
      role: "Web Development Intern",
      description:
        "Built full-stack web applications and learned modern development practices through structured projects.",
      tech: ["React.js", "Node.js", "MongoDB", "Express.js"]
    },
    {
      year: "2025",
      company: "Rinex Education",
      role: "GenAI Internship",
      description:
        "Specialized in Generative AI, Machine Learning, and Data Science through hands-on projects and real-world problem solving.",
      tech: ["Generative AI", "Machine Learning", "Data Science"]
    }
  ];

  useEffect(() => {
    gsap.fromTo(
      ".timeline-item",
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section id="experience" className="experience" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Career Journey</h2>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-year">{exp.year}</div>

              <div className="timeline-content">
                <h3 className="timeline-role">{exp.role}</h3>
                <span className="timeline-company">{exp.company}</span>

                <p className="timeline-description">
                  {exp.description}
                </p>

                <div className="timeline-tech">
                  {exp.tech.map((t, i) => (
                    <span key={i} className="tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
