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
      title: "SWAP SAGA (AMM DEX)",
      preview: "Uniswap-style AMM DEX with swaps, liquidity pools & live analytics",
      company: "Independent Web3 Project",
      year: "2026",
      description:
        "Developed a Uniswap-style Automated Market Maker (AMM) DEX on Base Sepolia with token swaps, liquidity pools, real-time price discovery, TVL tracking, and MetaMask integration.",
      tags: [
        "WEB3",
        "DEFI",
        "AMM",
        "DEX",
        "SOLIDITY",
        "ETHERS.JS",
        "REACT",
        "BASE"
      ],
      link: "https://swap-saga.onrender.com/",
      type: "webapp"
    },
    {
      title: "ARCANE GEN",
      preview: "Secure BTC & EVM wallet generator built for Web3 learning",
      company: "Independent Project",
      year: "2026",
      description:
        "Built a secure cryptocurrency wallet generator supporting Bitcoin (BTC) and EVM-compatible wallets, focusing on wallet generation fundamentals, privacy-first design, and MetaMask-compatible EVM wallets.",
      tags: ["WEB3", "CRYPTO", "BITCOIN", "ETHEREUM", "REACT", "NODE.JS"],
      link: "https://arcane-gen.onrender.com",
      type: "webapp"
    }
    ,
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
      title: "EDUCERT",
      preview: "Decentralized certificate issuance & verification platform",
      company: "Independent Project",
      year: "2025",
      description: "Developed a decentralized certificate platform where institutions can approve student certificates, students can mint them as NFTs on Ethereum, and anyone can verify them publicly without wallet access.",
      tags: ["WEB3", "NFT", "BLOCKCHAIN", "REACT", "NODE.JS"],
      link: "https://educert25.onrender.com",
      type: "webapp"
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
      title: "SMART TRIBAL FARMING",
      preview: "Smart crop planning & transport pooling platform for farmers",
      company: "Independent Project",
      year: "2024",
      description: "Developed an agricultural resource management platform that provides smart crop recommendations based on soil, season, and region data, along with a transport pooling system to help farmers share logistics efficiently and reduce transportation cost.",
      tags: ["REACT", "VITE", "RESOURCE MANAGEMENT", "AGRICULTURE", "UI/UX"],
      link: "https://smart-tribal-farming.onrender.com",
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