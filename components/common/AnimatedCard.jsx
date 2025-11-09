"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function AnimatedCard({
  children,
  animation = "fade-up",
  className = "",
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
  });

  const variants = {
    "fade-up": { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    "fade-right": {
      hidden: { opacity: 0, x: -80 },
      visible: { opacity: 1, x: 0 },
    },
    "fade-left": {
      hidden: { opacity: 0, x: 80 },
      visible: { opacity: 1, x: 0 },
    },
    "fade-in": { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[animation]}
      initial="hidden"
      animate={controls}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
