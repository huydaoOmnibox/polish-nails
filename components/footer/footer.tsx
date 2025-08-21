import { Divider } from "@nextui-org/divider";
import NextLink from "next/link";
import React from "react";
import Image from "next/image";

import { fontMontserrat } from "@/config/fonts";
import { cn } from "@/utils/utils";
import logo from "@/public/logo.webp";
import { contactInfo } from "@/config/contact";
import { FooterSocialMedia } from "@/components/footer/footer-social-media";

function FooterLogo({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <NextLink className="flex items-center justify-start gap-3" href="/">
        <Image alt="logo" height={150} src={logo} width={150} />
      </NextLink>
      <div className={cn("mt-2 w-full max-w-[16.5rem] tracking-wide md:px-3")}>
        <p className={cn("flex flex-row items-center justify-between")}>
          <span>Mo., Di., Mi., Fr.</span>
          <span>9:00 - 19:00</span>
        </p>
        <p className={cn("flex flex-row items-center justify-between")}>
          <span>Donnerstag</span>
          <span>9:00 - 20:00</span>
        </p>
        <p className={cn("flex flex-row items-center justify-between")}>
          <span>Samstag</span>
          <span>9:00 - 18:00</span>
        </p>
        <p className={cn("flex flex-row items-center justify-between")}>
          <span>Sonntag</span>
          <span>Closed</span>
        </p>
      </div>
    </div>
  );
}

function FooterContactSection({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      <h3 className="text-xl font-semibold leading-[1.5625rem]">Contact</h3>
      <ul>
        <li>{contactInfo.email}</li>
        {contactInfo.hotline.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
        <li>{contactInfo.address}</li>
      </ul>
    </div>
  );
}

function FooterMap({ className }: { className?: string }) {
  return (
    <iframe
      allowFullScreen={false}
      className={cn("max-w-full", className)}
      height="207"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3206.5068675864018!2d7.900919276688436!3d47.34987730566973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479031cba18becd5%3A0xf4bb42fd15013b1a!2sHauptgasse%2025%2C%204600%20Olten%2C%20Switzerland!5e1!3m2!1sen!2s!4v1734520909294!5m2!1sen!2s"
      title="Google Map"
      width="342"
    />
  );
}

export const Footer = () => {
  return (
    <footer
      className={cn(
        "mx-auto w-full max-w-[90rem] bg-[#606060] pb-4 pt-14 text-[#F3F3F3]",
        fontMontserrat.className
      )}
    >
      <div
        className={cn(
          "grid gap-4 px-4 md:grid-cols-3 lg:grid-cols-7 lg:px-8 xl:px-[4.825rem]"
        )}
      >
        <FooterLogo className="lg:col-span-2" />
        <FooterContactSection className="space-y-2 md:space-y-6 lg:col-span-2 lg:col-start-3" />
        <FooterSocialMedia className="col-span-1 space-y-2 md:space-y-6 lg:col-start-5" />
        <FooterMap className="hidden lg:col-span-2 lg:col-start-6 lg:block" />
      </div>
      <Divider
        className="mb-4 mt-[3.25rem] bg-white"
        orientation="horizontal"
      />
      <div>
        <NextLink className="ml-[70%] text-base" href="#">
          Terms of Use
        </NextLink>
      </div>
    </footer>
  );
};
