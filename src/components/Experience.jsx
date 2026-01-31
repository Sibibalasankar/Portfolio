import React from "react";
import ScrollTimeline from "@/components/lightswind/scroll-timeline";

const events = [
  {
    year: "2022",
    title: "Administration",
    subtitle: "SRI Valves",
    description:
      "Managed administrative operations and supported daily business activities.",
  },
  {
    year: "2022",
    title: "App Development & Backend Engineering",
    subtitle: "Lakshmi Life Sciences",
    description:
      "Developed internal applications and backend systems using modern web technologies.",
  },
  {
    year: "2023",
    title: "Python Internship",
    subtitle: "Ascentz Technology",
    description:
      "Strengthened backend fundamentals and programming logic through Python development.",
  },
  {
    year: "2025",
    title: "Web Development Intern",
    subtitle: "Rinex Education",
    description:
      "Built full-stack web applications and learned industry workflows.",
  },
  {
    year: "2025",
    title: "GenAI Internship",
    subtitle: "Rinex Education",
    description:
      "Worked on Generative AI, Machine Learning, and Data Science projects.",
  },
];

const Experience = () => {
  return (
    <ScrollTimeline
      events={events}
      title="Career Journey"
      subtitle="Scroll to explore my professional growth"
      animationOrder="staggered"
      cardAlignment="alternating"
      progressIndicator={true}
      revealAnimation="fade"
      darkMode={true}
    />
  );
};

export default Experience;
