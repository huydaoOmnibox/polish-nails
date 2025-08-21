import React from "react";
import Image from "next/image";

import { cn } from "@/utils/utils";
import goldNuggets from "@/public/images/gold-nuggets.webp";

import { Star } from "./decorations";

type Decorations = {
  bottomLeftStar?: boolean;
  bottomRightStar?: boolean;
  goldNuggets?: boolean;
};

export type SectionContainerProps = {
  className?: string;
  decorations?: Decorations;
  children: React.ReactNode;
  noiseBackground?: boolean;
};

function SectionContainer({
  className,
  noiseBackground,
  children,
  decorations = {
    bottomLeftStar: false,
    bottomRightStar: false,
    goldNuggets: false,
  },
}: SectionContainerProps) {
  return (
    <section
      className={cn(
        "relative w-full bg-[#E0E0E0] px-4 pt-[3.375rem] md:px-24 xl:px-[10rem]",
        noiseBackground &&
          "bg-[url(/images/noise-gradient-bg.webp)] bg-cover bg-no-repeat",
        (decorations.bottomLeftStar || decorations.bottomRightStar) &&
          "border-b-2 border-white",
        className
      )}
    >
      {children}
      {decorations.goldNuggets && (
        <div className={cn("absolute right-0 top-0 z-10 w-[17.5%]")}>
          <Image alt="" src={goldNuggets} />
        </div>
      )}
      <div
        className={cn(
          "absolute bottom-0 z-10 hidden translate-y-[calc(50%+1px)]",
          decorations.bottomLeftStar &&
            "left-1/2 block -translate-x-1/2 md:left-[29rem]",
          decorations.bottomRightStar &&
            "right-1/2 block translate-x-1/2 md:right-[25.8rem]"
        )}
      >
        <Star />
      </div>
    </section>
  );
}

export default SectionContainer;
