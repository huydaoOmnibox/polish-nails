"use client";

import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/utils/utils";
import { Button } from "@/components/common/button";

export function BookingButton({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 30 }}
      transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, translateY: 0 }}
    >
      <Button
        className={cn("px-6 py-2 text-[0.75rem]", className)}
        text="BOOKING"
      />
    </motion.div>
  );
}
