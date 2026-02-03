import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./Projects.css";
import ScrollFloat from "./ScrollFloat";

const projects = [
  {
    title: "SWAP SAGA (AMM DEX)",
    preview: "Uniswap-style AMM DEX with swaps, liquidity pools & live analytics",
    description:
      "Developed a Uniswap-style Automated Market Maker (AMM) DEX on Base Sepolia with token swaps, liquidity pools, real-time price discovery, TVL tracking, and MetaMask integration.",
    company: "Independent Web3 Project",
    year: "2026",
    tags: ["WEB3", "DEFI", "AMM", "DEX", "SOLIDITY", "REACT"],
    img: "/projects/swap-saga.png",
    link: "https://swap-saga.onrender.com/",
    type: "WEB APPLICATION",
  },
  {
    title: "ARCANE GEN",
    preview: "Secure BTC & EVM wallet generator built for Web3 learning",
    description:
      "Built a secure cryptocurrency wallet generator supporting Bitcoin (BTC) and EVM-compatible wallets.",
    company: "Independent Project",
    year: "2026",
    tags: ["WEB3", "CRYPTO", "BITCOIN", "ETHEREUM"],
    img: "/projects/arcane-gen.png",
    link: "https://arcane-gen.onrender.com",
    type: "WEB APPLICATION",
  },
  {
    title: "AUDITSMARTAI",
    preview: "AI-powered smart contract auditing tool",
    description:
      "AI-powered tool that analyzes Solidity contracts for vulnerabilities and security issues.",
    company: "LayerOneX, Australia",
    year: "2025",
    tags: ["AI", "BLOCKCHAIN", "SECURITY"],
    img: "/projects/auditsmartai.png",
    link: "https://auditsmartai.xyz/",
    type: "WEBSITE",
  },
  {
    title: "EDUCERT",
    preview: "Decentralized certificate issuance & verification platform",
    description:
      "Decentralized certificate platform where institutions approve certificates and students mint them as NFTs.",
    company: "Independent Project",
    year: "2025",
    tags: ["WEB3", "NFT", "BLOCKCHAIN"],
    img: "/projects/educert.png",
    link: "https://educert25.onrender.com",
    type: "WEB APPLICATION",
  },
  {
    title: "LLS AUDIT APP",
    preview: "Auditing workflow management system",
    description:
      "Audit management system for handling plans, observations, and action reports.",
    company: "LLS Coimbatore, India",
    year: "2025",
    tags: ["FULL STACK", "REACT", "NODE"],
    img: "/projects/lls.png",
    link: "https://llsamsystem.netlify.app/",
    type: "WEB APPLICATION",
  },
  {
    title: "SMART TRIBAL FARMING",
    preview: "Smart crop planning & transport pooling platform",
    description:
      "Agricultural platform providing crop recommendations and transport pooling.",
    company: "Independent Project",
    year: "2024",
    tags: ["AGRICULTURE", "REACT", "UI/UX"],
    img: "/projects/tribal.png",
    link: "https://smart-tribal-farming.onrender.com",
    type: "WEB APPLICATION",
  },
  {
    title: "GREEN WHEELS WEBSITE",
    preview: "Official business website",
    description:
      "Built and launched the official website for Green Wheels Supply Chain Solutions.",
    company: "GWSCS Coimbatore",
    year: "2023",
    tags: ["WEB DESIGN", "RESPONSIVE"],
    img: "/projects/greenwheels.png",
    link: "https://www.greenwheelscs.in/",
    type: "WEBSITE",
  },
  {
    title: "CHITFUND APP",
    preview: "Chit fund community mobile application",
    description:
      "Mobile application for chit fund communities with secure transactions.",
    company: "Coimbatore, India",
    year: "2025",
    tags: ["MOBILE", "FINTECH"],
    img: "/projects/chitfund.png",
    link: "#",
    type: "MOBILE APP",
  },
];

const ProjectLink = ({ project }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 120, damping: 20 });

  const top = useTransform(mouseY, [0.5, -0.5], ["45%", "55%"]);
  const left = useTransform(mouseX, [0.5, -0.5], ["60%", "70%"]);

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.a
      href={project.link}
      target={project.type !== "MOBILE APP" ? "_blank" : "_self"}
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={onMove}
      initial="initial"
      whileHover="hover"
      className="project-row"
    >
      <div>
        <motion.h3
          variants={{ initial: { x: 0 }, hover: { x: -16 } }}
          transition={{ type: "spring" }}
          className="project-title"
        >
          {project.title}
        </motion.h3>
        <p className="project-preview">{project.preview}</p>
      </div>

      <motion.img
        src={project.img}
        alt={project.title}
        style={{ top, left, translateX: "-50%", translateY: "-50%" }}
        variants={{ initial: { scale: 0 }, hover: { scale: 1 } }}
        transition={{ type: "spring" }}
        className="project-hover-img"
      />

      <motion.div
        variants={{ initial: { x: "25%", opacity: 0 }, hover: { x: 0, opacity: 1 } }}
        transition={{ type: "spring" }}
        className="project-arrow"
      >
        →
      </motion.div>
    </motion.a>
  );
};

const Projects = () => (
  <section id="projects" className="projects section">
    <div className="container">
      <h2 className="section-title projects-title">
        <ScrollFloat
          animationDuration={0.1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.05}
        >
          WORKS
        </ScrollFloat>
      </h2>

      <div className="projects-list">
        {projects.map((p, i) => (
          <ProjectLink key={i} project={p} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
