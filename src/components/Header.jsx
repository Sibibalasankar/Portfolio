// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { StaggeredMenu } from "./StaggeredMenu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = [
    { label: "Certifications", ariaLabel: "View works", link: "/works" },
    { label: "Gallery", ariaLabel: "View gallery", link: "/gallery" },
    { label: "Resume", ariaLabel: "View resume", link: "/resume" },
  ];

  return (
    <>
      {/* DESKTOP NAV */}
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <nav className="nav">
          <Link to="/" className="brand-link">
            <img src="/title.png" alt="Logo" />
            <span>SIBI B S</span>
          </Link>

          <div className="nav-links">
            <Link to="/works">Certifications</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/resume" className="resume-btn">
              Resume
            </Link>
          </div>
        </nav>
      </header>

      {/* MOBILE STAGGERED MENU */}
      <div className="mobile-staggered-menu">
        <StaggeredMenu
          position="right"
          items={menuItems}
          displaySocials={false}
          displayItemNumbering
          menuButtonColor="#ffffff"
          openMenuButtonColor="#ffffff"
          changeMenuColorOnOpen
          colors={["#44a02c", "#38682c"]}
          logoUrl="/title.png"
          accentColor="#ffffff"
          isFixed   // 🔥 THIS IS REQUIRED
        />

      </div>
    </>
  );
};

export default Header;
