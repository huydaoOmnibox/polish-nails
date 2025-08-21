import Image from "next/image";
import React from "react";

export type ServiceListTitleProps = {
  title: string;
};

function ServiceListTitle({ title }: ServiceListTitleProps) {
  return (
    <h2>
      <span>
        <Image alt="" src="/public/images/service-title-start-icon.webp" />
      </span>
      {title}
    </h2>
  );
}

export default ServiceListTitle;
