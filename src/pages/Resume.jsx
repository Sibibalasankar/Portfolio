// src/pages/Resume.jsx
import React, { useEffect, useState } from 'react';
import './Resume.css';

/* ── DATA ────────────────────────────────────────────── */
const skills = [
  { name: 'Python & ML',     level: 90 },
  { name: 'React / Next.js', level: 88 },
  { name: 'Node.js',         level: 84 },
  { name: 'Solidity / Web3', level: 82 },
  { name: 'MongoDB',         level: 78 },
  { name: 'Docker / DevOps', level: 72 },
];

const tools = [
  'PyTorch','TensorFlow','Three.js','GSAP','Hardhat','Ethers.js',
  'Express','Flask','Git','Linux','Tailwind','REST API',
];

const contactItems = [
  { icon: '✉', text: 'sibibs03@gmail.com' },
  { icon: '📍', text: 'Coimbatore, India' },
  { icon: '🔗', text: 'linkedin.com/in/sibi-b-s' },
  { icon: '⌥',  text: 'github.com/Sibibalasankar' },
];

const education = [
  { year: '2024 – PRESENT', deg: 'B.Tech — AI & Data Science',    inst: 'KGISL Institute of Technology',           score: 'CGPA: 9.01' },
  { year: '2021 – 2024',    deg: 'Diploma — Computer Engineering', inst: 'Sri Ranganathar Institute of Polytechnic', score: 'Score: 96%'  },
];

/* ── HELPERS ─────────────────────────────────────────── */
const SH = ({ children }) => <h2 className="rp-sh">{children}</h2>;

