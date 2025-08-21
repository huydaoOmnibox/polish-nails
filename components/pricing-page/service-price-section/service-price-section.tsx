import { cn } from "@/utils/utils";
import SectionContainer, {
  SectionContainerProps,
} from "@/components/common/section-container";
import { fontManrope, fontPlayfairDisplay } from "@/config/fonts";

import ServiceImage, { ServiceImageProps } from "./service-image";
import PriceList from "./price-list";

const Title = ({ text }: { text: string }) => {
  return (
    <h2
      className={cn(
        "text-center text-4xl font-bold leading-[4.16625rem] text-[#422A3C] md:text-[3.125rem]",
        fontPlayfairDisplay.className
      )}
    >
      {text}
    </h2>
  );
};

const Description = ({
  className,
  text,
}: {
  className?: string;
  text: string;
}) => {
  return (
    <p
      className={cn(
        "relative z-20 text-center text-xl font-normal leading-[1.875rem] text-[#555]",
        fontManrope.className,
        className
      )}
    >
      {text}
    </p>
  );
};

type ServicePriceSectionProps = {
  title: string;
  description: string;
  services: { title: string; price: number | string }[];
  serviceImageProps: ServiceImageProps;
  imagePosition: "left" | "right";
  className?: string;
  sectionProps?: Pick<
    SectionContainerProps,
    "noiseBackground" | "decorations"
  > & { title?: string; description?: string };
};

const ServicePriceSection: React.FC<ServicePriceSectionProps> = (props) => {
  return (
    <SectionContainer {...props.sectionProps}>
      {props.sectionProps?.title && <Title text={props.sectionProps.title} />}

      {props.sectionProps?.description && (
        <Description
          className={cn(props.sectionProps.title && "mt-6")}
          text={props.sectionProps.description}
        />
      )}

      <div
        className={cn(
          "grid grid-cols-1 gap-16 bg-transparent lg:grid-cols-2",
          (props.sectionProps?.title || props.sectionProps?.description) &&
            "pt-[3.375rem]",
          props.className
        )}
      >
        <div
          className={cn("grid", {
            "order-2": props.imagePosition === "right",
            "order-1": props.imagePosition === "left",
          })}
        >
          <ServiceImage {...props.serviceImageProps} />
        </div>

        <PriceList
          className={cn({
            "order-1": props.imagePosition === "right",
            "order-2": props.imagePosition === "left",
          })}
          description={props.description}
          services={props.services}
          title={props.title}
        />
      </div>
    </SectionContainer>
  );
};

export default ServicePriceSection;
