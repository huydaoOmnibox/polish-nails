"use client";
import { motion } from "framer-motion";
import { ReactElement } from "react";

import { cn } from "@/utils/utils";
import { fontAbrilFatface } from "@/config/fonts";

type TProps = {
  icon: ReactElement<any, any>;
  title: string;
  delay: number;
};

export const CoreValueCard = ({ icon, title, delay }: TProps) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "mx-auto flex h-32 w-28 flex-col items-center justify-between rounded-[0.875rem] bg-white/60 pb-7 pt-10 md:h-[9.6875rem] md:w-[8.375rem]"
      )}
      initial={{ opacity: 0, y: 20 }}
      style={{ backdropFilter: "blur(9.6px)" }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
    >
      {icon}
      <p
        className={cn(
          "text-sm font-normal text-[#A37946]",
          fontAbrilFatface.className
        )}
      >
        {title}
      </p>
    </motion.div>
  );
};
