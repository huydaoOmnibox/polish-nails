"use client";
import { EmblaOptionsType } from "embla-carousel";
import React from "react";
import Image from "next/image";

import Carousel, { CarouselItem } from "@/components/common/carousel";
import { fontManrope, fontPlayfairDisplay } from "@/config/fonts";
import { cn } from "@/utils/utils";
import {
  Feedback,
  FeedbackCard,
} from "@/components/homepage/feedback/feedback-card";

function Title({ className }: { className?: string }) {
  return (
    <h2
      className={cn(
        "text-center text-[2.8125rem] font-bold uppercase leading-[3.65625rem] -tracking-[1%]",
        fontPlayfairDisplay.className,
        className
      )}
    >
      Customer Feedback
    </h2>
  );
}

function Description({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "text-center text-xl font-normal leading-[1.875rem]",
        fontManrope.className,
        className
      )}
    >
      We love making your day special! Hear from our happy clients about their
      experiences at our spa. Your satisfaction inspires us.
    </p>
  );
}

function Feedbacks({
  className,
  feedbacks,
}: {
  className?: string;
  feedbacks: Feedback[];
}) {
  const OPTIONS: EmblaOptionsType = {
    dragFree: false,
    loop: true,
    slidesToScroll: "auto",
  };

  return (
    <div
      className={cn(
        "flex w-full flex-row justify-center gap-[3.875rem]",
        className
      )}
    >
      <Carousel containerClassName="-ml-[3.875rem]" options={OPTIONS}>
        {feedbacks.map((feedback, index) => (
          <CarouselItem
            key={index}
            className="flex-[0_0_100%] pl-[3.875rem] lg:flex-[0_0_50%] min-[1440px]:flex-[0_0_33%]"
          >
            <FeedbackCard {...feedback} />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
}

function FeedbackSection({ feedbacks }: { feedbacks: Feedback[] }) {
  return (
    <section className="relative flex w-full flex-col items-center justify-end px-8 pb-[6.25rem] pt-16 text-white md:px-[7.5rem]">
      <div className={cn("absolute left-0 top-0 z-0 h-full w-full")}>
        <Image
          alt="background"
          className="!size-full rounded-none object-cover"
          height={662}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1440px"
          src="/images/customer-feedback-bg.webp"
          width={1440}
        />
      </div>
      <Title className="relative" />
      <Description className="relative mt-2" />
      <Feedbacks className="mt-[4.375rem]" feedbacks={feedbacks} />
    </section>
  );
}

export default FeedbackSection;
