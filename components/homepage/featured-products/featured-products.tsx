"use client";

import { motion } from "framer-motion";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { cn } from "@/utils/utils";

export function FeaturedProducts({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 overflow-hidden md:grid-cols-3 md:grid-rows-2",
        className
      )}
    >
      <motion.div
        className="row-span-2 hidden md:block"
        initial={{ opacity: 0, scale: 0.8, translateX: -50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileInView={{ opacity: 1, scale: 1, translateX: 0 }}
      >
        <Image
          isZoomed
          alt="Featured Product 1"
          as={NextImage}
          className={cn("size-full rounded-l-[2rem] object-cover")}
          height={635}
          radius="none"
          src="/images/featured-product-1.webp"
          width={384.67}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, translateY: -50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileInView={{ opacity: 1, scale: 1, translateY: 0 }}
      >
        <Image
          isZoomed
          alt="Featured Product 2"
          as={NextImage}
          className={cn("size-full rounded-xl object-cover md:rounded-none")}
          height={304}
          radius="none"
          src="/images/featured-product-2.webp"
          width={384.67}
        />
      </motion.div>
      <motion.div
        className="grid content-end md:col-start-2 md:row-start-2"
        initial={{ opacity: 0, scale: 0.8, translateY: 50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileInView={{ opacity: 1, scale: 1, translateY: 0 }}
      >
        <Image
          isZoomed
          alt="Featured Product 3"
          as={NextImage}
          className={cn("size-full rounded-xl object-cover md:rounded-none")}
          height={304}
          radius="none"
          src="/images/featured-product-3.webp"
          width={384.67}
        />
      </motion.div>
      <motion.div
        className="md:col-start-3 md:row-start-1"
        initial={{ opacity: 0, scale: 0.8, translateX: 50, translateY: -50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileInView={{ opacity: 1, scale: 1, translateX: 0, translateY: 0 }}
      >
        <Image
          isZoomed
          alt="Featured Product 4"
          as={NextImage}
          className={cn(
            "size-full rounded-xl object-cover md:rounded-none md:rounded-tr-[2rem]"
          )}
          height={304}
          radius="none"
          src="/images/featured-product-4.webp"
          width={384.67}
        />
      </motion.div>
      <motion.div
        className="grid content-end md:col-start-3"
        initial={{ opacity: 0, scale: 0.8, translateX: 50, translateY: 50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileInView={{ opacity: 1, scale: 1, translateX: 0, translateY: 0 }}
      >
        <Image
          isZoomed
          alt="Featured Product 5"
          as={NextImage}
          className={cn(
            "size-full rounded-xl object-cover object-left md:rounded-none md:rounded-br-[2rem]"
          )}
          height={304}
          radius="none"
          src="/images/featured-product-5.webp"
          width={384.67}
        />
      </motion.div>
    </div>
  );
}
