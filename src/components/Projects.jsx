// src/components/Projects.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsRef = useRef();
  const [activeCard, setActiveCard] = useState(null);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });

  const projects = [
    {
      title: "AUDITSMARTAI",
      preview: "AI-powered smart contract auditing tool for secure blockchain deployments",
      company: "LayerOneX, Australia",
      year: "2025",
      description: "Developed an AI-powered smart contract auditing tool that analyzes Solidity contracts for vulnerabilities, provides detailed security reports, and suggests improvements to ensure safe and reliable blockchain deployments.",
      tags: ["AI", "BLOCKCHAIN", "SOLIDITY", "SECURITY"],
      link: "https://auditsmartai.xyz/",
      type: "website"
    },
    {
      title: "LLS AUDIT APP",
      preview: "Auditing application for streamlined workflow management",
      company: "LLS Coimbatore, India",
      year: "2025",
      description: "Developed an auditing application for managing audit plans, observations, and action reports, creating a responsive, user-friendly workflow for auditors and departments.",
      tags: ["FULL STACK", "REACT", "NODE.JS", "DATABASE"],
      link: "https://llsamsystem.netlify.app/",
      type: "webapp"
    },
    {
      title: "GREEN WHEELS WEBSITE",
      preview: "Official website for Green Wheels Supply Chain Solutions",
      company: "GWSCS Coimbatore, India",
      year: "2023",
      description: "Built and launched the official website for Green Wheels Supply Chain Solutions to showcase services and improve client reach with modern design and optimal performance.",
      tags: ["WEB DEVELOPMENT", "UI/UX", "RESPONSIVE DESIGN"],
      link: "https://www.greenwheelscs.in/",
      type: "website"
    },
    {
      title: "CHITFUND APP",
      preview: "Chit fund community app with secure transaction features",
      company: "Coimbatore, India",
      year: "2025",
      description: "Developing a Mobile Application for Local Chit Fund Communities with modern features, secure transactions, and intuitive user experience for financial management.",
      tags: ["MOBILE", "REACT NATIVE", "FINTECH"],
      link: "#mobile",
      type: "mobile"
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo('.projects-title',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    ).fromTo('.project-item',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
      "-=0.5"
    );
  }, []);

  const handleMouseEnter = (index, e) => {
    setActiveCard(index);
    
    const cardWidth = 320;
    const cardHeight = 400;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let x = e.clientX + 20;
    let y = e.clientY - 20;
    
    if (x + cardWidth > viewportWidth - 20) {
      x = e.clientX - cardWidth - 20;
    }
    
    if (y + cardHeight > viewportHeight - 20) {
      y = viewportHeight - cardHeight - 20;
    }
    
    if (y < 20) {
      y = 20;
    }
    
    setCardPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setActiveCard(null);
  };

  const handleMouseMove = (e) => {
    if (activeCard !== null) {
      const cardWidth = 320;
      const cardHeight = 400;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let x = e.clientX + 20;
      let y = e.clientY - 20;
      
      if (x + cardWidth > viewportWidth - 20) {
        x = e.clientX - cardWidth - 20;
      }
      
      if (y + cardHeight > viewportHeight - 20) {
        y = viewportHeight - cardHeight - 20;
      }
      
      if (y < 20) {
        y = 20;
      }
      
      setCardPosition({ x, y });
    }
  };

  const handleProjectClick = (project, e) => {
    if (project.type === "mobile") {
      e.preventDefault();
      alert("Mobile APK available for download - Contact for details");
      return;
    }
  };

  return (
    <section 
      id="projects" 
      ref={projectsRef} 
      className="section projects"
      onMouseMove={handleMouseMove}
    >
      <div className="container">
        <h2 className="section-title projects-title">WORKS</h2>
        
        <div className="projects-list">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              className={`project-item clickable ${activeCard === index ? 'active-hover' : ''}`}
              onMouseEnter={(e) => handleMouseEnter(index, e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleProjectClick(project, e)}
              target={project.type !== "mobile" ? "_blank" : "_self"}
              rel={project.type !== "mobile" ? "noopener noreferrer" : ""}
            >
              <div className="project-main-info">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-arrow">→</div>
              </div>
              <p className="project-preview">{project.preview}</p>
            </a>
          ))}
        </div>

        {activeCard !== null && (
          <div 
            className="project-card active"
            style={{
              left: `${cardPosition.x}px`,
              top: `${cardPosition.y}px`,
            }}
          >
            <div className="project-content">
              <div className="project-meta">
                <span className="project-company">{projects[activeCard].company}</span>
                <span className="project-year">{projects[activeCard].year}</span>
              </div>
              
              <p className="project-description">{projects[activeCard].description}</p>
              
              <div className="project-tags">
                {projects[activeCard].tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag">{tag}</span>
                ))}
                <span className="project-tag project-type">
                  {projects[activeCard].type === "website" && "LIVE WEBSITE"}
                  {projects[activeCard].type === "webapp" && "WEB APPLICATION"} 
                  {projects[activeCard].type === "mobile" && "MOBILE APP"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;