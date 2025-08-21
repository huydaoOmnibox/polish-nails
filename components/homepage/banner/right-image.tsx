"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/utils/utils";

export function RightImage({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("overflow-hidden rounded-t-full bg-white", className)}
      initial={{ opacity: 0, translateX: 30 }}
      style={{
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
      }}
      transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
      whileInView={{ opacity: 1, translateX: 0 }}
    >
      <Image
        alt="Banner Right Image"
        height={315}
        src="/images/banner-right-img.webp"
        width={246}
      />
    </motion.div>
  );
}
