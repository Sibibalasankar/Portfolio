import React, { useMemo, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardSwap, { Card } from './CardSwap';
import './Achievements.css';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const achievementsRef = useRef(null);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  // ✅ Prevent first-paint white flash
  const [ready, setReady] = useState(false);

  // Professional achievements data
  const achievements = useMemo(() => [
    {
      id: 1,
      title: "Best Paper Award",
      event: "Smart Tribal Farming Expo - KGCAS",
      description:
        "Awarded Best Paper Award for showcasing an innovative and well-executed project at the KGCAS STF Project Expo. Recognized for outstanding research methodology and technical innovation.",
      linkedin:
        "https://www.linkedin.com/posts/sibi-b-s-656b30264_smartfarming-ai-innovation-activity-7378811811011227648-9JbD",
      date: "2023",
      category: "Academic Excellence",
      icon: "🏆",
    },
    {
      id: 2,
      title: "National Level 1st Prize",
      event: "Technical Symposium - SSEC College",
      description:
        "Secured 1st prize at national-level technical symposium for presenting an innovative project with exceptional technical execution and comprehensive solution architecture.",
      linkedin: "#",
      date: "2023",
      category: "Technical Competition",
      icon: "🥇",
    },
    {
      id: 3,
      title: "Technical Paper 1st Place",
      event: "Paper Presentation - SRIP College",
      description:
        "Achieved 1st place by presenting a well-researched technical paper demonstrating deep expertise and innovative solutions in the field of study.",
      linkedin: "#",
      date: "2022",
      category: "Research Excellence",
      icon: "📄",
    },
    {
      id: 4,
      title: "Web Development Award",
      event: "Infest Competition - INFO College",
      description:
        "Awarded 2nd place for developing an innovative and functional web solution that demonstrated superior user experience and technical robustness.",
      linkedin: "#",
      date: "2022",
      category: "Web Development",
      icon: "💻",
    },
    {
      id: 5,
      title: "Project Expo Recognition",
      event: "Polyfest Project Expo - SRE College",
      description:
        "Recognized with 2nd prize for showcasing an innovative and well-executed project that demonstrated technical excellence and practical implementation.",
      linkedin:
        "https://www.linkedin.com/posts/sibi-b-s-656b30264_innovation-firstprize-projectpresentation-activity-7378785626101493760-A6Bi",
      date: "2021",
      category: "Project Exhibition",
      icon: "✨",
    },
  ], []);

  // ✅ Ensure GPU layers are ready before paint
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setReady(true);
      });
    });
  }, []);

  useEffect(() => {
    // Title animation (opacity is OK here)
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // ❌ NO opacity animation on glass container
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 60 },
        {
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="achievements"
      ref={achievementsRef}
      className="section achievements"
    >
      {/* TITLE */}
      <div className="achievements-title-container" ref={titleRef}>
        <h2 className="achievements-main-title">Achievements & Awards</h2>
        <p className="achievements-subtitle">
          Recognitions and accomplishments throughout my journey
        </p>
      </div>

      {/* CARDS */}
      <div
        ref={containerRef}
        className="achievements-cards-container"
        style={{ opacity: ready ? 1 : 0 }} // ✅ hide until ready
      >
        <CardSwap
          width={750}
          height={450}
          cardDistance={20}
          verticalDistance={30}
          delay={4000}
          pauseOnHover={false}
          skewAmount={0}
          easing="linear"
        >
          {achievements.map((achievement) => (
            <Card key={achievement.id} customClass="achievement-card">
              <div className="card-content">
                {/* Header */}
                <div className="card-header">
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-meta">
                    <span className="achievement-category">
                      {achievement.category}
                    </span>
                    <span className="achievement-date">
                      {achievement.date}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <h3 className="card-title">{achievement.title}</h3>
                <div className="card-event">{achievement.event}</div>
                <p className="card-description">
                  {achievement.description}
                </p>

                {/* Footer */}
                <div className="card-footer">
                  <a
                    href={achievement.linkedin}
                    className="achievement-linkedin-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>View on LinkedIn</span>
                    <span className="link-arrow">→</span>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </section>
  );
};

export default Achievements;
