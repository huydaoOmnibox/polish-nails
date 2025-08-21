import React from "react";

import HeaderSection from "@/components/services-page/header-section";
import ServiceListSection from "@/components/services-page/service-list-section/service-list-section";

const imgUrl = "/images/service-image.webp";

export const acrylGelSystem = {
  title: "Acryl / Gel System",
  description: "Get the perfect nails with our Acryl Gel System services.",
  services: [
    {
      title: "Natur Neumodellage",
      description: "New natural nail modeling with acrylic gel.",
      thumbnail: imgUrl,
      price: 70,
    },
    {
      title: "Natur Auffüllen",
      description: "Refill for natural nails with acrylic gel.",
      thumbnail: imgUrl,
      price: 60,
    },
    {
      title: "Neumodellage mit Farbe",
      description: "New nail modeling with color acrylic gel.",
      thumbnail: imgUrl,
      price: 85,
    },
    {
      title: "Auffüllen mit Farbe",
      description: "Refill with color acrylic gel for nails.",
      thumbnail: imgUrl,
      price: 75,
    },
    {
      title: "Neumodellage mit French / Babyboom",
      description: "New nail modeling with French or Babyboom.",
      thumbnail: imgUrl,
      price: 90,
    },
    {
      title: "Auffüllen mit French / Babyboom",
      description: "Refill with French or Babyboom style nails.",
      thumbnail: imgUrl,
      price: 80,
    },
  ],
};

export const manicurePedicureSystem = {
  title: "Manicure / Pedicure System",
  description:
    "Pamper your hands and feet with our Manicure Pedicure services.",
  services: [
    {
      title: "Maniküre ohne Farbe",
      description: "Basic manicure without color application.",
      thumbnail: imgUrl,
      price: 30,
    },
    {
      title: "Maniküre mit Lackieren",
      description: "Manicure with nail polish application.",
      thumbnail: imgUrl,
      price: 45,
    },
    {
      title: "Maniküre mit Shellac",
      description: "Manicure with durable Shellac nail polish.",
      thumbnail: imgUrl,
      price: 60,
    },
    {
      title: "Pediküre ohne Farbe",
      description: "Basic pedicure without color application.",
      thumbnail: imgUrl,
      price: 55,
    },
    {
      title: "Pediküre mit Lackieren",
      description: "Pedicure with nail polish application.",
      thumbnail: imgUrl,
      price: 70,
    },
    {
      title: "Pediküre mit Shellac",
      description: "Pedicure with long-lasting Shellac polish.",
      thumbnail: imgUrl,
      price: 85,
    },
    {
      title: "Pediküre mit Acryl Modellange",
      description: "Pedicure with acrylic modeling for perfect nails.",
      thumbnail: imgUrl,
      price: 120,
    },
  ],
};

export const wimpernAugenbrauen = {
  title: "Wimpern / Augenbrauen",
  description:
    "Enhance your natural beauty with our eyelash and eyebrow services.",
  services: [
    {
      title: "Neuset Classic (1:1)",
      description: "Classic 1:1 eyelash extension for natural look.",
      thumbnail: imgUrl,
      price: 110,
    },
    {
      title: "Auffüllen Classic (1:1)",
      description: "Refill of classic 1:1 eyelash extensions.",
      thumbnail: imgUrl,
      price: "bis 3 Wochen 75",
    },
    {
      title: "Neuset Volume (2D-5D)",
      description: "Volume eyelash extensions for a fuller look.",
      thumbnail: imgUrl,
      price: 150,
    },
    {
      title: "Auffüllen Volume (2D-5D)",
      description: "Refill for Volume lashes up to 3 weeks.",
      thumbnail: imgUrl,
      price: "bis 3 Wochen 90",
    },
    {
      title: "Neuset Mega Volume",
      description: "Mega volume eyelash extensions for dramatic look.",
      thumbnail: imgUrl,
      price: 170,
    },
    {
      title: "Auffüllen Mega Volume",
      description: "Refill for Mega volume eyelash extensions.",
      thumbnail: imgUrl,
      price: "bis 3 Wochen 100",
    },
    {
      title: "Augenbrauen zupfen",
      description: "Eyebrow shaping by tweezing for a neat look.",
      thumbnail: imgUrl,
      price: 30,
    },
    {
      title: "Augenbrauen färben",
      description: "Eyebrow tinting to enhance the natural color.",
      thumbnail: imgUrl,
      price: 30,
    },
    {
      title: "Total Care (zupfen + färben)",
      description: "Complete eyebrow care (tweezing + tinting).",
      thumbnail: imgUrl,
      price: 50,
    },
  ],
};

export const extra = {
  title: "Extra",
  description:
    "Enhance your beauty with our extra services for a complete look.",
  services: [
    {
      title: "Design",
      description: "Personalized nail designs with unique styles.",
      thumbnail: imgUrl,
      price: "ab 3",
    },
    {
      title: "Strassstein",
      description: "Add sparkle with dazzling Strassstein accents.",
      thumbnail: imgUrl,
      price: "ab 0.5",
    },
    {
      title: "Extra Länge",
      description: "Get longer nails for a more dramatic look.",
      thumbnail: imgUrl,
      price: "ab 10",
    },
    {
      title: "Chrome, Glitzer komplett",
      description: "Complete your nails with Chrome or Glitzer.",
      thumbnail: imgUrl,
      price: "ab 15",
    },
    {
      title: "Färben",
      description: "Refresh your nails with vibrant color options.",
      thumbnail: imgUrl,
      price: 40,
    },
    {
      title: "Shellac ablösen",
      description: "Gently remove Shellac polish for healthy nails.",
      thumbnail: imgUrl,
      price: 15,
    },
    {
      title: "Acryl / Gel ablösen",
      description: "Safely remove Acryl or Gel from your nails.",
      thumbnail: imgUrl,
      price: 25,
    },
  ],
};

function page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeaderSection />
      <ServiceListSection
        sectionProps={{
          decorations: { goldNuggets: true, bottomLeftStar: true },
        }}
        serviceTitle={acrylGelSystem.title}
        services={acrylGelSystem.services}
      />
      <ServiceListSection
        sectionProps={{
          noiseBackground: true,
          decorations: { bottomRightStar: true },
        }}
        serviceTitle={manicurePedicureSystem.title}
        services={manicurePedicureSystem.services}
      />

      <ServiceListSection
        sectionProps={{
          decorations: { bottomLeftStar: true },
        }}
        serviceTitle={wimpernAugenbrauen.title}
        services={wimpernAugenbrauen.services}
      />

      <ServiceListSection
        sectionProps={{
          noiseBackground: true,
        }}
        serviceTitle={extra.title}
        services={extra.services}
      />
    </div>
  );
}

export default page;
