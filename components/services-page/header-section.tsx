"use client";

import React from "react";
import { motion } from "framer-motion";

import { fontImperialScript } from "@/config/fonts";
import { cn } from "@/utils/utils";

import { Button } from "../common/button";

function Title({ className }: { className?: string }) {
  return (
    <h1
      className={cn(
        "text-[9.375rem] font-bold leading-[1.21] text-[#6B0606]",
        fontImperialScript.className,
        className
      )}
    >
      Services
    </h1>
  );
}

function HeaderSection() {
  return (
    <div className="flex w-full flex-col items-center bg-[url(/images/services-header-bg.webp)] bg-cover bg-no-repeat pb-16 pt-[9.375rem]">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.8 }}
      >
        <Title />
        <Button
          className="border border-white bg-transparent bg-none"
          text="BOOKING"
        />
      </motion.div>
    </div>
  );
}

export default HeaderSection;
