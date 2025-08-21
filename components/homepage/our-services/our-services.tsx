"use client";

import { motion } from "framer-motion";

import { cn } from "@/utils/utils";

import { OurServiceCard, OurServiceProps } from "./our-service-card";

export function OurServices({
  ourServices,
}: {
  ourServices: OurServiceProps[];
}) {
  const animations = [
    {
      initial: { opacity: 0, scale: 0.8, translateX: -50 },
      transition: { duration: 0.5, delay: 0, ease: "easeOut" },
      whileInView: { opacity: 1, scale: 1, translateX: 0 },
    },
    {
      initial: { opacity: 0, scale: 0.8, translateY: -50 },
      transition: { duration: 0.5, delay: 0.2, ease: "easeOut" },
      whileInView: { opacity: 1, scale: 1, translateY: 0 },
    },
    {
      initial: { opacity: 0, scale: 0.8, translateY: 50 },
      transition: { duration: 0.5, delay: 0.4, ease: "easeOut" },
      whileInView: { opacity: 1, scale: 1, translateY: 0 },
    },
    {
      initial: { opacity: 0, scale: 0.8, translateX: 50 },
      transition: { duration: 0.5, delay: 0.6, ease: "easeOut" },
      whileInView: { opacity: 1, scale: 1, translateX: 0 },
    },
  ];

  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4"
      )}
    >
      {ourServices.map((service, index) => (
        <motion.div
          key={index}
          initial={animations[index].initial}
          transition={animations[index].transition}
          whileInView={animations[index].whileInView}
        >
          <OurServiceCard
            className="mx-auto max-w-[17.5rem] xl:min-h-[30.1875rem] elephant1:min-h-[29.25rem]"
            description={service.description}
            image={service.image}
            title={service.title}
          />
        </motion.div>
      ))}
    </div>
  );
}
