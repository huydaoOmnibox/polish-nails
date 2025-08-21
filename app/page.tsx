import AboutSection from "@/components/homepage/about/about-section";
import BannerSection from "@/components/homepage/banner/banner-section";
import ServiceSection from "@/components/homepage/our-services/our-services-section";
import PricingSection from "@/components/homepage/pricing-section";
import FeaturedProductsSection from "@/components/homepage/featured-products/featured-products-section";
import FeedbackSection from "@/components/homepage/feedback/feedback-section";
import ourServiceNailCare from "@/public/images/our-service-nail-care.webp";
import ourServiceWimpernCare from "@/public/images/our-service-wimpern-care.webp";
import ourServiceLashExtension from "@/public/images/our-service-lash-extension.webp";
import ourServiceWax from "@/public/images/our-service-wax.webp";

import {
  acrylGelSystem,
  extra,
  manicurePedicureSystem,
  wimpernAugenbrauen,
} from "./services/page";

export default function Home() {
  const priceList = [
    acrylGelSystem.services[0],
    manicurePedicureSystem.services[0],
    wimpernAugenbrauen.services[0],
    extra.services[0],
  ];

  const feedbacks = [
    {
      customerName: "Amanda K.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      feedback:
        "Best nail spa in town! Super clean, relaxing, and my nails look amazing.",
    },
    {
      customerName: "Rachel S.",
      avatar:
        "https://plus.unsplash.com/premium_photo-1670884441012-c5cf195c062a?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      feedback:
        "Absolutely love this place! The staff is friendly, and my gel nails last forever. 10/10!",
    },
    {
      customerName: "Lindsay T.",
      avatar:
        "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      feedback:
        "Perfect pampering session! Gorgeous nails, great service, and a calm atmosphere.",
    },
    {
      customerName: "Megan V.",
      avatar:
        "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      feedback:
        "Flawless manicure and pedicure! The attention to detail is incredible.",
    },
    {
      customerName: "Olivia H.",
      avatar:
        "https://images.unsplash.com/photo-1722270606350-e7be9fb9eb1e?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      feedback:
        "Such a relaxing vibe! My nails have never looked better. Love it here!",
    },
    {
      customerName: "Emily R.",
      avatar:
        "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      feedback:
        "Incredible service and beautiful results! My nails look perfect every time.",
    },
    {
      customerName: "Sarah M.",
      avatar:
        "https://plus.unsplash.com/premium_photo-1688350839154-1a131bccd78a?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      feedback:
        "Fast, friendly, and fabulous! This spa never disappoints. Highly recommend!",
    },
    {
      customerName: "Jessica L.",
      avatar:
        "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=100&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      feedback:
        "Always a treat coming here! Professional staff and long-lasting nails. Love this place!",
    },
    {
      customerName: "Sophia J.",
      avatar:
        "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      feedback:
        "My go-to nail salon! The team is so talented and friendly. Always leave feeling fabulous!",
    },
    {
      customerName: "Emma G.",
      avatar:
        "https://images.unsplash.com/photo-1515552912129-ba1abf7d8e39?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      feedback:
        "I've tried so many nail salons, but this one is hands-down the best in every way.",
    },
    {
      customerName: "Chloe B.",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      feedback:
        "Fantastic service! The staff is talented, the place is spotless, and my nails are flawless.",
    },
    {
      customerName: "Zoe D.",
      avatar:
        "https://images.unsplash.com/photo-1589696709084-5d65d0343dd4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      feedback:
        "Highly skilled staff and a relaxing atmosphere make this my go-to salon for nails.",
    },
  ];

  const ourServices = [
    {
      image: ourServiceNailCare,
      title: "Acryl/ Gel System",
      description:
        "Transform your nails with durable and flawless acrylic or gel enhancements. Perfect for achieving a long-lasting, polished look.",
    },
    {
      image: ourServiceWimpernCare,
      title: "Wimpern",
      description:
        "Enhance your natural beauty with expertly applied eyelash extensions. Get fuller, longer lashes for a captivating look every day.",
    },
    {
      image: ourServiceLashExtension,
      title: "Maikure",
      description:
        "Pamper your hands with our professional manicure services. From nail shaping to luxurious treatments, your hands will thank you.",
    },
    {
      image: ourServiceWax,
      title: "Extra",
      description:
        "Add a touch of sparkle or customize your style with our additional services. Explore unique nail art, embellishments, and more.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <BannerSection />
      <AboutSection />
      <ServiceSection ourServices={ourServices} />
      <PricingSection priceList={priceList} />
      <FeaturedProductsSection />
      <FeedbackSection feedbacks={feedbacks} />
    </div>
  );
}
