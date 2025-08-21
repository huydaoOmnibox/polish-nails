import React from "react";

import ServiceCard from "./service-card";
import ServiceListTitle, { ServiceListTitleProps } from "./service-list-title";

type ServiceListProps = {} & ServiceListTitleProps;

function ServiceList({ title }: ServiceListProps) {
  return (
    <div className="flex flex-col gap-12">
      <ServiceListTitle title={title} />
      <div className="flex gap-8">
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>
    </div>
  );
}

export default ServiceList;
