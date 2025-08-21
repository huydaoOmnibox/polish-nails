"use client";

import React from "react";
import { motion } from "framer-motion";

import { BookingButton as NewBookingButton } from "@/components/booking";
import { cn } from "@/utils/utils";

export function BookingButton({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, translateY: 30 }}
      transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
      whileInView={{ opacity: 1, translateY: 0 }}
    >
      <NewBookingButton 
        label="BOOK NOW" 
        size="lg"
        className="bg-[url(/images/button-bg.webp)] bg-cover bg-no-repeat px-[2.65rem] py-7 text-center text-sm font-bold uppercase leading-4 text-white rounded-full"
      />
    </motion.div>
  );
}
