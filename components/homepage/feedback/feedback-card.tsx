import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Rating } from "react-simple-star-rating";

import { cn } from "@/utils/utils";
import { fontHelvetica, fontPlayfairDisplay } from "@/config/fonts";

export type Feedback = {
  customerName: string;
  avatar: string;
  rating: number;
  feedback: string;
};

type FeedbackCardProps = Feedback & {
  className?: string;
};

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  customerName,
  rating,
  feedback,
  avatar,
  className,
}) => {
  return (
    <Card
      className={cn(
        "min-h-[17.5rem] w-[23.75rem] cursor-pointer select-none bg-transparent pt-12 shadow-none",
        className
      )}
    >
      <CardBody
        className={cn(
          "flex w-full flex-col items-center gap-7 overflow-y-visible rounded-[1.125rem] bg-white p-0 px-10 pb-5 pt-10"
        )}
      >
        <div className="absolute -top-8 flex size-[4.7rem] items-center justify-center rounded-full bg-white">
          <div className="rounded-full shadow-lg shadow-[#e0d1b1]">
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
        </div>
        <div className="relative text-center md:contents">
          <div>
            <p
              className={cn(
                "text-[1.5625rem] font-bold leading-8 text-[#422A3C]",
                fontPlayfairDisplay.className
              )}
            >
              {customerName}
            </p>
            <p
              className={cn(
                "mt-4 line-clamp-3 text-xl leading-[2.1875rem] text-[#5C5A5A]",
                fontHelvetica.className
              )}
            >
              {feedback}
            </p>
            <Rating
              readonly
              className={cn("mt-2 w-[6.4rem]")}
              emptyClassName="!flex items-center"
              fillClassName="!flex items-center"
              fillColor={"#F6973F"}
              initialValue={rating}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
