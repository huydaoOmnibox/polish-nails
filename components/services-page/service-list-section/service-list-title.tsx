"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/utils/utils";
import { fontPlayfairDisplay } from "@/config/fonts";

export type ServiceListTitleProps = {
  title: string;
};

function ServiceListTitle({ title }: ServiceListTitleProps) {
  return (
    <motion.h2
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "flex items-center gap-5 text-3xl font-extrabold leading-8 text-[#422A3C]",
        fontPlayfairDisplay.className
      )}
      initial={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <span>
        <Image
          alt=""
          height={61}
          src="/images/service-title-start-icon.webp"
          width={61}
        />
      </span>
      {title}
    </motion.h2>
  );
}

export default ServiceListTitle;
