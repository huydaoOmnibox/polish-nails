"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";

import { cn } from "@/utils/utils";
import { fontMontserrat, fontPlayfairDisplay } from "@/config/fonts";

export type ServiceCardProps = {
  title: string;
  description: string;
  thumbnail: string;
  animationDelay?: number;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  thumbnail,
  animationDelay = 0,
}) => {
  return (
    <motion.div
      // add flip animation to the card
      animate={{
        transform: "rotateY(0deg)",
        opacity: 1,
      }}
      className="z-10"
      initial={{
        transform: "rotateY(180deg)",
        opacity: 0,
      }}
      transition={{
        duration: 0.8,
        delay: animationDelay,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
    >
      <Card
        className={cn(
          "mx-auto h-full w-full max-w-[17.1875rem] rounded-[1.5rem] border border-solid border-[#000]/[0.23]"
        )}
      >
        <CardHeader className="flex flex-col items-center p-0">
          <Image
            removeWrapper
            alt="thumbnail"
            className="aspect-[275/162] w-full rounded-none object-cover"
            height={162}
            src={thumbnail}
            width={275}
          />
        </CardHeader>

        <CardBody
          className={cn("overflow-hidden p-6", fontMontserrat.className)}
        >
          <div className={cn("mb-6 h-full")}>
            <h3 className="line-clamp-2 cursor-pointer text-base font-medium leading-6 hover:underline">
              {title}
            </h3>
            <p className="mb-auto line-clamp-4 text-sm font-normal leading-6">
              {description}
            </p>
          </div>
          <Button
            className={cn(
              "rounded-lg border border-solid border-[#A37946] bg-white px-8 py-4 text-base font-bold uppercase leading-5 text-[#A37946]",
              fontPlayfairDisplay.className
            )}
          >
            Book Now
          </Button>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
