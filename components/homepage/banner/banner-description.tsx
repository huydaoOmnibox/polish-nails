"use client";
import { motion } from "framer-motion";

import { cn } from "@/utils/utils";
import { fontRaleway } from "@/config/fonts";

export function BannerDescription({ className }: { className?: string }) {
  return (
    <motion.p
      className={cn(
        "text-center text-xl font-semibold italic leading-7",
        fontRaleway.className,
        className
      )}
      initial={{ opacity: 0, translateY: 30 }}
      transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
      whileInView={{ opacity: 1, translateY: 0 }}
    >
      Book now to upgrade your look
    </motion.p>
  );
}
