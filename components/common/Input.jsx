"use client";

import { motion } from "framer-motion";
export default function Input({
  type,
  name,
  placeholder,
  value,
  onChange,
  required = true,
}) {
  return (
    <motion.input
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileFocus={{ scale: 1 }}
      animate={{ opacity: 1, y: 0 }}
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete="on"
      value={value}
      onChange={onChange}
      required={required}
      className=" w-full p-3 rounded-lg   text-foreground/90  backdrop-blur-sm  border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2   md:text-sm  pointer-events-auto"
    />
  );
}
