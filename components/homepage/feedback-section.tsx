"use client";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Rating } from "react-simple-star-rating";
import { EmblaOptionsType } from "embla-carousel";
import React from "react";

import Carousel, { CarouselItem } from "@/components/common/carousel";
import { fontManrope, fontPlayfairDisplay } from "@/config/fonts";
import { cn } from "@/utils/utils";

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

type Feedback = {
  customerName: string;
  avatar: string;
  rating: number;
  feedback: string;
};

type FeedbackCardProps = Feedback & {
  className?: string;
};

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  customerName,
  rating,
  feedback,
  avatar,
  className,
}) => {
  return (
    <Card
      className={cn(
        "min-h-[17.5rem] w-[23.75rem] flex-1 cursor-pointer bg-transparent pt-12 shadow-none",
        className
      )}
    >
      <CardBody
        className={cn(
          "flex w-full flex-col items-center gap-7 overflow-y-visible rounded-[1.25rem] bg-white p-0 px-10 pb-12"
        )}
      >
        <div className="absolute -top-8 flex size-[4.1875rem] items-center justify-center rounded-full bg-white">
          <Image
            alt="Customer avatar"
            className="object-cover object-top"
            height={57}
            loading="lazy"
            radius="full"
            src={avatar}
            width={57}
          />
        </div>
        <div className="md:contents">
          <div className="flex items-center gap-6 md:contents">
            <div className="shrink-0" />
            <div className={cn("grow")}>
              <p
                className={cn(
                  "text-[1.875rem] font-bold leading-10 text-[#422A3C]",
                  fontPlayfairDisplay.className
                )}
              >
                {customerName}
              </p>
              <Rating
                readonly
                className={cn("mt-2 w-[6.4rem]")}
                emptyClassName="!flex items-center"
                fillClassName="!flex items-center"
                fillColor={"#F6973F"}
                initialValue={rating}
              />
              <p
                className={cn(
                  "mt-4 line-clamp-3 hidden text-xl leading-[2.1875rem] text-[#5C5A5A] md:block"
                )}
              >
                {feedback}
              </p>
            </div>
          </div>
          <p
            className={cn(
              "mt-4 line-clamp-3 block text-xl leading-[2.1875rem] text-[#5C5A5A] md:hidden"
            )}
          >
            {feedback}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

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
            className="flex-[0_0_100%] pl-[3.875rem] min-[1440px]:flex-[0_0_33%]"
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
