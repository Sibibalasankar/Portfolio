import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealLinks from "./RevealLinks";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const scrollTextRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        infoRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        linksRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.6"
      );

    gsap.to(scrollTextRef.current, {
      y: "-100%",
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="contact" ref={contactRef} className="contact">
      {/* BACKGROUND SCROLL TEXT */}
      <div className="scrolling-talk-section">
        <div className="scrolling-text-container">
          <div ref={scrollTextRef} className="scrolling-text">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="talk-text">
                LET&apos;S TALK
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="contact-wrapper">
        <h2 ref={titleRef} className="contact-title">
          Let's work together
        </h2>

        <div className="contact-grid">
          {/* LEFT — INFO */}
          <div ref={infoRef} className="contact-info">
            <p className="contact-lead">
              I'm always excited to collaborate on meaningful products,
              creative ideas, and ambitious projects.
            </p>

            <div className="contact-details">
              <div>
                <span>Email</span>
                <a href="mailto:sibisbs5161@gmail.com">
                  sibisbs5161@gmail.com
                </a>
              </div>

              <div>
                <span>Location</span>
                <p>Coimbatore, India</p>
              </div>
            </div>
          </div>

          {/* RIGHT — LINKS */}
          <div ref={linksRef} className="contact-actions">
            <RevealLinks />
          </div>
        </div>

        <footer className="contact-footer">
          © 2026 SIBI B S — All rights reserved
        </footer>
      </div>
    </section>
  );
};

export default Contact;