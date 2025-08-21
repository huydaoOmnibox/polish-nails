import Image, { StaticImageData } from "next/image";

import { cn } from "@/utils/utils";
import { fontMontserrat } from "@/config/fonts";

export type OurServiceProps = {
  image: StaticImageData | string;
  title: string;
  description: string;
  className?: string;
};

export function OurServiceCard({
  image,
  title,
  description,
  className,
}: OurServiceProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center border-b border-solid border-[#CDA582] pb-6 text-center md:text-sm lg:text-base",
        className,
        fontMontserrat.className
      )}
    >
      <div className={cn("flex items-center justify-center")}>
        <Image
          alt={title}
          className="aspect-[101/109] h-auto w-[12.625rem] rounded-[0.3125rem] object-cover"
          src={image}
        />
      </div>
      <div
        className={cn(
          "mt-[1.5625rem] text-[1.25em] font-extrabold leading-8 text-[#422A3C] drop-shadow-lg"
        )}
      >
        {title}
      </div>
      <p
        className={cn(
          "mt-2 font-semibold leading-[1.5625rem] text-[#A27758] drop-shadow-md lg:text-[0.875em] xl:text-[1em]"
        )}
      >
        {description}
      </p>
    </div>
  );
}
