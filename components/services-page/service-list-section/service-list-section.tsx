import React from "react";

import SectionContainer, {
  SectionContainerProps,
} from "@/components/common/section-container";

import ServiceCard, { ServiceCardProps } from "./service-card";
import ServiceListTitle from "./service-list-title";

type ServiceListProps = {
  serviceTitle: string;
  services: ServiceCardProps[];
  sectionProps?: Pick<SectionContainerProps, "noiseBackground" | "decorations">;
};

const ServiceListSection: React.FC<ServiceListProps> = ({
  serviceTitle,
  services,
  sectionProps,
}) => {
  return (
    <SectionContainer {...sectionProps}>
      <div className="flex flex-col gap-12 pb-24">
        <ServiceListTitle title={serviceTitle} />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              animationDelay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};

export default ServiceListSection;
