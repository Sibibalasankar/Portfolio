import { forwardRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const RotatingText = forwardRef(
  ({ texts, rotationInterval = 2000, className = "" }, ref) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const id = setInterval(() => {
        setIndex(i => (i + 1) % texts.length);
      }, rotationInterval);
      return () => clearInterval(id);
    }, [texts.length, rotationInterval]);

    return (
      <span className={className}>
        <AnimatePresence mode="wait">
          <motion.span
            key={texts[index]}
            initial={{ y: "40%", opacity: 0, scale: 0.98 }}
            animate={{ y: "0%", opacity: 1, scale: 1 }}
            exit={{ y: "-40%", opacity: 0, scale: 0.98 }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 320,
              mass: 0.6
            }}
            style={{ display: "inline-block" }}
          >
            {texts[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  }
);

RotatingText.displayName = "RotatingText";
export default RotatingText;