/* ── MAIN ────────────────────────────────────────────── */
const Resume = () => {
  const [barsReady, setBarsReady] = useState(false);

  // Trigger skill bar animation after mount
  useEffect(() => {
    const t = setTimeout(() => setBarsReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="rp-shell">

      {/* ── TOP BAR ── */}
      <div className="rp-bar">
        <div className="rp-bar-left">
          <span className="rp-bar-title">Sibi Balasankar · Resume</span>
          <span className="rp-bar-sub">AI · Blockchain · Full-Stack · 2025</span>
        </div>
        <a href="/Sibi_Resume.pdf" target="_blank" rel="noreferrer" className="rp-download">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Download PDF
        </a>
      </div>

      {/* ══════════════════════════════════
          PAPER
      ══════════════════════════════════ */}
      <div className="rp-paper">

        {/* ── LEFT SIDEBAR ── */}
        <aside className="rp-left">

          {/* Avatar block */}
          <div className="rp-avatar-wrap">
            <div className="rp-avatar">SB</div>
            <p className="rp-avatar-name">Sibi Balasankar</p>
            <p className="rp-avatar-role">AI & Blockchain Engineer</p>
          </div>

          {/* Contact */}
          <div>
            <p className="rp-sl">Contact</p>
            {contactItems.map(c => (
              <div className="rp-contact-item" key={c.text}>
                <span className="rp-contact-icon">{c.icon}</span>
                <span className="rp-contact-text">{c.text}</span>
              </div>
            ))}
          </div>

          {/* Core Skills */}
          <div>
            <p className="rp-sl">Core Skills</p>
            {skills.map(s => (
              <div className="rp-skill-item" key={s.name}>
                <div className="rp-skill-name">
                  {s.name}
                  <span className="rp-skill-pct">{s.level}%</span>
                </div>
                <div className="rp-skill-bar">
                  <div
                    className="rp-skill-fill"
                    style={{ width: barsReady ? `${s.level}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div>
            <p className="rp-sl">Tools & Frameworks</p>
            <div className="rp-tags">
              {tools.map(t => <span className="rp-tag" key={t}>{t}</span>)}
            </div>
          </div>

          {/* Education */}
          <div>
            <p className="rp-sl">Education</p>
            {education.map(e => (
              <div className="rp-edu-item" key={e.year}>
                <p className="rp-edu-year">{e.year}</p>
                <p className="rp-edu-deg">{e.deg}</p>
                <p className="rp-edu-inst">{e.inst}</p>
                <span className="rp-badge">{e.score}</span>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div>
            <p className="rp-sl">Languages</p>
            {[{ l: 'English', v: 'Professional' }, { l: 'Tamil', v: 'Native' }].map(x => (
              <div className="rp-lang-item" key={x.l}>
                <span className="rp-lang-name">{x.l}</span>
                <span className="rp-lang-lvl">{x.v}</span>
              </div>
            ))}
          </div>

        </aside>

        {/* ── RIGHT MAIN ── */}
        <main className="rp-right">

          {/* Header */}
          <div className="rp-section">
            <h1 className="rp-name">Sibi Balasankar</h1>
            <p className="rp-role">AI &amp; Blockchain Engineer · Full-Stack Developer</p>
            <div className="rp-header-line" />
            <p className="rp-summary">
              Generative AI, Blockchain DApp, and Full-Stack Web Developer with expertise in building
              intelligent applications, integrating AI models, and developing secure smart contracts.
              Specialized in scalable architecture and delivering practical solutions for real-world challenges.
              Passionate about the intersection of machine intelligence and decentralized systems.
            </p>
          </div>

          {/* Experience */}
          <div className="rp-section">
            <SH>Work Experience</SH>

            <div className="rp-exp-block">
              <div className="rp-exp-top">
                <span className="rp-exp-company">SelsoftInc</span>
                <span className="rp-exp-period">2025 – Present · USA (Remote)</span>
              </div>
              <p className="rp-exp-title">Full Stack Intern</p>
              <ul className="rp-bullets">
                <li>Developing and maintaining enterprise-level web applications using MERN stack and modern cloud solutions.</li>
                <li>Collaborating with cross-functional teams to implement scalable backend architectures and responsive frontend interfaces.</li>
                <li>Optimizing application performance and ensuring high-quality code through rigorous testing and review.</li>
              </ul>
            </div>

            <div className="rp-exp-block">
              <div className="rp-exp-top">
                <span className="rp-exp-company">Lakshmi Life Sciences</span>
                <span className="rp-exp-period">2025 · Coimbatore</span>
              </div>
              <p className="rp-exp-title">App Development & Backend Engineering</p>
              <ul className="rp-bullets">
                <li>Designed and shipped a full-featured Digital Audit System, replacing manual paper-based pharmaceutical workflows.</li>
                <li>Built REST API backend with role-based access control, improving operational efficiency by over 96%.</li>
                <li>Architected MongoDB schemas and an admin dashboard for cross-departmental audit reporting.</li>
              </ul>
            </div>

            <div className="rp-exp-block">
              <div className="rp-exp-top">
                <span className="rp-exp-company">SRI Valves & Co</span>
                <span className="rp-exp-period">2022 · Coimbatore</span>
              </div>
              <p className="rp-exp-title">Administrator</p>
              <ul className="rp-bullets">
                <li>Managed backend data systems for an industrial valve manufacturing operation.</li>
                <li>Digitised manual administrative workflows, reducing overhead and improving process visibility.</li>
              </ul>
            </div>
          </div>

          {/* Projects */}
          <div className="rp-section">
            <SH>Key Projects</SH>

            <div className="rp-exp-block">
              <div className="rp-exp-top">
                <span className="rp-exp-company">AuditSmart AI</span>
                <span className="rp-exp-period">AI · Node.js · MongoDB</span>
              </div>
              <p className="rp-exp-title">Intelligent Enterprise Audit System</p>
              <ul className="rp-bullets">
                <li>AI-powered audit management with automated anomaly detection using ML pipelines.</li>
                <li>Reduced manual audit time by 80% via intelligent document processing.</li>
              </ul>
            </div>

            <div className="rp-exp-block">
              <div className="rp-exp-top">
                <span className="rp-exp-company">Swap Saga</span>
                <span className="rp-exp-period">Solidity · Hardhat · Ethers.js</span>
              </div>
              <p className="rp-exp-title">Decentralized Token Swap Protocol</p>
              <ul className="rp-bullets">
                <li>Ethereum-based DEX with smart contract liquidity pools and a full Hardhat test suite.</li>
                <li>Integrated Ethers.js frontend for gas-optimised, seamless token swaps.</li>
              </ul>
            </div>

            <div className="rp-exp-block">
              <div className="rp-exp-top">
                <span className="rp-exp-company">EduCert</span>
                <span className="rp-exp-period">Hyperledger · React</span>
              </div>
              <p className="rp-exp-title">Blockchain Certificate Verification</p>
              <ul className="rp-bullets">
                <li>Immutable credential issuance and QR-code verification system on Hyperledger Fabric.</li>
                <li>Prevents credential fraud with on-chain hashing and instant public verification.</li>
              </ul>
            </div>
          </div>

          {/* Achievements */}
          <div className="rp-section">
            <SH>Achievements</SH>
            <div className="rp-ach-grid">
              {[
                { icon:'🏆', t:'Best Paper Award',  s:'KGCAS STF Project Expo' },
                { icon:'🥇', t:'1st Prize',          s:'National Technical Symposium' },
                { icon:'🥈', t:'2nd Place Web Dev', s:'Infest Competition' },
                { icon:'🥇', t:'1st Place Paper',   s:'Technical Presentation' },
                { icon:'🥈', t:'2nd Prize Expo',    s:'Polyfest Project Expo' },
              ].map(a => (
                <div className="rp-ach-pill" key={a.t}>
                  <span className="rp-ach-icon">{a.icon}</span>
                  <div>
                    <span className="rp-ach-title">{a.t}</span>
                    <span className="rp-ach-sub">{a.s}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Resume;