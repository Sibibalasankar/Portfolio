import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Calendar } from "lucide-react";

const ScrollTimeline = ({
  events,
  title,
  subtitle,
  animationOrder = "staggered",
  cardAlignment = "alternating",
  progressIndicator = true,
  revealAnimation = "fade",
  parallaxIntensity = 0.12,
  progressLineWidth = 2,
  progressLineCap = "round",
  className = "",
}) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
  });

  const progressHeight = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "100%"]
  );

  useEffect(() => {
    const unsub = scrollYProgress.onChange((v) => {
      const idx = Math.floor(v * events.length);
      if (idx !== activeIndex) setActiveIndex(idx);
    });
    return () => unsub();
  }, [scrollYProgress, events.length, activeIndex]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full bg-black text-white ${className}`}
    >
      {/* Header */}
      <div className="text-center py-20 px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
        <p className="text-gray-400 max-w-xl mx-auto">{subtitle}</p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto px-4 pb-24">
        {/* Center line */}
        <div
          className="absolute left-1/2 top-0 h-full"
          style={{
            width: progressLineWidth,
            transform: "translateX(-50%)",
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)",
          }}
        />

        {/* Progress line + dot */}
        {progressIndicator && (
          <>
            <motion.div
              className="absolute left-1/2 top-0"
              style={{
                width: progressLineWidth,
                height: progressHeight,
                transform: "translateX(-50%)",
                borderRadius: progressLineCap === "round" ? "999px" : "0",
                background: "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.7))",
                boxShadow: "0 0 8px rgba(255,255,255,0.5)",
              }}
            />

            <motion.div
              className="absolute left-1/2 z-20"
              style={{
                top: progressHeight,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-4 h-4 rounded-full bg-white/95 backdrop-blur-sm shadow-[0_0_12px_2px_rgba(255,255,255,0.8)] ring-2 ring-white/40" />
            </motion.div>
          </>
        )}

        {/* Events */}
        <div className="relative z-10">
          {events.map((event, index) => {
            const yOffset = useTransform(
              smoothProgress,
              [0, 1],
              [parallaxIntensity * 70, -parallaxIntensity * 70]
            );

            // ✅ FIXED alignment + narrower cards
            const desktopAlign =
              cardAlignment === "alternating"
                ? index % 2 === 0
                  ? "lg:pr-12 lg:mr-[50%]"
                  : "lg:pl-12 lg:ml-[50%]"
                : cardAlignment === "left"
                  ? "lg:pr-12 lg:mr-[50%]"
                  : "lg:pl-12 lg:ml-[50%]";

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: revealAnimation === "fade" ? 40 : 0,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay:
                    animationOrder === "staggered"
                      ? index * 0.15
                      : 0,
                }}
                viewport={{ once: false }}
                style={{ y: yOffset }}
                className={`
                  relative mb-14
                  w-full
                  lg:w-[38%]
                  mx-auto
                  ${desktopAlign}
                `}
              >
                {/* Glassomorphic Card */}
                <div className="
                  relative
                  bg-gradient-to-br from-white/10 to-white/5
                  backdrop-blur-xl
                  border border-white/20
                  rounded-2xl
                  p-5 md:p-6
                  shadow-2xl
                  shadow-black/30
                  before:absolute before:inset-0
                  before:bg-gradient-to-br before:from-white/5 before:to-transparent
                  before:rounded-2xl
                  before:-z-10
                  hover:border-white/30
                  transition-all duration-300
                  hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)]
                  hover:-translate-y-1
                ">
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />

                  {/* Card content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm">
                        <Calendar size={16} className="text-white/90" />
                      </div>
                      <span className="text-sm font-semibold text-white/95">
                        {event.year}
                      </span>
                    </div>
                    <h3
                      className="timeline-shiny-title text-lg md:text-xl font-bold mb-1"
                      data-text={event.title}
                    >
                      {event.title}
                    </h3>


                    {event.subtitle && (
                      <p className="text-sm text-white/70 mb-3">
                        {event.subtitle}
                      </p>
                    )}

                    <p className="text-sm leading-relaxed text-white/80">
                      {event.description}
                    </p>
                  </div>

                  {/* Connection dot to timeline */}
                  <div className={`
                    absolute top-1/2 -translate-y-1/2
                    w-3 h-3 rounded-full
                    bg-white/90 backdrop-blur-sm
                    shadow-[0_0_8px_rgba(255,255,255,0.6)]
                    ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}
                    ${cardAlignment === 'left' ? 'right-0 translate-x-1/2' : ''}
                    ${cardAlignment === 'right' ? 'left-0 -translate-x-1/2' : ''}
                    hidden lg:block
                  `} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ScrollTimeline;