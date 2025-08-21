import React from "react";
import Image from "next/image";

import { contactInfo } from "@/config/contact";
import { fontMontserrat, fontPlayFair } from "@/config/fonts";
import { cn } from "@/utils/utils";
import { SocialMedia } from "@/components/homepage/about/social-media";
import { TwistedStar } from "@/components/common/icons";

import { Button } from "../../common/button";

function SectionName({ className }: { className?: string }) {
  return (
    <h2
      className={cn(
        "text-base font-normal leading-6",
        fontMontserrat.className,
        className
      )}
    >
      About Us
    </h2>
  );
}

function Title({ className }: { className?: string }) {
  return (
    <h3
      className={cn(
        "flex w-full flex-col text-4xl font-extrabold leading-[3rem] tracking-[0.01em]",
        "lg:text-[2.92rem] lg:leading-[3.5rem] xl:text-[3.5rem] xl:leading-[3.75rem]",
        fontPlayFair.className,
        className
      )}
    >
      Welcome to Polish Nails – your destination for exquisite nail care and
      artistry.
    </h3>
  );
}

function Description({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "text-justify text-base leading-6",
        fontMontserrat.className,
        className
      )}
    >
      We’re passionate about helping you look and feel your best with services
      tailored to your individual style. Our team is committed to providing a
      serene and welcoming space, ensuring every visit is a relaxing escape.
      Whether you’re here for a classic manicure, a bold nail design, or
      soothing hand treatments, we deliver quality and care you can trust.
    </p>
  );
}

function ContactInfo({ className }: { className?: string }) {
  return (
    <div
      className={cn("text-base leading-6", fontMontserrat.className, className)}
    >
      <p>
        <span className="font-bold">Address:&nbsp;</span>
        {contactInfo.address}
      </p>
      <div className="flex flex-row items-center gap-1">
        <span className="font-bold">Hotline:&nbsp;</span>
        <div>
          {contactInfo.hotline.map((number, index) => (
            <span key={index}>
              {number}
              {index < contactInfo.hotline.length - 1 && " - "}
            </span>
          ))}
        </div>
      </div>
      <p>
        <span className="font-bold">Email:&nbsp;</span>
        {contactInfo.email}
      </p>
    </div>
  );
}

function ContactButton() {
  return <Button className={cn("w-max px-9 py-6")} text="CONTACT" />;
}

function LeftMedia() {
  return (
    <div
      className={cn(
        "relative ml-auto aspect-[291/460] h-auto overflow-hidden rounded-[0.3125rem]",
        "w-[95%] lg:w-[90%] 2xl:w-[85%]"
      )}
    >
      <div
        className={cn("absolute left-0 top-0 z-[1] size-full bg-[#483e2d]/20")}
      />
      <video
        autoPlay
        loop
        muted
        className={cn("size-full scale-110 object-cover")}
        src="/videos/about-us-video.mp4"
      />
    </div>
  );
}

function BottomImage({ className }: { className?: string }) {
  return (
    <Image
      alt="About Section Bottom Image"
      className={cn(
        "aspect-[700/357] h-full w-full object-cover object-center",
        className
      )}
      height={357}
      src="/images/about-bottom-img.webp"
      width={713}
    />
  );
}

function AboutSection() {
  return (
    <section
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#E0E0E0] pb-10 pt-16 text-[#422A3C]",
        "md:flex-row md:items-start md:justify-between md:pb-[4.25rem] md:pt-[4.8125rem]"
      )}
    >
      <div className="hidden md:block md:basis-[47.5%]">
        <LeftMedia />
      </div>
      <div className={cn("basis-full md:basis-[47.5%] md:pt-6")}>
        <div className={cn("px-[5%] md:pr-[15%]")}>
          <SectionName />
          <Title className="mb-4" />
          <Description className="mb-6" />
          <ContactInfo className="mb-5" />
          <div className="flex gap-5 md:flex-col">
            <SocialMedia />
            <ContactButton />
          </div>
        </div>
        <BottomImage className="mt-12 hidden md:block" />
      </div>
      <div className={cn("absolute -bottom-8 -left-4 hidden md:block")}>
        <TwistedStar size={114} />
      </div>
    </section>
  );
}

export default AboutSection;
