// src/components/Skills.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skillsRef = useRef();
  const techScrollLeftRef = useRef();
  const techScrollRightRef = useRef();
  const skillsGridRef = useRef();

  const skillCategories = [
    {
      title: "Technical Skills",
      skills: [
        "Full Stack Development", "Blockchain", "Smart Contract", 
        "AI/ML", ".Net Framework", "3D Modeling", "UI/UX Design", "GitHub"
      ]
    },
    {
      title: "Technologies",
      skills: [
        "React", "Node.js", "Solidity", "Python", "JavaScript",
        "TypeScript", "MongoDB", "PostgreSQL"
      ]
    }
  ];

  const techStackLeft = ["React", "Node.js", "Blockchain", "AI/ML", "Solidity", "TypeScript", "AWS", "Docker", "MongoDB", "Python", "JavaScript", ".Net"];
  const techStackRight = ["UI/UX Design", "3D Modeling", "GitHub", "PostgreSQL", "Smart Contracts", "Web3", "GraphQL", "Redis", "Kubernetes", "TensorFlow"];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo('.skills-title',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    ).fromTo('.skill-category',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.3 },
      "-=0.5"
    );

    // Skills grid animation
    gsap.fromTo('.skill-item',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: skillsGridRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Infinite horizontal scrolling without gaps
    const createInfiniteScroll = (element, direction = 1) => {
      if (!element) return;

      const content = element.children[0];
      const contentWidth = content.scrollWidth / 2;
      
      gsap.to(content, {
        x: direction > 0 ? `-=${contentWidth}` : `+=${contentWidth}`,
        duration: 20,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
        }
      });
    };

    createInfiniteScroll(techScrollLeftRef.current, 1);
    createInfiniteScroll(techScrollRightRef.current, -1);
  }, []);

  return (
    <section id="skills" ref={skillsRef} className="section skills">
      <div className="skills-bg-grid"></div>
      
      <div className="container">
        <h2 className="section-title skills-title">Technical Expertise</h2>
        <p className="skills-subtitle">Technologies and skills I work with</p>
        
        <div ref={skillsGridRef} className="skills-content">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-grid">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-icon"></div>
                    <span className="skill-text">{skill}</span>
                    <div className="skill-hover-effect"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Infinite Tech Stack Scroller */}
        <div className="tech-stack-section">
          <h3 className="tech-stack-title">Tech Stack</h3>
          <div className="tech-scroll-container">
            <div ref={techScrollLeftRef} className="tech-scroll-wrapper">
              <div className="tech-scroll-track">
                {[...techStackLeft, ...techStackLeft].map((tech, index) => (
                  <div key={index} className="tech-item">
                    <div className="tech-glow"></div>
                    {tech}
                  </div>
                ))}
              </div>
            </div>
            
            <div ref={techScrollRightRef} className="tech-scroll-wrapper">
              <div className="tech-scroll-track reverse">
                {[...techStackRight, ...techStackRight].map((tech, index) => (
                  <div key={index} className="tech-item">
                    <div className="tech-glow"></div>
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;