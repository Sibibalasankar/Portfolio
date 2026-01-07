// src/components/Skills.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skillsRef = useRef();
  const floatingBubblesRef = useRef();
  const skillsGridRef = useRef();

  const skillCategories = [
    {
      title: "Technical Skills",
      skills: [
        "Generative AI", "Blockchain", "Smart Contract", 
        "Data Science", "Full Stack Development", "3D Modeling", "UI/UX Design", "GitHub"
      ]
    },
    {
      title: "Tools & FrameWorks",
      skills: [
        "Java", "Node.js", "Solidity", "Python", "JavaScript",
        "TypeScript", "MongoDB", "React"
      ]
    }
  ];

  const techSymbols = [
    "⚛️", "🚀", "🐍", "📊", "🔗", "⚡", "🎨", "🛠️",
    "💾", "🌐", "🔒", "📱", "🎯", "⚙️", "🔧", "💻",
    "📡", "🔄", "🎮", "🤖", "☁️", "📈", "🔍", "✨"
  ];

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

    // Floating bubbles animation with proper distribution
    const bubbles = floatingBubblesRef.current?.children;
    if (bubbles) {
      Array.from(bubbles).forEach((bubble, index) => {
        // Calculate random positions spread across the entire screen
        const randomX = 5 + Math.random() * 90; // 5% to 95%
        const randomY = 5 + Math.random() * 90; // 5% to 95%
        
        // Set initial random position
        gsap.set(bubble, {
          x: randomX + '%',
          y: randomY + '%'
        });

        const duration = 20 + Math.random() * 15;
        const delay = Math.random() * 3;

        // Vertical floating animation
        gsap.to(bubble, {
          y: `+=${15 + Math.random() * 20}`,
          duration: duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: delay
        });

        // Horizontal floating animation
        gsap.to(bubble, {
          x: `+=${10 + Math.random() * 15}`,
          duration: duration * 0.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: delay
        });

        // Rotation animation
        gsap.to(bubble, {
          rotation: 360,
          duration: duration * 3,
          ease: "none",
          repeat: -1,
          delay: delay
        });

        // Scale animation
        gsap.to(bubble, {
          scale: 1.2,
          duration: duration * 0.7,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: delay
        });
      });
    }
  }, []);

  return (
    <section id="skills" ref={skillsRef} className="section skills">
      <div className="skills-bg-grid"></div>
      
      {/* Floating Tech Bubbles Background */}
      <div ref={floatingBubblesRef} className="floating-bubbles">
        {techSymbols.map((symbol, index) => (
          <div 
            key={index} 
            className="tech-bubble"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 20}s`,
              fontSize: `${12 + Math.random() * 8}px`
            }}
          >
            {symbol}
          </div>
        ))}
      </div>
      
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
      </div>
    </section>
  );
};

export default Skills;