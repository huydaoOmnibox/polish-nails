import { BannerDescription } from "@/components/homepage/banner/banner-description";
import { BannerSubtitle } from "@/components/homepage/banner/banner-subtitle";
import { BannerTitle } from "@/components/homepage/banner/banner-title";
import { cn } from "@/utils/utils";

import { Shape1 } from "../../common/decorations";

import { BookingButton } from "./booking-button";
import { RightImage } from "./right-image";

function BannerSection() {
  return (
    <section className="relative flex w-full flex-col items-center justify-end pt-44 text-white">
      <div
        className={cn("absolute left-0 top-0 z-[1] size-full bg-[#483e2d]/75")}
      />
      <video
        autoPlay
        loop
        muted
        className="absolute left-0 top-0 z-0 size-full object-cover"
        src="/videos/banner-video.mp4"
      />
      <BannerTitle className="relative z-10 mb-10" />
      <BannerSubtitle className="relative z-10 mb-[5.6rem]" />
      <BannerDescription className="relative z-10 mb-7" />
      <BookingButton className="relative z-10 mb-14" />
      <div className="relative z-10">
        <Shape1 />
      </div>
      <RightImage className="absolute bottom-0 z-10 hidden lg:right-16 lg:block xl:right-[7.3rem]" />
    </section>
  );
}

export default BannerSection;
