import React from "react";
import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.03;

const FlipLink = ({ children, href }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        relative block overflow-hidden whitespace-nowrap
        text-4xl sm:text-5xl md:text-6xl lg:text-7xl
        font-black uppercase tracking-wide text-white
      "
      style={{ lineHeight: 0.8 }}
    >
      {/* Top text */}
      <div>
        {children.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Bottom flipped text */}
      <div className="absolute inset-0">
        {children.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

const RevealLinks = React.forwardRef((_, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-col gap-6 items-end"
    >
      <FlipLink href="mailto:sibisbs5161@gmail.com">Email</FlipLink>
      <FlipLink href="https://www.linkedin.com/in/sibi-b-s-656b30264">
        LinkedIn
      </FlipLink>
      <FlipLink href="https://github.com/Sibibalasankar">
        GitHub
      </FlipLink>
      <FlipLink href="/Sibi_Resume.pdf">Resume</FlipLink>
    </div>
  );
});

export default RevealLinks;
