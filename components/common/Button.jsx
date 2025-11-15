"use client";

import { motion } from "framer-motion";

export function Button({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pointer-events-auto";

  let variantClass = "";
  switch (variant) {
    case "destructive":
      variantClass =
        "bg-destructive text-destructive-foreground hover:bg-destructive/90";
      break;
    case "outline":
      variantClass =
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
      break;
    case "primary":
      variantClass =
        "bg-[var(--color-accent)] text-secondary-foreground hover:bg-[var(--color-accent)]/80";
      break;
      break;
    case "secondary":
      variantClass =
        "bg-secondary text-secondary-foreground hover:bg-secondary/80";
      break;
    case "ghost":
      variantClass = "hover:bg-accent hover:text-accent-foreground";
      break;
    case "link":
      variantClass = "text-primary underline-offset-4 hover:underline !h-0";
      break;
    case "glass":
      variantClass = "glass-card text-foreground hover:bg-primary/20";
      break;

    default:
      variantClass =
        "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50";
  }

  let sizeClass = "";
  switch (size) {
    case "xs":
      sizeClass = "h-7 rounded-md px-2";
      break;
    case "sm":
      sizeClass = "h-9 rounded-md px-3";
      break;
    case "md":
      sizeClass = "h-10 rounded-md px-3";
      break;
    case "lg":
      sizeClass = "h-11 rounded-md px-8";
      break;
    case "icon":
      sizeClass = "h-10 w-10";
      break;
    default:
      sizeClass = "h-10 px-2 lg:px-4 py-2";
  }

  const classes = `${baseStyles} ${variantClass} ${sizeClass} ${className}`;

  return (
    <motion.button
      initial={{ scale: 0.95 }}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  );
}
