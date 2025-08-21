import { HeaderSection } from "@/components/pricing-page/header-section/header-section";
import ServicePriceSection from "@/components/pricing-page/service-price-section/service-price-section";

import {
  acrylGelSystem,
  extra,
  manicurePedicureSystem,
  wimpernAugenbrauen,
} from "../services/page";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeaderSection />
      <ServicePriceSection
        description={acrylGelSystem.description}
        imagePosition="left"
        sectionProps={{
          decorations: { bottomLeftStar: true, goldNuggets: true },
          title: "Services and prices",
          description:
            "Discover our luxurious nail care services. From classic manicures to bespoke nail art, explore premium treatments at prices that suit you.",
        }}
        serviceImageProps={{
          alt: acrylGelSystem.title,
          src: "/images/acryl-service.webp",
        }}
        services={acrylGelSystem.services}
        title={acrylGelSystem.title}
      />

      <ServicePriceSection
        className="grid-cols-1 lg:grid-cols-2"
        description={manicurePedicureSystem.description}
        imagePosition="right"
        sectionProps={{
          noiseBackground: true,
          decorations: { bottomRightStar: true },
        }}
        serviceImageProps={{
          alt: manicurePedicureSystem.title,
          className:
            "object-[35%_50%] xl:object-center rounded-[5px] rounded-tr-[100px] border-1 border-b-0",
          src: "/images/hand-foot-service.webp",
        }}
        services={manicurePedicureSystem.services}
        title={manicurePedicureSystem.title}
      />

      <ServicePriceSection
        description={wimpernAugenbrauen.description}
        imagePosition="left"
        sectionProps={{ decorations: { bottomLeftStar: true } }}
        serviceImageProps={{
          alt: wimpernAugenbrauen.title,
          src: "/images/eyelashes-service.webp",
          className:
            "rounded-[5px] rounded-tl-[100px] border-1 border-b-0 border-[#A37946] object-[65%_50%]",
        }}
        services={wimpernAugenbrauen.services}
        title={wimpernAugenbrauen.title}
      />

      <ServicePriceSection
        description={extra.description}
        imagePosition="right"
        sectionProps={{ noiseBackground: true }}
        serviceImageProps={{
          alt: extra.title,
          className: "rounded-[5px] rounded-tr-[100px] border-1",
          src: "/images/extra-service.webp",
          width: 526,
          height: 391,
        }}
        services={extra.services}
        title={extra.title}
      />
    </div>
  );
}
