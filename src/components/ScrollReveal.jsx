import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 1,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
}) => {
  const containerRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) =>
      word.trim() ? (
        <span className="word" key={index}>
          {word}
        </span>
      ) : (
        " "
      )
    );
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".word");

    scrollTriggerRef.current = gsap.fromTo(
      words,
      {
        opacity: baseOpacity,
        filter: enableBlur ? `blur(${blurStrength}px)` : "none",
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      }
    ).scrollTrigger;

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [enableBlur, baseOpacity, blurStrength]);

  return (
    <div ref={containerRef} className={containerClassName}>
      <p className={textClassName}>{splitText}</p>
    </div>
  );
};

export default ScrollReveal;
