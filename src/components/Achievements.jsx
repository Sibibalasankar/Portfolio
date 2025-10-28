// src/components/Achievements.jsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Achievements.css';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const achievementsRef = useRef();
  const horizontalContainerRef = useRef();
  const horizontalSectionRef = useRef();
  const titleRef = useRef();
  const [currentAchievement, setCurrentAchievement] = useState(0);
  const [isInView, setIsInView] = useState(false);

  // Professional achievements data
  const achievements = useMemo(() => [
    {
      title: "Best Paper Award",
      event: "Smart Tribal Farming Expo - KGCAS",
      description: "Awarded Best Paper Award for showcasing an innovative and well-executed project at the KGCAS STF Project Expo. Recognized for outstanding research methodology and technical innovation.",
      linkedin: "https://linkedin.com/posts/your-linkedin-post-1",
      image: "/api/placeholder/600/300",
    },
    {
      title: "National Level 1st Prize",
      event: "Technical Symposium - SSEC College",
      description: "Secured 1st prize at national-level technical symposium for presenting an innovative project with exceptional technical execution and comprehensive solution architecture.",
      linkedin: "https://linkedin.com/posts/your-linkedin-post-2",
      image: "/api/placeholder/600/300",
    },
    {
      title: "Technical Paper 1st Place",
      event: "Paper Presentation - SRIP College",
      description: "Achieved 1st place by presenting a well-researched technical paper demonstrating deep expertise and innovative solutions in the field of study.",
      linkedin: "https://linkedin.com/posts/your-linkedin-post-3",
      image: "/api/placeholder/600/300",
    },
    {
      title: "Web Development Award",
      event: "Infest Competition - INFO College",
      description: "Awarded 2nd place for developing an innovative and functional web solution that demonstrated superior user experience and technical robustness.",
      linkedin: "https://linkedin.com/posts/your-linkedin-post-4",
      image: "/api/placeholder/600/300",
    },
    {
      title: "Project Expo Recognition",
      event: "Polyfest Project Expo - SRE College",
      description: "Recognized with 2nd prize for showcasing an innovative and well-executed project that demonstrated technical excellence and practical implementation.",
      linkedin: "https://linkedin.com/posts/your-linkedin-post-5",
      image: "/api/placeholder/600/300",
    }
  ], []);

  useEffect(() => {
    // Title animation
    gsap.fromTo(titleRef.current, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Progress indicator visibility
    ScrollTrigger.create({
      trigger: achievementsRef.current,
      start: "top 70%",
      end: "bottom 30%",
      onEnter: () => setIsInView(true),
      onLeave: () => setIsInView(false),
      onEnterBack: () => setIsInView(true),
      onLeaveBack: () => setIsInView(false)
    });

    // Horizontal scroll animation
    const horizontalScroll = gsap.to(horizontalContainerRef.current, {
      x: () => {
        const container = horizontalContainerRef.current;
        const section = horizontalSectionRef.current;
        if (!container || !section) return 0;
        
        const containerWidth = container.scrollWidth;
        const sectionWidth = section.offsetWidth;
        return -(containerWidth - sectionWidth);
      },
      ease: "none",
      scrollTrigger: {
        trigger: horizontalSectionRef.current,
        start: "top top",
        end: "+=400%",
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const achievementIndex = Math.floor(progress * achievements.length);
          setCurrentAchievement(achievementIndex);
        }
      }
    });

    // Individual card animations
    achievements.forEach((_, index) => {
      gsap.fromTo(`.horizontal-achievement:nth-child(${index + 1})`,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: `.horizontal-achievement:nth-child(${index + 1})`,
            start: "left 90%",
            end: "left 20%",
            toggleActions: "play none none reverse",
            containerAnimation: horizontalScroll
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [achievements]);

  const scrollToAchievement = (index) => {
    if (horizontalContainerRef.current) {
      const slideWidth = window.innerWidth * 0.9 + 64; // card width + gap
      horizontalContainerRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="achievements" ref={achievementsRef} className="section achievements">
      {/* ACHIEVEMENTS TITLE */}
      <div className="achievements-title-container" ref={titleRef}>
        <h2 className="achievements-main-title">Achievements & Awards</h2>
        <p className="achievements-subtitle">Recognitions and accomplishments throughout my journey</p>
      </div>

      <div className="achievements-container">
        <div 
          ref={horizontalSectionRef}
          className="achievements-horizontal-section"
        >
          <div 
            ref={horizontalContainerRef}
            className="horizontal-scroll-container"
          >
            {achievements.map((achievement, index) => (
              <div key={index} className="horizontal-achievement">
                <div className="section-counter">
                  {String(index + 1).padStart(2, '0')} / {String(achievements.length).padStart(2, '0')}
                </div>

                <h3 className="achievement-title">{achievement.title}</h3>
                <div className="achievement-event">{achievement.event}</div>
                
                <div className="achievement-image">
                  <div className="image-placeholder">
                    Achievement Documentation
                  </div>
                </div>
                
                <p className="achievement-description">{achievement.description}</p>
                
                <a 
                  href={achievement.linkedin} 
                  className="achievement-linkedin-link clickable"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <span>View on LinkedIn</span>
                  <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Progress Indicator - Only shows when in section */}
        <div className={`progress-indicator ${isInView ? 'visible' : 'hidden'}`}>
          <div className="progress-text">Achievements</div>
          <div className="progress-dots">
            {achievements.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${currentAchievement === index ? 'active' : ''}`}
                onClick={() => scrollToAchievement(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;