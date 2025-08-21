import { Image } from "@nextui-org/image";
import React from "react";

import { cn } from "@/utils/utils";

export type ServiceImageProps = {
  width?: number;
  height?: number;
  alt: string;
  src: string;
  className?: string;
};

const ServiceImage: React.FC<ServiceImageProps> = ({
  width,
  height,
  alt,
  src,
  className,
}) => {
  return (
    <Image
      alt={alt}
      className={cn("hidden h-full w-full object-cover lg:block", className)}
      height={height}
      src={src}
      width={width}
    />
  );
};

export default ServiceImage;
