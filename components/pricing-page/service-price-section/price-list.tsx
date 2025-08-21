"use client";

import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/utils/utils";
import {
  fontManrope,
  fontMontserrat,
  fontPlayfairDisplay,
} from "@/config/fonts";

import { BookingButton } from "./booking-button";

type PriceListProps = {
  title: string;
  description: string;
  services: { title: string; price: number | string }[];
  className?: string;
};

function PriceList({
  title,
  description,
  services,
  className,
}: PriceListProps) {
  return (
    <div className={cn("flex flex-col items-start pb-10", className)}>
      <h3
        className={cn(
          "text-3xl font-extrabold leading-8 text-[#422A3C] md:text-[2.5rem]",
          fontPlayfairDisplay.className
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "mt-5 text-[0.9375rem] font-normal leading-[1.875rem] text-[#555]",
          fontManrope.className
        )}
      >
        {description}
      </p>
      <ul className={cn("mt-7 w-full space-y-6")}>
        {services.map((service, index) => (
          <motion.li
            key={index}
            className={cn(
              "flex items-end text-base leading-none text-[#422A3C]",
              'after:shrink-1 after:order-2 after:h-[4px] after:grow after:basis-1/5 after:bg-[radial-gradient(circle,#FFF_1px,transparent_1.5px)] after:bg-[length:1ex_4px] after:bg-bottom after:content-[""]',
              fontMontserrat.className
            )}
            initial={{ opacity: 0, y: 20 }}
            style={{
              backgroundRepeat: "space no-repeat",
            }}
            transition={{ duration: 0.25, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className={cn("shrink-1 order-1 w-max pr-2 font-bold")}>
              {service.title}
            </span>
            <span className="order-3 ml-auto shrink-0 self-end pl-2 tabular-nums">{`${service.price} CHF`}</span>
          </motion.li>
        ))}
      </ul>
      <BookingButton className="mt-5 w-full" />
    </div>
  );
}

export default PriceList;
