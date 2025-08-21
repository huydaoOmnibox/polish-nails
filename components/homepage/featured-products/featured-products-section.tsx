import Image from "next/image";

import loopLine from "@/public/images/loop-line.webp";
import { cn } from "@/utils/utils";
import { fontManrope, fontPlayfairDisplay } from "@/config/fonts";

import { FeaturedProducts } from "./featured-products";

function Title({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-5")}>
      <Image alt="" height={27} loading="lazy" src={loopLine} width={106} />
      <h2
        className={cn(
          "max-w-[45rem] text-center text-[2.8125rem] font-semibold leading-[3.65625rem] text-[#422A3C]",
          fontPlayfairDisplay.className,
          className
        )}
      >
        We are Experienced in making you very Beautiful
      </h2>
    </div>
  );
}

function Description({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "text-center text-xl font-normal leading-[1.875rem] text-[#555]",
        fontManrope.className,
        className
      )}
    >
      Enhancing your natural beauty with expertise, we provide high-quality
      beauty services to help you feel confident and elegant. Whether it&apos;s
      your nails, eyebrows, or lashes, we create stunning looks tailored just
      for you. Let us bring out your best self!
    </p>
  );
}

function FeaturedProductsSection() {
  return (
    <section
      className={cn(
        "relative flex w-full items-center justify-center bg-[#E5E9EA] pb-[4.875rem] pt-[3.25rem]"
      )}
    >
      <div
        className={cn(
          "flex w-[90%] flex-col items-center justify-center xl:w-[83.33%]"
        )}
      >
        <Title />
        <Description className="mt-2" />
        <FeaturedProducts className="mt-10" />
      </div>
    </section>
  );
}
export default FeaturedProductsSection;
