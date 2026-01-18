// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="nav">

        {/* BRAND */}
        <div className="nav-brand">
          <a href="#home" className="brand-link">
            <img src="/title.png" alt="Logo" />
            <span>SIBI B S</span>
          </a>
        </div>

        {/* NAV LINKS (DESKTOP ONLY) */}
        <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Works</a>
          <a href="#experience" onClick={() => setIsMobileMenuOpen(false)}>Experience</a>
          <a href="#skills" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
          <a href="#achievements" onClick={() => setIsMobileMenuOpen(false)}>Achievements</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          <a
            href="/Sibi_Resume_edited.pdf"
            download="SibiBalasankar_Resume.pdf"
            className="download-btn"
          >
            Download CV
          </a>

        </div>

        {/* HAMBURGER (TABLET + MOBILE) */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </nav>
    </header>
  );
};

export default Header;
