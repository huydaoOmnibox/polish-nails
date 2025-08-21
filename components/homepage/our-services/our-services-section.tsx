import { cn } from "@/utils/utils";
import { fontMontserrat, fontPlayfairDisplay } from "@/config/fonts";
import { Shape2 } from "@/components/common/decorations";

import { OurServices } from "./our-services";
import { OurServiceProps } from "./our-service-card";

function Title({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center gap-[1.1875rem] bg-[url(/images/our-service-title-bg.webp),linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))] bg-cover bg-center px-6 py-16 bg-blend-overlay",
        "md:items-end md:pt-[5.9375rem]"
      )}
    >
      <h2
        className={cn(
          "text-center text-3xl font-bold uppercase leading-10 text-[#E7CCAE] md:text-right",
          fontPlayfairDisplay.className,
          className
        )}
      >
        Our service
      </h2>
      <p
        className={cn(
          "mt-2 text-center text-base leading-6 text-white md:text-right",
          fontMontserrat.className
        )}
      >
        Top-notch beauty care and relaxation just for you.
      </p>
      <Shape2 />
    </div>
  );
}

function OurServiceSection({
  ourServices,
}: {
  ourServices: OurServiceProps[];
}) {
  return (
    <section className="relative w-full bg-white md:grid md:grid-cols-4 xl:grid-cols-5">
      <Title />
      <div
        className={cn(
          "px-8 pb-[5.5rem] pt-12 lg:pl-10 lg:pr-[5.125rem]",
          "md:col-span-3 xl:col-span-4"
        )}
      >
        <OurServices ourServices={ourServices} />
      </div>
    </section>
  );
}

export default OurServiceSection;
