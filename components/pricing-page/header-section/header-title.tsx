"use client";

import { motion } from "framer-motion";

import { cn } from "@/utils/utils";
import { fontCorinthia, fontCormorantGaramond } from "@/config/fonts";

export const HeaderTitle = () => {
  return (
    <motion.h1
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "text-5xl font-semibold leading-[4.5rem] text-white md:text-[5rem]",
        fontCormorantGaramond.className
      )}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
    >
      REVEAL YOUR BEAUTY{" "}
      <span className={cn("font-normal", fontCorinthia.className)}>with</span>{" "}
      NAILSPA
    </motion.h1>
  );
};
