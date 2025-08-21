"use client";
import { motion } from "framer-motion";

import { cn } from "@/utils/utils";
import { fontRaleway } from "@/config/fonts";

export function BannerSubtitle({ className }: { className?: string }) {
  return (
    <motion.p
      className={cn(
        "text-center text-[2.5rem] font-semibold italic leading-7",
        fontRaleway.className,
        className
      )}
      initial={{ opacity: 0, translateY: 30 }}
      transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
      whileInView={{ opacity: 1, translateY: 0 }}
    >
      Nail and Lashes
    </motion.p>
  );
}
