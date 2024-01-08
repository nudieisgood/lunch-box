import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";

import { useEffect, useRef } from "react";

const FadeIn = ({ children, delay, direction }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div ref={ref}>
      <AnimatePresence>
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              x: direction === "right" ? -100 : direction === "left" ? 100 : 0,
              y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
            },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
            },
          }}
          exit={{ opacity: 0 }}
          initial="hidden"
          animate={controls}
          transition={{
            duration: 0.8,
            type: "tween",
            delay: delay || 0,
            ease: [0.25, 0.25, 0.25, 0.75],
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FadeIn;
