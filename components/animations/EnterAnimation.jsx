"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function EnterAnimation({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        scale: { type: "spring", duration: 0.4, bounce: 0.6 },
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
