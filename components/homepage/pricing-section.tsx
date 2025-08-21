import Image from "next/image";
import React from "react";

import { cn } from "@/utils/utils";
import pricingRightImg from "@/public/images/pricing-right-img.webp";
import { fontMontserrat, fontPlayfairDisplay } from "@/config/fonts";

import { Button } from "../common/button";

function Title() {
  return (
    <h2
      className={cn(
        "text-left text-[2.5rem] font-semibold uppercase leading-[3.3325rem] text-[#422A3C]",
        fontPlayfairDisplay.className
      )}
    >
      Price
    </h2>
  );
}

function PriceList({
  priceList,
}: {
  priceList: { title: string; description: string; price: string | number }[];
}) {
  return (
    <div className={cn("flex flex-col gap-6")}>
      {priceList.map((item, index) => (
        <div
          key={index}
          className={cn(
            "flex flex-col text-[1.125rem] leading-[1.5rem] text-[#422A3C]"
          )}
        >
          <div className={cn("font-bold")}>{item.title}</div>
          <div className="line-clamp-2 flex items-center justify-between gap-10">
            {item.description}
            <span className="shrink-0 tabular-nums">{item.price} CHF</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function BookingButton() {
  return (
    <Button
      className="px-[2.2975rem] py-6 leading-[1.0625rem]"
      text="BOOKING"
    />
  );
}

function RightImage() {
  return (
    <div className={cn("ml-6 hidden aspect-[391/488] items-center md:flex")}>
      <Image
        alt={""}
        className={cn("")}
        height={488}
        src={pricingRightImg}
        width={391}
      />
    </div>
  );
}

function PricingSection({
  priceList,
}: {
  priceList: { title: string; description: string; price: string | number }[];
}) {
  return (
    <section
      className={cn(
        "relative w-full bg-[#E0E0E0] px-6 pb-12 pt-5 md:px-24 md:pb-20 xl:px-[13.875rem]",
        fontMontserrat.className
      )}
    >
      <div className={cn("flex w-full flex-row justify-between")}>
        <div
          className={cn(
            "w-full space-y-[1.8125rem] md:w-[29.375rem] md:pt-[4.3125rem]"
          )}
        >
          <Title />
          <PriceList priceList={priceList} />
          <BookingButton />
        </div>
        <RightImage />
      </div>
    </section>
  );
}

export default PricingSection;
