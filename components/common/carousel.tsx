import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { cn } from "@/utils/utils";

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type DotButtonPropType = ComponentPropsWithRef<"button">;

const DotButton: React.FC<DotButtonPropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

type CarouselItemPropType = ComponentPropsWithRef<"div">;

export const CarouselItem: React.FC<CarouselItemPropType> = (props) => {
  const { children, className, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn("flex min-w-0 items-center justify-center", className)}
      style={{ transform: "translate3d(0, 0, 0)" }}
    >
      {children}
    </div>
  );
};

type PropType = {
  options?: EmblaOptionsType;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

const Carousel: React.FC<PropType> = (props) => {
  const { className, containerClassName, options, children } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;

    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  return (
    <section className={cn("m-auto max-w-full", className)}>
      <div ref={emblaRef} className="overflow-hidden">
        <div
          className={cn("flex", containerClassName)}
          style={{ touchAction: "pan-y pinch-zoom" }}
        >
          {children}
        </div>
      </div>

      <div className="mt-[1.8rem] flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              aria-label={`Scroll to slide ${index + 1}`}
              className={cn(
                "relative size-[0.875rem] rounded-full bg-white",
                index === selectedIndex ? "bg-[#9A7A52]" : ""
              )}
              onClick={() => onDotButtonClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
