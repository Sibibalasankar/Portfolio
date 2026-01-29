// src/components/Contact.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef();
  const scrollTextRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo('.contact-title',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    ).fromTo('.contact-info',
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      "-=0.5"
    ).fromTo('.contact-links',
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      "-=0.5"
    );

    // Very slow infinite scroll animation for "Let's Talk!!"
    const scrollTl = gsap.timeline({ repeat: -1 });
    scrollTl.to(scrollTextRef.current, {
      y: '-100%',
      duration: 30, // Very slow duration - 30 seconds
      ease: "none"
    });
  }, []);

  return (
    <section id="contact" ref={contactRef} className="section contact">
      {/* Scrolling "Let's Talk!!" Section */}
      <div className="scrolling-talk-section">
        <div className="scrolling-text-container">
          <div ref={scrollTextRef} className="scrolling-text">
            <span className="talk-text">LET'S TALK!!</span>
            <span className="talk-text">LET'S TALK!!</span>
            <span className="talk-text">LET'S TALK!!</span>
            <span className="talk-text">LET'S TALK!!</span>
            <span className="talk-text">LET'S TALK!!</span>
            <span className="talk-text">LET'S TALK!!</span>
            <span className="talk-text">LET'S TALK!!</span>
            <span className="talk-text">LET'S TALK!!</span>
            <span className="talk-text">LET'S TALK!!</span>
            <span className="talk-text">LET'S TALK!!</span>
          </div>
        </div>
      </div>

      <div className="container">
        <h2 className="section-title contact-title">Get In Touch</h2>

        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-subtitle">Let's create something amazing together</h3>
            <p className="contact-description">
              I'm always open to discussing new opportunities, innovative projects,
              and creative ideas. Feel free to reach out if you want to collaborate!
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <strong>Email:</strong>
                <a href="mailto:sibisbs5161@gmail.com" className="clickable">sibisbs5161@gmail.com</a>
              </div>
              <div className="contact-detail">
                <strong>Location:</strong>
                <span>Coimbatore, India</span>
              </div>
              <div className="contact-detail">
                <strong>LinkedIn:</strong>
                <a href="https://www.linkedin.com/in/sibi-b-s-656b30264" target="_blank" rel="noopener noreferrer" className="clickable">
                  linkedin.com/in/sibi-b-s-656b30264
                </a>
              </div>
              <div className="contact-detail">
                <strong>GitHub:</strong>
                <a href="https://github.com/Sibibalasankar" target="_blank" rel="noopener noreferrer" className="clickable">
                  github.com/Sibibalasankar
                </a>
              </div>
            </div>
          </div>

          <div className="contact-links">
            <a href="mailto:sibisbs5161@gmail.com" className="contact-link clickable">
              <span>Send Email</span>
            </a>
            <a href="https://www.linkedin.com/in/sibi-b-s-656b30264" target="_blank" rel="noopener noreferrer" className="contact-link clickable">
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com/Sibibalasankar" target="_blank" rel="noopener noreferrer" className="contact-link clickable">
              <span>GitHub</span>
            </a>
            <a
              href="/Sibi_Resume.pdf"
              download="Sibi_Resume.pdf"
              className="contact-link clickable"
            >
              <span>Download Resume</span>
            </a>

          </div>
        </div>

        <div className="footer">
          <p>&copy; 2025 SIBI B S. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;