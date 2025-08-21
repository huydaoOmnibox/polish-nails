"use client";
import { motion } from "framer-motion";

import { cn } from "@/utils/utils";
import { fontPlayfairDisplay } from "@/config/fonts";

export function BannerTitle({ className }: { className?: string }) {
  return (
    <motion.h1
      className={cn(
        "flex flex-col items-center justify-center gap-4 text-center text-[6.3rem] font-black italic leading-[6rem] tracking-[0.03em] md:mb-3 md:flex-row md:leading-[10rem]",
        fontPlayfairDisplay.className,
        className
      )}
      initial={{ opacity: 0, translateY: 30 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      whileInView={{ opacity: 1, translateY: 0 }}
    >
      <span>Chic</span>
      <span>&</span>
      <span>Simple</span>
    </motion.h1>
  );
}
